"use client"

import { useTranslation } from "@/lib/i18n"

const pillarKeys = [
  { key: "funded_vacations", bg: "#e6eaff" },
  { key: "personal_support", bg: "#f3effc" },
  { key: "lasting_network", bg: "#fff4f0" },
] as const

export function WhatWeDoSection() {
  const { t } = useTranslation()

  return (
    <section id="what-we-do" className="px-6 py-24" style={{ backgroundColor: "#fbf7f5" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-6xl md:text-7xl font-bold font-sans text-foreground text-balance">
            {t("what_we_do.title")}
          </h2>
          <p className="text-3xl font-semibold font-sans text-foreground">
            {t("what_we_do.subline")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillarKeys.map((pillar) => (
            <div
              key={pillar.key}
              className="rounded-2xl p-8 flex flex-col gap-4"
              style={{ backgroundColor: pillar.bg }}
            >
              <span className="text-sm font-semibold font-sans tracking-widest text-foreground uppercase">
                {t(`what_we_do.pillars.${pillar.key}.micro`)}
              </span>
              <h3 className="text-2xl font-semibold font-sans text-foreground leading-snug">
                {t(`what_we_do.pillars.${pillar.key}.headline`)}
              </h3>
              <p className="text-xl font-sans text-foreground leading-relaxed">
                {t(`what_we_do.pillars.${pillar.key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
