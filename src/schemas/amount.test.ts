import { describe, it, expect } from 'vitest';
import { amountSchema, parseAmount, MAX_AMOUNT } from './amount';

describe('amountSchema', () => {
  describe('valid inputs', () => {
    it('parses valid string numbers', () => {
      expect(amountSchema.parse('100')).toBe(100);
      expect(amountSchema.parse('0')).toBe(0);
      expect(amountSchema.parse('1.5')).toBe(1.5);
    });

    it('removes commas from numbers', () => {
      expect(amountSchema.parse('1,000')).toBe(1000);
      expect(amountSchema.parse('1,000,000')).toBe(1000000);
      expect(amountSchema.parse('1,234.56')).toBe(1234.56);
    });

    it('rounds to 2 decimal places', () => {
      expect(amountSchema.parse('1.234')).toBe(1.23);
      expect(amountSchema.parse('1.235')).toBe(1.24);
      expect(amountSchema.parse('1.999')).toBe(2);
    });
  });

  describe('invalid inputs', () => {
    it('throws for non-numeric strings', () => {
      expect(() => amountSchema.parse('abc')).toThrow();
      expect(() => amountSchema.parse('')).toThrow();
    });

    it('throws for negative amounts', () => {
      expect(() => amountSchema.parse('-1')).toThrow('Amount out of range');
      expect(() => amountSchema.parse('-100')).toThrow('Amount out of range');
    });

    it('throws for amounts exceeding maximum', () => {
      expect(() => amountSchema.parse('100000000000')).toThrow('Amount out of range');
      expect(() => amountSchema.parse(String(MAX_AMOUNT + 1))).toThrow('Amount out of range');
    });
  });

  describe('boundary values', () => {
    it('accepts zero', () => {
      expect(amountSchema.parse('0')).toBe(0);
    });

    it('accepts maximum amount', () => {
      expect(amountSchema.parse('99999999999.99')).toBe(99999999999.99);
    });

    it('accepts amounts just below maximum', () => {
      expect(amountSchema.parse('99999999999.98')).toBe(99999999999.98);
    });
  });
});

describe('parseAmount', () => {
  describe('valid inputs', () => {
    it('parses string values', () => {
      expect(parseAmount('100')).toBe(100);
      expect(parseAmount('1,000.50')).toBe(1000.5);
    });

    it('parses single-element arrays', () => {
      expect(parseAmount(['100'])).toBe(100);
      expect(parseAmount(['1,000'])).toBe(1000);
    });

    it('takes first element from multi-element arrays', () => {
      expect(parseAmount(['100', '200'])).toBe(100);
    });
  });

  describe('invalid inputs', () => {
    it('returns null for undefined', () => {
      expect(parseAmount(undefined)).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(parseAmount('')).toBeNull();
    });

    it('returns null for empty array', () => {
      expect(parseAmount([])).toBeNull();
    });

    it('throws for invalid number (Zod 4 throws in transform)', () => {
      expect(() => parseAmount('abc')).toThrow('Invalid number');
    });

    it('returns null for negative amounts', () => {
      expect(parseAmount('-1')).toBeNull();
    });

    it('returns null for amounts exceeding maximum', () => {
      expect(parseAmount('100000000000')).toBeNull();
    });
  });
});
