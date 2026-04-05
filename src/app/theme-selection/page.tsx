import type { Metadata } from "next";
import {
  defaultDescription,
  getSiteOrigin,
  SITE_BRAND,
  SITE_NAME,
} from "@/lib/site-config";
import { ThemeSelectionClient } from "./theme-selection-client";

const origin = getSiteOrigin();

export const metadata: Metadata = {
  title: "Choose your resume theme",
  description:
    "Pick a professional resume layout and color theme for your free resume. Your choice is saved locally — continue to the guided builder with no login.",
  keywords: [
    "resume theme",
    "resume layout",
    "free resume templates",
    "ATS resume layout",
    "resume design online",
  ],
  authors: [{ name: SITE_BRAND, url: origin }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/theme-selection" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${origin}/theme-selection`,
    siteName: SITE_NAME,
    title: "Choose a resume theme | Resume Tools",
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Choose your resume design — Resume Tools",
    description: defaultDescription,
  },
};

export default function ThemeSelectionPage() {
  return <ThemeSelectionClient />;
}
