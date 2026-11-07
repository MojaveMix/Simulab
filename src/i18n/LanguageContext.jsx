import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { TRANSLATIONS } from "./translations";

const LanguageContext = createContext(null);

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", short: "EN", flag: "🇺🇸", dir: "ltr" },
  { code: "fr", label: "Français", short: "FR", flag: "🇫🇷", dir: "ltr" },
  { code: "ar", label: "العربية", short: "AR", flag: "🇸🇦", dir: "ltr" },
];

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const stored = localStorage.getItem("simulab-lang");
      if (stored && ["en", "fr", "ar"].includes(stored)) return stored;
      const navLang = navigator.language?.slice(0, 2);
      if (navLang === "fr" || navLang === "ar") return navLang;
      return "en";
    } catch {
      return "en";
    }
  });

  const isRTL = false;

  useEffect(() => {
    try {
      localStorage.setItem("simulab-lang", lang);
    } catch {}

    const html = document.documentElement;
    html.lang = lang;
    html.dir = "ltr";
    html.classList.remove("rtl");
  }, [lang]);

  const setLang = useCallback((newLang) => {
    if (["en", "fr", "ar"].includes(newLang)) {
      setLangState(newLang);
    }
  }, []);

  const t = useCallback(
    (keyPath, params = {}) => {
      const parts = keyPath.split(".");
      let val = TRANSLATIONS[lang];
      for (const p of parts) {
        if (!val || typeof val !== "object") {
          val = undefined;
          break;
        }
        val = val[p];
      }
      if (val === undefined) {
        let fallbackVal = TRANSLATIONS.en;
        for (const p of parts) {
          if (!fallbackVal || typeof fallbackVal !== "object") {
            fallbackVal = undefined;
            break;
          }
          fallbackVal = fallbackVal[p];
        }
        val = fallbackVal ?? keyPath;
      }
      if (typeof val === "string" && params) {
        return val.replace(/\{(\w+)\}/g, (_, k) =>
          params[k] !== undefined ? params[k] : `{${k}}`
        );
      }
      return val;
    },
    [lang]
  );

  const value = useMemo(
    () => ({
      lang,
      setLang,
      isRTL,
      t,
      languages: SUPPORTED_LANGUAGES,
    }),
    [lang, setLang, isRTL, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
