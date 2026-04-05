"use client";

import dynamic from "next/dynamic";

const ResumePreviewWorkspace = dynamic(
  () =>
    import("@/components/resume-preview-workspace").then(
      (m) => m.ResumePreviewWorkspace,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[50vh] items-center justify-center bg-background text-sm text-foreground-muted">
        Loading PDF preview…
      </div>
    ),
  },
);

export default function ResumePreviewPage() {
  return <ResumePreviewWorkspace />;
}
