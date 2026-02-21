import { useTranslations } from 'next-intl';
import { useClipboard } from '../hooks/useClipboard';

interface CopyButtonProps {
  value: string;
  text?: string;
  className?: string;
}

export function CopyButton({ value, text, className }: CopyButtonProps) {
  const t = useTranslations();
  const { copied, copy } = useClipboard();

  return (
    <button
      onClick={() => {
        void copy(value);
      }}
      disabled={!value}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all active:scale-95
        ${
          copied
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 active:bg-gray-300/80'
        }
        disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
        ${className ?? ''}
      `}
    >
      {copied ? (
        <>
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('common.copied')}
        </>
      ) : (
        <>
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeLinecap="round" />
          </svg>
          {text ?? t('common.copy')}
        </>
      )}
    </button>
  );
}
