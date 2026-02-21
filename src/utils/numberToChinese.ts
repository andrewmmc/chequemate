/**
 * Hong Kong Cheque Amount Converter - Traditional Chinese
 * Converts numerical amounts to Traditional Chinese text format used on HK cheques
 * Supports amounts up to HKD 99,999,999,999.99 (玖佰玖拾玖億玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖元玖角玖分)
 */

// Traditional Chinese numerals for cheque use
const CHINESE_DIGITS = ['零', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖'];
const CHINESE_UNITS = ['', '拾', '佰', '仟'];
const CHINESE_GROUP_UNITS = ['', '萬', '億'];

/**
 * Converts a number (0-9999) to Chinese characters
 */
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
        result += CHINESE_DIGITS[0];
      }
      hasZero = false;
      result += CHINESE_DIGITS[digit] + CHINESE_UNITS[unitIndex];
    }
  }

  return result;
}

/**
 * Converts a whole number to Chinese characters
 * Supports up to 99,999,999,999
 */
function convertWholeNumber(num: number): string {
  if (num === 0) return CHINESE_DIGITS[0];

  const groups: string[] = [];
  let remaining = num;

  // Split into groups of 4 digits
  while (remaining > 0) {
    groups.push((remaining % 10000).toString());
    remaining = Math.floor(remaining / 10000);
  }

  let result = '';
  for (let i = groups.length - 1; i >= 0; i--) {
    const groupNum = parseInt(groups[i], 10);
    const groupText = convertFourDigits(groupNum);

    if (groupText) {
      // Handle zero between groups
      if (result.length > 0 && groupNum < 1000) {
        const prevGroup = parseInt(groups[i + 1] || '0', 10);
        if (prevGroup > 0 && groupNum > 0 && groupNum < 1000) {
          // Check if we need to add zero
          const lastChar = result[result.length - 1];
          if (lastChar !== CHINESE_DIGITS[0]) {
            // Only add zero if there's a gap in significant digits
          }
        }
      }
      result += groupText + CHINESE_GROUP_UNITS[i];
    }
  }

  return result;
}

/**
 * Converts cents (0-99) to Chinese characters
 */
function convertCents(cents: number): string {
  if (cents === 0) return '';

  const tens = Math.floor(cents / 10);
  const ones = cents % 10;

  let result = '';

  if (tens > 0) {
    result += CHINESE_DIGITS[tens] + '角';
  }

  if (ones > 0) {
    if (tens === 0) {
      result += CHINESE_DIGITS[0] + '角';
    }
    result += CHINESE_DIGITS[ones] + '分';
  }

  return result;
}

/**
 * Converts a numerical amount to Traditional Chinese text for HK cheques
 * Format: 港幣[amount]元[cents]角[...]分 or 港幣[amount]元正
 *
 * @param amount - The numerical amount (supports decimals)
 * @returns The amount in Traditional Chinese text
 */
export function numberToChinese(amount: number): string {
  // Handle edge cases
  if (amount === 0) {
    return '港幣零元正';
  }

  if (amount < 0) {
    throw new Error('金額不能為負數');
  }

  if (amount > 99999999999.99) {
    throw new Error('金額不能超過港幣玖佰玖拾玖億玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖元玖角玖分');
  }

  // Round to 2 decimal places and split into dollars and cents
  const roundedAmount = Math.round(amount * 100) / 100;
  const dollars = Math.floor(roundedAmount);
  const cents = Math.round((roundedAmount - dollars) * 100);

  let result = '港幣';

  // Convert dollars
  if (dollars > 0) {
    result += convertWholeNumber(dollars) + '元';
  } else {
    result += '零元';
  }

  // Convert cents
  if (cents > 0) {
    result += convertCents(cents);
  } else {
    // Round number - add 正 to indicate no cents
    result += '正';
  }

  return result;
}

/**
 * Validates if the amount is within acceptable range for HK cheques
 */
export function isValidAmount(amount: number): boolean {
  return amount >= 0 && amount <= 99999999999.99;
}
