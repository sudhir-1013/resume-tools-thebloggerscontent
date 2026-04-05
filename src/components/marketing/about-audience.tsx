import Link from "next/link";

const audiences = [
  {
    title: "Job seekers in a hurry",
    body: "You need a polished PDF tonight — not a two-week onboarding flow. We bias toward defaults that look professional out of the box.",
    href: "/resume-maker",
    link: "Build a resume",
  },
  {
    title: "Career switchers",
    body: "Your story does not fit a single job title. Our sections flex for summaries, projects, and skills that span industries.",
    href: "/theme-selection",
    link: "Browse themes",
  },
  {
    title: "Detail obsessives",
    body: "If you want parser reality checks before you hit submit, the ATS checker is there to stress-test wording and structure.",
    href: "/ats-checker",
    link: "Run ATS check",
  },
] as const;

export function AboutAudience() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="about-audience-heading"
    >
      <h2
        id="about-audience-heading"
        className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
      >
        Built for real people
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-foreground-muted">
        Different paths, same bar: a resume you are not embarrassed to send.
      </p>
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {audiences.map((a) => (
          <li key={a.title}>
            <article className="flex h-full flex-col rounded-2xl border border-charcoal-border/90 bg-gradient-to-b from-charcoal-elevated/50 to-charcoal/40 p-7 transition-[border-color,box-shadow] hover:border-primary/35 hover:shadow-[0_0_40px_-18px_var(--primary-glow)]">
              <h3 className="text-lg font-semibold text-foreground">{a.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">
                {a.body}
              </p>
              <Link
                href={a.href}
                className="mt-6 inline-flex text-sm font-medium text-secondary transition-colors hover:text-secondary-hover"
              >
                {a.link}
                <span className="ml-1" aria-hidden>
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
