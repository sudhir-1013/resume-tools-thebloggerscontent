"use client";

import { useCallback, useEffect, useState } from "react";
import type { AtsAnalysisResult, AtsApiSuccess } from "@/lib/ats-types";
import {
  clearAtsAnalysisPersist,
  loadAtsAnalysisPersist,
  saveAtsAnalysisPersist,
} from "@/lib/ats-checker-persist";

function clampScore(n: number) {
  if (Number.isNaN(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

function scoreTone(score: number) {
  if (score >= 75)
    return {
      bar: "from-secondary to-emerald-400",
      label: "Stronger ATS alignment",
      text: "text-secondary",
      ring: "#22d3ee",
      badge: "border-secondary/40 bg-secondary/10 text-secondary",
    };
  if (score >= 50)
    return {
      bar: "from-amber-400 to-secondary",
      label: "Needs targeted fixes",
      text: "text-amber-300",
      ring: "#fbbf24",
      badge: "border-amber-400/35 bg-amber-400/10 text-amber-200",
    };
  return {
    bar: "from-rose-500 to-amber-500",
    label: "High-risk for parsers",
    text: "text-rose-300",
    ring: "#fb7185",
    badge: "border-rose-400/35 bg-rose-500/10 text-rose-200",
  };
}

function scoreInterpretation(score: number): string {
  if (score >= 75)
    return "Structure and keywords look machine-friendly. Keep terms aligned with target job postings and avoid layout tricks that confuse extractors.";
  if (score >= 50)
    return "Recruiters and parsers will likely see gaps versus strong peers. Prioritize missing essentials, then tighten layout and metrics.";
  return "Critical signals may be thin or buried. Expect ATS parsers to rank this lower until essentials, formatting, and role clarity improve.";
}

function ScoreHero({
  score,
  tone,
  modelUsed,
  stats,
}: {
  score: number;
  tone: ReturnType<typeof scoreTone>;
  modelUsed: string | null;
  stats: {
    essential: number;
    valuable: number;
    strategic: number;
    layout: number;
  };
}) {
  const rounded = Math.round(score);
  const interpretation = scoreInterpretation(score);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-charcoal-border bg-gradient-to-br from-charcoal-elevated/80 via-charcoal-elevated/50 to-charcoal-elevated/30 p-6 shadow-[0_0_0_1px_rgba(109,40,217,0.12)] sm:p-8 lg:p-10">
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 size-64 rounded-full bg-secondary/5 blur-3xl"
        aria-hidden
      />

      <div className="relative grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-12">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <div
            className="relative grid size-[11rem] shrink-0 place-items-center rounded-full p-[5px] sm:size-[13rem]"
            style={{
              background: `conic-gradient(from -90deg, ${tone.ring} ${score}%, rgba(51, 65, 85, 0.55) 0)`,
            }}
            role="meter"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={rounded}
            aria-label={`ATS-style score ${rounded} out of 100`}
          >
            <div className="flex size-full flex-col items-center justify-center rounded-full bg-charcoal-elevated px-2 shadow-inner">
              <span
                className={`font-mono text-5xl font-bold tabular-nums leading-none sm:text-6xl ${tone.text}`}
              >
                {rounded}
              </span>
              <span className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground-subtle">
                out of 100
              </span>
            </div>
          </div>
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${tone.badge}`}
          >
            {tone.label}
          </span>
        </div>

        <div className="min-w-0 space-y-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground-subtle">
              Resume ATS readiness
            </p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground-muted sm:text-base">
              {interpretation}
            </p>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3 text-xs text-foreground-subtle">
              <span className="font-medium uppercase tracking-wider">
                Alignment bar
              </span>
              <span className="font-mono tabular-nums">{rounded}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-charcoal-border/90">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${tone.bar} transition-all duration-700 ease-out`}
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
              <span>0 weak</span>
              <span className="text-foreground-muted">·</span>
              <span>50 moderate</span>
              <span className="text-foreground-muted">·</span>
              <span>75 strong</span>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "Essential gaps", v: stats.essential },
              { k: "Valuable gaps", v: stats.valuable },
              { k: "Strategic gaps", v: stats.strategic },
              { k: "Layout flags", v: stats.layout },
            ].map(({ k, v }) => (
              <div
                key={k}
                className="rounded-xl border border-charcoal-border/80 bg-background/25 px-3 py-3 text-center"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-foreground-subtle">
                  {k}
                </dt>
                <dd className="mt-1 font-mono text-2xl font-bold tabular-nums text-foreground">
                  {v}
                </dd>
              </div>
            ))}
          </dl>

          {modelUsed ? (
            <p className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
              Model · {modelUsed}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function TagList({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent: "primary" | "secondary" | "muted";
}) {
  const border =
    accent === "primary"
      ? "border-primary/35"
      : accent === "secondary"
        ? "border-secondary/35"
        : "border-charcoal-border";
  const chip =
    accent === "primary"
      ? "bg-primary/15 text-foreground"
      : accent === "secondary"
        ? "bg-secondary/10 text-foreground"
        : "bg-charcoal-elevated text-foreground-muted";

  if (!items.length) {
    return (
      <section
        className={`rounded-xl border ${border} bg-charcoal-elevated/40 p-4 sm:p-5`}
      >
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-foreground-muted">None flagged.</p>
      </section>
    );
  }

  return (
    <section
      className={`rounded-xl border ${border} bg-charcoal-elevated/40 p-4 sm:p-5`}
    >
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={`rounded-lg px-2.5 py-1 font-mono text-xs ${chip}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function normalizeResult(raw: unknown): AtsAnalysisResult {
  if (!raw || typeof raw !== "object") return {};
  const r = raw as Record<string, unknown>;
  const analysis = r.analysis as Record<string, unknown> | undefined;
  return {
    identifiedTitle:
      typeof r.identifiedTitle === "string" ? r.identifiedTitle : undefined,
    alternativeRoles: Array.isArray(r.alternativeRoles)
      ? r.alternativeRoles.filter((x): x is string => typeof x === "string")
      : undefined,
    score: typeof r.score === "number" ? r.score : undefined,
    analysis: analysis
      ? {
          essentialMissing: Array.isArray(analysis.essentialMissing)
            ? analysis.essentialMissing.filter(
                (x): x is string => typeof x === "string",
              )
            : undefined,
          valuableMissing: Array.isArray(analysis.valuableMissing)
            ? analysis.valuableMissing.filter(
                (x): x is string => typeof x === "string",
              )
            : undefined,
          strategicMissing: Array.isArray(analysis.strategicMissing)
            ? analysis.strategicMissing.filter(
                (x): x is string => typeof x === "string",
              )
            : undefined,
        }
      : undefined,
    layoutWarnings: Array.isArray(r.layoutWarnings)
      ? r.layoutWarnings.filter((x): x is string => typeof x === "string")
      : undefined,
    criticalCritique:
      typeof r.criticalCritique === "string" ? r.criticalCritique : undefined,
    improvementTips: Array.isArray(r.improvementTips)
      ? r.improvementTips.filter((x): x is string => typeof x === "string")
      : undefined,
  };
}

export function ATSCheckerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [deeperTips, setDeeperTips] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AtsAnalysisResult | null>(null);
  const [modelUsed, setModelUsed] = useState<string | null>(null);
  const [cachedFileLabel, setCachedFileLabel] = useState<string | null>(null);
  const [cacheHydrated, setCacheHydrated] = useState(false);

  useEffect(() => {
    const p = loadAtsAnalysisPersist();
    if (p) {
      setResult(normalizeResult(p.result));
      setModelUsed(p.modelUsed);
      setDeeperTips(p.deeperTips);
      setCachedFileLabel(p.fileName);
    }
    setCacheHydrated(true);
  }, []);

  const onFile = useCallback((f: File | null) => {
    setFile(f);
    setError(null);
    setResult(null);
    setModelUsed(null);
    setCachedFileLabel(null);
    clearAtsAnalysisPersist();
  }, []);

  const startNewAnalysis = useCallback(() => {
    clearAtsAnalysisPersist();
    setFile(null);
    setResult(null);
    setModelUsed(null);
    setCachedFileLabel(null);
    setError(null);
  }, []);

  const analyze = useCallback(async () => {
    if (!file) {
      setError("Choose a PDF resume first.");
      return;
    }
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setError("Only PDF files are supported for consistent text extraction.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setModelUsed(null);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("subscribed", deeperTips ? "true" : "false");

      const res = await fetch("/api/ats-checker/analyze", {
        method: "POST",
        body: fd,
      });
      const json: unknown = await res.json();

      if (!res.ok) {
        const errBody = json as { error?: unknown };
        setError(
          typeof errBody.error === "string"
            ? errBody.error
            : "Something went wrong. Try again.",
        );
        return;
      }

      const ok = json as AtsApiSuccess;
      const normalized = normalizeResult(ok.result);
      const model = ok.model ?? null;
      setResult(normalized);
      setModelUsed(model);
      setCachedFileLabel(file.name);
      saveAtsAnalysisPersist({
        result: normalized,
        modelUsed: model,
        fileName: file.name,
        deeperTips,
      });
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [file, deeperTips]);

  const score = clampScore(result?.score ?? 0);
  const tone = scoreTone(score);
  const hasResult = result !== null;
  const successView = hasResult && !loading;

  const gapStats =
    result !== null
      ? {
          essential: result.analysis?.essentialMissing?.length ?? 0,
          valuable: result.analysis?.valuableMissing?.length ?? 0,
          strategic: result.analysis?.strategicMissing?.length ?? 0,
          layout: result.layoutWarnings?.length ?? 0,
        }
      : { essential: 0, valuable: 0, strategic: 0, layout: 0 };

  const resultsBlocks =
    result !== null ? (
      <>
        <ScoreHero
          score={score}
          tone={tone}
          modelUsed={modelUsed}
          stats={gapStats}
        />

        {result.criticalCritique ? (
          <blockquote className="rounded-2xl border border-charcoal-border bg-charcoal-elevated/40 px-6 py-5 sm:px-8 sm:py-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
              Verdict
            </span>
            <p className="mt-3 text-pretty text-base italic leading-relaxed text-foreground sm:text-lg">
              {result.criticalCritique}
            </p>
          </blockquote>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-charcoal-border bg-charcoal-elevated/40 p-5 sm:p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              Read as role
            </h3>
            <p className="mt-2 text-lg font-semibold text-foreground sm:text-xl">
              {result.identifiedTitle?.trim() || "Not identified"}
            </p>
          </div>
          <div className="rounded-xl border border-charcoal-border bg-charcoal-elevated/40 p-5 sm:p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              Transferable pivots
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm text-foreground-muted sm:text-base">
              {(result.alternativeRoles?.length
                ? result.alternativeRoles
                : ["—"]
              ).map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <TagList
            title="Essential keywords missing"
            items={result.analysis?.essentialMissing ?? []}
            accent="primary"
          />
          <TagList
            title="Valuable terms missing"
            items={result.analysis?.valuableMissing ?? []}
            accent="secondary"
          />
          <TagList
            title="Strategic / leadership gaps"
            items={result.analysis?.strategicMissing ?? []}
            accent="muted"
          />
        </div>

        <section className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-5 sm:p-6">
          <h3 className="text-sm font-semibold text-amber-200">
            Layout & parser risks
          </h3>
          {result.layoutWarnings?.length ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-foreground-muted sm:text-base">
              {result.layoutWarnings.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-foreground-muted">
              No major layout warnings returned.
            </p>
          )}
        </section>

        {result.improvementTips?.length ? (
          <section className="rounded-xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-foreground">
              Improvement tips
            </h3>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-foreground-muted sm:text-base">
              {result.improvementTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ol>
          </section>
        ) : null}
      </>
    ) : null;

  if (!cacheHydrated) {
    return (
      <div className="mx-auto container px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div
          className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-charcoal-border/60 bg-charcoal-elevated/20"
          role="status"
          aria-live="polite"
          aria-label="Loading saved analysis if any"
        >
          <div
            className="size-9 animate-spin rounded-full border-2 border-secondary border-t-transparent"
            aria-hidden
          />
          <p className="text-sm text-foreground-muted">Loading…</p>
        </div>
      </div>
    );
  }

  const resumeDisplayName = file?.name ?? cachedFileLabel ?? "Resume";

  return (
    <div className="mx-auto container px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      {successView && result ? (
        <div className="mx-auto w-full max-w-6xl space-y-8">
          <div className="flex flex-col gap-4 border-b border-charcoal-border/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground-subtle">
                Analysis complete
              </p>
              <p className="mt-1 truncate text-sm font-medium text-foreground">
                {resumeDisplayName}
              </p>
              {!file && cachedFileLabel ? (
                <p className="mt-1 text-xs text-foreground-subtle">
                  Restored from your last run (saved on this device for up to 24
                  hours).
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={startNewAnalysis}
              className="shrink-0 rounded-lg border border-charcoal-border bg-charcoal-elevated/80 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-secondary/50 hover:text-secondary"
            >
              Check another resume
            </button>
          </div>
          {resultsBlocks}
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
          <section className="rounded-2xl border border-charcoal-border bg-charcoal-elevated/50 p-6 shadow-[0_0_0_1px_rgba(109,40,217,0.08)] backdrop-blur-sm sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">
              Upload your resume
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              We extract text from your PDF and run it through an ATS-style
              critique. This is a heuristic check, not a guarantee any employer
              uses the same rules — but it reflects how parsers and recruiters
              often react.
            </p>

            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-charcoal-border bg-background/40 px-4 py-10 transition-colors hover:border-secondary/40">
              <input
                type="file"
                accept="application/pdf,.pdf"
                className="sr-only"
                onChange={(e) => onFile(e.target.files?.[0] ?? null)}
              />
              <span className="text-sm font-medium text-secondary">
                {file ? file.name : "Drop a PDF here or click to browse"}
              </span>
              <span className="mt-2 text-center text-xs text-foreground-subtle">
                PDF only · stays in this request · not stored on our servers
              </span>
            </label>

            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-charcoal-border/80 bg-background/30 p-4">
              <input
                type="checkbox"
                checked={deeperTips}
                onChange={(e) => setDeeperTips(e.target.checked)}
                className="mt-1 size-4 rounded border-charcoal-border text-primary focus:ring-primary"
              />
              <span>
                <span className="block text-sm font-medium text-foreground">
                  Include personalized improvement tips
                </span>
                <span className="mt-0.5 block text-xs text-foreground-muted">
                  Optional. Slightly longer model output focused on concrete
                  edits.
                </span>
              </span>
            </label>

            <button
              type="button"
              onClick={analyze}
              disabled={loading || !file}
              className="mt-6 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white shadow-[0_0_28px_var(--primary-glow)] transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Analyzing…" : "Run ATS analysis"}
            </button>

            {error ? (
              <p
                className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200"
                role="alert"
              >
                {error}
              </p>
            ) : null}
          </section>

          <section className="space-y-6">
            {!hasResult && !loading ? (
              <div className="rounded-2xl border border-charcoal-border bg-charcoal-elevated/30 p-8 text-center">
                <p className="text-sm font-medium text-foreground-muted">
                  Results appear here
                </p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-foreground-subtle">
                  You will see a strict score, role read, keyword gaps, layout
                  risks, and a single blunt critique line — no sugarcoating.
                </p>
              </div>
            ) : null}

            {loading ? (
              <div className="rounded-2xl border border-charcoal-border bg-charcoal-elevated/40 p-10 text-center">
                <div
                  className="mx-auto size-10 animate-spin rounded-full border-2 border-secondary border-t-transparent"
                  aria-hidden
                />
                <p className="mt-4 text-sm text-foreground-muted">
                  Parsing PDF and running the model…
                </p>
              </div>
            ) : null}
          </section>
        </div>
      )}
    </div>
  );
}
