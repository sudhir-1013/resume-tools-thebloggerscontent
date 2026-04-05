import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview & PDF | Resume Tools",
  description:
    "Edit your resume with live PDF preview and download an ATS-friendly PDF.",
};

export default function ResumePreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
