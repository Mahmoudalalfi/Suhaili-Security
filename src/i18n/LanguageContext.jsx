import React, { createContext, useContext, useState, useEffect } from 'react'
import translations from './translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('sec_lang') || 'de')

  useEffect(() => {
    localStorage.setItem('sec_lang', lang)
    document.documentElement.lang = lang
    document.title =
      lang === 'de'
        ? 'Suhaili Security — Sicherheitsdienst Berlin'
        : 'Suhaili Security — Security Services Berlin'
  }, [lang])

  const toggleLanguage = () => setLang(p => p === 'de' ? 'en' : 'de')

  const t = (key) => {
    const keys = key.split('.')
    let result = translations[lang]
    for (const k of keys) {
      if (result && result[k] !== undefined) result = result[k]
      else return key
    }
    return result
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
