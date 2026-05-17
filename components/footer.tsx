"use client"

import Link from "next/link"
import { useTranslation } from "@/lib/i18n"

const navLinks = [
  { key: "numbers", href: "#numbers" },
  { key: "what_we_do", href: "#what-we-do" },
  { key: "mission", href: "#mission" },
  { key: "stories", href: "#stories" },
  { key: "contact", href: "#contact" },
] as const

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="px-6 py-12 border-t border-border" style={{ backgroundColor: "#fbf7f5" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold font-sans text-foreground">You&Family</span>
          <span className="text-base font-sans text-foreground">{t("footer.tagline")}</span>
          <span className="text-base font-sans text-foreground">{t("footer.email")}</span>
        </div>

        <nav className="flex flex-wrap gap-6 text-base font-sans text-foreground">
          {navLinks.map((link) => (
            <Link key={link.key} href={link.href} className="hover:opacity-60 transition-opacity">
              {t(`footer.nav.${link.key}`)}
            </Link>
          ))}
        </nav>

        <p className="text-sm font-sans text-foreground">
          &copy; {new Date().getFullYear()} {t("footer.copyright")}
        </p>
      </div>
    </footer>
  )
}
