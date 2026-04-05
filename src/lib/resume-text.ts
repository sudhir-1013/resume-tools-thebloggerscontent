export function parseSkillTokens(raw: string): string[] {
  return raw
    .split(/[,;\n]+/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseBulletLines(raw: string): string[] {
  return raw
    .split(/\n+/g)
    .map((s) => s.trim())
    .filter(Boolean);
}
