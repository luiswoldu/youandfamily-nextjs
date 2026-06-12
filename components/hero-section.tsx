"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useTranslation } from "@/lib/i18n"

export function HeroSection() {
  const { t } = useTranslation()
  const [scrollY, setScrollY] = useState(0)
  const [isTextVisible, setIsTextVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    setIsTextVisible(true)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const imageScale = scrollY > 50 ? 1 + Math.min((scrollY - 50) / 2000, 0.14) : 1

  function scrollToContact() {
    const el = document.getElementById("contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      className="min-h-screen flex items-center px-6 py-12 lg:py-0 overflow-hidden"
      style={{ backgroundColor: "#fff4f0" }}
    >
      <div className="relative max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Text content - left side (right side in RTL) */}
        <div
          className={`relative z-10 w-full lg:w-1/2 flex flex-col gap-7 text-center lg:text-left rtl:lg:text-right transition-all duration-1000 ease-out ${
            isTextVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-sans leading-tighter text-balance text-foreground">
            {t("hero.h1")}
          </h1>
          <p className="text-xl md:text-2xl font-sans text-foreground max-w-xl leading-tight text-pretty">
            {t("hero.subline")}
          </p>
          <div className="flex flex-col sm:flex-row items-center lg:items-start rtl:lg:items-end gap-4 mt-2">
            <button
              onClick={scrollToContact}
              className="px-8 py-4 rounded-full text-xl font-semibold font-sans transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#a477ff", color: "#ffffff" }}
            >
              {t("hero.buttons.apply")}
            </button>
            <Link
              href="/donate"
              className="px-8 py-4 rounded-full text-xl font-semibold font-sans transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#ffffff", color: "#000000" }}
            >
              {t("hero.buttons.donate")}
            </Link>
          </div>
        </div>

        {/* Image - right side (left side in RTL) */}
        <div className="relative z-20 w-full lg:absolute lg:right-[-8%] rtl:lg:right-auto rtl:lg:left-[-8%] lg:top-1/2 lg:-translate-y-1/2 lg:w-[52%] flex justify-center lg:justify-end rtl:lg:justify-start pointer-events-none">
          {/* Bird - above the left corner of the image (decoupled, own fade-in) */}
          <Image
            src="/images/bird-icon-blue.png"
            alt=""
            width={1020}
            height={1020}
            className={`absolute z-30 top-2 left-[-10%] rtl:left-auto rtl:right-[-10%] w-32 md:w-32 lg:w-52 h-auto transition-opacity duration-2500 ease-out ${
              isTextVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          />
          {/* Cloud - far right above the hero image (decoupled, own fade-in) */}
          <Image
            src="/images/cloud-icon-blue.png"
            alt=""
            width={180}
            height={120}
            className={`absolute top-[-2.5rem] right-[2%] rtl:right-auto rtl:left-[2%] w-28 md:w-36 lg:w-44 h-auto z-10 transition-opacity duration-[2500ms] ease-out ${
              isTextVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "1000ms" }}
          />
          <div className="transition-transform duration-300 ease-out" style={{ transform: `scale(${imageScale})` }}>
            <Image
              src="/images/IMAGE_7.png"
              alt={t("hero.image_alt")}
              width={1200}
              height={1000}
              className="w-full max-w-md sm:max-w-lg lg:max-w-none h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
