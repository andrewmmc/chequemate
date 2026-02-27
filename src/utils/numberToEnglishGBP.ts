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

function convertWholeNumber(num: number): string {
  if (num === 0) {
    return 'Zero';
  }

  const groups: number[] = [];
  let remaining = num;

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

function convertPence(pence: number): string {
  if (pence === 0) return '';

  if (pence < 20) {
    return ONES[pence];
  }

  const tens = Math.floor(pence / 10);
  const ones = pence % 10;

  if (ones === 0) {
    return TENS[tens];
  }

  return `${TENS[tens]}-${ONES[ones]}`;
}

export function numberToEnglishGBP(amount: number): string {
  if (amount === 0) {
    return 'Zero Pounds Only';
  }

  if (amount < 0) {
    throw new Error('Amount cannot be negative');
  }

  if (amount > MAX_AMOUNT) {
    throw new Error('Amount cannot exceed GBP 99,999,999,999.99');
  }

  const { dollars, cents } = splitAmount(amount);

  let result = convertWholeNumber(dollars) + ' Pounds';

  if (cents > 0) {
    result += ' and ' + convertPence(cents) + ' Pence';
  }

  result += ' Only';

  return result;
}
