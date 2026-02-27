import { useMemo } from 'react';
import { numberToChinese } from '../utils/numberToChinese';
import { numberToSimplifiedChinese } from '../utils/numberToSimplifiedChinese';
import { numberToEnglish } from '../utils/numberToEnglish';
import { numberToEnglishGBP } from '../utils/numberToEnglishGBP';
import { Currency } from '../domain/currency';

export function useChequeConversion(
  amount: number,
  conversionErrorText: string = '',
  currency: Currency = 'HKD'
) {
  return useMemo(() => {
    try {
      const chineseText = numberToChinese(amount);
      const simplifiedChineseText = numberToSimplifiedChinese(amount);
      const englishText = currency === 'GBP' ? numberToEnglishGBP(amount) : numberToEnglish(amount);
      return {
        chineseText,
        simplifiedChineseText,
        englishText,
        error: '',
      };
    } catch (err) {
      return {
        chineseText: '',
        simplifiedChineseText: '',
        englishText: '',
        error: err instanceof Error ? err.message : conversionErrorText,
      };
    }
  }, [amount, conversionErrorText, currency]);
}
