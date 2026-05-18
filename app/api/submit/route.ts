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
const FROM_EMAIL = process.env.FROM_EMAIL ?? "noreply@youandfamily.org"
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "hello@youandfamily.org"

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
    subject: `We received your ${sourceLabel} — You & Family`,
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for reaching out! We've received your ${sourceLabel} regarding "<strong>${subject}</strong>" and will get back to you as soon as possible.</p>
      <p>With warmth,<br/>The You & Family team</p>
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
  await resend({
    from: FROM_EMAIL,
    to: [ADMIN_EMAIL],
    subject: `[${source.toUpperCase()}] New submission from ${name}`,
    html: `
      <p><strong>Source:</strong> ${source}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <blockquote>${message.replace(/\n/g, "<br/>")}</blockquote>
    `,
  })
}