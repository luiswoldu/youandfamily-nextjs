"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n"

const subjectKeys = ["application", "question", "donation", "other"] as const

export function ContactSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const rawProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height)
      const clamped = Math.max(0, Math.min(1, rawProgress))
      setProgress(clamped)
    }

    let rafId = 0
    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener("scroll", onScrollOrResize, { passive: true })
    window.addEventListener("resize", onScrollOrResize)

    return () => {
      window.removeEventListener("scroll", onScrollOrResize)
      window.removeEventListener("resize", onScrollOrResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const createIconStyle = (offset = 0) => {
    const shifted = Math.max(0, Math.min(1, progress + offset))
    const inOut = 1 - Math.abs(shifted - 0.5) * 2
    const bounce = Math.sin(inOut * Math.PI * 3) * (1 - inOut) * 0.2
    const scale = 0.55 + inOut * 0.45 + bounce
    const opacity = 0.2 + inOut * 0.8
    const translateY = (1 - inOut) * 26 - bounce * 24
    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity,
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    // Placeholder — wire up to /api/contact when backend is ready
    await new Promise((r) => setTimeout(r, 1000))
    setStatus("sent")
    setForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="px-6 py-24 relative overflow-hidden"
      style={{ backgroundColor: "#e6eaff" }}
    >
      {/* Decorative icons scattered around the section */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left - Car */}
        <Image
          src="/images/icons/car.png"
          alt=""
          width={200}
          height={150}
          className="absolute top-8 left-4 opacity-60 hidden md:block"
          style={createIconStyle(0)}
        />
        {/* Middle right - Campfire */}
        <Image
          src="/images/icons/campfire.png"
          alt=""
          width={180}
          height={200}
          className="absolute top-1/2 -translate-y-1/2 right-6 opacity-60 hidden md:block"
          style={createIconStyle(-0.06)}
        />
        {/* Bottom left - Waves */}
        <Image
          src="/images/icons/waves.png"
          alt=""
          width={240}
          height={100}
          className="absolute bottom-10 left-20 opacity-60 hidden md:block"
          style={createIconStyle(0.08)}
        />
        {/* Top right - smaller Car */}
        <Image
          src="/images/icons/car.png"
          alt=""
          width={130}
          height={100}
          className="absolute top-20 right-1/3 opacity-50 hidden lg:block"
          style={createIconStyle(-0.12)}
        />
        {/* Bottom right - Waves echo */}
        <Image
          src="/images/icons/waves.png"
          alt=""
          width={160}
          height={70}
          className="absolute bottom-24 right-12 opacity-40 hidden lg:block"
          style={createIconStyle(0.04)}
        />
      </div>
      <div className="max-w-3xl mx-auto flex flex-col gap-10 relative z-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-5xl md:text-7xl font-bold font-sans text-foreground text-balance">
            {t("contact_home.title")}
          </h2>
          <p className="text-2xl font-sans text-foreground leading-relaxed text-pretty">
            {t("contact_home.text")}
          </p>
        </div>

        {status === "sent" ? (
          <div
            className="rounded-2xl p-10 text-center flex flex-col gap-3"
            style={{ backgroundColor: "#f3effc" }}
          >
            <p className="text-3xl font-bold font-sans text-foreground">{t("contact_home.form.success_title")}</p>
            <p className="text-xl font-sans text-foreground">
              {t("contact_home.form.success_text")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-base font-semibold font-sans text-foreground">
                  {t("contact_home.form.name.label")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("contact_home.form.name.placeholder")}
                  className="rounded-xl border border-border px-4 py-3 text-base font-sans bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-base font-semibold font-sans text-foreground">
                  {t("contact_home.form.email.label")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("contact_home.form.email.placeholder")}
                  className="rounded-xl border border-border px-4 py-3 text-base font-sans bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-base font-semibold font-sans text-foreground">
                {t("contact_home.form.subject.label")}
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
                  {t("contact_home.form.subject.default")}
                </option>
                {subjectKeys.map((key) => (
                  <option key={key} value={key}>
                    {t(`contact_home.form.subject.options.${key}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-base font-semibold font-sans text-foreground">
                {t("contact_home.form.message.label")}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder={t("contact_home.form.message.placeholder")}
                className="rounded-xl border border-border px-4 py-3 text-base font-sans bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-fit px-8 py-4 rounded-full text-xl font-semibold font-sans transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: "#a477ff", color: "#ffffff" }}
            >
              {status === "sending" ? t("contact_home.form.sending") : t("contact_home.form.submit")}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
