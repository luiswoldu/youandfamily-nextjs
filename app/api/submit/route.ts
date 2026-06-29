import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { Database, SubmissionSource } from "@/lib/supabase"

// Server-side client uses the service-role key so it can bypass RLS for inserts
// (the anon key + RLS policy also works, but the service key is simpler for server routes)
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL ?? "noreply@youandfamily.com"
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "family@youandfamily.de"

interface SubmitBody {
  source: SubmissionSource
  name: string
  email: string
  subject: string
  message: string
}

export async function POST(req: NextRequest) {
  let body: SubmitBody

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const { source, name, email, subject, message } = body

  // Basic validation
  if (!source || !name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 422 })
  }

  if (!["apply", "donate", "contact"].includes(source)) {
    return NextResponse.json({ error: "Invalid source" }, { status: 422 })
  }

  // Insert into Supabase
  const { error: dbError } = await supabase.from("submissions").insert({
    source,
    name,
    email,
    subject,
    message,
  })

  if (dbError) {
    console.error("[submit] DB error:", dbError)
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 })
  }

  // Send emails (fire-and-forget — don't fail the request if email errors)
  if (RESEND_API_KEY) {
    await Promise.allSettled([
      sendConfirmationEmail({ name, email, subject, source }),
      sendAdminNotification({ name, email, subject, message, source }),
    ])
  } else {
    console.warn("[submit] RESEND_API_KEY not set — skipping email notifications")
  }

  return NextResponse.json({ success: true }, { status: 201 })
}

// ─── Email helpers ────────────────────────────────────────────────────────────

async function resend(payload: {
  from: string
  to: string[]
  subject: string
  html: string
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Resend error ${res.status}: ${text}`)
  }
}

async function sendConfirmationEmail({
  name,
  email,
  subject,
  source,
}: {
  name: string
  email: string
  subject: string
  source: SubmissionSource
}) {
  const sourceLabel =
    source === "apply" ? "application" : source === "donate" ? "donation enquiry" : "message"

  await resend({
    from: FROM_EMAIL,
    to: [email],
    subject: `Wir haben deine ${sourceLabel} erhalten — You & Family`,
    html: `
<p>Hallo ${name},</p>
<p>vielen Dank für deine Nachricht! Wir haben deine ${sourceLabel} zum Thema „<strong>${subject}</strong>“ erhalten und werden uns so schnell wie möglich bei dir melden.</p>
<p>Herzliche Grüße<br/>Dein You & Family Team</p>
    `,
  })
}

async function sendAdminNotification({
  name,
  email,
  subject,
  message,
  source,
}: {
  name: string
  email: string
  subject: string
  message: string
  source: SubmissionSource
}) {
  const sourceLabel =
    source === "apply" ? "Bewerbung" : source === "donate" ? "Spendenanfrage" : "Kontaktanfrage"

  await resend({
    from: FROM_EMAIL,
    to: [ADMIN_EMAIL],
    subject: `[${sourceLabel}] Neue Nachricht von ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
        <h2 style="margin:0 0 20px;font-size:20px;color:#1f1f1f;">Neue ${sourceLabel} über das Kontaktformular</h2>
        <table style="width:100%;border-collapse:collapse;font-size:15px;color:#374151;">
          <tr>
            <td style="padding:8px 12px;background:#f9fafb;border-radius:6px;font-weight:600;width:120px;">Formular</td>
            <td style="padding:8px 12px;">${sourceLabel}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-weight:600;">Name</td>
            <td style="padding:8px 12px;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;background:#f9fafb;border-radius:6px;font-weight:600;">E-Mail</td>
            <td style="padding:8px 12px;background:#f9fafb;border-radius:6px;">
              <a href="mailto:${email}" style="color:#7c3aed;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 12px;font-weight:600;">Betreff</td>
            <td style="padding:8px 12px;">${subject}</td>
          </tr>
        </table>
        <div style="margin-top:20px;">
          <p style="font-weight:600;font-size:15px;color:#374151;margin-bottom:8px;">Nachricht:</p>
          <div style="background:#f3f4f6;border-left:4px solid #a477ff;border-radius:0 8px 8px 0;padding:16px;font-size:15px;color:#1f1f1f;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
        </div>
        <p style="margin-top:24px;font-size:13px;color:#9ca3af;">
          Du kannst direkt auf diese E-Mail antworten oder <a href="mailto:${email}" style="color:#7c3aed;">${email}</a> kontaktieren.
        </p>
      </div>
    `,
  })
}