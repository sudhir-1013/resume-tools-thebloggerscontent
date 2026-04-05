import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choose a theme | Resume Tools",
  description:
    "Pick a professional resume layout. Your choice is saved on this device for the builder.",
};

export default function ThemeSelectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
