import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { COPY } from "../i18n/copy.js"; // Import your dictionary

// Shape of the language codes you support
type Lang = "ar" | "en";

// Shape of one entry inside COPY (adjust fields to match your actual copy.js structure)
interface CopyEntry {
  dir: "rtl" | "ltr";
  [key: string]: any; // allows all your other translation keys (platformOverview, etc.)
}

// Shape of what the context actually provides to components that use it
interface LanguageContextType {
  lang: Lang;
  toggleLanguage: () => void;
  t: CopyEntry;
}

// createContext needs a default value type — undefined until a Provider wraps it
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Props for the Provider component — it just needs to accept children
interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Check local storage first, default to 'ar' if nothing is saved
  const [lang, setLang] = useState<Lang>(
    (localStorage.getItem("appLang") as Lang) || "ar"
  );

  // Whenever the language changes, update the HTML direction and save to local storage
  useEffect(() => {
    document.documentElement.dir = COPY[lang].dir;
    document.documentElement.lang = lang;
    localStorage.setItem("appLang", lang);
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
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};