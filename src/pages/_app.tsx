import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextIntlClientProvider } from 'next-intl';
import { useState, useEffect } from 'react';
import en from '../../messages/en.json';
import zhHK from '../../messages/zh-HK.json';

const messages: Record<string, typeof en> = {
  'en': en,
  'zh-HK': zhHK,
};

type Locale = 'zh-HK' | 'en';

export default function App({ Component, pageProps }: AppProps) {
  const [locale, setLocale] = useState<Locale>('zh-HK');
  const [mounted, setMounted] = useState(false);

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('chequemate-locale') as Locale | null;
    if (savedLocale && (savedLocale === 'zh-HK' || savedLocale === 'en')) {
      setLocale(savedLocale);
    }
    setMounted(true);
  }, []);

  // Update HTML lang attribute when locale changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale === 'zh-HK' ? 'zh-HK' : 'en';
    }
  }, [locale, mounted]);

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
