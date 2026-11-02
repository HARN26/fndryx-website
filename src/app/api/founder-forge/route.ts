import { NextResponse } from "next/server";
import { Resend } from "resend";
import { GENERIC_ERROR, validateJoin, type Role } from "@/lib/join-form";

type SubmitBody = {
  role: Role;
  fullName: string;
  email: string;
  company: string;
  stage?: string;
  type?: string;
  operatorType?: string;
};

const FROM = "FNDRYx <forge@fndryx.io>";
// Replies go to Kevin until forge@fndryx.io is confirmed to reach someone.
const REPLY_TO = "kevin@fndryx.io";

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function wrapHtml(innerHtml: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#f1f5f9;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#0f172a;padding:40px 16px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;background-color:#1e293b;border-radius:12px;padding:40px;color:#cbd5e1;line-height:1.6;font-size:16px;">
            <tr><td>${innerHtml}</td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

const P = 'style="margin:0 0 20px 0;"';
const GREETING = 'style="margin:0 0 20px 0;color:#f1f5f9;font-size:18px;"';
const SIGNATURE = 'style="margin:0;color:#f97316;font-weight:600;"';
const SIGN_OFF_HTML = `<p ${SIGNATURE}>Kevin Harnist and Patrick Tiettmeyer<br />FNDRYx</p>`;
const SIGN_OFF_TEXT = `Kevin Harnist and Patrick Tiettmeyer
FNDRYx`;

function founderEmail(fullName: string) {
  const html = wrapHtml(`
    <p ${GREETING}>Hi ${escapeHtml(fullName)},</p>
    <p ${P}>Thanks for joining the FNDRYx founder list.</p>
    <p ${P}>FNDRYx opens through partner programs and events, and we'll email you when one fits your company. You'll take a structured readiness assessment and get a founder report built from your own answers. With your consent, you can then check in every 21 days. Founders never pay for their own assessment.</p>
    <p ${P}>If you're attending Midwest House Summit in Grand Rapids, your personal link is in your invitation email from FNDRYx.</p>
    <p ${P}>Questions? Just reply.</p>
    ${SIGN_OFF_HTML}
  `);
  const text = `Hi ${fullName},

Thanks for joining the FNDRYx founder list.

FNDRYx opens through partner programs and events, and we'll email you when one fits your company. You'll take a structured readiness assessment and get a founder report built from your own answers. With your consent, you can then check in every 21 days. Founders never pay for their own assessment.

If you're attending Midwest House Summit in Grand Rapids, your personal link is in your invitation email from FNDRYx.

Questions? Just reply.

${SIGN_OFF_TEXT}`;
  return {
    subject: "You're on the FNDRYx founder list",
    html,
    text,
  };
}

function operatorEmail(fullName: string) {
  const html = wrapHtml(`
    <p ${GREETING}>Hi ${escapeHtml(fullName)},</p>
    <p ${P}>Thanks for reaching out about FNDRYx for your program or region. We'd like to hear about your founders and what you want to learn about them. We'll reply personally within two business days.</p>
    ${SIGN_OFF_HTML}
  `);
  const text = `Hi ${fullName},

Thanks for reaching out about FNDRYx for your program or region. We'd like to hear about your founders and what you want to learn about them. We'll reply personally within two business days.

${SIGN_OFF_TEXT}`;
  return {
    subject: "Your FNDRYx inquiry",
    html,
    text,
  };
}

function capitalEmail(fullName: string) {
  const html = wrapHtml(`
    <p ${GREETING}>Hi ${escapeHtml(fullName)},</p>
    <p ${P}>Thanks for your interest in FNDRYx. We're building the readiness record for early-stage founders in the middle of the country. Today, investors see aggregates only, in groups of five or more. We'll reply personally within two business days.</p>
    ${SIGN_OFF_HTML}
  `);
  const text = `Hi ${fullName},

Thanks for your interest in FNDRYx. We're building the readiness record for early-stage founders in the middle of the country. Today, investors see aggregates only, in groups of five or more. We'll reply personally within two business days.

${SIGN_OFF_TEXT}`;
  return {
    subject: "Your FNDRYx inquiry",
    html,
    text,
  };
}

export async function POST(request: Request) {
  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!formspreeEndpoint || !resendApiKey) {
    console.error(
      "Missing required env vars: FORMSPREE_ENDPOINT and/or RESEND_API_KEY"
    );
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    console.error("founder-forge: request body was not valid JSON");
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : v);
  const fields = {
    role: str(raw?.role),
    fullName: str(raw?.fullName),
    email: str(raw?.email),
    company: str(raw?.company),
    stage: str(raw?.stage),
    type: str(raw?.type),
    operatorType: str(raw?.operatorType),
  };

  const check = validateJoin(fields);
  if (!check.ok) {
    console.warn(`founder-forge: rejected submission (field: ${check.field})`);
    return NextResponse.json(
      { error: check.message, field: check.field },
      { status: 400 }
    );
  }

  const { role, fullName, email, company, stage, type, operatorType } =
    fields as SubmitBody;

  try {
    const formspreePayload: Record<string, string> = {
      role,
      fullName,
      email,
      company,
    };
    if (role === "founder" && stage) formspreePayload.stage = stage;
    if (role === "capital_provider" && type) formspreePayload.type = type;
    if (role === "operator" && operatorType)
      formspreePayload.operatorType = operatorType;

    try {
      const fsRes = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formspreePayload),
      });
      if (!fsRes.ok) {
        const text = await fsRes.text().catch(() => "");
        console.error(
          `Formspree forward failed: ${fsRes.status} ${fsRes.statusText} ${text}`
        );
      }
    } catch (fsErr) {
      console.error("Formspree forward error:", fsErr);
    }

    const resend = new Resend(resendApiKey);
    const tmpl =
      role === "founder"
        ? founderEmail(fullName)
        : role === "capital_provider"
          ? capitalEmail(fullName)
          : operatorEmail(fullName);

    const { error: sendError } = await resend.emails.send({
      from: FROM,
      to: [email],
      replyTo: REPLY_TO,
      subject: tmpl.subject,
      html: tmpl.html,
      text: tmpl.text,
    });

    if (sendError) {
      console.error("Resend send error:", sendError);
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("founder-forge route error:", err);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }
}
