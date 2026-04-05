const pillars = [
  {
    title: "Built for speed",
    body: "We stripped away accounts, paywalls, and clutter so you can go from blank page to downloadable PDF in one sitting.",
    accent: "from-primary/25 to-transparent",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-secondary"
        />
      </svg>
    ),
  },
  {
    title: "Recruiter-minded layout",
    body: "Themes emphasize clear hierarchy, readable type, and sections parsers expect — without sacrificing personality.",
    accent: "from-secondary/20 to-transparent",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 6h16M4 12h10M4 18h14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-primary"
        />
      </svg>
    ),
  },
  {
    title: "Your data stays yours",
    body: "Resume content lives in your browser session for the builder. We do not sell profiles or require sign-up to export.",
    accent: "from-primary-muted/30 to-transparent",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-secondary"
        />
      </svg>
    ),
  },
] as const;

export function AboutPillars() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="about-pillars-heading"
    >
      <h2
        id="about-pillars-heading"
        className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
      >
        What we optimize for
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-foreground-muted">
        Three principles that guide every screen we ship — from theme pixels to
        ATS feedback copy.
      </p>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {pillars.map((p) => (
          <article
            key={p.title}
            className="group relative overflow-hidden rounded-2xl border border-charcoal-border/90 bg-charcoal-elevated/50 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-[border-color,box-shadow] hover:border-secondary/35 hover:shadow-[0_0_48px_-12px_var(--secondary-glow)]"
          >
            <div
              className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${p.accent} blur-2xl`}
              aria-hidden
            />
            <div className="relative flex size-12 items-center justify-center rounded-xl bg-charcoal/80 ring-1 ring-charcoal-border/80">
              {p.icon}
            </div>
            <h3 className="relative mt-5 text-xl font-semibold tracking-tight text-foreground">
              {p.title}
            </h3>
            <p className="relative mt-3 text-sm leading-relaxed text-foreground-muted">
              {p.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
