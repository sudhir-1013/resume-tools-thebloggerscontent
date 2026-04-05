import type { ResumeThemeId } from "@/lib/resume-themes";
import { RESUME_THEMES } from "@/lib/resume-themes";

/** canvas = current ATS Helvetica single column; others match reference PDFs */
export type PdfLayoutKind =
  | "atsCanvas"
  | "executiveTwoColumn"
  | "serifClassic"
  | "centeredMinimal";

export type PdfThemeTokens = {
  id: ResumeThemeId;
  layout: PdfLayoutKind;
  accent: string;
  nameSize: number;
  titleSize: number;
  sectionTitleSize: number;
  bodySize: number;
  contactSize: number;
  sectionGap: number;
  headerMarginBottom: number;
  nameRuleWidth: number | "full";
};

const DEFAULT_ID: ResumeThemeId = "canvas-minimal";

export function getPdfTheme(themeId: ResumeThemeId | null): PdfThemeTokens {
  const id = themeId ?? DEFAULT_ID;
  const meta = RESUME_THEMES.find((t) => t.id === id);
  const accent = meta?.accent ?? "#0f172a";

  switch (id) {
    case "midnight-executive":
      return {
        id,
        layout: "executiveTwoColumn",
        accent,
        nameSize: 18,
        titleSize: 10,
        sectionTitleSize: 9,
        bodySize: 9,
        contactSize: 8,
        sectionGap: 8,
        headerMarginBottom: 12,
        nameRuleWidth: "full",
      };
    case "slate-professional":
      return {
        id,
        layout: "serifClassic",
        accent: "#000000",
        nameSize: 22,
        titleSize: 10,
        sectionTitleSize: 10,
        bodySize: 10,
        contactSize: 9,
        sectionGap: 10,
        headerMarginBottom: 8,
        nameRuleWidth: "full",
      };
    case "signal-accent":
      return {
        id,
        layout: "centeredMinimal",
        accent: "#171717",
        nameSize: 20,
        titleSize: 11,
        sectionTitleSize: 9,
        bodySize: 10,
        contactSize: 9,
        sectionGap: 11,
        headerMarginBottom: 14,
        nameRuleWidth: "full",
      };
    case "canvas-minimal":
    default:
      return {
        id: id === "canvas-minimal" ? id : DEFAULT_ID,
        layout: "atsCanvas",
        accent,
        nameSize: 18,
        titleSize: 11,
        sectionTitleSize: 9,
        bodySize: 10,
        contactSize: 9,
        sectionGap: 13,
        headerMarginBottom: 18,
        nameRuleWidth: 48,
      };
  }
}
