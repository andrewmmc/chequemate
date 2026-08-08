'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useSyncExternalStore,
} from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

type Locale = 'zh-HK' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLocale(): Locale {
  const saved = getStorageItem('chequemate-locale') as Locale | null;
  if (saved === 'zh-HK' || saved === 'en') return saved;
  return 'zh-HK';
}

const emptySubscribe = () => () => {};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLocale, setSelectedLocale] = useState<Locale | null>(null);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const locale = mounted ? (selectedLocale ?? getInitialLocale()) : 'zh-HK';

  useEffect(() => {
    document.documentElement.lang = locale === 'zh-HK' ? 'zh-HK' : 'en';
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setSelectedLocale(newLocale);
    setStorageItem('chequemate-locale', newLocale);
  };

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
