'use client';

import { useLanguage } from '../contexts/LanguageContext';

export function LocaleToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language / 語言"
      className="flex items-center p-1 rounded-lg bg-paper-warm border border-cm-border"
    >
      <button
        onClick={() => setLocale('zh-HK')}
        aria-pressed={locale === 'zh-HK'}
        className={`
          relative px-3 py-1.5 text-sm font-medium rounded-md transition-all focus-visible:outline-none
          ${
            locale === 'zh-HK'
              ? 'bg-white text-ink border border-cm-border shadow-[0_1px_3px_rgba(0,0,0,0.1)]'
              : 'text-ink-muted hover:text-ink-soft border border-transparent'
          }
        `}
      >
        中文
      </button>
      <button
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`
          relative px-3 py-1.5 text-sm font-medium rounded-md transition-all focus-visible:outline-none
          ${
            locale === 'en'
              ? 'bg-white text-ink border border-cm-border shadow-[0_1px_3px_rgba(0,0,0,0.1)]'
              : 'text-ink-muted hover:text-ink-soft border border-transparent'
          }
        `}
      >
        EN
      </button>
    </div>
  );
}
