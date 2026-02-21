import React from 'react';
import { useTranslations } from 'next-intl';

interface QuickAmountsProps {
  onSelect: (amount: number) => void;
  currentValue: number;
}

const PRESETS = [
  { label: '$100', value: 100 },
  { label: '$500', value: 500 },
  { label: '$1K', value: 1000 },
  { label: '$5K', value: 5000 },
  { label: '$10K', value: 10000 },
  { label: '$50K', value: 50000 },
];

export function QuickAmounts({ onSelect, currentValue }: QuickAmountsProps) {
  const t = useTranslations();

  return (
    <div className="w-full">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
        {t('quickAmounts.label')}
      </label>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset, index) => {
          const isSelected = currentValue === preset.value;
          return (
            <button
              key={preset.value}
              onClick={() => onSelect(preset.value)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-95
                ${
                  isSelected
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                }
              `}
              style={{
                animationDelay: `${index * 0.03}s`,
              }}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
