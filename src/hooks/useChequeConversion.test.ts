import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useChequeConversion } from './useChequeConversion';

describe('useChequeConversion', () => {
  it('returns converted chinese and english text for zero amount', () => {
    const { result } = renderHook(() => useChequeConversion(0, 'Conversion error'));
    expect(result.current).toEqual({
      chineseText: '零元正',
      englishText: 'Zero Dollars Only',
      error: '',
    });
  });

  it('returns converted chinese and english text', () => {
    const { result } = renderHook(() => useChequeConversion(100, 'Conversion error'));
    expect(result.current.chineseText).toBe('壹佰元正');
    expect(result.current.englishText).toBe('One Hundred Dollars Only');
    expect(result.current.error).toBe('');
  });

  it('returns converter error for invalid amount', () => {
    const { result } = renderHook(() => useChequeConversion(-1, 'Conversion error'));
    expect(result.current.chineseText).toBe('');
    expect(result.current.englishText).toBe('');
    expect(result.current.error).toBe('金額不能為負數');
  });
});
