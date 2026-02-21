import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextIntlClientProvider } from 'next-intl';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import en from '../../messages/en.json';
import zhHK from '../../messages/zh-HK.json';

const messages: Record<string, typeof en> = {
  en: en,
  'zh-HK': zhHK,
};

function AppContent({ Component, pageProps }: AppProps) {
  const { locale } = useLanguage();

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}

export default function App(props: AppProps) {
  return (
    <LanguageProvider>
      <AppContent {...props} />
    </LanguageProvider>
  );
}
