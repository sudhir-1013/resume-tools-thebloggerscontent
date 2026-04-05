import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/components/marketing/legal-page-shell";
import { getSiteOrigin, SITE_CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";

const origin = getSiteOrigin();
const h2 = "text-lg font-semibold text-foreground";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description: `Terms of use for ${SITE_NAME}: acceptable use, disclaimers, and limitations.`,
  alternates: { canonical: `${origin}/legal/terms` },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms & conditions" lastUpdated="April 5, 2026">
      <section>
        <h2 className={h2}>1. Agreement to these terms</h2>
        <p className="mt-3">
          By accessing or using {SITE_NAME} (the &quot;Service&quot;) at{" "}
          {origin.replace(/^https?:\/\//, "")} and related pages, you agree to
          these Terms &amp; conditions. If you do not agree, do not use the
          Service.
        </p>
      </section>

      <section>
        <h2 className={h2}>2. The Service</h2>
        <p className="mt-3">
          {SITE_NAME} provides tools to create and preview resumes, choose
          themes, download PDFs, and use optional features such as an ATS-style
          resume checker. The Service is offered &quot;as is&quot; and may change
          or be discontinued at any time without notice.
        </p>
      </section>

      <section>
        <h2 className={h2}>3. Eligibility and acceptable use</h2>
        <p className="mt-3">
          You may use the Service only in compliance with applicable laws. You
          agree not to misuse the Service, including attempting to disrupt
          servers, scrape the Service in a way that harms performance, upload
          unlawful content, or use the Service to harass others. You are
          responsible for the accuracy and legality of content you enter or
          upload.
        </p>
      </section>

      <section>
        <h2 className={h2}>4. Your content</h2>
        <p className="mt-3">
          You retain rights to your resume content and materials. By using the
          Service, you grant us only the limited rights necessary to operate
          the Service (for example, processing files you upload for the ATS
          checker on our servers for that request). We do not claim ownership of
          your resume.
        </p>
      </section>

      <section>
        <h2 className={h2}>5. Third-party services and AI</h2>
        <p className="mt-3">
          Some features may rely on third-party APIs or models (for example,
          analysis of resume text). Those providers operate under their own
          terms. Output from automated tools is informational only and not
          professional, legal, or career advice.
        </p>
      </section>

      <section>
        <h2 className={h2}>6. Disclaimers</h2>
        <p className="mt-3">
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
          WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
          NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT ANY RESUME WILL PASS AN
          EMPLOYER&apos;S APPLICANT TRACKING SYSTEM OR RESULT IN AN INTERVIEW OR
          JOB OFFER.
        </p>
      </section>

      <section>
        <h2 className={h2}>7. Limitation of liability</h2>
        <p className="mt-3">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE AND OUR AFFILIATES WILL NOT
          BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
          PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING
          FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY FOR ANY CLAIM
          RELATING TO THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE
          AMOUNT YOU PAID US IN THE TWELVE MONTHS BEFORE THE CLAIM (IF ANY) OR
          (B) ZERO US DOLLARS, SINCE THE SERVICE IS OFFERED FREE OF CHARGE.
        </p>
      </section>

      <section>
        <h2 className={h2}>8. Indemnity</h2>
        <p className="mt-3">
          You agree to defend and indemnify us against claims arising from your
          content, your misuse of the Service, or your violation of these terms,
          to the extent permitted by law.
        </p>
      </section>

      <section>
        <h2 className={h2}>9. Changes</h2>
        <p className="mt-3">
          We may update these terms from time to time. We will post the revised
          date at the top of this page. Continued use after changes constitutes
          acceptance of the updated terms.
        </p>
      </section>

      <section>
        <h2 className={h2}>10. Contact</h2>
        <p className="mt-3">
          Questions about these terms:{" "}
          <Link
            href="/contact"
            className="text-secondary underline-offset-4 hover:underline"
          >
            Contact us
          </Link>{" "}
          or email{" "}
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
