/**
 * Hong Kong Cheque Amount Converter - English
 * Converts numerical amounts to English text format used on HK cheques
 * Format: [Amount] Dollars and [Cents] Cents Only
 */
import { MAX_AMOUNT, splitAmount } from '../domain/amount';

const ONES = [
  '',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
];

const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

const SCALES = ['', 'Thousand', 'Million', 'Billion'];

/**
 * Converts a number less than 100 to English words
 */
function convertLessThanHundred(num: number): string {
  if (num < 20) {
    return ONES[num];
  }

  const tens = Math.floor(num / 10);
  const ones = num % 10;

  if (ones === 0) {
    return TENS[tens];
  }

  return `${TENS[tens]}-${ONES[ones]}`;
}

/**
 * Converts a number less than 1000 to English words
 */
function convertLessThanThousand(num: number): string {
  if (num === 0) {
    return '';
  }

  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;

  let result = '';

  if (hundreds > 0) {
    result = `${ONES[hundreds]} Hundred`;
  }

  if (remainder > 0) {
    if (hundreds > 0) {
      result += ' ';
    }
    result += convertLessThanHundred(remainder);
  }

  return result;
}

/**
 * Converts a whole number to English words
 * Supports up to billions
 */
function convertWholeNumber(num: number): string {
  if (num === 0) {
    return 'Zero';
  }

  const groups: number[] = [];
  let remaining = num;

  // Split into groups of 3 digits
  while (remaining > 0) {
    groups.push(remaining % 1000);
    remaining = Math.floor(remaining / 1000);
  }

  const parts: string[] = [];

  for (let i = groups.length - 1; i >= 0; i--) {
    const group = groups[i];

    if (group > 0) {
      const groupText = convertLessThanThousand(group);

      if (SCALES[i]) {
        parts.push(`${groupText} ${SCALES[i]}`);
      } else {
        parts.push(groupText);
      }
    }
  }

  return parts.join(' ');
}

/**
 * Converts cents (0-99) to English words
 */
function convertCents(cents: number): string {
  if (cents === 0) return '';

  if (cents < 20) {
    return ONES[cents];
  }

  const tens = Math.floor(cents / 10);
  const ones = cents % 10;

  if (ones === 0) {
    return TENS[tens];
  }

  return `${TENS[tens]}-${ONES[ones]}`;
}

/**
 * Converts a numerical amount to English text for HK cheques
 * Format: [Amount] Dollars and [Cents] Cents Only
 *
 * @param amount - The numerical amount (supports decimals)
 * @returns The amount in English text
 */
export function numberToEnglish(amount: number): string {
  // Handle edge cases
  if (amount === 0) {
    return 'Zero Dollars Only';
  }

  if (amount < 0) {
    throw new Error('Amount cannot be negative');
  }

  if (amount > MAX_AMOUNT) {
    throw new Error('Amount cannot exceed HKD 99,999,999,999.99');
  }

  const { dollars, cents } = splitAmount(amount);

  let result = convertWholeNumber(dollars) + ' Dollars';

  // Convert cents
  if (cents > 0) {
    result += ' and ' + convertCents(cents) + ' Cents';
  }

  result += ' Only';

  return result;
}
