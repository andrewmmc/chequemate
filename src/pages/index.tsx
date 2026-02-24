import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { AmountInput } from '../components/AmountInput';
import { QuickAmounts } from '../components/QuickAmounts';
import { ChequePreview } from '../components/ChequePreview';
import { HistoryList } from '../components/HistoryList';
import { LocaleToggle } from '../components/LocaleToggle';
import { useHistory } from '../hooks/useHistory';
import { useAmountInputState } from '../hooks/useAmountInputState';
import {
  useAmountUrlSync,
  useInitialAmountFromUrl,
  useInitialCurrencyFromUrl,
  useCurrencyUrlSync,
} from '../hooks/useAmountUrlSync';
import { useChequeConversion } from '../hooks/useChequeConversion';
import { useLanguage } from '../contexts/LanguageContext';
import { Currency } from '../domain/currency';

export default function Home() {
  const router = useRouter();
  const t = useTranslations();
  const { locale } = useLanguage();
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory();
  const initialAmount = useInitialAmountFromUrl(router);
  const currency = useInitialCurrencyFromUrl(router);
  const setCurrency = useCurrencyUrlSync(router);
  const { amount, inputValue, updateAmount, handleInputChange, handleInputBlur } =
    useAmountInputState(initialAmount);
  useAmountUrlSync(router, amount);
  const { chineseText, simplifiedChineseText, englishText, error } = useChequeConversion(
    amount,
    t('home.conversionError')
  );
  const hasHydratedFromUrlRef = useRef(false);

  // Hydrate amount from URL once router is ready
  useEffect(() => {
    if (!router.isReady || hasHydratedFromUrlRef.current) return;
    hasHydratedFromUrlRef.current = true;
    updateAmount(initialAmount);
  }, [router.isReady, initialAmount, updateAmount]);

  // Debounced history addition
  useEffect(() => {
    if (amount === 0 || error) return;
    const timeoutId = setTimeout(() => {
      addToHistory(amount, currency, chineseText, simplifiedChineseText, englishText);
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [amount, currency, chineseText, simplifiedChineseText, englishText, error, addToHistory]);

  const handlePresetSelect = (value: number) => updateAmount(value);
  const handleHistorySelect = (value: number, historyCurrency: Currency) => {
    setCurrency(historyCurrency);
    updateAmount(value);
  };

  return (
    <>
      <Head>
        <title>
          {locale === 'zh-HK'
            ? '支票金額轉換器 - ChequeMate'
            : 'Cheque Amount Converter - ChequeMate'}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      <div className="min-h-screen bg-paper">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-paper/85 border-b border-cm-border">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Wordmark */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gold flex items-center justify-center shadow-[0_2px_8px_rgba(146,102,12,0.3)]">
                <svg
                  className="w-4.5 h-4.5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20M6 14h4M14 14h4" strokeLinecap="round" />
                </svg>
              </div>
              <h1 className="text-lg font-semibold font-serif text-ink tracking-tight">
                ChequeMate
              </h1>
            </div>
            <LocaleToggle />
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 pt-6 pb-20">
          {/* Page title */}
          <div className="mb-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold font-serif text-ink tracking-tight">
              {t('home.title')}
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              {locale === 'zh-HK'
                ? '輸入金額，自動轉換為中英文大寫'
                : 'Enter an amount to convert to Chinese & English words'}
            </p>
          </div>

          {/* Amount input card */}
          <section className="overflow-hidden rounded-[14px] border border-cm-border bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_4px_16px_rgba(0,0,0,0.04)] mb-4 animate-fade-in-up delay-1">
            <div className="p-5">
              <AmountInput
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                currency={currency}
                onCurrencyChange={setCurrency}
              />
            </div>
            <div className="border-t border-cm-border p-5 pt-4">
              <QuickAmounts
                onSelect={handlePresetSelect}
                currentValue={amount}
                currency={currency}
              />
            </div>
          </section>

          {/* Error message */}
          {error && (
            <div
              className="mb-4 p-4 rounded-[14px] bg-error-bg border border-cm-error/20 animate-scale-in"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-cm-error/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-cm-error"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-cm-error">{error}</p>
              </div>
            </div>
          )}

          {/* Cheque preview */}
          <section className="mb-4 animate-fade-in-up delay-2">
            <ChequePreview
              chinese={chineseText}
              simplifiedChinese={simplifiedChineseText}
              english={englishText}
              currency={currency}
            />
          </section>

          {/* History */}
          <section className="animate-fade-in-up delay-3">
            <HistoryList
              history={history}
              onSelect={handleHistorySelect}
              onRemove={removeFromHistory}
              onClear={clearHistory}
            />
          </section>

          {/* Footer */}
          <footer className="mt-8 text-center space-y-3">
            <p className="text-xs text-ink-muted leading-relaxed">{t('home.disclaimer')}</p>
            <a
              href="https://github.com/andrewmmc/chequemate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink-soft transition-colors focus-visible:outline-none"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </footer>
        </main>
      </div>
    </>
  );
}
