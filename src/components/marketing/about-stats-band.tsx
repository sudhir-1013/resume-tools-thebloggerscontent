const stats = [
  {
    value: "$0",
    label: "Forever free core",
    hint: "No paywall on export",
  },
  {
    value: "0",
    label: "Accounts required",
    hint: "Start in one click",
  },
  {
    value: "∞",
    label: "Theme switches",
    hint: "Keep your content",
  },
  {
    value: "PDF",
    label: "True preview",
    hint: "What you see ships",
  },
] as const;

export function AboutStatsBand() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col items-center justify-center rounded-2xl border border-charcoal-border/80 bg-charcoal-elevated/45 px-3 py-7 text-center sm:py-8"
        >
          <span className="font-mono text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
            {s.value}
          </span>
          <span className="mt-2 text-sm font-semibold text-foreground">
            {s.label}
          </span>
          <span className="mt-1 max-w-[11rem] text-xs text-foreground-muted">
            {s.hint}
          </span>
        </div>
      ))}
    </div>
  );
}
