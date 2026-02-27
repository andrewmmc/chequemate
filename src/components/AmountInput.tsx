import React from 'react';
import { useTranslations } from 'next-intl';
import { MAX_AMOUNT } from '../domain/amount';
import { Currency } from '../domain/currency';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export function AmountInput({
  value,
  onChange,
  onBlur,
  currency,
  onCurrencyChange,
}: AmountInputProps) {
  const t = useTranslations();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/,/g, '');

    if (inputValue === '') {
      onChange('');
      return;
    }

    const regex = /^\d*\.?\d{0,2}$/;
    if (!regex.test(inputValue)) {
      return;
    }

    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue > MAX_AMOUNT) {
      return;
    }

    onChange(inputValue);
  };

  return (
    <div className="w-full">
      <label
        htmlFor="amount"
        className="block text-xs font-semibold uppercase tracking-[0.1em] mb-3 text-ink-muted"
      >
        {t('amountInput.label')}
      </label>

      <div className="relative">
        {/* Currency selector */}
        <div className="absolute left-0 top-0 bottom-0 flex items-center pl-4">
          <div className="relative flex items-center">
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as Currency)}
              aria-label="Select currency"
              className="appearance-none bg-transparent text-sm font-semibold tracking-wide text-gold font-mono pl-1 pr-5 cursor-pointer focus-visible:outline-none"
            >
              <option value="HKD">HKD</option>
              <option value="RMB">RMB</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
            <svg
              className="w-3 h-3 text-gold absolute right-0 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div className="w-px h-6 ml-2 bg-border-mid" />
        </div>

        <input
          id="amount"
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder="0.00"
          autoComplete="off"
          className="w-full pl-[7rem] pr-12 py-4 text-[2rem] font-semibold font-mono tracking-tight text-ink bg-white border border-cm-border rounded-xl outline-none transition-all placeholder:text-ink-muted/40 focus:border-gold-mid focus:shadow-[0_0_0_3px_rgba(196,138,20,0.15)]"
        />

        {/* Clear button */}
        {value !== '' && (
          <button
            type="button"
            aria-label="Clear amount"
            onMouseDown={(e) => {
              e.preventDefault(); // keep input focused
              onChange('');
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-paper-warm text-ink-muted hover:bg-border hover:text-ink transition-all cursor-pointer focus-visible:outline-none"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      <p className="mt-2.5 text-xs flex items-center gap-1.5 text-ink-muted">
        <svg
          className="w-3.5 h-3.5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4m0-4h.01" strokeLinecap="round" />
        </svg>
        {t('amountInput.maxHint')}
      </p>
    </div>
  );
}
