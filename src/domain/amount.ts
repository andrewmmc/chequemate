export const MAX_AMOUNT = 99999999999.99;

export function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export function isAmountInRange(amount: number): boolean {
  return amount >= 0 && amount <= MAX_AMOUNT;
}

export function splitAmount(amount: number): { dollars: number; cents: number } {
  const rounded = roundToCents(amount);
  const dollars = Math.floor(rounded);
  const cents = Math.round((rounded - dollars) * 100);
  return { dollars, cents };
}
