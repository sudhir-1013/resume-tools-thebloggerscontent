import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume builder | Resume Tools",
  description:
    "Step-by-step resume creation with autosave in your browser. No account required.",
};

export default function ResumeCreationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
