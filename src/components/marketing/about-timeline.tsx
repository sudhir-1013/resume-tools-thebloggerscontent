import { SITE_NAME } from "@/lib/site-config";

const milestones = [
  {
    phase: "01",
    title: "Clarity first",
    body: "We started with one question: can someone finish a credible resume tonight — without signing up for anything?",
  },
  {
    phase: "02",
    title: "Themes that behave",
    body: "Layouts had to survive real content: long titles, many bullets, and career switches — not just demo copy.",
  },
  {
    phase: "03",
    title: "Honest ATS signal",
    body: "The checker adds blunt, parser-first feedback so you know where text and structure might break down — not magic guarantees.",
  },
  {
    phase: "04",
    title: "Still iterating",
    body: "Your messages decide what ships next: better guidance, new themes, and tighter accessibility are always on the table.",
  },
] as const;

export function AboutTimeline() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="about-timeline-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="about-timeline-heading"
          className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          How we got here
        </h2>
        <p className="mt-3 text-foreground-muted">
          A short story of priorities — not a corporate timeline, just the
          sequence that shaped {SITE_NAME}.
        </p>
      </div>
      <div className="relative mx-auto mt-14 max-w-2xl">
        <div
          className="absolute left-[1.125rem] top-4 bottom-8 w-px bg-gradient-to-b from-secondary/50 via-primary/35 to-transparent"
          aria-hidden
        />
        <ol className="relative list-none p-0">
        {milestones.map((m, i) => (
          <li
            key={m.phase}
            className={`relative flex gap-5 ${i < milestones.length - 1 ? "pb-12" : ""}`}
          >
            <span
              className="relative z-[1] flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-charcoal-border bg-charcoal-elevated font-mono text-[10px] font-bold text-secondary shadow-[0_0_20px_var(--secondary-glow)]"
            >
              {m.phase}
            </span>
            <div className="min-w-0 pt-0.5">
              <h3 className="text-lg font-semibold text-foreground">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {m.body}
              </p>
            </div>
          </li>
        ))}
        </ol>
      </div>
    </section>
  );
}
