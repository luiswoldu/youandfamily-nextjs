"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import ar from "@/public/localization/ar.json"
import de from "@/public/localization/de.json"
import en from "@/public/localization/en.json"
import tr from "@/public/localization/tr.json"

const bundled = {
  de,
  en,
  tr,
  ar,
} as const

export type Language = keyof typeof bundled
export const SUPPORTED_LANGUAGES: Language[] = Object.keys(bundled) as Language[]
export const DEFAULT_LANGUAGE: Language = "de"

const RTL_LANGUAGES: ReadonlySet<Language> = new Set(["ar"])

export function getLanguageDirection(lang: Language): "ltr" | "rtl" {
  return RTL_LANGUAGES.has(lang) ? "rtl" : "ltr"
}

type TranslationValue = string | number | TranslationValue[] | { [key: string]: TranslationValue }

type LanguageContextValue = {
  lang: Language
  setLang: (lang: Language) => void
  t: <T = string>(key: string) => T
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "yf-lang"

function resolve(dict: TranslationValue, key: string): TranslationValue | undefined {
  const parts = key.split(".")
  let current: TranslationValue | undefined = dict
  for (const part of parts) {
    if (current && typeof current === "object" && !Array.isArray(current) && part in current) {
      current = (current as { [key: string]: TranslationValue })[part]
    } else {
      return undefined
    }
  }
  return current
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null
    if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
      setLangState(stored)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = getLanguageDirection(lang)
  }, [lang])

  const setLang = useCallback((next: Language) => {
    if (!SUPPORTED_LANGUAGES.includes(next)) return
    setLangState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const t = useCallback(
    <T,>(key: string): T => {
      const active = bundled[lang] as TranslationValue
      const fallback = bundled[DEFAULT_LANGUAGE] as TranslationValue
      const value = resolve(active, key) ?? resolve(fallback, key)
      return (value ?? key) as T
    },
    [lang],
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return ctx
}
