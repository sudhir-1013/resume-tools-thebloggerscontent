import Link from "next/link";
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export default function NotFound() {
  return (
    <MarketingPageShell>
      <SiteHeader />
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute left-[8%] top-24 size-24 rounded-full border border-secondary/20 bg-primary/10 blur-[2px] nf-drift-slow" />
        <div className="pointer-events-none absolute right-[10%] top-40 size-32 rounded-full border border-primary/25 bg-secondary/5 nf-drift-delay" />
        <div className="pointer-events-none absolute bottom-32 left-1/4 size-16 rounded-full bg-secondary/10 blur-sm nf-float" />

        <div className="relative mx-auto max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-secondary">
            Error 404
          </p>
          <div className="relative inline-block">
            <span
              className="nf-pulse-ring relative block select-none text-[clamp(4.5rem,18vw,10rem)] font-bold leading-none tracking-tight nf-text-shimmer"
              aria-hidden
            >
              404
            </span>
          </div>
          <h1 className="mt-6 text-2xl font-semibold text-foreground sm:text-3xl">
            This page is not on the map
          </h1>
          <p className="mx-auto mt-4 max-w-md text-pretty text-base text-foreground-muted">
            The link may be broken or the page moved. Head back to the resume
            tools and keep building something recruiters will actually open.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/"
              className="inline-flex min-w-[200px] items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white shadow-[0_0_28px_var(--primary-glow)] transition-colors hover:bg-primary-hover"
            >
              Back to home
            </Link>
            <Link
              href="/resume-maker"
              className="inline-flex min-w-[200px] items-center justify-center rounded-lg border border-charcoal-border bg-charcoal-elevated/80 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-secondary/40 hover:text-secondary"
            >
              Open resume maker
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </MarketingPageShell>
  );
}
