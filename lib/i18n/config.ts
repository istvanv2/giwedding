export const locales = ["ro", "hu", "en", "de", "fr"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "ro"

export const localeNames: Record<Locale, string> = {
  ro: "Rom\u00e2n\u0103",
  hu: "Magyar",
  en: "English",
  de: "Deutsch",
  fr: "Fran\u00e7ais",
}
