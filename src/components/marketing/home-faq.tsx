const faqItems = [
  {
    q: "Is this really a free resume maker with no login?",
    a: "Yes. You can choose a theme, fill in your details, preview your resume, and download without creating an account. Your draft stays in your browser on this device.",
  },
  {
    q: "Will my resume have a watermark?",
    a: "No. The tool is built for a clean, professional PDF — no branding watermark added to your file.",
  },
  {
    q: "How do I get started?",
    a: "Open the resume maker flow, pick a design, complete the guided steps, then open the preview to download your PDF.",
  },
  {
    q: "Can I check if my resume is ATS-friendly?",
    a: "Yes. Use our ATS checker to upload a PDF and get parser-minded feedback — it is a critique tool, not a guarantee for any employer system.",
  },
] as const;

export function HomeFaq() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-secondary">
          FAQ
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-sm text-foreground-muted">
          Straight answers — no fine print games.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {faqItems.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-charcoal-border/90 bg-charcoal-elevated/30 px-5 py-1 transition-colors open:border-secondary/25 open:bg-charcoal-elevated/50"
          >
            <summary className="cursor-pointer list-none py-4 text-left text-base font-medium text-foreground outline-none marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-3">
                <span>{item.q}</span>
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-charcoal/80 font-mono text-sm text-secondary transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </span>
            </summary>
            <p className="border-t border-charcoal-border/60 pb-4 pt-3 text-sm leading-relaxed text-foreground-muted">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
