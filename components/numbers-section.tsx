"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

type Stat = { value: string; label: string }

export function NumbersSection() {
  const { t } = useTranslation()
  const stats = t<Stat[]>("numbers.stats")
  const sectionRef = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (stats.length > 0 && activeIndex >= stats.length) {
      setActiveIndex(0)
    }
  }, [stats.length, activeIndex])

  const goPrev = () =>
    setActiveIndex((i) => (stats.length === 0 ? 0 : (i - 1 + stats.length) % stats.length))
  const goNext = () =>
    setActiveIndex((i) => (stats.length === 0 ? 0 : (i + 1) % stats.length))

  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const rawProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height)
      const clamped = Math.max(0, Math.min(1, rawProgress))
      setProgress(clamped)
    }

    let rafId = 0
    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener("scroll", onScrollOrResize, { passive: true })
    window.addEventListener("resize", onScrollOrResize)

    return () => {
      window.removeEventListener("scroll", onScrollOrResize)
      window.removeEventListener("resize", onScrollOrResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const createIconStyle = (offset = 0) => {
    const shifted = Math.max(0, Math.min(1, progress + offset))
    const inOut = 1 - Math.abs(shifted - 0.5) * 2
    const bounce = Math.sin(inOut * Math.PI * 3) * (1 - inOut) * 0.2
    const scale = 0.55 + inOut * 0.45 + bounce
    const opacity = 0.2 + inOut * 0.8
    const translateY = (1 - inOut) * 26 - bounce * 24
    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity,
    }
  }

  return (
    <section
      ref={sectionRef}
      id="numbers"
      className="px-6 py-24 relative overflow-hidden"
      style={{ backgroundColor: "#e6eaff" }}
    >
      {/* Decorative icons scattered around the section */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left - Sun */}
        <Image
          src="/images/icons/sun.png"
          alt=""
          width={160}
          height={160}
          className="absolute top-8 left-8 opacity-60 hidden md:block"
          style={createIconStyle(0)}
        />
        {/* Top right - Moon */}
        <Image
          src="/images/icons/moon.png"
          alt=""
          width={120}
          height={120}
          className="absolute top-16 right-12 opacity-60 hidden md:block"
          style={createIconStyle(-0.06)}
        />
        {/* Bottom left - Tent */}
        <Image
          src="/images/icons/tent.png"
          alt=""
          width={180}
          height={180}
          className="absolute bottom-12 left-16 opacity-60 hidden md:block z-20"
          style={createIconStyle(0.08)}
        />
        {/* Bottom right - Fish */}
        <Image
          src="/images/icons/fish.png"
          alt=""
          width={140}
          height={140}
          className="absolute bottom-20 right-20 opacity-60 hidden md:block z-20"
          style={createIconStyle(-0.12)}
        />
        {/* Middle right - Flowers */}
        <Image
          src="/images/icons/flowers.png"
          alt=""
          width={200}
          height={200}
          className="absolute top-1/2 -translate-y-1/2 right-4 opacity-50 hidden lg:block"
          style={createIconStyle(0.04)}
        />
        {/* Middle left - smaller Moon */}
        <Image
          src="/images/icons/moon.png"
          alt=""
          width={90}
          height={90}
          className="absolute top-1/3 left-4 opacity-40 hidden lg:block"
          style={createIconStyle(-0.04)}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Desktop / tablet: horizontal grid */}
        <div
          className="hidden md:block rounded-3xl p-10 md:p-16"
          style={{ backgroundColor: "#fbf7f5" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-2">
                <span className="text-6xl md:text-7xl font-bold font-sans text-foreground">
                  {stat.value}
                </span>
                <span className="text-xl font-sans text-foreground leading-relaxed">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: single-card carousel */}
        <div className="md:hidden">
          <div
            className="rounded-3xl px-6 py-12"
            style={{ backgroundColor: "#fbf7f5" }}
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="w-full shrink-0 flex flex-col items-center text-center gap-4 px-2"
                  >
                    <span className="text-6xl font-bold font-sans text-foreground leading-none">
                      {stat.value}
                    </span>
                    <span className="text-lg font-sans text-foreground leading-relaxed">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous statistic"
                className="shrink-0 grid place-items-center w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>

              <div
                className="flex-1 h-1 rounded-full bg-foreground/10 overflow-hidden"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={stats.length}
                aria-valuenow={activeIndex + 1}
              >
                <div
                  className="h-full rounded-full bg-foreground transition-all duration-500"
                  style={{
                    width: `${stats.length === 0 ? 0 : ((activeIndex + 1) / stats.length) * 100}%`,
                  }}
                />
              </div>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next statistic"
                className="shrink-0 grid place-items-center w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
