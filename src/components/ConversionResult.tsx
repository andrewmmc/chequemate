import React from 'react';
import { useTranslations } from 'next-intl';
import { CopyButton } from './CopyButton';

interface ConversionResultProps {
  label: string;
  value: string;
  language: 'chinese' | 'english';
}

export function ConversionResult({ label, value, language }: ConversionResultProps) {
  const t = useTranslations();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <CopyButton
          value={value}
          className="
            px-3 py-1 text-xs font-medium rounded-md transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        />
      </div>
      <p
        className={`
          text-lg font-medium min-h-[2.5rem] flex items-center
          ${language === 'chinese' ? 'font-chinese' : ''}
          ${value ? 'text-gray-900' : 'text-gray-400'}
        `}
      >
        {value || t('conversionResult.enterAmount')}
      </p>
    </div>
  );
}
