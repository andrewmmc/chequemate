import React from 'react';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export function AmountInput({ value, onChange, onBlur }: AmountInputProps) {
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
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        金額 Amount (HKD)
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
          $
        </span>
        <input
          id="amount"
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder="0.00"
          className="w-full pl-8 pr-4 py-3 text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">
        最高金額 Maximum: HKD 99,999,999,999.99
      </p>
    </div>
  );
}
