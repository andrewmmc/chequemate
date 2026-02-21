import React from 'react';
import { useTranslations } from 'next-intl';
import { HistoryEntry } from '../hooks/useHistory';

interface HistoryListProps {
  history: HistoryEntry[];
  onSelect: (amount: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
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
    <div className="ios-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
          </svg>
          <h3 className="text-sm font-semibold text-gray-900">{t('history.title')}</h3>
          {history.length > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
              {history.length}
            </span>
          )}
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-medium text-red-500 hover:text-red-600 active:text-red-700"
          >
            {t('history.clear')}
          </button>
        )}
      </div>

      {/* Content */}
      {history.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-400">{t('history.empty')}</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {history.map((entry, index) => (
            <li
              key={entry.id}
              onClick={() => onSelect(entry.amount)}
              className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors group animate-slide-in"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-semibold text-gray-900">
                    HKD {entry.amount.toLocaleString('en-HK', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-xs text-gray-500 truncate mt-0.5">{entry.chinese}</div>
              </div>
              <div className="flex items-center gap-3 ml-3">
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {formatTime(entry.timestamp)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(entry.id);
                  }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 active:bg-red-100 transition-all opacity-0 group-hover:opacity-100"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
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
