import Link from "next/link";

export function AboutProductCta() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="about-product-cta-heading"
    >
      <div className="overflow-hidden rounded-2xl border border-charcoal-border/80 bg-gradient-to-br from-charcoal-elevated/90 via-charcoal-elevated/50 to-charcoal/70 p-8 sm:p-12 lg:grid lg:grid-cols-2 lg:gap-12 lg:p-14">
        <div>
          <h2
            id="about-product-cta-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            What you get today
          </h2>
          <ul className="mt-6 space-y-4 text-foreground-muted">
            <li className="flex gap-3">
              <span
                className="mt-1.5 size-2 shrink-0 rounded-full bg-secondary"
                aria-hidden
              />
              <span>
                Guided resume builder with live preview and PDF download.
              </span>
            </li>
            <li className="flex gap-3">
              <span
                className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              <span>
                Multiple professional themes you can switch without losing
                content.
              </span>
            </li>
            <li className="flex gap-3">
              <span
                className="mt-1.5 size-2 shrink-0 rounded-full bg-foreground-muted"
                aria-hidden
              />
              <span>
                ATS checker for honest, parser-first feedback on uploaded PDFs.
              </span>
            </li>
          </ul>
        </div>
        <div className="mt-10 flex flex-col justify-center gap-4 lg:mt-0">
          <div className="rounded-xl border border-charcoal-border/60 bg-charcoal/50 p-6">
            <p className="text-sm font-medium text-foreground">
              Questions or ideas?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              We read feedback from real users. If something is confusing or
              you want a feature, reach out — it shapes what we build next.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex w-fit items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_var(--primary-glow)] transition-colors hover:bg-primary-hover"
            >
              Contact us
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/resume-maker"
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-charcoal-border bg-charcoal-elevated/60 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-secondary/40 hover:text-secondary sm:flex-none"
            >
              Open resume maker
            </Link>
            <Link
              href="/ats-checker"
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-charcoal-border bg-charcoal-elevated/60 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-secondary/40 hover:text-secondary sm:flex-none"
            >
              Try ATS checker
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
