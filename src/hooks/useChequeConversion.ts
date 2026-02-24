import { useMemo } from 'react';
import { numberToChinese } from '../utils/numberToChinese';
import { numberToSimplifiedChinese } from '../utils/numberToSimplifiedChinese';
import { numberToEnglish } from '../utils/numberToEnglish';

export function useChequeConversion(amount: number, conversionErrorText: string = '') {
  return useMemo(() => {
    try {
      return {
        chineseText: numberToChinese(amount),
        simplifiedChineseText: numberToSimplifiedChinese(amount),
        englishText: numberToEnglish(amount),
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
  }, [amount, conversionErrorText]);
}
