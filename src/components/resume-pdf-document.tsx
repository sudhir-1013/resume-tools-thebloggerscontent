import { Document } from "@react-pdf/renderer";
import type { ResumeDraft } from "@/lib/resume-draft";
import { AtsCanvasPage } from "@/components/resume-pdf/ats-canvas-page";
import { CenteredMinimalPage } from "@/components/resume-pdf/centered-minimal-page";
import { ExecutiveTwoColumnPage } from "@/components/resume-pdf/executive-two-column-page";
import { SerifClassicPage } from "@/components/resume-pdf/serif-classic-page";
import { getPdfTheme } from "@/lib/resume-pdf/theme-tokens";

type ResumePdfDocumentProps = {
  draft: ResumeDraft;
};

export function ResumePdfDocument({ draft }: ResumePdfDocumentProps) {
  const contact = draft.contact;
  const t = getPdfTheme(draft.themeId);

  const page =
    t.layout === "atsCanvas" ? (
      <AtsCanvasPage draft={draft} t={t} />
    ) : t.layout === "executiveTwoColumn" ? (
      <ExecutiveTwoColumnPage draft={draft} />
    ) : t.layout === "serifClassic" ? (
      <SerifClassicPage draft={draft} />
    ) : (
      <CenteredMinimalPage draft={draft} />
    );

  return (
    <Document
      title={`${contact.fullName.trim() || "Resume"} — Resume`}
      author={contact.fullName.trim() || "Resume"}
      subject="Resume"
      keywords="resume, cv, ATS"
    >
      {page}
    </Document>
  );
}
