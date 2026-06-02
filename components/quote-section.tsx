"use client"

import { useTranslation } from "@/lib/i18n"

export function QuoteSection() {
  const { t } = useTranslation()
  const paragraphs = t<string[]>("quote.paragraphs")

  return (
    <section id="quote" className="px-6 py-24" style={{ backgroundColor: "#fbf7f5" }}>
      <div className="max-w-8xl mx-auto w-full">
        <div className="@container grid w-full grid-cols-12">
          <div className="col-span-12 @md:col-span-6 @md:col-start-4">
            <h2 className="text-6xl md:text-7xl font-bold font-sans text-foreground text-balance mb-10">
              {t("quote.title")}
            </h2>
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-xl font-sans text-foreground leading-relaxed [&:not(:first-child)]:mt-6"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
