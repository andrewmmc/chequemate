import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Currency } from '../domain/currency';

interface QuickAmountsProps {
  onSelect: (amount: number) => void;
  currentValue: number;
  currency: Currency;
}

const CURRENCY_SYMBOL: Record<Currency, string> = {
  HKD: '$',
  RMB: '¥',
  USD: '$',
  GBP: '£',
};

const PRESETS = [
  { value: 100 },
  { value: 500 },
  { value: 1000, shortLabel: '1K' },
  { value: 5000, shortLabel: '5K' },
  { value: 10000, shortLabel: '10K' },
  { value: 50000, shortLabel: '50K' },
];

function formatPresetLabel(symbol: string, preset: (typeof PRESETS)[number]): string {
  if ('shortLabel' in preset) return `${symbol}${preset.shortLabel}`;
  return `${symbol}${preset.value}`;
}

export function QuickAmounts({ onSelect, currentValue, currency }: QuickAmountsProps) {
  const t = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);
  const symbol = CURRENCY_SYMBOL[currency];

  return (
    <div className="w-full">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] mb-3 text-ink-muted hover:text-ink-soft transition-colors cursor-pointer focus-visible:outline-none"
        aria-expanded={isExpanded}
        aria-controls="quick-amounts-group"
      >
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {t('quickAmounts.label')}
      </button>
      {isExpanded && (
        <div id="quick-amounts-group" className="flex flex-wrap gap-2" role="group">
          {PRESETS.map((preset) => {
            const isSelected = currentValue === preset.value;
            const label = formatPresetLabel(symbol, preset);
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
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
