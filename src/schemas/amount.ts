import { z } from 'zod';

export const MAX_AMOUNT = 99999999999.99;

export const amountSchema = z
  .string()
  .transform((val) => val.replace(/,/g, '')) // Remove commas
  .pipe(
    z.string().transform((val) => {
      const parsed = parseFloat(val);
      if (isNaN(parsed)) throw new Error('Invalid number');
      return parsed;
    })
  )
  .refine((val) => val >= 0 && val <= MAX_AMOUNT, 'Amount out of range')
  .transform((val) => Math.round(val * 100) / 100); // Round to 2 decimal places

export function parseAmount(value: string | string[] | undefined): number | null {
  if (!value) return null;
  const result = amountSchema.safeParse(Array.isArray(value) ? value[0] : value);
  return result.success ? result.data : null;
}
