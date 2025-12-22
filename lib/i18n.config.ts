import type { Resource, ResourceLanguage } from "i18next"

import ar from "@/locales/ar.json"
import en from "@/locales/en.json"
import fr from "@/locales/fr.json"

export type SupportedLanguage = "en" | "fr" | "ar"

export const defaultLanguage: SupportedLanguage = "en"

export const resources: Resource = {
  en: en as ResourceLanguage,
  fr: fr as ResourceLanguage,
  ar: ar as ResourceLanguage,
}

export const supportedLanguages = Object.keys(resources) as SupportedLanguage[]

export function getDirection(language: SupportedLanguage): "ltr" | "rtl" {
  return language === "ar" ? "rtl" : "ltr"
}
