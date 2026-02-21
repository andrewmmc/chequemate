import React from 'react';

interface ChequePreviewProps {
  chinese: string;
  english: string;
  amount: number;
}

export function ChequePreview({ chinese, english, amount }: ChequePreviewProps) {
  const today = new Date().toLocaleDateString('en-HK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedAmount = amount > 0 ? `HKD ${amount.toFixed(2)}` : '';

  return (
    <div className="w-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border-2 border-amber-200 p-6 shadow-inner">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-amber-800">支票預覽 Cheque Preview</h3>
      </div>

      <div className="bg-white rounded border border-gray-300 p-4 space-y-4">
        {/* Bank name placeholder */}
        <div className="flex justify-between items-start">
          <div className="text-gray-400 text-sm">銀行名稱 Bank Name</div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">日期 Date</div>
            <div className="text-sm text-gray-600 border-b border-gray-300 pb-1 min-w-[150px]">
              {today}
            </div>
          </div>
        </div>

        {/* Payee line */}
        <div>
          <div className="text-xs text-gray-400 mb-1">收款人 Payee</div>
          <div className="border-b border-gray-300 py-2 text-gray-400">
            ________________________
          </div>
        </div>

        {/* Amount in figures */}
        <div className="flex justify-end">
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">金額 Amount</div>
            <div className="font-mono text-lg font-bold text-gray-800 border-b-2 border-gray-400 pb-1 min-w-[120px]">
              {formattedAmount || 'HKD 0.00'}
            </div>
          </div>
        </div>

        {/* Amount in words - Chinese */}
        <div>
          <div className="text-xs text-gray-400 mb-1">金額（中文）Amount in Chinese</div>
          <div className="border-b border-gray-300 py-2 min-h-[28px] text-gray-800">
            {chinese || '港幣________________元正'}
          </div>
        </div>

        {/* Amount in words - English */}
        <div>
          <div className="text-xs text-gray-400 mb-1">金額（英文）Amount in English</div>
          <div className="border-b border-gray-300 py-2 min-h-[28px] text-gray-800 text-sm">
            {english || 'Hong Kong Dollars ________________ Only'}
          </div>
        </div>

        {/* Signature line */}
        <div className="pt-4 flex justify-end">
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">簽署 Signature</div>
            <div className="border-b border-gray-400 w-40 h-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
