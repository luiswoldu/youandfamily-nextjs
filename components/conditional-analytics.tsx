"use client"

import { Analytics } from "@vercel/analytics/next"
import { useConsent } from "@/lib/consent"

export function ConditionalAnalytics() {
  const { consent } = useConsent()
  if (!consent?.analytics) return null
  return <Analytics />
}
