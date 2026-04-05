import Link from "next/link";

const topics = [
  {
    title: "Resume builder",
    description:
      "Themes, export, or something not saving? Tell us which step and browser.",
    href: "/resume-maker",
    cta: "Open builder",
    icon: (
      <svg className="size-7" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-secondary"
        />
        <path
          d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-foreground-muted"
        />
      </svg>
    ),
  },
  {
    title: "ATS checker",
    description:
      "Upload issues, scores, or API errors — include your PDF size if relevant.",
    href: "/ats-checker",
    cta: "Try checker",
    icon: (
      <svg className="size-7" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M9 12l2 2 4-4M12 3a9 9 0 1 0 9 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-foreground-muted opacity-40"
        />
      </svg>
    ),
  },
  {
    title: "Partnerships",
    description:
      "Press, integrations, or collaboration — a short context helps us route faster.",
    href: "/contact#contact-form",
    cta: "Jump to form",
    icon: (
      <svg className="size-7" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
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
    title: "Privacy & data",
    description:
      "Questions about how we handle uploads or browser storage — we will point you to the right policy section.",
    href: "/legal/privacy",
    cta: "Privacy policy",
    icon: (
      <svg className="size-7" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
      </svg>
    ),
  },
] as const;

export function ContactHelpTopics() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="contact-topics-heading"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="contact-topics-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            What can we help with?
          </h2>
          <p className="mt-2 max-w-2xl text-foreground-muted">
            Pick the lane that fits your message — it helps us reply with the
            right context.
          </p>
        </div>
      </div>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {topics.map((t) => (
          <li key={t.title}>
            <article className="group flex h-full flex-col rounded-2xl border border-charcoal-border/90 bg-charcoal-elevated/35 p-6 transition-[border-color,box-shadow] hover:border-secondary/30 hover:shadow-[0_0_40px_-16px_var(--secondary-glow)]">
              <div className="flex size-12 items-center justify-center rounded-xl bg-charcoal/80 ring-1 ring-charcoal-border/80">
                {t.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {t.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
                {t.description}
              </p>
              <Link
                href={t.href}
                className="mt-4 inline-flex text-sm font-medium text-secondary transition-colors group-hover:text-secondary-hover"
              >
                {t.cta}
                <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
