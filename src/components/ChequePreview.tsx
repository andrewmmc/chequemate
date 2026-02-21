import React from 'react';
import { useTranslations } from 'next-intl';
import { CopyButton } from './CopyButton';
import { useChequeConversion } from '../hooks/useChequeConversion';

interface ChequePreviewProps {
  chinese: string;
  english: string;
}

export function ChequePreview({ chinese, english }: ChequePreviewProps) {
  const t = useTranslations();
  const { chineseText: zeroChinese, englishText: zeroEnglish } = useChequeConversion(0);

  const currencyPrefix = t('chequePreview.currencyPrefix');
  const chinesePrefix = t('chequePreview.chinesePrefix');

  const displayChinese = chinese || zeroChinese;
  const displayEnglish = english || zeroEnglish;

  return (
    <div className="ios-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{t('chequePreview.title')}</h3>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Chinese Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-red-50 text-red-600 text-xs font-medium">
                中文
              </span>
              <span className="text-xs text-gray-500">{t('chequePreview.amountInChinese')}</span>
            </div>
            <CopyButton value={chinese ? `${chinesePrefix} ${chinese}` : ''} />
          </div>
          <div className="p-4 bg-gray-50 rounded-xl min-h-[56px] flex items-center">
            <p className="text-base text-gray-900 leading-relaxed break-all">
              <span className="text-gray-400 mr-1">{chinesePrefix}</span>
              {displayChinese}
            </p>
          </div>
        </div>

        {/* English Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-xs font-medium">
                EN
              </span>
              <span className="text-xs text-gray-500">{t('chequePreview.amountInEnglish')}</span>
            </div>
            <CopyButton value={english ? `${currencyPrefix} ${english}` : ''} />
          </div>
          <div className="p-4 bg-gray-50 rounded-xl min-h-[56px] flex items-center">
            <p className="text-base text-gray-900 leading-relaxed break-all">
              <span className="text-gray-400 mr-1">{currencyPrefix}</span>
              {displayEnglish}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
