"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Users } from "lucide-react"

const subjectOptions = [
  { value: "spende", label: "Spende" },
  { value: "ehrenamt", label: "Ehrenamt" },
  { value: "frage", label: "Frage" },
  { value: "anderes", label: "Anderes" },
]

export default function DonatePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    await new Promise((r) => setTimeout(r, 1000))
    setStatus("sent")
    setForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fbf7f5" }}>
      <div className="px-6 pt-8 max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-base font-sans text-foreground hover:opacity-60 transition-opacity"
        >
          <ArrowLeft size={18} />
          Zurück
        </Link>
      </div>

      <div className="px-6 py-12 max-w-4xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-sans text-foreground text-balance">
            Du kannst dazu beitragen, dass eine Familie Urlaub macht
          </h1>
          <Image
            src="/images/IMAGE_8.png"
            alt="Familie in der Natur mit künstlerischem Rahmen"
            width={960}
            height={640}
            className="w-full h-auto object-contain rounded-2xl"
          />
          <p className="text-xl md:text-2xl font-sans text-foreground leading-relaxed text-pretty">
            You&Family ist eine Initiative von Menschen, die selbst wissen, was gemeinsame Zeit bedeutet — Mütter, Väter, Familien. Wir sind noch am Anfang, aber wir glauben fest daran: Mit den richtigen Menschen an unserer Seite können wir das wirklich möglich machen. Wenn du Teil davon sein willst — egal ob mit einer Spende oder deiner Zeit — melde dich bei uns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Spenden Card */}
          <div
            className="rounded-2xl p-8 flex flex-col gap-4"
            style={{ backgroundColor: "#f3effc" }}
          >
            <div className="flex items-center gap-3">
              <Heart size={28} className="text-foreground" />
              <h2 className="text-2xl font-semibold font-sans text-foreground">Spenden</h2>
            </div>
            <p className="text-lg font-sans text-foreground leading-relaxed">
              Deine finanzielle Unterstützung ermöglicht Familien eine Auszeit, die sie sich sonst nicht leisten könnten. Jeder Beitrag zählt — ob groß oder klein.
            </p>
          </div>

          {/* Ehrenamt Card */}
          <div
            className="rounded-2xl p-8 flex flex-col gap-4"
            style={{ backgroundColor: "#e6eaff" }}
          >
            <div className="flex items-center gap-3">
              <Users size={28} className="text-foreground" />
              <h2 className="text-2xl font-semibold font-sans text-foreground">Ehrenamt</h2>
            </div>
            <p className="text-lg font-sans text-foreground leading-relaxed">
              Du möchtest deine Zeit und Energie einbringen? Wir suchen Menschen, die mit anpacken wollen — bei der Organisation, Begleitung oder Kommunikation.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex flex-col gap-8">
          <h2 className="text-4xl md:text-5xl font-bold font-sans text-foreground text-balance">
            Schreib uns
          </h2>

          {status === "sent" ? (
            <div
              className="rounded-2xl p-10 text-center flex flex-col gap-3"
              style={{ backgroundColor: "#f3effc" }}
            >
              <p className="text-3xl font-bold font-sans text-foreground">Danke!</p>
              <p className="text-xl font-sans text-foreground">
                Deine Nachricht ist bei uns angekommen. Wir melden uns bald.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-base font-semibold font-sans text-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Dein Name"
                    className="rounded-xl border border-border px-4 py-3 text-base font-sans bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-base font-semibold font-sans text-foreground">
                    E-Mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="deine@email.de"
                    className="rounded-xl border border-border px-4 py-3 text-base font-sans bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-base font-semibold font-sans text-foreground">
                  Betreff
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
                    Bitte wählen
                  </option>
                  {subjectOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-base font-semibold font-sans text-foreground">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Was möchtest du uns mitteilen?"
                  className="rounded-xl border border-border px-4 py-3 text-base font-sans bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-fit px-8 py-4 rounded-full text-xl font-semibold font-sans transition-opacity hover:opacity-80 disabled:opacity-50"
                style={{ backgroundColor: "#a477ff", color: "#ffffff" }}
              >
                {status === "sending" ? "Wird gesendet..." : "Nachricht senden"}
              </button>
            </form>
          )}
        </div>
      </div>

      <footer className="px-6 py-10 border-t border-border mt-8" style={{ backgroundColor: "#fff4f0" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-sans text-foreground">
            &copy; {new Date().getFullYear()} You&Family e.V.
          </p>
        </div>
      </footer>
    </main>
  )
}
