import { NextResponse } from "next/server";
import { Resend } from "resend";

type Role = "founder" | "capital_provider" | "operator";

type SubmitBody = {
  role: Role;
  fullName: string;
  email: string;
  company: string;
  stage?: string;
  type?: string;
  operatorType?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_OPERATOR_TYPES: ReadonlySet<string> = new Set([
  "accelerator",
  "incubator",
  "venture_studio",
  "university_program",
  "corporate_program",
  "other",
]);

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

function founderEmail(fullName: string) {
  const html = wrapHtml(`
    <p style="margin:0 0 20px 0;color:#f1f5f9;font-size:18px;">Hey ${escapeHtml(fullName)},</p>
    <p style="margin:0 0 20px 0;">Thanks for requesting access to the <strong style="color:#f1f5f9;">Capital Readiness Assessment</strong>.</p>
    <p style="margin:0 0 20px 0;">Our team is reviewing your request. Within 48 hours, you'll receive a direct link to the Capital Readiness Assessment — a ~15 minute evaluation across the five dimensions that drive capital decisions.</p>
    <p style="margin:0 0 12px 0;color:#f1f5f9;font-weight:600;">What happens next:</p>
    <ol style="margin:0 0 24px 0;padding-left:20px;">
      <li style="margin-bottom:8px;">You complete the assessment (no warm intro required)</li>
      <li style="margin-bottom:8px;">Your responses build a capital-readiness profile that compounds every time you update it</li>
      <li style="margin-bottom:8px;">Qualified founders are routed directly to aligned capital sources via systematic matching</li>
    </ol>
    <p style="margin:0 0 20px 0;">Questions? Just reply to this email.</p>
    <p style="margin:0;color:#f97316;font-weight:600;">— The FNDRYx team</p>
  `);
  const text = `Hey ${fullName},

Thanks for requesting access to the Capital Readiness Assessment.

Our team is reviewing your request. Within 48 hours, you'll receive a direct link to the Capital Readiness Assessment — a ~15 minute evaluation across the five dimensions that drive capital decisions.

What happens next:
1. You complete the assessment (no warm intro required)
2. Your responses build a capital-readiness profile that compounds every time you update it
3. Qualified founders are routed directly to aligned capital sources via systematic matching

Questions? Just reply to this email.

— The FNDRYx team`;
  return {
    subject: "Your Capital Readiness Assessment access request",
    html,
    text,
  };
}

function capitalEmail(fullName: string) {
  const html = wrapHtml(`
    <p style="margin:0 0 20px 0;color:#f1f5f9;font-size:18px;">Hey ${escapeHtml(fullName)},</p>
    <p style="margin:0 0 20px 0;">Thanks for your interest in the <strong style="color:#f1f5f9;">FNDRYx platform</strong>.</p>
    <p style="margin:0 0 12px 0;">Our team will reach out within 48 hours with next steps, including:</p>
    <ul style="margin:0 0 24px 0;padding-left:20px;">
      <li style="margin-bottom:8px;">Scored deal flow filtered against your stated thesis, with six-criterion match explanations and deterministic scoring</li>
      <li style="margin-bottom:8px;">How to refer founders directly into the Capital Readiness Assessment</li>
      <li style="margin-bottom:8px;">Capital provider onboarding</li>
    </ul>
    <p style="margin:0 0 20px 0;">FNDRYx is the evaluation layer between founders and capital — <strong style="color:#f1f5f9;">structured signal, no black box</strong>.</p>
    <p style="margin:0 0 20px 0;">Questions? Just reply to this email.</p>
    <p style="margin:0;color:#f97316;font-weight:600;">— The FNDRYx team</p>
  `);
  const text = `Hey ${fullName},

Thanks for your interest in the FNDRYx platform.

Our team will reach out within 48 hours with next steps, including:
- Scored deal flow filtered against your stated thesis, with six-criterion match explanations and deterministic scoring
- How to refer founders directly into the Capital Readiness Assessment
- Capital provider onboarding

FNDRYx is the evaluation layer between founders and capital — structured signal, no black box.

Questions? Just reply to this email.

— The FNDRYx team`;
  return {
    subject: "Your FNDRYx platform inquiry",
    html,
    text,
  };
}

function operatorEmail(fullName: string) {
  const html = wrapHtml(`
    <p style="margin:0 0 20px 0;color:#f1f5f9;font-size:18px;">Hey ${escapeHtml(fullName)},</p>
    <p style="margin:0 0 20px 0;">Thanks for your inquiry about <strong style="color:#f1f5f9;">FNDRYx for accelerator and program impact measurement</strong>.</p>
    <p style="margin:0 0 12px 0;">FNDRYx gives program operators measurement infrastructure for cohort outcomes:</p>
    <ul style="margin:0 0 24px 0;padding-left:20px;">
      <li style="margin-bottom:8px;">Impact Dashboard for cohort impact measurement across pre/post readiness</li>
      <li style="margin-bottom:8px;">Pre/post assessment instrument: 22 core questions plus 6 reflection questions</li>
      <li style="margin-bottom:8px;">Normalized cohort impact score, comparable across cohorts and programs</li>
      <li style="margin-bottom:8px;">Multi-organization tenancy with full data isolation per program</li>
    </ul>
    <p style="margin:0 0 20px 0;">Our team will follow up within 48 hours to discuss pilot engagement structure, cohort size, and program length.</p>
    <p style="margin:0 0 20px 0;">Questions? Just reply to this email.</p>
    <p style="margin:0;color:#f97316;font-weight:600;">— The FNDRYx team</p>
  `);
  const text = `Hey ${fullName},

Thanks for your inquiry about FNDRYx for accelerator and program impact measurement.

FNDRYx gives program operators measurement infrastructure for cohort outcomes:
- Impact Dashboard for cohort impact measurement across pre/post readiness
- Pre/post assessment instrument: 22 core questions plus 6 reflection questions
- Normalized cohort impact score, comparable across cohorts and programs
- Multi-organization tenancy with full data isolation per program

Our team will follow up within 48 hours to discuss pilot engagement structure, cohort size, and program length.

Questions? Just reply to this email.

— The FNDRYx team`;
  return {
    subject: "Your FNDRYx accelerator inquiry",
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
    return NextResponse.json(
      {
        error:
          "Server is not configured. FORMSPREE_ENDPOINT and RESEND_API_KEY must be set.",
      },
      { status: 500 }
    );
  }

  let body: SubmitBody;
  try {
    body = (await request.json()) as SubmitBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { role, fullName, email, company, stage, type, operatorType } =
    body ?? {};

  if (!role || !fullName || !email || !company) {
    return NextResponse.json(
      { error: "Missing required fields: role, fullName, email, company." },
      { status: 400 }
    );
  }

  if (
    role !== "founder" &&
    role !== "capital_provider" &&
    role !== "operator"
  ) {
    return NextResponse.json({ error: "Invalid role." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (role === "operator") {
    if (!operatorType) {
      return NextResponse.json(
        { error: "Organization type is required." },
        { status: 400 }
      );
    }
    if (!VALID_OPERATOR_TYPES.has(operatorType)) {
      return NextResponse.json(
        { error: "Invalid organization type." },
        { status: 400 }
      );
    }
  }

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
      from: "FNDRYx <forge@fndryx.io>",
      to: [email],
      replyTo: "forge@fndryx.io",
      subject: tmpl.subject,
      html: tmpl.html,
      text: tmpl.text,
    });

    if (sendError) {
      console.error("Resend send error:", sendError);
      return NextResponse.json(
        { error: "We couldn't send the confirmation email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error.";
    console.error("founder-forge route error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
