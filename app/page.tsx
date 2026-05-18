import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { NumbersSection } from "@/components/numbers-section"
import { WhatWeDoSection } from "@/components/what-we-do-section"
import { MissionSection } from "@/components/mission-section"
import { StoriesSection } from "@/components/stories-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MissionSection />
      <WhatWeDoSection />
      <NumbersSection />
      <StoriesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

