import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Pick your theme",
    body: "Compare professional layouts side by side and choose the one that matches your field.",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zM9 9h6M9 13h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-secondary"
        />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Complete guided steps",
    body: "Fill contact, summary, roles, skills, and education with concise prompts.",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Preview & download",
    body: "Open the PDF preview, fine-tune wording, then download. No watermark.",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 15V3m0 12l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
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

export function HomeProcess() {
  return (
    <section
      id="process"
      className="border-y border-charcoal-border bg-charcoal-elevated/25 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-secondary">
            Simple flow
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Select a theme, add details, export when ready
          </h2>
          <p className="mt-4 leading-relaxed text-foreground-muted">
            The fastest path from blank document to a resume you can send today
            — optimized for clarity and scanner-friendly structure.
          </p>
        </div>

        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute left-0 right-0 top-10 z-0 hidden h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent md:block"
            aria-hidden
          />
          <ol className="relative z-[1] grid list-none gap-6 p-0 md:grid-cols-3">
          {steps.map((item) => (
            <li
              key={item.step}
              className="relative rounded-2xl border border-charcoal-border/90 bg-gradient-to-b from-charcoal/70 to-charcoal-elevated/40 p-6 pt-14 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-[border-color,box-shadow] hover:border-primary/35 hover:shadow-[0_0_40px_-18px_var(--primary-glow)]"
            >
              <span className="absolute left-6 top-5 font-mono text-2xl font-bold text-primary/90">
                {item.step}
              </span>
              <div className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-lg bg-charcoal/80 ring-1 ring-charcoal-border/70">
                {item.icon}
              </div>
              <h3 className="pr-12 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {item.body}
              </p>
            </li>
          ))}
          </ol>
        </div>

        <p className="mt-10 text-center text-sm text-foreground-muted">
          <Link
            href="/theme-selection"
            className="font-medium text-secondary underline-offset-4 hover:underline"
          >
            Browse all themes
          </Link>
          <span className="mx-2 text-foreground-subtle" aria-hidden>
            ·
          </span>
          <Link
            href="/resume-maker"
            className="font-medium text-secondary underline-offset-4 hover:underline"
          >
            Resume maker overview
          </Link>
        </p>
      </div>
    </section>
  );
}
