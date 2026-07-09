import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextValue {
  lang: Language;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('idl-lang');
    return saved === 'vi' || saved === 'en' ? saved : 'vi';
  });

  useEffect(() => {
    localStorage.setItem('idl-lang', lang);
  }, [lang]);

  const toggleLang = () => setLangState(prev => (prev === 'vi' ? 'en' : 'vi'));
  const setLang = (l: Language) => setLangState(l);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
