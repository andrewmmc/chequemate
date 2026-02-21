import { useMemo } from 'react';
import { numberToChinese } from '../utils/numberToChinese';
import { numberToEnglish } from '../utils/numberToEnglish';

export function useChequeConversion(amount: number, conversionErrorText: string = '') {
  return useMemo(() => {
    try {
      return {
        chineseText: numberToChinese(amount),
        englishText: numberToEnglish(amount),
        error: '',
      };
    } catch (err) {
      return {
        chineseText: '',
        englishText: '',
        error: err instanceof Error ? err.message : conversionErrorText,
      };
    }
  }, [amount, conversionErrorText]);
}
