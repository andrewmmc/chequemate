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
      <p
        className="text-xs font-semibold uppercase tracking-[0.1em] mb-3 text-ink-muted"
        id="quick-amounts-label"
      >
        {t('quickAmounts.label')}
      </p>
      <div className="flex flex-wrap gap-2" role="group" aria-labelledby="quick-amounts-label">
        {PRESETS.map((preset) => {
          const isSelected = currentValue === preset.value;
          return (
            <button
              key={preset.value}
              onClick={() => onSelect(preset.value)}
              aria-pressed={isSelected}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium font-mono border transition-all active:scale-95 focus-visible:outline-none cursor-pointer
                ${
                  isSelected
                    ? 'bg-gold text-white border-gold shadow-[0_2px_8px_rgba(146,102,12,0.25)]'
                    : 'bg-paper-warm text-ink-soft border-cm-border hover:border-gold-mid hover:text-gold'
                }
              `}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
