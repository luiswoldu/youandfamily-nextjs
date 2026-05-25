"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export default function ImpressumPage() {
  const { t } = useTranslation()

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fbf7f5" }}>
      <div className="px-6 pt-8 max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-base font-sans text-foreground hover:opacity-60 transition-opacity"
        >
          <ArrowLeft size={18} />
          {t("impressum_page.back")}
        </Link>
      </div>

      <div className="px-6 py-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-sans leading-tighter text-balance text-foreground">
            {t("impressum_page.title")}
          </h1>
        </div>

        <div className="flex flex-col gap-6 text-base md:text-lg font-sans text-foreground leading-relaxed">
          <div>
            <p>You&amp;Family gGmbH</p>
            <p>Kurfürstendamm 66</p>
            <p>10707 Berlin</p>
          </div>

          <div>
            <p>
              <span className="font-semibold">{t("impressum_page.fields.commercial_register")}:</span>{" "}
              Amtsgericht Charlottenburg: HRB 266237
            </p>
            <p>
              <span className="font-semibold">{t("impressum_page.fields.tax_id")}:</span>{" "}
              27/602/50392
            </p>
          </div>

          <div>
            <p>
              <span className="font-semibold">{t("impressum_page.fields.represented_by")}:</span>{" "}
              Younes Ouaqasse
            </p>
          </div>

          <div>
            <p>
              <span className="font-semibold">{t("impressum_page.fields.contact_email")}:</span>{" "}
              <a href="mailto:hello@youandcompany.de" className="underline hover:opacity-60 transition-opacity">
                hello@youandcompany.de
              </a>
            </p>
          </div>
        </div>
      </div>

      <footer className="px-6 py-10 border-t border-border mt-8" style={{ backgroundColor: "#fff4f0" }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-sans text-foreground">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
      </footer>
    </main>
  )
}
