import React from 'react';
import { useTranslations } from 'next-intl';
import { HistoryEntry } from '../hooks/useHistory';
import { Currency } from '../domain/currency';

interface HistoryListProps {
  history: HistoryEntry[];
  onSelect: (amount: number, currency: Currency) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

const CURRENCY_DISPLAY_NAME: Record<Currency, string> = {
  HKD: '港幣',
  RMB: '人民币',
  USD: 'USD',
};

function getEntryPreviewText(entry: HistoryEntry): string {
  if (entry.currency === 'RMB') return entry.simplifiedChinese;
  if (entry.currency === 'USD') return entry.english;
  return entry.chinese;
}

export function HistoryList({ history, onSelect, onRemove, onClear }: HistoryListProps) {
  const t = useTranslations();

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return date.toLocaleTimeString('en-HK', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    return date.toLocaleDateString('en-HK', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="overflow-hidden rounded-[14px] border border-cm-border bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_4px_16px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-cm-border">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-ink-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
          </svg>
          <h3 className="text-sm font-semibold text-ink font-serif">{t('history.title')}</h3>
          {history.length > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-paper-warm text-ink-soft border border-cm-border">
              {history.length}
            </span>
          )}
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-medium text-cm-error hover:opacity-75 transition-opacity focus-visible:outline-none cursor-pointer"
          >
            {t('history.clear')}
          </button>
        )}
      </div>

      {/* Content */}
      {history.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-paper-warm border border-cm-border flex items-center justify-center">
            <svg
              className="w-6 h-6 text-ink-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-sm text-ink-muted">{t('history.empty')}</p>
        </div>
      ) : (
        <ul className="divide-y divide-cm-border">
          {history.map((entry, index) => (
            <li
              key={entry.id}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-paper-warm active:bg-paper-warm/80 cursor-pointer transition-colors group animate-slide-in focus-visible:outline-none focus-visible:bg-paper-warm"
              style={{ animationDelay: `${index * 0.03}s` }}
              onClick={() => onSelect(entry.amount, entry.currency)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(entry.amount, entry.currency);
                }
              }}
              aria-label={`Select ${CURRENCY_DISPLAY_NAME[entry.currency]} ${entry.amount.toLocaleString('en-HK', { minimumFractionDigits: 2 })}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-paper-warm text-ink-muted border border-cm-border">
                    {CURRENCY_DISPLAY_NAME[entry.currency]}
                  </span>
                  <span className="text-sm font-semibold font-mono text-ink">
                    {entry.amount.toLocaleString('en-HK', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-xs text-ink-muted truncate mt-0.5">
                  {getEntryPreviewText(entry)}
                </p>
              </div>
              <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                <span className="text-xs text-ink-muted font-mono">
                  {formatTime(entry.timestamp)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(entry.id);
                  }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-ink-muted hover:text-cm-error hover:bg-error-bg transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none cursor-pointer"
                  aria-label="Remove entry"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
