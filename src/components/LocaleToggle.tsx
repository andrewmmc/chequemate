'use client';

import { useLanguage } from '../contexts/LanguageContext';

export function LocaleToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center p-1 bg-gray-100/80 rounded-lg">
      <button
        onClick={() => setLocale('zh-HK')}
        className={`
          relative px-3 py-1.5 text-sm font-medium rounded-md transition-all
          ${locale === 'zh-HK' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}
        `}
      >
        {locale === 'zh-HK' && <span className="absolute inset-0 bg-white rounded-md shadow-sm" />}
        <span className="relative z-10">中文</span>
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`
          relative px-3 py-1.5 text-sm font-medium rounded-md transition-all
          ${locale === 'en' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}
        `}
      >
        {locale === 'en' && <span className="absolute inset-0 bg-white rounded-md shadow-sm" />}
        <span className="relative z-10">EN</span>
      </button>
    </div>
  );
}
