const items = [
  { label: "No account", sub: "Message us anytime" },
  { label: "Human inbox", sub: "We read real feedback" },
  { label: "Privacy-minded", sub: "See our policy" },
] as const;

export function ContactTrustStrip() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 rounded-2xl border border-charcoal-border/70 bg-charcoal-elevated/25 px-6 py-6 sm:grid-cols-3 sm:gap-6 sm:px-8">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`flex flex-col items-center text-center sm:items-start sm:text-left ${i > 0 ? "sm:border-l sm:border-charcoal-border/60 sm:pl-6" : ""}`}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="mt-1 text-base font-semibold text-foreground">
            {item.label}
          </span>
          <span className="mt-0.5 text-sm text-foreground-muted">{item.sub}</span>
        </div>
      ))}
    </div>
  );
}
