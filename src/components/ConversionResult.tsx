import React, { useState } from 'react';

interface ConversionResultProps {
  label: string;
  value: string;
  language: 'chinese' | 'english';
}

export function ConversionResult({ label, value, language }: ConversionResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <button
          onClick={handleCopy}
          disabled={!value}
          className={`
            px-3 py-1 text-xs font-medium rounded-md transition-all
            ${copied
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {copied ? '已複製 Copied!' : '複製 Copy'}
        </button>
      </div>
      <p
        className={`
          text-lg font-medium min-h-[2.5rem] flex items-center
          ${language === 'chinese' ? 'font-chinese' : ''}
          ${value ? 'text-gray-900' : 'text-gray-400'}
        `}
      >
        {value || (language === 'chinese' ? '請輸入金額' : 'Enter an amount')}
      </p>
    </div>
  );
}
