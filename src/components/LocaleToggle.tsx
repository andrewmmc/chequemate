'use client';

import { useLanguage } from '../contexts/LanguageContext';

export function LocaleToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setLocale('zh-HK')}
        className={`
          px-3 py-1 text-sm font-medium rounded-md transition-all
          ${
            locale === 'zh-HK'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }
        `}
      >
        中文
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`
          px-3 py-1 text-sm font-medium rounded-md transition-all
          ${
            locale === 'en'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }
        `}
      >
        EN
      </button>
    </div>
  );
}
