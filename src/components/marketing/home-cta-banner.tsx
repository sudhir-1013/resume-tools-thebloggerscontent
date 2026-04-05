import Image from "next/image";
import Link from "next/link";

export function HomeCtaBanner() {
  return (
    <section className="mt-auto border-t border-charcoal-border">
      <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-gradient-to-br from-primary-muted/40 via-charcoal-elevated/90 to-charcoal px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-secondary">
            Get started
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
            Ready to try the free resume maker?
          </h2>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-foreground-muted">
            Jump in with no login — pick a theme, add your details, and open the
            live PDF preview when you are ready to download.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/theme-selection"
              className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-lg bg-secondary px-10 text-sm font-semibold text-charcoal shadow-[0_0_40px_var(--secondary-glow)] transition-colors hover:bg-secondary-hover"
            >
              Start building
            </Link>
            <Link
              href="/resume-maker"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-charcoal-border/80 px-8 text-sm font-medium text-foreground transition-colors hover:border-secondary/45 hover:text-secondary"
            >
              Resume maker
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link
              href="/about"
              className="text-foreground-muted underline-offset-4 transition-colors hover:text-secondary hover:underline"
            >
              About us
            </Link>
            <Link
              href="/contact"
              className="text-foreground-muted underline-offset-4 transition-colors hover:text-secondary hover:underline"
            >
              Contact
            </Link>
            <Link
              href="/ats-checker"
              className="text-foreground-muted underline-offset-4 transition-colors hover:text-secondary hover:underline"
            >
              ATS checker
            </Link>
          </div>
        </div>
        <div className="relative min-h-[240px] border-t border-charcoal-border lg:min-h-[420px] lg:border-l lg:border-t-0">
          <Image
            src="/home/cta.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent lg:bg-gradient-to-l"
            aria-hidden
          />
          <p className="absolute bottom-6 left-6 right-6 font-mono text-[10px] uppercase tracking-widest text-secondary/90 lg:left-10 lg:right-10">
            Themes · Preview · PDF
          </p>
        </div>
      </div>
    </section>
  );
}
