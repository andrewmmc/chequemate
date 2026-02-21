import { describe, it, expect } from 'vitest';
import { numberToChinese, isValidAmount } from './numberToChinese';

describe('numberToChinese', () => {
  describe('basic conversions', () => {
    it('converts 0', () => {
      expect(numberToChinese(0)).toBe('零元正');
    });

    it('converts single digit amounts', () => {
      expect(numberToChinese(1)).toBe('壹元正');
      expect(numberToChinese(5)).toBe('伍元正');
      expect(numberToChinese(9)).toBe('玖元正');
    });

    it('converts teens', () => {
      expect(numberToChinese(10)).toBe('壹拾元正');
      expect(numberToChinese(11)).toBe('壹拾壹元正');
      expect(numberToChinese(15)).toBe('壹拾伍元正');
      expect(numberToChinese(19)).toBe('壹拾玖元正');
    });

    it('converts tens', () => {
      expect(numberToChinese(20)).toBe('貳拾元正');
      expect(numberToChinese(30)).toBe('參拾元正');
      expect(numberToChinese(99)).toBe('玖拾玖元正');
    });

    it('converts hundreds', () => {
      expect(numberToChinese(100)).toBe('壹佰元正');
      expect(numberToChinese(101)).toBe('壹佰零壹元正');
      expect(numberToChinese(110)).toBe('壹佰壹拾元正');
      expect(numberToChinese(999)).toBe('玖佰玖拾玖元正');
    });

    it('converts thousands', () => {
      expect(numberToChinese(1000)).toBe('壹仟元正');
      expect(numberToChinese(10000)).toBe('壹萬元正');
      expect(numberToChinese(100000)).toBe('壹拾萬元正');
    });
  });

  describe('cents handling', () => {
    it('converts amounts with cents only', () => {
      expect(numberToChinese(0.5)).toBe('零元伍角');
      expect(numberToChinese(0.01)).toBe('零元零角壹分');
      expect(numberToChinese(0.99)).toBe('零元玖角玖分');
    });

    it('converts amounts with dollars and cents', () => {
      expect(numberToChinese(1.5)).toBe('壹元伍角');
      expect(numberToChinese(10.25)).toBe('壹拾元貳角伍分');
      expect(numberToChinese(100.01)).toBe('壹佰元零角壹分');
    });

    it('handles rounding to 2 decimals', () => {
      // 1.005 rounds to 1.00 due to floating point precision
      expect(numberToChinese(1.005)).toBe('壹元正');
    });
  });

  describe('large amounts', () => {
    it('converts millions', () => {
      expect(numberToChinese(1000000)).toBe('壹佰萬元正');
      expect(numberToChinese(10000000)).toBe('壹仟萬元正');
    });

    it('converts billions (億)', () => {
      expect(numberToChinese(100000000)).toBe('壹億元正');
      expect(numberToChinese(1000000000)).toBe('壹拾億元正');
    });

    it('converts maximum amount', () => {
      expect(numberToChinese(99999999999.99)).toBe(
        '玖佰玖拾玖億玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖元玖角玖分'
      );
    });
  });

  describe('edge cases', () => {
    it('throws error for negative amounts', () => {
      expect(() => numberToChinese(-1)).toThrow('金額不能為負數');
    });

    it('throws error for amounts exceeding maximum', () => {
      expect(() => numberToChinese(100000000000)).toThrow('金額不能超過');
    });

    it('handles floating point precision', () => {
      expect(numberToChinese(0.1 + 0.2)).toBe('零元參角');
    });
  });
});

describe('isValidAmount', () => {
  it('returns true for valid amounts', () => {
    expect(isValidAmount(0)).toBe(true);
    expect(isValidAmount(100)).toBe(true);
    expect(isValidAmount(99999999999.99)).toBe(true);
  });

  it('returns false for negative amounts', () => {
    expect(isValidAmount(-1)).toBe(false);
    expect(isValidAmount(-0.01)).toBe(false);
  });

  it('returns false for amounts exceeding maximum', () => {
    expect(isValidAmount(100000000000)).toBe(false);
    expect(isValidAmount(99999999999.991)).toBe(false);
  });
});
