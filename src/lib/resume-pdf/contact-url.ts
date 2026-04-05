export function withHttp(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

export function displayUrl(raw: string): string {
  return raw.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}
