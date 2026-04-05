import type { Metadata } from "next";
import Link from "next/link";
import { ContactFaq } from "@/components/marketing/contact-faq";
import { ContactHelpTopics } from "@/components/marketing/contact-help-topics";
import { ContactHeroGraphic } from "@/components/marketing/contact-hero-graphic";
import { ContactTrustStrip } from "@/components/marketing/contact-trust-strip";
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import {
  defaultDescription,
  getSiteOrigin,
  SITE_CONTACT_EMAIL,
  SITE_NAME,
} from "@/lib/site-config";
import { ContactClient } from "./contact-client";

const origin = getSiteOrigin();

export const metadata: Metadata = {
  title: "Contact us",
  description: `Get in touch with ${SITE_NAME}: feedback, support questions, or partnerships. We read every message we can.`,
  alternates: { canonical: `${origin}/contact` },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${origin}/contact`,
    siteName: SITE_NAME,
    title: `Contact ${SITE_NAME}`,
    description: defaultDescription,
  },
};

export default function ContactPage() {
  return (
    <MarketingPageShell>
      <SiteHeader active="contact" />
      <main className="relative z-10 flex-1">
        <section className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 sm:pt-16 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
                Contact
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[2.75rem] lg:leading-tight">
                We&apos;re listening{" "}
                <span className="text-secondary">tell us what you need</span>
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-foreground-muted">
                Bugs, feature ideas, press, or a quick thank-you — every message
                helps us improve {SITE_NAME}. Use the secure form or email us
                directly.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact-form"
                  className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_var(--primary-glow)] transition-colors hover:bg-primary-hover"
                >
                  Write to us
                </a>
                <a
                  href={`mailto:${SITE_CONTACT_EMAIL}`}
                  className="inline-flex items-center rounded-lg border border-charcoal-border bg-charcoal-elevated/50 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-secondary/40 hover:text-secondary"
                >
                  Open mail app
                </a>
              </div>
            </div>
            <ContactHeroGraphic />
          </div>
        </section>

        <section className="border-y border-charcoal-border/60 bg-charcoal-elevated/20 py-12">
          <ContactTrustStrip />
        </section>

        <section className="py-16 sm:py-20">
          <ContactHelpTopics />
        </section>

        <section className="pb-16 sm:pb-20">
          <ContactFaq />
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-14 xl:gap-16">
            <aside className="flex flex-col gap-6 lg:pt-2">
              <div className="rounded-2xl border border-charcoal-border/90 bg-gradient-to-b from-charcoal-elevated/70 to-charcoal/50 p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                    <svg
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden
                    >
                      <path d="M4 6h16v12H4V6z" strokeLinejoin="round" />
                      <path d="M4 7l8 6 8-6" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
                      Direct email
                    </h2>
                    <a
                      href={`mailto:${SITE_CONTACT_EMAIL}`}
                      className="mt-2 block break-all text-base font-medium text-secondary transition-colors hover:text-secondary-hover"
                    >
                      {SITE_CONTACT_EMAIL}
                    </a>
                    <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                      Same inbox as the form — use whichever you prefer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-charcoal-border/80 p-6">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
                  Response time
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  We are a lean team. Simple questions may get a quick reply;
                  deeper requests can take a few business days. For security
                  issues, put &quot;Security&quot; in the subject line.
                </p>
              </div>

              <div className="rounded-2xl border border-dashed border-primary/35 bg-primary/5 p-6">
                <p className="text-sm text-foreground-muted">
                  <span className="font-medium text-foreground">
                    Explore the product
                  </span>
                  <span className="mt-2 block">
                    <Link
                      href="/resume-maker"
                      className="text-secondary underline-offset-4 hover:underline"
                    >
                      Resume maker
                    </Link>
                    {" · "}
                    <Link
                      href="/ats-checker"
                      className="text-secondary underline-offset-4 hover:underline"
                    >
                      ATS checker
                    </Link>
                    {" · "}
                    <Link
                      href="/legal/privacy"
                      className="text-secondary underline-offset-4 hover:underline"
                    >
                      Privacy
                    </Link>
                  </span>
                </p>
              </div>
            </aside>

            <ContactClient />
          </div>
        </section>
      </main>
      <SiteFooter />
    </MarketingPageShell>
  );
}
