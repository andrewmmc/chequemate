'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'zh-HK' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'zh-HK';
  const saved = localStorage.getItem('chequemate-locale') as Locale | null;
  if (saved === 'zh-HK' || saved === 'en') return saved;
  return 'zh-HK';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale());
  const [mounted] = useState(() => typeof window !== 'undefined');

  useEffect(() => {
    document.documentElement.lang = locale === 'zh-HK' ? 'zh-HK' : 'en';
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('chequemate-locale', newLocale);
  };

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ locale: 'zh-HK', setLocale: () => {} }}>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100" />
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
