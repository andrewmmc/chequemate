import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextIntlClientProvider } from 'next-intl';
import { useState, useEffect } from 'react';
import en from '../../messages/en.json';
import zhHK from '../../messages/zh-HK.json';

const messages: Record<string, typeof en> = {
  en: en,
  'zh-HK': zhHK,
};

type Locale = 'zh-HK' | 'en';

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'zh-HK';
  const saved = localStorage.getItem('chequemate-locale') as Locale | null;
  if (saved === 'zh-HK' || saved === 'en') return saved;
  return 'zh-HK';
}

export default function App({ Component, pageProps }: AppProps) {
  const [locale, setLocale] = useState<Locale>(() => getInitialLocale());
  const [mounted] = useState(() => typeof window !== 'undefined');

  // Update HTML lang attribute when locale changes
  useEffect(() => {
    document.documentElement.lang = locale === 'zh-HK' ? 'zh-HK' : 'en';
  }, [locale]);

  // Save locale to localStorage when it changes
  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('chequemate-locale', newLocale);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <NextIntlClientProvider locale="zh-HK" messages={messages['zh-HK']}>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100" />
      </NextIntlClientProvider>
    );
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      <Component {...pageProps} locale={locale} onLocaleChange={handleLocaleChange} />
    </NextIntlClientProvider>
  );
}
