import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MAX = { name: 120, email: 254, subject: 200, message: 8000 } as const;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function oneLine(s: string, max: number): string {
  return s.trim().replace(/[\r\n]+/g, " ").slice(0, max);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    const name = typeof body.name === "string" ? body.name : "";
    const email = typeof body.email === "string" ? body.email : "";
    const subject = typeof body.subject === "string" ? body.subject : "";
    const message = typeof body.message === "string" ? body.message : "";

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (
      name.length > MAX.name ||
      email.length > MAX.email ||
      subject.length > MAX.subject ||
      message.length > MAX.message
    ) {
      return NextResponse.json(
        { error: "One or more fields are too long" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.trim();
    const toAddress =
      process.env.CONTACT_TO_EMAIL?.trim() ||
      "thebloggerscontentofficial@gmail.com";

    if (!emailUser || !emailPass) {
      return NextResponse.json(
        {
          error:
            "Contact form is not configured on this server. Please email us directly.",
        },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const safeName = escapeHtml(oneLine(name, MAX.name));
    const safeEmail = escapeHtml(email.trim().slice(0, MAX.email));
    const safeSubject = escapeHtml(oneLine(subject, MAX.subject));
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    const replyName = oneLine(name, MAX.name).replace(/["<>]/g, "") || "Visitor";
    const replyTo = `"${replyName}" <${email.trim()}>`;

    const mailOptions = {
      from: `"Resume Tools" <${emailUser}>`,
      replyTo,
      to: toAddress,
      subject: `[Contact] ${oneLine(subject, MAX.subject)}`,
      html: `
  <div style="margin:0;padding:0;background:#f6f8fb;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;border:1px solid #e6e8ec;overflow:hidden;">
            <tr>
              <td align="center" style="padding:30px 20px;background:linear-gradient(135deg,#111827,#1f2937);color:#ffffff;">
                <h1 style="margin:0;font-size:22px;font-weight:600;">
                  New Contact Message
                </h1>
                <p style="margin:6px 0 0;font-size:13px;color:#cbd5e1;">
                  from ${safeName} (${safeEmail})
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 28px;color:#374151;">
                <p><strong>Subject:</strong> ${safeSubject}</p>
                <hr style="margin:20px 0" />
                <p>${safeMessage}</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:20px;background:#f9fafb;border-top:1px solid #e5e7eb;">
                <p style="margin:0;font-size:12px;color:#9ca3af;">
                  © ${new Date().getFullYear()} The Bloggers Content. All rights reserved.
                </p>
                <p style="margin-top:6px;font-size:12px;color:#9ca3af;">
                  Reply directly to this email to reach the sender.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: "Failed to send email",
        ...(isDev && { details: (error as Error).message }),
      },
      { status: 500 },
    );
  }
}
