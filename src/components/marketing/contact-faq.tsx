const faqs = [
  {
    q: "Do I need an account to contact you?",
    a: "No. Use the form below or email us directly. The resume builder itself also works without sign-up.",
  },
  {
    q: "Will you store my resume if I contact you?",
    a: "Support messages are separate from the builder. Do not attach sensitive files unless we ask. See our privacy policy for how we handle form data and optional ATS uploads.",
  },
  {
    q: "How fast will you reply?",
    a: "We are a small team. Many notes get a reply within a few business days; complex issues can take longer. Urgent security issues — please put “Security” in the subject line.",
  },
  {
    q: "Can you rewrite my resume for me?",
    a: "We cannot provide one-on-one career coaching or full rewrites via this channel. Use the resume maker and ATS checker for self-serve help, and consider a career coach for personalized advice.",
  },
] as const;

export function ContactFaq() {
  return (
    <section
      className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="contact-faq-heading"
    >
      <h2
        id="contact-faq-heading"
        className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
      >
        Before you write
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-center text-sm text-foreground-muted">
        Quick answers to common questions — your note might already be covered.
      </p>
      <div className="mt-10 space-y-3">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-charcoal-border/90 bg-charcoal-elevated/30 px-5 py-1 transition-colors open:border-secondary/25 open:bg-charcoal-elevated/50"
          >
            <summary className="cursor-pointer list-none py-4 font-medium text-foreground outline-none marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-3">
                <span>{item.q}</span>
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-charcoal/80 text-secondary transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </span>
            </summary>
            <p className="border-t border-charcoal-border/60 pb-4 pt-3 text-sm leading-relaxed text-foreground-muted">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
