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
    return date.toLocaleTimeString('en-HK', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">{t('history.title')}</h3>
        {history.length > 0 && (
          <button onClick={onClear} className="text-xs text-red-500 hover:text-red-700">
            {t('history.clear')}
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="px-4 py-6 text-center text-sm text-gray-400">{t('history.empty')}</div>
      ) : (
        <ul className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
          {history.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer group"
              onClick={() => onSelect(entry.amount)}
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900">
                  HKD {entry.amount.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500 truncate">港幣 {entry.chinese}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{formatTime(entry.timestamp)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(entry.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
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
