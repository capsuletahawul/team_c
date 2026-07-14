import { createContext, useState, useContext, useEffect } from "react";
import { COPY } from "../i18n/copy.js"; // Import your dictionary

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Check local storage first, default to 'ar' if nothing is saved
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'ar');

  // Whenever the language changes, update the HTML direction and save to local storage
  useEffect(() => {
    document.documentElement.dir = COPY[lang].dir;
    document.documentElement.lang = lang;
    localStorage.setItem('appLang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const t = COPY[lang]; // The current translation object

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to easily grab translations anywhere
export const useLanguage = () => useContext(LanguageContext);