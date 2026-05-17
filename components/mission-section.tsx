"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "@/lib/i18n"

export function MissionSection() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: [0.5] }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="px-6 py-28 lg:py-36 relative overflow-hidden min-h-[90vh] flex items-center"
      style={{ backgroundColor: "#f3effc" }}
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12 relative z-10">
        <h2 className="text-6xl md:text-7xl font-bold font-sans text-foreground text-balance">
          {t("mission.title")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div
            className={`relative flex justify-center lg:justify-start lg:ml-[-16vw] transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Flowers - behind image, right side, 140% size */}
            <Image
              src="/images/icons/flowers.png"
              alt=""
              width={1008}
              height={1008}
              className="absolute right-[-40%] top-1/2 -translate-y-1/2 w-[240%] h-auto z-70 pointer-events-none opacity-90"
            />
            <Image
              src="/images/IMAGE_4.png"
              alt={t("mission.image_alt")}
              width={720}
              height={500}
              className="relative z-10 w-full max-w-none h-auto object-contain"
            />
          </div>

          <p
            className={`text-2xl md:text-3xl font-sans text-foreground leading-tight text-pretty max-w-2xl transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1800ms" }}
          >
            {t("mission.text")}
          </p>
        </div>
      </div>
    </section>
  )
}
