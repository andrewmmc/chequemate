import React from 'react';
import { useTranslations } from 'next-intl';
import { CopyButton } from './CopyButton';
import { useChequeConversion } from '../hooks/useChequeConversion';

interface ChequePreviewRMBProps {
  simplifiedChinese: string;
}

export function ChequePreviewRMB({ simplifiedChinese }: ChequePreviewRMBProps) {
  const t = useTranslations();
  const { simplifiedChineseText: zeroSimplifiedChinese } = useChequeConversion(0);

  const displaySimplifiedChinese = simplifiedChinese || zeroSimplifiedChinese;

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
          RMB
        </span>
      </div>

      {/* Simplified Chinese section */}
      <section className="px-5 pt-5 pb-5" aria-label={t('chequePreview.amountInChinese')}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-label-bg text-red-label">
              中文大写
            </span>
            <span className="text-xs text-ink-muted">{t('chequePreview.amountInChinese')}</span>
          </div>
          <CopyButton value={simplifiedChinese ? `人民币${simplifiedChinese}` : ''} />
        </div>

        <div className="rounded-lg px-4 py-3 bg-white border border-cm-border">
          <p
            className="leading-relaxed break-all text-[1.125rem] font-medium text-ink"
            style={{
              fontFamily: '"PingFang SC", "Noto Serif SC", "Microsoft YaHei", "STHeiti", serif',
              lineHeight: 1.75,
            }}
          >
            <span className="text-ink-muted mr-1">人民币</span>
            {displaySimplifiedChinese}
          </p>
        </div>
      </section>
    </div>
  );
}
