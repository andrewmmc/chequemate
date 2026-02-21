import React, { useState } from "react";
import { useTranslations } from 'next-intl';

interface ChequePreviewProps {
  chinese: string;
  english: string;
  amount: number;
}

function CopyButton({ value, text }: { value: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!value}
      className={`
        px-2 py-1 text-xs font-medium rounded transition-all
        ${
          copied
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {copied ? t('common.copied') : text}
    </button>
  );
}

export function ChequePreview({
  chinese,
  english,
  amount,
}: ChequePreviewProps) {
  const t = useTranslations();

  const today = new Date().toLocaleDateString("en-HK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedAmount = amount > 0 ? `HKD ${amount.toFixed(2)}` : "";

  return (
    <div className="w-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border-2 border-amber-200 p-6 shadow-inner">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-amber-800">
          {t('chequePreview.title')}
        </h3>
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
              {formattedAmount || "HKD 0.00"}
            </div>
          </div>
        </div>

        {/* Amount in words - Chinese */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">
              {t('chequePreview.amountInChinese')}
            </span>
            <CopyButton
              value={chinese ? `港幣 ${chinese}` : ""}
              text={t('common.copy')}
            />
          </div>
          <div className="border-b border-gray-300 py-2 min-h-[28px] text-gray-800 text-lg font-medium">
            {chinese ? (
              <>
                <span className="text-sm text-gray-500 mr-1">港幣</span>
                {chinese}
              </>
            ) : (
              <>
                <span className="text-sm text-gray-500 mr-1">港幣</span>
                零元正
              </>
            )}
          </div>
        </div>

        {/* Amount in words - English */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">
              {t('chequePreview.amountInEnglish')}
            </span>
            <CopyButton
              value={english ? `HKD ${english}` : ""}
              text={t('common.copy')}
            />
          </div>
          <div className="border-b border-gray-300 py-2 min-h-[28px] text-gray-800 text-lg font-medium">
            {english ? (
              <>
                <span className="text-sm text-gray-500 mr-1">HKD</span>
                {english}
              </>
            ) : (
              <>
                <span className="text-sm text-gray-500 mr-1">HKD</span>
                Zero Dollars Only
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
