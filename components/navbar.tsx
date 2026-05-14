"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"

const navItems = [
  { label: "Was wir tun", href: "#what-we-do" },
  { label: "Mission", href: "#mission" },
  { label: "Familiengeschichten", href: "#stories" },
  { label: "Kontakt", href: "#contact" },
]

const languages = [
  { label: "Deutsch", code: "de" },
  { label: "English", code: "en" },
  { label: "Türkçe", code: "tr" },
  { label: "العربية", code: "ar" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [activeLang, setActiveLang] = useState("Deutsch")
  const router = useRouter()

  function scrollTo(href: string) {
    setMobileOpen(false)
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="w-full bg-background">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight shrink-0 font-sans">
          You&Family
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-base font-sans text-foreground hover:opacity-60 transition-opacity cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side: language + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-sm font-sans text-foreground hover:opacity-60 transition-opacity"
            >
              {activeLang}
              <ChevronDown size={14} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-background rounded-xl shadow-sm z-50 min-w-32 overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setActiveLang(lang.label)
                      setLangOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-sans hover:bg-card transition-colors"
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Donate CTA pill */}
          <Link
            href="/donate"
            className="px-5 py-2 rounded-full text-sm font-semibold font-sans"
            style={{ backgroundColor: "#ffffff", color: "#000000" }}
          >
            Spenden
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü öffnen"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-left text-base font-sans text-foreground hover:opacity-60 transition-opacity"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-border flex flex-wrap gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setActiveLang(lang.label)
                  setMobileOpen(false)
                }}
                className={`text-sm font-sans hover:opacity-60 transition-opacity ${activeLang === lang.label ? "font-semibold" : ""}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <Link
            href="/donate"
            onClick={() => setMobileOpen(false)}
            className="inline-block w-fit px-5 py-2 rounded-full text-sm font-semibold font-sans"
            style={{ backgroundColor: "#a477ff", color: "#ffffff" }}
          >
            Spenden
          </Link>
        </div>
      )}
    </header>
  )
}
