import { NextResponse } from "next/server";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

// DOMMatrix polyfill for Node (pdfjs / canvas paths)
if (typeof globalThis.DOMMatrix === "undefined") {
  // @ts-expect-error — minimal stub for server runtime
  globalThis.DOMMatrix = class DOMMatrix {
    constructor(a: number[]) {
      this.a = a[0];
      this.b = a[1];
      this.c = a[2];
      this.d = a[3];
      this.e = a[4];
      this.f = a[5];
    }
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
  };
}

const workerPath = path.join(
  process.cwd(),
  "node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs",
);
pdfjs.GlobalWorkerOptions.workerSrc = pathToFileURL(workerPath).href;

async function bufferFromFile(file: File) {
  const ab = await file.arrayBuffer();
  return Buffer.from(ab);
}

async function pdfToText(buffer: Buffer): Promise<string> {
  try {
    const data = new Uint8Array(buffer);
    const loadingTask = pdfjs.getDocument({
      data,
      useSystemFonts: true,
      disableFontFace: true,
      verbosity: 0,
    });
    const doc = await loadingTask.promise;
    let text = "";
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      text +=
        content.items
          .map((it) => ("str" in it ? (it.str ?? "") : ""))
          .join(" ") + "\n\n";
    }
    await doc.destroy();
    return text.trim();
  } catch (err) {
    console.error("pdfToText:", err);
    return "";
  }
}

const getStrictPrompt = (resumeText: string, isSubscribed: boolean) => `
You are an expert ATS (Applicant Tracking System) parser and professional resume critic. Your goal is to provide a brutal, honest, and data-driven assessment of a resume's hireability for high-growth tech and creative roles.

1. Target Identification: Determine the specific Job Title the candidate is qualified for based on their most recent experience.
2. Market Pivot: Suggest 2-3 Alternative Roles where these skills are highly transferable.
3. Keyword Gap Analysis: Identify missing industry-standard terms.
    - Essential: Software, tools, and fundamental methodologies.
    - Valuable: Industry-specific processes (e.g., "A/B Testing," "Brand Guidelines").
    - Strategic: Leadership, ROI-focused metrics, and cross-functional terms.
4. Scoring (Strict 0–100): Use the "Hard-Cap" logic below.
${isSubscribed ? "5. Improvement Tips: Provide 3 to 5 highly actionable, personalized tips specifically tailored to improve this resume's ATS score and hireability based on its weaknesses." : ""}

- Base 100: Perfect alignment, metrics in every bullet, and clear summary.
- -15: No Professional Summary/Profile section.
- -10: No measurable results or KPIs (e.g., %, $, #).
- -5 per missing Essential keyword.
- -10: Missing Portfolio link (Crucial for creative roles).
- -10: Poor layout (columns, tables, or non-standard symbols) that might break legacy parsers.

- If 5+ Essential keywords are missing, the Score CANNOT exceed 50.
- If there are zero metrics (no percentages or numbers), the Score CANNOT exceed 40.

Return ONLY a valid JSON object:
{ 
  "identifiedTitle": "string",
  "alternativeRoles": ["string", "string"],
  "score": number, 
  "analysis": {
    "essentialMissing": ["string"],
    "valuableMissing": ["string"],
    "strategicMissing": ["string"]
  },
  "layoutWarnings": ["string"],
  "criticalCritique": "One sentence of blunt advice."${isSubscribed ? ",\n  \"improvementTips\": [\"string\", \"string\"]" : ""}
}

# Resume Content:
${resumeText.slice(0, 15000)}
`;

function getGenAI() {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) return null;
  return new GoogleGenerativeAI(key);
}

async function tryGemini(prompt: string) {
  const genAI = getGenAI();
  if (!genAI) throw new Error("GEMINI_API_KEY not set");

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { responseMimeType: "application/json" },
  });
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return {
    data: JSON.parse(text) as unknown,
    model: "gemini-2.0-flash",
  };
}

async function tryMistralChain(prompt: string) {
  const apiKey = process.env.MISTRAL_API_KEY?.trim();
  if (!apiKey) throw new Error("MISTRAL_API_KEY not set");

  const models = [
    "mistral-large-latest",
    "mistral-medium-latest",
    "mistral-small-latest",
  ];
  for (const modelId of models) {
    try {
      const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: modelId,
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" },
        }),
      });
      if (res.ok) {
        const d = (await res.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const content = d.choices?.[0]?.message?.content;
        if (!content) throw new Error("Empty Mistral response");
        return {
          data: JSON.parse(content) as unknown,
          model: `mistral-${modelId}`,
        };
      }
    } catch (e) {
      console.warn(`Mistral ${modelId} failed, skipping...`, e);
    }
  }
  throw new Error("Mistral Chain Exhausted");
}

async function tryGroqChain(prompt: string) {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) throw new Error("GROQ_API_KEY not set");

  const models = [
    "llama-3.3-70b-versatile",
    "mixtral-8x7b-32768",
    "llama-3.1-8b-instant",
  ];
  for (const modelId of models) {
    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: modelId,
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
          }),
        },
      );
      if (res.ok) {
        const d = (await res.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const content = d.choices?.[0]?.message?.content;
        if (!content) throw new Error("Empty Groq response");
        return {
          data: JSON.parse(content) as unknown,
          model: `groq-${modelId}`,
        };
      }
    } catch (e) {
      console.warn(`Groq ${modelId} failed, skipping...`, e);
    }
  }
  throw new Error("Groq Chain Exhausted");
}

export async function POST(req: Request) {
  try {
    const hasAnyKey =
      !!process.env.GEMINI_API_KEY?.trim() ||
      !!process.env.MISTRAL_API_KEY?.trim() ||
      !!process.env.GROQ_API_KEY?.trim();

    if (!hasAnyKey) {
      return NextResponse.json(
        {
          error:
            "ATS analysis is not configured. Set GEMINI_API_KEY, and optionally MISTRAL_API_KEY or GROQ_API_KEY, on the server.",
        },
        { status: 503 },
      );
    }

    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buf = await bufferFromFile(file);
    const text = await pdfToText(buf);

    if (!text) {
      return NextResponse.json(
        {
          error:
            "Could not read this document. Please try uploading a different PDF.",
        },
        { status: 400 },
      );
    }

    const subscribedStr = form.get("subscribed") as string | null;
    const isSubscribed = subscribedStr === "true";
    const prompt = getStrictPrompt(text, isSubscribed);
    let finalResult: unknown = null;
    let activeModel = "";

    try {
      const res = await tryGemini(prompt);
      finalResult = res.data;
      activeModel = res.model;
    } catch (e) {
      console.warn("Gemini failed, trying Mistral chain...", e);
      try {
        const res = await tryMistralChain(prompt);
        finalResult = res.data;
        activeModel = res.model;
      } catch (e2) {
        console.warn("Mistral failed, trying Groq chain...", e2);
        try {
          const res = await tryGroqChain(prompt);
          finalResult = res.data;
          activeModel = res.model;
        } catch (e3) {
          return NextResponse.json(
            {
              error:
                "All AI engines are unavailable or misconfigured. Please try again shortly.",
            },
            { status: 429 },
          );
        }
      }
    }

    return NextResponse.json({ result: finalResult, model: activeModel });
  } catch (err) {
    console.error("Critical error in ATS analyze route:", err);
    return NextResponse.json(
      { error: "Internal system error" },
      { status: 500 },
    );
  }
}
