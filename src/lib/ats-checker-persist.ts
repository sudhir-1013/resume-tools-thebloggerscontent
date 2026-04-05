import type { AtsAnalysisResult } from "@/lib/ats-types";

const COOKIE_NAME = "rt_ats_analysis";
const LS_KEY = "rt_ats_analysis";

/** 24 hours */
export const ATS_PERSIST_MAX_AGE_SEC = 24 * 60 * 60;

export type AtsPersistV1 = {
  v: 1;
  expiresAt: number;
  result: AtsAnalysisResult;
  modelUsed: string | null;
  fileName: string;
  deeperTips: boolean;
};

/** Stay under typical 4KB cookie cap (name + value). */
const MAX_COOKIE_VALUE_CHARS = 3200;

function readCookieRaw(name: string): string | null {
  if (typeof document === "undefined") return null;
  const row = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  if (!row) return null;
  return row.slice(name.length + 1);
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
}

export function clearAtsAnalysisPersist(): void {
  if (typeof window === "undefined") return;
  deleteCookie(COOKIE_NAME);
  try {
    localStorage.removeItem(LS_KEY);
  } catch {
    /* private mode / blocked */
  }
}

export function saveAtsAnalysisPersist(
  data: Omit<AtsPersistV1, "v" | "expiresAt">,
): void {
  if (typeof window === "undefined") return;
  clearAtsAnalysisPersist();
  const payload: AtsPersistV1 = {
    v: 1,
    expiresAt: Date.now() + ATS_PERSIST_MAX_AGE_SEC * 1000,
    result: data.result,
    modelUsed: data.modelUsed,
    fileName: data.fileName,
    deeperTips: data.deeperTips,
  };
  const raw = JSON.stringify(payload);
  const encoded = encodeURIComponent(raw);
  try {
    if (encoded.length <= MAX_COOKIE_VALUE_CHARS) {
      document.cookie = `${COOKIE_NAME}=${encoded}; Max-Age=${ATS_PERSIST_MAX_AGE_SEC}; Path=/; SameSite=Lax`;
    } else {
      localStorage.setItem(LS_KEY, raw);
    }
  } catch {
    /* quota / blocked storage */
  }
}

export function loadAtsAnalysisPersist(): AtsPersistV1 | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  const fromCookie = readCookieRaw(COOKIE_NAME);
  if (fromCookie) {
    try {
      raw = decodeURIComponent(fromCookie);
    } catch {
      raw = null;
    }
  }
  if (!raw) {
    try {
      raw = localStorage.getItem(LS_KEY);
    } catch {
      return null;
    }
  }
  if (!raw) return null;
  try {
    const p = JSON.parse(raw) as AtsPersistV1;
    if (p.v !== 1 || typeof p.expiresAt !== "number") return null;
    if (Date.now() > p.expiresAt) {
      clearAtsAnalysisPersist();
      return null;
    }
    if (!p.result || typeof p.result !== "object") return null;
    return p;
  } catch {
    return null;
  }
}
