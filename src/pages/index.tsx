import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { AmountInput } from '../components/AmountInput';
import { QuickAmounts } from '../components/QuickAmounts';
import { ChequePreview } from '../components/ChequePreview';
import { HistoryList } from '../components/HistoryList';
import { LocaleToggle } from '../components/LocaleToggle';
import { numberToChinese } from '../utils/numberToChinese';
import { numberToEnglish } from '../utils/numberToEnglish';
import { useHistory } from '../hooks/useHistory';
import { parseAmount } from '../schemas/amount';

type Locale = 'zh-HK' | 'en';

interface HomeProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export default function Home({ locale, onLocaleChange }: HomeProps) {
  const router = useRouter();
  const t = useTranslations();
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory();

  // Get initial amount from URL
  const initialAmount = useMemo(() => {
    if (!router.isReady) return 0;
    return parseAmount(router.query.amount) ?? 0;
  }, [router.isReady, router.query.amount]);

  const [amount, setAmount] = useState<number>(() => initialAmount);
  const [inputValue, setInputValue] = useState<string>(() =>
    initialAmount === 0 ? '' : initialAmount.toString()
  );

  // Derived state - compute conversion from amount
  const { chineseText, englishText, error } = useMemo(() => {
    if (amount === 0) {
      return { chineseText: '', englishText: '', error: '' };
    }
    try {
      return {
        chineseText: numberToChinese(amount),
        englishText: numberToEnglish(amount),
        error: '',
      };
    } catch (err) {
      return {
        chineseText: '',
        englishText: '',
        error: err instanceof Error ? err.message : t('home.conversionError'),
      };
    }
  }, [amount, t]);

  // Sync URL with amount state
  useEffect(() => {
    if (amount === 0) {
      router.replace('/', undefined, { shallow: true });
    } else {
      router.replace(`?amount=${amount}`, undefined, { shallow: true });
    }
  }, [amount, router]);

  // Debounced history addition
  useEffect(() => {
    if (amount === 0 || !chineseText || !englishText) return;

    const timeoutId = setTimeout(() => {
      addToHistory(amount, chineseText, englishText);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [amount, chineseText, englishText, addToHistory]);

  // Update URL params when amount changes
  const updateAmount = useCallback((newAmount: number) => {
    setAmount(newAmount);
    setInputValue(newAmount === 0 ? '' : newAmount.toString());
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (value === '' || value === '.') {
      setAmount(0);
      return;
    }

    const validated = parseAmount(value);
    if (validated !== null) {
      setAmount(validated);
    }
  };

  const handleInputBlur = () => {
    if (inputValue === '' || inputValue === '.') {
      setInputValue('');
      setAmount(0);
    } else {
      const formatted = parseFloat(inputValue).toFixed(2);
      setInputValue(formatted);
      setAmount(parseFloat(formatted));
    }
  };

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
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('home.title')}</h1>
            <div className="flex justify-center">
              <LocaleToggle locale={locale} onLocaleChange={onLocaleChange} />
            </div>
          </header>

          {/* Main Content */}
          <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Amount Input */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <AmountInput
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <hr className="border-gray-200 my-3" />
              <QuickAmounts onSelect={handlePresetSelect} currentValue={amount} />
            </section>

            {/* Cheque Preview - order-2 on mobile, right column on desktop */}
            <section className="order-2 lg:order-none lg:row-span-2 lg:sticky lg:top-8 lg:self-start">
              <ChequePreview chinese={chineseText} english={englishText} amount={amount} />
            </section>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* History - order-3 on mobile */}
            <section className="order-3">
              <HistoryList
                history={history}
                onSelect={handleHistorySelect}
                onRemove={removeFromHistory}
                onClear={clearHistory}
              />
            </section>
          </main>

          {/* Footer */}
          <footer className="mt-12 text-center text-xs text-gray-400">
            <p>{t('home.disclaimer')}</p>
          </footer>
        </div>
      </div>
    </>
  );
}
