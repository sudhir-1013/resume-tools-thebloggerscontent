import Link from "next/link";

const features = [
  {
    title: "Resume creation",
    mono: "builder_v1",
    description:
      "Structured flows and smart sections so you go from blank page to polished document fast.",
  },
  {
    title: "Themes & layouts",
    mono: "theme.select()",
    description:
      "Pick from multiple modern designs and color themes — switch anytime without losing content.",
  },
  {
    title: "ATS checker",
    mono: "parse_score",
    description:
      "See how your resume reads to parsers and tighten wording, structure, and keywords.",
  },
  {
    title: "Resume editing",
    mono: "edit.inline",
    description:
      "Refine bullets, reorder sections, and tune tone with tools built for real job searches.",
  },
] as const;

const pillars = [
  { label: "Pricing", value: "$0 forever" },
  { label: "Account", value: "Not required" },
  { label: "Subscription", value: "None" },
] as const;

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-background">
      {/* Ambient grid + glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -top-40 left-1/2 h-[520px] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-primary-glow blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-0 right-[-20%] h-[380px] w-[min(70vw,480px)] rounded-full bg-secondary-glow blur-[100px]"
        aria-hidden
      />

      <header className="relative z-10 border-b border-charcoal-border/80 bg-charcoal/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
              Resume Tools
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary sm:text-xs">
              thebloggerscontent
            </span>
          </Link>
          <nav
            className="flex items-center gap-3 sm:gap-6"
            aria-label="Primary"
          >
            <Link
              href="#features"
              className="hidden text-sm text-foreground-muted transition-colors hover:text-secondary sm:inline"
            >
              Features
            </Link>
            <Link
              href="#process"
              className="hidden text-sm text-foreground-muted transition-colors hover:text-secondary md:inline"
            >
              How it works
            </Link>
            <Link
              href="/theme-selection"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-[0_0_24px_var(--primary-glow)] transition-colors hover:bg-primary-hover"
            >
              Start free
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        {/* Hero */}
        <section
          id="start"
          className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24"
        >
          <div className="max-w-3xl">
            <p className="font-mono text-xs text-secondary sm:text-sm">
              <span className="text-foreground-subtle">{"// "}</span>
              status: open_access · no_auth_required
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Build a resume that{" "}
              <span className="bg-gradient-to-r from-primary-hover via-secondary to-primary bg-clip-text text-transparent">
                actually gets read
              </span>
              .
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
              Totally free resume creation — choose from multiple designs and
              themes, tune for ATS, and export when you are ready.{" "}
              <strong className="font-medium text-foreground">
                No login. No subscription.
              </strong>{" "}
              Just the tools you need to stand out.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/theme-selection"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-secondary px-8 text-sm font-semibold text-charcoal shadow-[0_0_32px_var(--secondary-glow)] transition-colors hover:bg-secondary-hover"
              >
                Create your resume
              </Link>
              <Link
                href="#process"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-charcoal-border bg-charcoal-elevated/50 px-8 text-sm font-medium text-foreground transition-colors hover:border-secondary/50 hover:text-secondary"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* Spec strip */}
          <div className="grid gap-4 sm:grid-cols-3">
            {pillars.map((p) => (
              <div
                key={p.label}
                className="rounded-xl border border-charcoal-border bg-charcoal-elevated/40 px-5 py-4 backdrop-blur-sm"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">
                  {p.label}
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground">
                  {p.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section
          id="process"
          className="border-y border-charcoal-border bg-charcoal-elevated/30 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="font-mono text-xs text-secondary sm:text-sm">
                workflow.init()
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                From idea to file in minutes
              </h2>
              <p className="mt-4 text-foreground-muted">
                Pick a path, stay in flow, and ship a resume you are proud to
                send — without friction or paywalls.
              </p>
            </div>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Choose a design",
                  body: "Select a layout and theme that fits your industry and personality.",
                },
                {
                  step: "02",
                  title: "Fill your story",
                  body: "Add experience, skills, and education with guided prompts.",
                },
                {
                  step: "03",
                  title: "Check & export",
                  body: "Run the ATS check, polish with editing tools, download when ready.",
                },
              ].map((item) => (
                <li
                  key={item.step}
                  className="relative rounded-2xl border border-charcoal-border bg-charcoal/60 p-6 pt-12"
                >
                  <span className="font-mono absolute left-6 top-6 text-2xl font-bold text-primary">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs text-secondary sm:text-sm">
                toolkit.manifest
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Everything in one place
              </h2>
            </div>
            <p className="max-w-md text-sm text-foreground-muted md:text-right">
              Professional output, cutting-edge UX — built for speed and
              clarity, not upsells.
            </p>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <li
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-elevated/40 p-6 transition-colors hover:border-secondary/40"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-glow opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
                <p className="font-mono text-[11px] text-secondary">
                  {f.mono}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {f.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA band */}
        <section className="mt-auto border-t border-charcoal-border bg-gradient-to-br from-primary-muted/40 via-charcoal-elevated/80 to-charcoal py-16">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <p className="font-mono text-xs text-secondary sm:text-sm">
              ready_state = true
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
              Your next role starts with a stronger resume
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-foreground-muted">
              Jump in free — no account wall, no trial countdown. Build, check,
              refine, repeat.
            </p>
            <Link
              href="/theme-selection"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-secondary px-10 text-sm font-semibold text-charcoal shadow-[0_0_40px_var(--secondary-glow)] transition-colors hover:bg-secondary-hover"
            >
              Open Resume Tools
            </Link>
          </div>
        </section>

        <footer className="border-t border-charcoal-border py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
            <p className="text-center text-sm text-foreground-muted sm:text-left">
              <span className="font-medium text-foreground">Resume Tools</span>
              <span className="text-foreground-subtle"> — by </span>
              <span className="font-mono text-secondary">thebloggerscontent</span>
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
              © {new Date().getFullYear()} · Free forever
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
