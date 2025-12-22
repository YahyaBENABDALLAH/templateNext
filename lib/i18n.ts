"use client"

import i18next, { type Resource, type ResourceLanguage } from "i18next"
import ar from "@/locales/ar.json"
import en from "@/locales/en.json"
import fr from "@/locales/fr.json"

export type SupportedLanguage = "en" | "fr" | "ar"

export const defaultLanguage: SupportedLanguage = "en"

const resources: Resource = {
  en: en as ResourceLanguage,
  fr: fr as ResourceLanguage,
  ar: ar as ResourceLanguage,
}

const supportedLanguages = Object.keys(resources)

if (!i18next.isInitialized) {
  i18next.init({
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    resources,
    interpolation: { escapeValue: false },
    defaultNS: "translation",
  })
}

export { resources }
export default i18next
