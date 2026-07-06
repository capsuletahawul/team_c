import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('ct-theme') || 'light');
  const [lang, setLang] = useState(() => localStorage.getItem('ct-lang') || 'ar');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('ct-theme', theme);
    localStorage.setItem('ct-lang', lang);
  }, [theme, lang]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(l => l === 'ar' ? 'en' : 'ar');

  return (
    <ThemeContext.Provider value={{ theme, lang, toggleTheme, toggleLang }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
