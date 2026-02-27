import React from 'react';
import { Currency } from '../domain/currency';
import { ChequePreviewHKD } from './ChequePreviewHKD';
import { ChequePreviewRMB } from './ChequePreviewRMB';
import { ChequePreviewUSD } from './ChequePreviewUSD';
import { ChequePreviewGBP } from './ChequePreviewGBP';

interface ChequePreviewProps {
  chinese: string;
  simplifiedChinese: string;
  english: string;
  currency: Currency;
}

export function ChequePreview({
  chinese,
  simplifiedChinese,
  english,
  currency,
}: ChequePreviewProps) {
  switch (currency) {
    case 'RMB':
      return <ChequePreviewRMB simplifiedChinese={simplifiedChinese} />;
    case 'USD':
      return <ChequePreviewUSD english={english} />;
    case 'GBP':
      return <ChequePreviewGBP english={english} />;
    case 'HKD':
    default:
      return <ChequePreviewHKD chinese={chinese} english={english} />;
  }
}
