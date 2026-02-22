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
    <div className="overflow-hidden rounded-[14px] border border-cm-border bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_4px_16px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-cm-border bg-gold-subtle">
        <div className="flex items-center gap-2.5">
          <svg
            className="w-4 h-4 text-gold"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20M6 14h4M14 14h4" strokeLinecap="round" />
          </svg>
          <h3 className="text-sm font-semibold font-serif text-ink">{t('chequePreview.title')}</h3>
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gold-light text-gold border border-gold/20">
          HKD
        </span>
      </div>

      {/* Chinese section */}
      <section
        className="px-5 pt-5 pb-4 border-b border-cm-border"
        aria-label={t('chequePreview.amountInChinese')}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-label-bg text-red-label">
              中文大寫
            </span>
            <span className="text-xs text-ink-muted">{t('chequePreview.amountInChinese')}</span>
          </div>
          <CopyButton value={chinese ? `${chinesePrefix}${chinese}` : ''} />
        </div>

        <div className="rounded-lg px-4 py-3 bg-white border border-cm-border">
          <p
            className="leading-relaxed break-all text-[1.125rem] font-medium text-ink"
            style={{
              fontFamily: '"PingFang TC", "Noto Serif TC", "Microsoft JhengHei", "STHeiti", serif',
              lineHeight: 1.75,
            }}
          >
            <span className="text-ink-muted mr-1">{chinesePrefix}</span>
            {displayChinese}
          </p>
        </div>
      </section>

      {/* English section */}
      <section className="px-5 pt-4 pb-5" aria-label={t('chequePreview.amountInEnglish')}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-label-bg text-blue-label">
              English
            </span>
            <span className="text-xs text-ink-muted">{t('chequePreview.amountInEnglish')}</span>
          </div>
          <CopyButton value={english ? `${currencyPrefix} ${english}` : ''} />
        </div>

        <div className="rounded-lg px-4 py-3 bg-white border border-cm-border">
          <p
            className="leading-relaxed break-words font-mono text-[0.9375rem] font-medium text-ink"
            style={{ lineHeight: 1.8, wordBreak: 'break-word' }}
          >
            <span className="text-ink-muted mr-1.5">{currencyPrefix}</span>
            {displayEnglish}
          </p>
        </div>
      </section>
    </div>
  );
}
