import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { AmountInput } from '../components/AmountInput';
import { ConversionResult } from '../components/ConversionResult';
import { PresetButtons } from '../components/PresetButtons';
import { ChequePreview } from '../components/ChequePreview';
import { HistoryList } from '../components/HistoryList';
import { numberToChinese } from '../utils/numberToChinese';
import { numberToEnglish } from '../utils/numberToEnglish';
import { useHistory } from '../hooks/useHistory';
import { parseAmount } from '../schemas/amount';

export default function Home() {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [chineseText, setChineseText] = useState<string>('');
  const [englishText, setEnglishText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory();

  // Read amount from URL params on initial load
  useEffect(() => {
    if (!router.isReady) return;

    const validated = parseAmount(router.query.amount);
    if (validated !== null) {
      setAmount(validated);
      setInputValue(validated.toString());
      // Update URL with cleaned/rounded value
      router.replace(`?amount=${validated}`, undefined, { shallow: true });
    } else if (router.query.amount) {
      // Clear invalid params from URL
      router.replace('/', undefined, { shallow: true });
    }
  }, [router.isReady, router.query.amount]);

  // Update URL params when amount changes
  const updateAmount = useCallback((newAmount: number) => {
    setAmount(newAmount);
    setInputValue(newAmount === 0 ? '' : newAmount.toString());

    if (newAmount === 0) {
      router.push('/', undefined, { shallow: true });
    } else {
      router.push(`?amount=${newAmount}`, undefined, { shallow: true });
    }
  }, [router]);

  // Convert amount whenever it changes
  useEffect(() => {
    if (amount === 0) {
      setChineseText('');
      setEnglishText('');
      setError('');
      return;
    }

    try {
      const chinese = numberToChinese(amount);
      const english = numberToEnglish(amount);
      setChineseText(chinese);
      setEnglishText(english);
      setError('');

      // Add to history
      addToHistory(amount, chinese, english);
    } catch (err) {
      setError(err instanceof Error ? err.message : '轉換錯誤 Conversion error');
      setChineseText('');
      setEnglishText('');
    }
  }, [amount, addToHistory]);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (value === '' || value === '.') {
      setAmount(0);
      router.push('/', undefined, { shallow: true });
      return;
    }

    const validated = parseAmount(value);
    if (validated !== null) {
      setAmount(validated);
      router.push(`?amount=${validated}`, undefined, { shallow: true });
    }
  };

  const handleInputBlur = () => {
    // Format on blur
    if (inputValue === '' || inputValue === '.') {
      setInputValue('');
      setAmount(0);
      router.push('/', undefined, { shallow: true });
    } else {
      const formatted = parseFloat(inputValue).toFixed(2);
      setInputValue(formatted);
      const numValue = parseFloat(formatted);
      setAmount(numValue);
      router.push(`?amount=${numValue}`, undefined, { shallow: true });
    }
  };

  const handlePresetSelect = (value: number) => {
    updateAmount(value);
  };

  const handleHistorySelect = (value: number) => {
    updateAmount(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            香港支票金額轉換器
          </h1>
          <p className="text-lg text-gray-600">
            Hong Kong Cheque Amount Converter
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-6">
          {/* Amount Input */}
          <section className="bg-white rounded-xl shadow-lg p-6">
            <AmountInput
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
          </section>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Preset Buttons */}
          <section>
            <PresetButtons onSelect={handlePresetSelect} currentValue={amount} />
          </section>

          {/* Conversion Results */}
          <section className="space-y-4">
            <ConversionResult
              label="中文 Chinese"
              value={chineseText}
              language="chinese"
            />
            <ConversionResult
              label="英文 English"
              value={englishText}
              language="english"
            />
          </section>

          {/* Cheque Preview */}
          <section>
            <ChequePreview
              chinese={chineseText}
              english={englishText}
              amount={amount}
            />
          </section>

          {/* History */}
          <section>
            <HistoryList
              history={history}
              onSelect={handleHistorySelect}
              onRemove={removeFromHistory}
              onClear={clearHistory}
            />
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>支援金額最高達港幣玖佰玖拾玖億玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖元玖角玖分</p>
          <p>Supports amounts up to HKD 99,999,999,999.99</p>
        </footer>
      </div>
    </div>
  );
}
