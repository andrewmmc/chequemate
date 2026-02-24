/**
 * RMB Cheque Amount Converter - Simplified Chinese
 * Converts numerical amounts to Simplified Chinese text format used on RMB cheques
 * Supports amounts up to RMB 99,999,999,999.99
 */
import { MAX_AMOUNT, isAmountInRange, splitAmount } from '../domain/amount';

// Simplified Chinese numerals for cheque use
const SC_DIGITS = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
const SC_UNITS = ['', '拾', '佰', '仟'];
const SC_GROUP_UNITS = ['', '万', '亿'];

function convertFourDigits(num: number): string {
  if (num === 0) return '';

  let result = '';
  let hasZero = false;
  const digits = num.toString().padStart(4, '0').split('').map(Number);

  for (let i = 0; i < 4; i++) {
    const digit = digits[i];
    const unitIndex = 3 - i;

    if (digit === 0) {
      hasZero = true;
    } else {
      if (hasZero && result.length > 0) {
        result += SC_DIGITS[0];
      }
      hasZero = false;
      result += SC_DIGITS[digit] + SC_UNITS[unitIndex];
    }
  }

  return result;
}

function convertWholeNumber(num: number): string {
  if (num === 0) return SC_DIGITS[0];

  const groups: string[] = [];
  let remaining = num;

  while (remaining > 0) {
    groups.push((remaining % 10000).toString());
    remaining = Math.floor(remaining / 10000);
  }

  let result = '';
  for (let i = groups.length - 1; i >= 0; i--) {
    const groupNum = parseInt(groups[i], 10);
    const groupText = convertFourDigits(groupNum);

    if (groupText) {
      result += groupText + SC_GROUP_UNITS[i];
    }
  }

  return result;
}

function convertCents(cents: number): string {
  if (cents === 0) return '';

  const tens = Math.floor(cents / 10);
  const ones = cents % 10;

  let result = '';

  if (tens > 0) {
    result += SC_DIGITS[tens] + '角';
  }

  if (ones > 0) {
    if (tens === 0) {
      result += SC_DIGITS[0] + '角';
    }
    result += SC_DIGITS[ones] + '分';
  }

  return result;
}

/**
 * Converts a numerical amount to Simplified Chinese text for RMB cheques
 * Format: [amount]元[cents]角[...]分 or [amount]元整
 */
export function numberToSimplifiedChinese(amount: number): string {
  if (amount === 0) {
    return '零元整';
  }

  if (amount < 0) {
    throw new Error('金额不能为负数');
  }

  if (amount > MAX_AMOUNT) {
    throw new Error('金额超出范围');
  }

  const { dollars, cents } = splitAmount(amount);

  let result = '';

  if (dollars > 0) {
    result += convertWholeNumber(dollars) + '元';
  } else {
    result += '零元';
  }

  if (cents > 0) {
    result += convertCents(cents);
  } else {
    result += '整';
  }

  return result;
}

export function isValidAmount(amount: number): boolean {
  return isAmountInRange(amount);
}
