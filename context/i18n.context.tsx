"use client"

import * as React from "react"

import i18n, {
  defaultLanguage,
  getDirection,
  type SupportedLanguage,
  supportedLanguages,
} from "@/lib/i18n"
import { LANGUAGE_STORAGE_KEY } from "@/constants"

type I18nContextValue = {
  language: SupportedLanguage
  direction: "ltr" | "rtl"
  changeLanguage: (language: SupportedLanguage) => void
  t: typeof i18n.t
  supportedLanguages: SupportedLanguage[]
}

const I18nContext = React.createContext<I18nContextValue | null>(null)

function resolveInitialLanguage(): SupportedLanguage {
  if (typeof window === "undefined") {
    return defaultLanguage
  }

  const stored = window.localStorage.getItem(
    LANGUAGE_STORAGE_KEY
  ) as SupportedLanguage | null

  if (stored && supportedLanguages.includes(stored)) {
    return stored
  }

  const browserLanguage = navigator.language?.slice(0, 2) as
    | SupportedLanguage
    | undefined

  if (browserLanguage && supportedLanguages.includes(browserLanguage)) {
    return browserLanguage
  }

  return defaultLanguage
}

function I18nProvider({
  children,
  initialLanguage = defaultLanguage,
}: {
  children: React.ReactNode
  initialLanguage?: SupportedLanguage
}) {
  const [language, setLanguage] = React.useState<SupportedLanguage>(() =>
    typeof window === "undefined" ? initialLanguage : resolveInitialLanguage()
  )

  const direction = getDirection(language)

  const changeLanguage = React.useCallback((nextLanguage: SupportedLanguage) => {
    void i18n.changeLanguage(nextLanguage)
  }, [])

  React.useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      const nextLanguage = supportedLanguages.includes(lng as SupportedLanguage)
        ? (lng as SupportedLanguage)
        : defaultLanguage
      setLanguage(nextLanguage)
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
    }

    i18n.on("languageChanged", handleLanguageChanged)
    if (i18n.language !== language) {
      void i18n.changeLanguage(language)
    }

    return () => {
      i18n.off("languageChanged", handleLanguageChanged)
    }
  }, [language])

  React.useEffect(() => {
    if (typeof document === "undefined") return

    document.documentElement.lang = language
    document.documentElement.dir = direction
  }, [language, direction])

  const value = React.useMemo<I18nContextValue>(
    () => ({
      language,
      direction,
      changeLanguage,
      t: i18n.t.bind(i18n),
      supportedLanguages,
    }),
    [language, direction, changeLanguage]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

function useI18n() {
  const context = React.useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}

export { I18nProvider, useI18n, supportedLanguages }
export type { SupportedLanguage }
