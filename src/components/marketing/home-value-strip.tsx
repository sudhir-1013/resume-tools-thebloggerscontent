const values = [
  {
    label: "Cost",
    value: "Free",
    hint: "No paywall on export",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-secondary"
        />
      </svg>
    ),
  },
  {
    label: "Account",
    value: "Not required",
    hint: "Start in one click",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle
          cx="12"
          cy="8"
          r="4"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary"
        />
        <path
          d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-primary"
        />
      </svg>
    ),
  },
  {
    label: "Watermark",
    value: "None",
    hint: "Clean professional PDF",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M9 12l2 2 4-4M12 3a9 9 0 1 0 9 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-secondary"
        />
      </svg>
    ),
  },
  {
    label: "ATS tools",
    value: "Included",
    hint: "Checker + friendly structure",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 6h16v12H4V6zM8 10h8M8 14h5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-primary"
        />
      </svg>
    ),
  },
] as const;

export function HomeValueStrip() {
  return (
    <div className="mx-auto mt-14 grid w-full max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {values.map((v) => (
        <div
          key={v.label}
          className="group flex gap-4 rounded-2xl border border-charcoal-border/90 bg-charcoal-elevated/50 p-5 transition-[border-color,box-shadow] hover:border-secondary/30 hover:shadow-[0_0_36px_-14px_var(--secondary-glow)]"
        >
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-charcoal/80 ring-1 ring-charcoal-border/80 transition-colors group-hover:ring-secondary/25">
            {v.icon}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-secondary">
              {v.label}
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">{v.value}</p>
            <p className="mt-0.5 text-xs text-foreground-muted">{v.hint}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
