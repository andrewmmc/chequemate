import { useEffect } from 'react';
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
import { useAmountUrlSync, useInitialAmountFromUrl } from '../hooks/useAmountUrlSync';
import { useChequeConversion } from '../hooks/useChequeConversion';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const router = useRouter();
  const t = useTranslations();
  const { locale } = useLanguage();
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory();
  const initialAmount = useInitialAmountFromUrl(router);
  const { amount, inputValue, updateAmount, handleInputChange, handleInputBlur } =
    useAmountInputState(initialAmount);
  useAmountUrlSync(router, amount);
  const { chineseText, englishText, error } = useChequeConversion(
    amount,
    t('home.conversionError')
  );

  // Debounced history addition
  useEffect(() => {
    if (amount === 0 || !chineseText || !englishText) return;

    const timeoutId = setTimeout(() => {
      addToHistory(amount, chineseText, englishText);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [amount, chineseText, englishText, addToHistory]);

  const handlePresetSelect = (value: number) => {
    updateAmount(value);
  };

  const handleHistorySelect = (value: number) => {
    updateAmount(value);
  };

  return (
    <>
      <Head>
        <title>
          {locale === 'zh-HK'
            ? '香港支票金額轉換器 - ChequeMate'
            : 'Hong Kong Cheque Amount Converter - ChequeMate'}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <div className="min-h-screen" style={{ background: '#f2f2f7' }}>
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #007aff 0%, #5856d6 100%)' }}
              >
                <svg
                  className="w-4.5 h-4.5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-lg font-semibold text-gray-900 tracking-tight">ChequeMate</h1>
            </div>
            <LocaleToggle />
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-6 pb-20">
          {/* Page Title */}
          <div className="mb-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('home.title')}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {locale === 'zh-HK'
                ? '輸入金額，自動轉換為中英文大寫'
                : 'Enter amount to convert to Chinese & English words'}
            </p>
          </div>

          {/* Amount Input Card */}
          <section className="ios-card mb-4 overflow-hidden animate-fade-in-up delay-1">
            <div className="p-5">
              <AmountInput
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
            <div className="border-t border-gray-100 p-5 pt-4">
              <QuickAmounts onSelect={handlePresetSelect} currentValue={amount} />
            </div>
          </section>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 rounded-2xl bg-red-50 border border-red-100 animate-scale-in">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Cheque Preview */}
          <section className="mb-4 animate-fade-in-up delay-2">
            <ChequePreview chinese={chineseText} english={englishText} />
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
            <p className="text-xs text-gray-400 leading-relaxed">{t('home.disclaimer')}</p>
            <a
              href="https://github.com/andrewmmc/chequemate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}
