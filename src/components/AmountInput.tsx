import React from 'react';
import { useTranslations } from 'next-intl';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export function AmountInput({ value, onChange, onBlur }: AmountInputProps) {
  const t = useTranslations();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow empty input
    if (inputValue === '') {
      onChange('');
      return;
    }

    // Validate numeric input with optional decimal
    const regex = /^\d*\.?\d{0,2}$/;
    if (!regex.test(inputValue)) {
      return;
    }

    onChange(inputValue);
  };

  return (
    <div className="w-full">
      <label
        htmlFor="amount"
        className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
      >
        {t('amountInput.label')}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <span className="text-gray-400 font-medium text-sm">HKD</span>
          <div className="w-px h-5 bg-gray-200"></div>
        </div>
        <input
          id="amount"
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder="0.00"
          className="w-full pl-20 pr-4 py-4 text-3xl font-semibold text-gray-900 bg-gray-50 rounded-xl border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all placeholder:text-gray-300"
          style={{ letterSpacing: '-0.02em' }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-400 flex items-center gap-1">
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4m0-4h.01" strokeLinecap="round" />
        </svg>
        {t('amountInput.maxHint')}
      </p>
    </div>
  );
}
