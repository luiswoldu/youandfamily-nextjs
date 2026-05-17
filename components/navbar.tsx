"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { SUPPORTED_LANGUAGES, useTranslation, type Language } from "@/lib/i18n"

const navItemKeys = [
  { key: "what_we_do", href: "#what-we-do" },
  { key: "mission", href: "#mission" },
  { key: "stories", href: "#stories" },
  { key: "contact", href: "#contact" },
] as const

const languageOptions: { code: Language | "de" | "tr" | "ar"; labelKey: string }[] = [
  { code: "de", labelKey: "languages.de" },
  { code: "en", labelKey: "languages.en" },
  { code: "tr", labelKey: "languages.tr" },
  { code: "ar", labelKey: "languages.ar" },
]

export function Navbar() {
  const { t, lang, setLang } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  function scrollTo(href: string) {
    setMobileOpen(false)
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  function selectLanguage(code: string) {
    if (SUPPORTED_LANGUAGES.includes(code as Language)) {
      setLang(code as Language)
    }
    setLangOpen(false)
    setMobileOpen(false)
  }

  const activeLangLabel = t<string>(`languages.${lang}`)

  return (
    <header className="w-full bg-background">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="shrink-0" aria-label="You&Family">
          <Image
            src="/LOGO_FINAL.png"
            alt="You&Family"
            width={160}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItemKeys.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-base font-sans text-foreground hover:opacity-60 transition-opacity cursor-pointer"
            >
              {t(`navbar.items.${item.key}`)}
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
              {activeLangLabel}
              <ChevronDown size={14} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-background rounded-xl shadow-sm z-50 min-w-32 overflow-hidden">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => selectLanguage(option.code)}
                    className="w-full text-left px-4 py-2 text-sm font-sans hover:bg-card transition-colors"
                  >
                    {t(option.labelKey)}
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
            {t("navbar.donate")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={t("navbar.open_menu")}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          {navItemKeys.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-left text-base font-sans text-foreground hover:opacity-60 transition-opacity"
            >
              {t(`navbar.items.${item.key}`)}
            </button>
          ))}
          <div className="pt-2 border-t border-border flex flex-wrap gap-3">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => selectLanguage(option.code)}
                className={`text-sm font-sans hover:opacity-60 transition-opacity ${lang === option.code ? "font-semibold" : ""}`}
              >
                {t(option.labelKey)}
              </button>
            ))}
          </div>
          <Link
            href="/donate"
            onClick={() => setMobileOpen(false)}
            className="inline-block w-fit px-5 py-2 rounded-full text-sm font-semibold font-sans"
            style={{ backgroundColor: "#a477ff", color: "#ffffff" }}
          >
            {t("navbar.donate")}
          </Link>
        </div>
      )}
    </header>
  )
}
