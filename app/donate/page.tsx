"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Users } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

const subjectKeys = ["donation", "volunteer", "question", "other"] as const

export default function DonatePage() {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "donate" }),
      })

      if (!res.ok) throw new Error("Submission failed")

      setStatus("sent")
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fbf7f5" }}>
      <div className="px-6 pt-8 max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-base font-sans text-foreground hover:opacity-60 transition-opacity"
        >
          <ArrowLeft size={18} />
          {t("donate_page.back")}
        </Link>
      </div>

      <div className="px-6 py-12 max-w-4xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-sans text-foreground text-balance">
            {t("donate_page.title")}
          </h1>
          <Image
            src="/images/IMAGE_8.png"
            alt={t("donate_page.image_alt")}
            width={960}
            height={640}
            className="w-full h-auto object-contain rounded-2xl"
          />
          <p className="text-xl md:text-2xl font-sans text-foreground leading-relaxed text-pretty">
            {t("donate_page.intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="rounded-2xl p-8 flex flex-col gap-4"
            style={{ backgroundColor: "#f3effc" }}
          >
            <div className="flex items-center gap-3">
              <Heart size={28} className="text-foreground" />
              <h2 className="text-2xl font-semibold font-sans text-foreground">
                {t("donate_page.paths.donate.title")}
              </h2>
            </div>
            <p className="text-lg font-sans text-foreground leading-relaxed">
              {t("donate_page.paths.donate.text")}
            </p>
          </div>

          <div
            className="rounded-2xl p-8 flex flex-col gap-4"
            style={{ backgroundColor: "#e6eaff" }}
          >
            <div className="flex items-center gap-3">
              <Users size={28} className="text-foreground" />
              <h2 className="text-2xl font-semibold font-sans text-foreground">
                {t("donate_page.paths.volunteer.title")}
              </h2>
            </div>
            <p className="text-lg font-sans text-foreground leading-relaxed">
              {t("donate_page.paths.volunteer.text")}
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex flex-col gap-8">
          <h2 className="text-4xl md:text-5xl font-bold font-sans text-foreground text-balance">
            {t("donate_page.contact.title")}
          </h2>

          {status === "sent" ? (
            <div
              className="rounded-2xl p-10 text-center flex flex-col gap-3"
              style={{ backgroundColor: "#f3effc" }}
            >
              <p className="text-3xl font-bold font-sans text-foreground">
                {t("donate_page.contact.form.success_title")}
              </p>
              <p className="text-xl font-sans text-foreground">
                {t("donate_page.contact.form.success_text")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {status === "error" && (
                <p className="text-base font-sans text-red-600 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  {t("donate_page.contact.form.error") ?? "Something went wrong. Please try again."}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-base font-semibold font-sans text-foreground">
                    {t("donate_page.contact.form.name.label")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("donate_page.contact.form.name.placeholder")}
                    className="rounded-xl border border-border px-4 py-3 text-base font-sans bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-base font-semibold font-sans text-foreground">
                    {t("donate_page.contact.form.email.label")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("donate_page.contact.form.email.placeholder")}
                    className="rounded-xl border border-border px-4 py-3 text-base font-sans bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-base font-semibold font-sans text-foreground">
                  {t("donate_page.contact.form.subject.label")}
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className="rounded-xl border border-border px-4 py-3 text-base font-sans bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="" disabled>
                    {t("donate_page.contact.form.subject.default")}
                  </option>
                  {subjectKeys.map((key) => (
                    <option key={key} value={key}>
                      {t(`donate_page.contact.form.subject.options.${key}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-base font-semibold font-sans text-foreground">
                  {t("donate_page.contact.form.message.label")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("donate_page.contact.form.message.placeholder")}
                  className="rounded-xl border border-border px-4 py-3 text-base font-sans bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-fit px-8 py-4 rounded-full text-xl font-semibold font-sans transition-opacity hover:opacity-80 disabled:opacity-50"
                style={{ backgroundColor: "#a477ff", color: "#ffffff" }}
              >
                {status === "sending"
                  ? t("donate_page.contact.form.sending")
                  : t("donate_page.contact.form.submit")}
              </button>
            </form>
          )}
        </div>
      </div>

      <footer className="px-6 py-10 border-t border-border mt-8" style={{ backgroundColor: "#fff4f0" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-sans text-foreground">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
      </footer>
    </main>
  )
}