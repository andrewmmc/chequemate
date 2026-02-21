import React from 'react';
import { useTranslations } from 'next-intl';
import { CopyButton } from './CopyButton';
import { useChequeConversion } from '../hooks/useChequeConversion';

interface ChequePreviewProps {
  chinese: string;
  english: string;
  amount: number;
}

export function ChequePreview({ chinese, english, amount }: ChequePreviewProps) {
  const t = useTranslations();
  const { chineseText: zeroChinese, englishText: zeroEnglish } = useChequeConversion(0);

  const today = new Date().toLocaleDateString('en-HK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currencyPrefix = t('chequePreview.currencyPrefix');
  const chinesePrefix = t('chequePreview.chinesePrefix');
  const formattedAmount = amount > 0 ? `${currencyPrefix} ${amount.toFixed(2)}` : '';

  return (
    <div className="w-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border-2 border-amber-200 p-6 shadow-inner">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-amber-800">{t('chequePreview.title')}</h3>
      </div>

      <div className="bg-white rounded border border-gray-300 p-4 space-y-4">
        {/* Bank name placeholder */}
        <div className="flex justify-between items-start">
          <div className="text-gray-400 text-sm">{t('chequePreview.bankName')}</div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">{t('chequePreview.date')}</div>
            <div className="text-sm text-gray-600 border-b border-gray-300 pb-1 min-w-[150px]">
              {today}
            </div>
          </div>
        </div>

        {/* Payee line */}
        <div>
          <div className="text-xs text-gray-400 mb-1">{t('chequePreview.payee')}</div>
          <div className="border-b border-gray-300 py-2 text-gray-400">
            ________________________
          </div>
        </div>

        {/* Amount in figures */}
        <div className="flex justify-end">
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">{t('chequePreview.amount')}</div>
            <div className="font-mono text-lg font-bold text-gray-800 border-b-2 border-gray-400 pb-1 min-w-[120px]">
              {formattedAmount || `${currencyPrefix} 0.00`}
            </div>
          </div>
        </div>

        {/* Amount in words - Chinese */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">{t('chequePreview.amountInChinese')}</span>
            <CopyButton value={chinese ? `${chinesePrefix} ${chinese}` : ''} />
          </div>
          <div className="border-b border-gray-300 py-2 min-h-[28px] text-gray-800 text-lg font-medium">
            {chinese ? (
              <>
                <span className="text-sm text-gray-500 mr-1">{chinesePrefix}</span>
                {chinese}
              </>
            ) : (
              <>
                <span className="text-sm text-gray-500 mr-1">{chinesePrefix}</span>
                {zeroChinese}
              </>
            )}
          </div>
        </div>

        {/* Amount in words - English */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">{t('chequePreview.amountInEnglish')}</span>
            <CopyButton value={english ? `${currencyPrefix} ${english}` : ''} />
          </div>
          <div className="border-b border-gray-300 py-2 min-h-[28px] text-gray-800 text-lg font-medium">
            {english ? (
              <>
                <span className="text-sm text-gray-500 mr-1">{currencyPrefix}</span>
                {english}
              </>
            ) : (
              <>
                <span className="text-sm text-gray-500 mr-1">{currencyPrefix}</span>
                {zeroEnglish}
              </>
            )}
          </div>
        </div>

        {/* Signature line */}
        <div className="pt-4 flex justify-end">
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">{t('chequePreview.signature')}</div>
            <div className="border-b border-gray-400 w-40 h-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
