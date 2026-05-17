"use client"

import { useTranslation } from "@/lib/i18n"

const storyStyles = [
  { bg: "#fbf7f5" },
  { bg: "#f3effc" },
  { bg: "#e6eaff" },
]

type Story = { quote: string; name: string; location: string }

export function StoriesSection() {
  const { t } = useTranslation()
  const stories = t<Story[]>("stories.items")

  return (
    <section id="stories" className="px-6 py-24" style={{ backgroundColor: "#fff4f0" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-6xl md:text-7xl font-bold font-sans text-foreground text-balance">
            {t("stories.title")}
          </h2>
          <p className="text-3xl font-semibold font-sans text-foreground text-pretty">
            {t("stories.subline")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <div
              key={story.name}
              className="rounded-2xl p-8 flex flex-col gap-6"
              style={{ backgroundColor: storyStyles[index % storyStyles.length].bg }}
            >
              <p className="text-xl font-sans text-foreground leading-relaxed">
                &ldquo;{story.quote}&rdquo;
              </p>
              <div className="flex flex-col gap-1 mt-auto">
                <span className="text-base font-semibold font-sans text-foreground">{story.name}</span>
                <span className="text-base font-sans text-foreground">{story.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
