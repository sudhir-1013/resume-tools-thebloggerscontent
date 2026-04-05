import type { Metadata } from "next";
import { ResumeWizard } from "@/components/resume-wizard";
import {
  defaultDescription,
  getSiteOrigin,
  SITE_BRAND,
  SITE_NAME,
} from "@/lib/site-config";

const origin = getSiteOrigin();

export const metadata: Metadata = {
  title: "Guided resume builder",
  description:
    "Fill in your resume step by step with autosave in your browser. Free resume maker — no account, no watermark on export.",
  keywords: [
    "resume builder",
    "create resume online",
    "resume form",
    "free resume editor",
    "CV builder online",
    "work experience resume",
  ],
  authors: [{ name: SITE_BRAND, url: origin }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/resume-creation" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${origin}/resume-creation`,
    siteName: SITE_NAME,
    title: "Resume builder | Resume Tools",
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Build your resume — guided steps",
    description: defaultDescription,
  },
};

export default function ResumeCreationPage() {
  return <ResumeWizard />;
}
