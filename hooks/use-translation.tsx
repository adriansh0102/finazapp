"use client"

import { useContext } from "react"
import { LanguageContext } from "@/components/language-provider"
import { translations } from "@/lib/translations"

export function useTranslation() {
  const { language, setLanguage } = useContext(LanguageContext)

  const t = (key: string) => {
    const keys = key.split(".")
    let value = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return key
      }
    }

    return value as string
  }

  return { language, setLanguage, t }
}
