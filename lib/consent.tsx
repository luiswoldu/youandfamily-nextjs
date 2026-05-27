"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

export type ConsentState = {
  necessary: true
  analytics: boolean
}

type ConsentContextValue = {
  consent: ConsentState | null
  hasDecided: boolean
  acceptAll: () => void
  rejectAll: () => void
  setConsent: (next: ConsentState) => void
  reopen: () => void
  isBannerOpen: boolean
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

const STORAGE_KEY = "yf-consent"
const STORAGE_VERSION = 1

type StoredConsent = {
  v: number
  analytics: boolean
}

function readStored(): ConsentState | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredConsent
    if (parsed.v !== STORAGE_VERSION) return null
    return { necessary: true, analytics: Boolean(parsed.analytics) }
  } catch {
    return null
  }
}

function writeStored(consent: ConsentState) {
  if (typeof window === "undefined") return
  const payload: StoredConsent = { v: STORAGE_VERSION, analytics: consent.analytics }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentState | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [forceOpen, setForceOpen] = useState(false)

  useEffect(() => {
    setConsentState(readStored())
    setHydrated(true)
  }, [])

  const setConsent = useCallback((next: ConsentState) => {
    writeStored(next)
    setConsentState(next)
    setForceOpen(false)
  }, [])

  const acceptAll = useCallback(() => {
    setConsent({ necessary: true, analytics: true })
  }, [setConsent])

  const rejectAll = useCallback(() => {
    setConsent({ necessary: true, analytics: false })
  }, [setConsent])

  const reopen = useCallback(() => {
    setForceOpen(true)
  }, [])

  const hasDecided = hydrated && consent !== null
  const isBannerOpen = hydrated && (consent === null || forceOpen)

  return (
    <ConsentContext.Provider
      value={{ consent, hasDecided, acceptAll, rejectAll, setConsent, reopen, isBannerOpen }}
    >
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  const ctx = useContext(ConsentContext)
  if (!ctx) {
    throw new Error("useConsent must be used within a ConsentProvider")
  }
  return ctx
}
