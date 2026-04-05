import type { ReactNode } from "react";
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

type LegalPageShellProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalPageShell({
  title,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <MarketingPageShell>
      <SiteHeader />
      <main className="relative z-10 flex-1">
        <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-secondary">
            Legal
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-foreground-subtle">
            Last updated: {lastUpdated}
          </p>
          <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground-muted sm:text-base">
            {children}
          </div>
        </article>
      </main>
      <SiteFooter />
    </MarketingPageShell>
  );
}
