"use client"

import Link from "next/link"
import { useState } from "react"
import { useConsent } from "@/lib/consent"
import { useTranslation } from "@/lib/i18n"

export function CookieConsent() {
  const { t } = useTranslation()
  const { isBannerOpen, acceptAll, rejectAll, setConsent, consent } = useConsent()
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState<boolean>(consent?.analytics ?? false)

  if (!isBannerOpen) return null

  function handleSave() {
    setConsent({ necessary: true, analytics })
    setShowDetails(false)
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("cookie_consent.title")}
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div
        className="max-w-3xl mx-auto rounded-2xl shadow-lg border border-border p-6 sm:p-7 flex flex-col gap-5"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-foreground">
            {t("cookie_consent.title")}
          </h2>
          <p className="text-sm sm:text-base font-sans text-foreground leading-relaxed">
            {t("cookie_consent.message")}{" "}
            <Link href="/datenschutz" className="underline hover:opacity-60 transition-opacity">
              {t("cookie_consent.privacy_link")}
            </Link>
            .
          </p>
        </div>

        {showDetails && (
          <div className="flex flex-col gap-3 border-t border-border pt-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold font-sans text-foreground">
                  {t("cookie_consent.categories.necessary.title")}
                </p>
                <p className="text-sm font-sans text-foreground/70 leading-relaxed">
                  {t("cookie_consent.categories.necessary.text")}
                </p>
              </div>
              <span className="text-sm font-sans text-foreground/60 shrink-0 pt-1">
                {t("cookie_consent.always_on")}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold font-sans text-foreground">
                  {t("cookie_consent.categories.analytics.title")}
                </p>
                <p className="text-sm font-sans text-foreground/70 leading-relaxed">
                  {t("cookie_consent.categories.analytics.text")}
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer shrink-0 pt-1">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                <span className="relative w-11 h-6 bg-foreground/20 peer-checked:bg-foreground rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-5" />
              </label>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          {!showDetails ? (
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="px-5 py-3 rounded-full text-base font-semibold font-sans border border-border bg-white text-foreground transition-opacity hover:opacity-70"
            >
              {t("cookie_consent.customize")}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-3 rounded-full text-base font-semibold font-sans border border-border bg-white text-foreground transition-opacity hover:opacity-70"
            >
              {t("cookie_consent.save")}
            </button>
          )}
          <button
            type="button"
            onClick={rejectAll}
            className="px-5 py-3 rounded-full text-base font-semibold font-sans border border-border bg-white text-foreground transition-opacity hover:opacity-70"
          >
            {t("cookie_consent.reject_all")}
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="px-5 py-3 rounded-full text-base font-semibold font-sans transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#a477ff", color: "#ffffff" }}
          >
            {t("cookie_consent.accept_all")}
          </button>
        </div>
      </div>
    </div>
  )
}
