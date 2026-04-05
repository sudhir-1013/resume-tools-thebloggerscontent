"use client";

import {
  useCallback,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { SITE_CONTACT_EMAIL } from "@/lib/site-config";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; message: string };

export function ContactClient() {
  const [form, setForm] = useState<FormState>(initial);
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });

  const update = useCallback(
    (key: keyof FormState) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((f) => ({ ...f, [key]: e.target.value }));
        if (submit.status === "error" || submit.status === "success") {
          setSubmit({ status: "idle" });
        }
      },
    [submit.status],
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmit({ status: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
      };
      if (!res.ok) {
        setSubmit({
          status: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
        return;
      }
      setForm(initial);
      setSubmit({ status: "success" });
    } catch {
      setSubmit({
        status: "error",
        message: "Network error. Check your connection and try again.",
      });
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-charcoal-border bg-charcoal/60 px-4 py-3 text-sm text-foreground placeholder:text-foreground-subtle outline-none transition-[border-color,box-shadow] focus:border-secondary/60 focus:ring-2 focus:ring-secondary/25 disabled:opacity-60";

  const loading = submit.status === "loading";

  return (
    <div id="contact-form" className="scroll-mt-28">
      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-2xl border border-charcoal-border/90 bg-charcoal-elevated/40 p-6 shadow-[0_0_60px_-20px_var(--primary-glow)] sm:p-8"
      >
        <div
          className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-secondary/10 blur-3xl"
          aria-hidden
        />

        <div className="relative">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Send a message
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">
            All fields are required. We never use your email for marketing.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label
                htmlFor="contact-name"
                className="text-sm text-foreground-muted"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                disabled={loading}
                value={form.name}
                onChange={update("name")}
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="contact-email"
                className="text-sm text-foreground-muted"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={loading}
                value={form.email}
                onChange={update("email")}
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="contact-subject"
                className="text-sm text-foreground-muted"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                disabled={loading}
                value={form.subject}
                onChange={update("subject")}
                className={inputClass}
                placeholder="e.g. Bug: PDF download on Safari"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="contact-message"
                className="text-sm text-foreground-muted"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                disabled={loading}
                rows={6}
                value={form.message}
                onChange={update("message")}
                className={`${inputClass} min-h-[140px] resize-y`}
                placeholder="Include steps to reproduce, browser, and what you expected to happen."
              />
            </div>
          </div>

          {submit.status === "error" ? (
            <p
              className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              role="alert"
            >
              {submit.message}
            </p>
          ) : null}

          {submit.status === "success" ? (
            <div
              className="mt-4 rounded-lg border border-secondary/35 bg-secondary/10 px-4 py-3 text-sm text-foreground"
              role="status"
            >
              <p className="font-medium text-secondary">Message sent</p>
              <p className="mt-1 text-foreground-muted">
                Thanks — we will get back to you when we can. If you need
                another note, you can send another message below.
              </p>
            </div>
          ) : null}

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white shadow-[0_0_28px_var(--primary-glow)] transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Sending…" : "Send message"}
            </button>
            <p className="text-xs text-foreground-subtle">
              Prefer email?{" "}
              <a
                href={`mailto:${SITE_CONTACT_EMAIL}`}
                className="text-secondary underline-offset-4 hover:underline"
              >
                {SITE_CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
