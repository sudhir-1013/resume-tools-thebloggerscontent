export const RESUME_THEME_IDS = [
  "midnight-executive",
  "slate-professional",
  "canvas-minimal",
  "signal-accent",
] as const;

export type ResumeThemeId = (typeof RESUME_THEME_IDS)[number];

export type ResumeThemeMeta = {
  id: ResumeThemeId;
  name: string;
  tagline: string;
  description: string;
  accent: string;
  /** Best for ATS / role type hint */
  bestFor: string;
};

export const RESUME_THEMES: ResumeThemeMeta[] = [
  {
    id: "midnight-executive",
    name: "Executive Two-Column",
    tagline: "Blue accent · sidebar skills",
    description:
      "Bold uppercase name, headline with dividers, main column for summary and experience, narrow column for skills and education—similar to modern executive CV layouts.",
    accent: "#2563eb",
    bestFor: "Leadership, consulting, client-facing roles",
  },
  {
    id: "slate-professional",
    name: "Classic Serif",
    tagline: "Times · full rules · traditional",
    description:
      "Serif typography, full-width rules under each section, company/date and title rows—aligned with traditional single-column résumés.",
    accent: "#1c1917",
    bestFor: "Finance, law, academia, corporate",
  },
  {
    id: "canvas-minimal",
    name: "Canvas ATS",
    tagline: "Helvetica · single column · parser-safe",
    description:
      "The original ATS-first layout: clean Helvetica, linear sections, accent rules only—best when applicant systems matter most.",
    accent: "#0f172a",
    bestFor: "Applicant tracking systems, tech, general",
  },
  {
    id: "signal-accent",
    name: "Centered Minimal",
    tagline: "Caps header · skills grid · footer bar",
    description:
      "Centered name and title, labeled contact line, section rules, pipe-separated org lines, three-column skills, and a subtle footer bar.",
    accent: "#4b5563",
    bestFor: "Accounting, operations, minimalist roles",
  },
];

export function isResumeThemeId(value: unknown): value is ResumeThemeId {
  return (
    typeof value === "string" &&
    (RESUME_THEME_IDS as readonly string[]).includes(value)
  );
}
