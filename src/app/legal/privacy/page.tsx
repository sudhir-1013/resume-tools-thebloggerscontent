import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/components/marketing/legal-page-shell";
import { getSiteOrigin, SITE_CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";

const origin = getSiteOrigin();
const h2 = "text-lg font-semibold text-foreground";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${SITE_NAME} handles information when you use our resume builder and related tools.`,
  alternates: { canonical: `${origin}/legal/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy policy" lastUpdated="April 5, 2026">
      <section>
        <h2 className={h2}>1. Overview</h2>
        <p className="mt-3">
          This policy describes how {SITE_NAME} (&quot;we&quot;, &quot;us&quot;)
          collects, uses, and shares information when you visit{" "}
          {origin.replace(/^https?:\/\//, "")} and use our tools. By using the
          Service, you agree to this policy alongside our{" "}
          <Link
            href="/legal/terms"
            className="text-secondary underline-offset-4 hover:underline"
          >
            Terms &amp; conditions
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className={h2}>2. Information we collect</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Information you provide.</strong>{" "}
            Text and data you type into the resume builder (stored locally in
            your browser for your session unless you clear it). Information you
            send when contacting us (such as name, email address, and message
            content).
          </li>
          <li>
            <strong className="text-foreground">Uploads.</strong> If you use the
            ATS checker or similar features, you may upload a file (for example,
            a PDF). Processing may occur on our servers for that request.
          </li>
          <li>
            <strong className="text-foreground">Technical data.</strong> Like
            many sites, we may receive standard server and analytics data such
            as IP address, browser type, device type, pages visited, and
            timestamps. Exact tools depend on how we deploy the site.
          </li>
        </ul>
      </section>

      <section>
        <h2 className={h2}>3. How we use information</h2>
        <p className="mt-3">
          We use information to operate and improve the Service, respond to
          inquiries, fix bugs, monitor security and abuse, and understand
          aggregate usage. Automated features may send portions of text to
          third-party AI or processing services solely to generate the output
          you requested (for example, ATS feedback).
        </p>
      </section>

      <section>
        <h2 className={h2}>4. Storage in your browser</h2>
        <p className="mt-3">
          The resume builder may use browser storage (such as localStorage or
          sessionStorage) so your draft persists while you work. This data stays
          on your device unless you clear it. Do not use shared devices for
          sensitive personal data if you are concerned about local access.
        </p>
      </section>

      <section>
        <h2 className={h2}>5. Retention</h2>
        <p className="mt-3">
          Contact emails are retained only as long as needed to respond or meet
          legal obligations. ATS or upload processing is intended to be
          ephemeral for each request; we do not use your resume to build a
          marketing profile. Retention details may vary by deployment; contact
          us if you need specifics for your organization.
        </p>
      </section>

      <section>
        <h2 className={h2}>6. Sharing</h2>
        <p className="mt-3">
          We do not sell your personal information. We may share data with
          service providers who help us host or operate the site (for example,
          hosting or AI APIs), when required by law, or to protect rights and
          safety. Those providers are expected to use data only as instructed.
        </p>
      </section>

      <section>
        <h2 className={h2}>7. Cookies</h2>
        <p className="mt-3">
          We may use cookies or similar technologies for essential site
          function, preferences, or analytics. You can control cookies through
          your browser settings.
        </p>
      </section>

      <section>
        <h2 className={h2}>8. Security</h2>
        <p className="mt-3">
          We take reasonable measures to protect information, but no method of
          transmission or storage is 100% secure. Use the Service at your own
          risk for highly sensitive data.
        </p>
      </section>

      <section>
        <h2 className={h2}>9. Children</h2>
        <p className="mt-3">
          The Service is not directed to children under 13, and we do not
          knowingly collect personal information from them. If you believe we
          have, please contact us so we can delete it.
        </p>
      </section>

      <section>
        <h2 className={h2}>10. International users</h2>
        <p className="mt-3">
          If you access the Service from outside the country where our servers
          operate, your information may be transferred and processed there,
          which may have different data protection laws.
        </p>
      </section>

      <section>
        <h2 className={h2}>11. Your rights</h2>
        <p className="mt-3">
          Depending on where you live, you may have rights to access, correct,
          or delete personal data we hold, or to object to certain processing.
          Contact us to make a request. We may need to verify your identity.
        </p>
      </section>

      <section>
        <h2 className={h2}>12. Changes</h2>
        <p className="mt-3">
          We may update this policy from time to time. The &quot;Last
          updated&quot; date above will change when we do. Please review
          periodically.
        </p>
      </section>

      <section>
        <h2 className={h2}>13. Contact</h2>
        <p className="mt-3">
          Privacy questions:{" "}
          <Link
            href="/contact"
            className="text-secondary underline-offset-4 hover:underline"
          >
            Contact us
          </Link>{" "}
          or{" "}
          <a
            href={`mailto:${SITE_CONTACT_EMAIL}`}
            className="text-secondary underline-offset-4 hover:underline"
          >
            {SITE_CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
