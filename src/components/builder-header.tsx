import Link from "next/link";

type BuilderHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function BuilderHeader({ eyebrow, title, subtitle }: BuilderHeaderProps) {
  return (
    <header className="relative z-10 border-b border-charcoal-border/80 bg-charcoal/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-baseline gap-2">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Resume Tools
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-secondary sm:text-[10px]">
            thebloggerscontent
          </span>
        </Link>
        <div className="min-w-0 flex-1 text-right sm:text-center">
          {eyebrow ? (
            <p className="font-mono text-[10px] text-secondary sm:text-xs">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="truncate text-sm font-semibold text-foreground sm:text-base">
            {title}
          </h1>
          {subtitle ? (
            <p className="hidden truncate text-xs text-foreground-muted sm:block">
              {subtitle}
            </p>
          ) : null}
        </div>
        <div className="hidden w-[120px] shrink-0 sm:block" aria-hidden />
      </div>
    </header>
  );
}
