import i18next from "i18next"

import {
  defaultLanguage,
  getDirection,
  resources,
  supportedLanguages,
  type SupportedLanguage,
} from "./i18n.config"

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

export { defaultLanguage, getDirection, resources, supportedLanguages }
export type { SupportedLanguage }
export default i18next
