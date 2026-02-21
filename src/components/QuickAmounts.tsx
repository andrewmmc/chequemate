import React from 'react';
import { useTranslations } from 'next-intl';

interface QuickAmountsProps {
  onSelect: (amount: number) => void;
  currentValue: number;
}

const PRESETS = [
  { label: '$100', value: 100 },
  { label: '$500', value: 500 },
  { label: '$1,000', value: 1000 },
  { label: '$5,000', value: 5000 },
  { label: '$10,000', value: 10000 },
  { label: '$50,000', value: 50000 },
];

export function QuickAmounts({ onSelect, currentValue }: QuickAmountsProps) {
  const t = useTranslations();

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {t('quickAmounts.label')}
      </label>
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map((preset) => (
          <button
            key={preset.value}
            onClick={() => onSelect(preset.value)}
            className={`
              px-3 py-1.5 rounded-lg text-sm font-medium transition-all
              ${
                currentValue === preset.value
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
