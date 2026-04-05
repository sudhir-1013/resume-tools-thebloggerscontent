import type { Metadata } from "next";
import {
  defaultDescription,
  getSiteOrigin,
  SITE_BRAND,
  SITE_NAME,
} from "@/lib/site-config";
import { ResumePreviewClient } from "./resume-preview-client";

const origin = getSiteOrigin();

export const metadata: Metadata = {
  title: "Resume PDF preview & download",
  description:
    "Preview your resume as a PDF, refine content, and download an ATS-friendly file. Free resume maker flow — no login required.",
  keywords: [
    "resume PDF download",
    "resume preview",
    "free resume PDF",
    "ATS resume PDF",
    "CV PDF export",
  ],
  authors: [{ name: SITE_BRAND, url: origin }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/resume-preview" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${origin}/resume-preview`,
    siteName: SITE_NAME,
    title: "Resume PDF preview | Resume Tools",
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Preview & download your resume PDF",
    description: defaultDescription,
  },
};

export default function ResumePreviewPage() {
  return <ResumePreviewClient />;
}
