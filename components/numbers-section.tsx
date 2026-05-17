"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "@/lib/i18n"

type Stat = { value: string; label: string }

export function NumbersSection() {
  const { t } = useTranslation()
  const stats = t<Stat[]>("numbers.stats")
  const sectionRef = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)

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
          className="absolute bottom-12 left-16 opacity-60 hidden md:block"
          style={createIconStyle(0.08)}
        />
        {/* Bottom right - Fish */}
        <Image
          src="/images/icons/fish.png"
          alt=""
          width={140}
          height={140}
          className="absolute bottom-20 right-20 opacity-60 hidden md:block"
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
        <div className="rounded-3xl p-10 md:p-16" style={{ backgroundColor: "#fbf7f5" }}>
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
      </div>
    </section>
  )
}
