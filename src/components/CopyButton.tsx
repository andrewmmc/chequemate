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

  const baseClassName = `
    px-2 py-1 text-xs font-medium rounded transition-all
    ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <button
      onClick={() => {
        void copy(value);
      }}
      disabled={!value}
      className={`${baseClassName} ${className ?? ''}`}
    >
      {copied ? t('common.copied') : (text ?? t('common.copy'))}
    </button>
  );
}
