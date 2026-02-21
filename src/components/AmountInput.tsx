import React from 'react';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
}

export function AmountInput({
  value,
  onChange,
  max = 99999999999.99,
  min = 0,
}: AmountInputProps) {
  const [displayValue, setDisplayValue] = React.useState(value === 0 ? '' : value.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow empty input
    if (inputValue === '') {
      setDisplayValue('');
      onChange(0);
      return;
    }

    // Validate numeric input with optional decimal
    const regex = /^\d*\.?\d{0,2}$/;
    if (!regex.test(inputValue)) {
      return;
    }

    // Parse and validate range
    const numValue = parseFloat(inputValue);

    if (!isNaN(numValue)) {
      if (numValue < min || numValue > max) {
        return;
      }
      onChange(numValue);
    }

    setDisplayValue(inputValue);
  };

  const handleBlur = () => {
    // Format the display value on blur
    if (displayValue === '' || parseFloat(displayValue) === 0) {
      setDisplayValue('');
      onChange(0);
    } else {
      const formatted = parseFloat(displayValue).toFixed(2);
      setDisplayValue(formatted);
      onChange(parseFloat(formatted));
    }
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
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
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
