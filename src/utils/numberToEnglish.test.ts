import { describe, it, expect } from 'vitest';
import { numberToEnglish } from './numberToEnglish';

describe('numberToEnglish', () => {
  describe('basic conversions', () => {
    it('converts 0', () => {
      expect(numberToEnglish(0)).toBe('Zero Dollars Only');
    });

    it('converts single digit amounts', () => {
      expect(numberToEnglish(1)).toBe('One Dollars Only');
      expect(numberToEnglish(5)).toBe('Five Dollars Only');
      expect(numberToEnglish(9)).toBe('Nine Dollars Only');
    });

    it('converts teens', () => {
      expect(numberToEnglish(10)).toBe('Ten Dollars Only');
      expect(numberToEnglish(11)).toBe('Eleven Dollars Only');
      expect(numberToEnglish(15)).toBe('Fifteen Dollars Only');
      expect(numberToEnglish(19)).toBe('Nineteen Dollars Only');
    });

    it('converts tens', () => {
      expect(numberToEnglish(20)).toBe('Twenty Dollars Only');
      expect(numberToEnglish(30)).toBe('Thirty Dollars Only');
      expect(numberToEnglish(90)).toBe('Ninety Dollars Only');
    });

    it('converts compound tens with hyphen', () => {
      expect(numberToEnglish(21)).toBe('Twenty-One Dollars Only');
      expect(numberToEnglish(45)).toBe('Forty-Five Dollars Only');
      expect(numberToEnglish(99)).toBe('Ninety-Nine Dollars Only');
    });

    it('converts hundreds', () => {
      expect(numberToEnglish(100)).toBe('One Hundred Dollars Only');
      expect(numberToEnglish(101)).toBe('One Hundred One Dollars Only');
      expect(numberToEnglish(110)).toBe('One Hundred Ten Dollars Only');
      expect(numberToEnglish(999)).toBe('Nine Hundred Ninety-Nine Dollars Only');
    });

    it('converts thousands', () => {
      expect(numberToEnglish(1000)).toBe('One Thousand Dollars Only');
      expect(numberToEnglish(10000)).toBe('Ten Thousand Dollars Only');
      expect(numberToEnglish(100000)).toBe('One Hundred Thousand Dollars Only');
    });
  });

  describe('cents handling', () => {
    it('converts amounts with cents only', () => {
      expect(numberToEnglish(0.50)).toBe('Zero Dollars and Fifty Cents Only');
      expect(numberToEnglish(0.01)).toBe('Zero Dollars and One Cents Only');
      expect(numberToEnglish(0.99)).toBe('Zero Dollars and Ninety-Nine Cents Only');
    });

    it('converts amounts with dollars and cents', () => {
      expect(numberToEnglish(1.50)).toBe('One Dollars and Fifty Cents Only');
      expect(numberToEnglish(10.25)).toBe('Ten Dollars and Twenty-Five Cents Only');
      expect(numberToEnglish(100.01)).toBe('One Hundred Dollars and One Cents Only');
    });

    it('converts example amounts from user', () => {
      expect(numberToEnglish(10000)).toBe('Ten Thousand Dollars Only');
      expect(numberToEnglish(10000.30)).toBe('Ten Thousand Dollars and Thirty Cents Only');
      expect(numberToEnglish(10000.31)).toBe('Ten Thousand Dollars and Thirty-One Cents Only');
    });

    it('handles rounding to 2 decimals', () => {
      // 1.005 rounds to 1.00 due to floating point precision
      expect(numberToEnglish(1.005)).toBe('One Dollars Only');
    });
  });

  describe('large amounts', () => {
    it('converts millions', () => {
      expect(numberToEnglish(1000000)).toBe('One Million Dollars Only');
      expect(numberToEnglish(10000000)).toBe('Ten Million Dollars Only');
    });

    it('converts billions', () => {
      expect(numberToEnglish(100000000)).toBe('One Hundred Million Dollars Only');
      expect(numberToEnglish(1000000000)).toBe('One Billion Dollars Only');
    });

    it('converts maximum amount', () => {
      const result = numberToEnglish(99999999999.99);
      expect(result).toBe('Ninety-Nine Billion Nine Hundred Ninety-Nine Million Nine Hundred Ninety-Nine Thousand Nine Hundred Ninety-Nine Dollars and Ninety-Nine Cents Only');
    });
  });

  describe('edge cases', () => {
    it('throws error for negative amounts', () => {
      expect(() => numberToEnglish(-1)).toThrow('Amount cannot be negative');
    });

    it('throws error for amounts exceeding maximum', () => {
      expect(() => numberToEnglish(100000000000)).toThrow('Amount cannot exceed HKD 99,999,999,999.99');
    });

    it('handles floating point precision', () => {
      // 0.1 + 0.2 = 0.30000000000000004, rounds to 0.30
      expect(numberToEnglish(0.1 + 0.2)).toBe('Zero Dollars and Thirty Cents Only');
    });
  });
});
