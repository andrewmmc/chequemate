import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useAmountInputState } from './useAmountInputState';

describe('useAmountInputState', () => {
  it('initializes from amount', () => {
    const { result } = renderHook(() => useAmountInputState(100));
    expect(result.current.amount).toBe(100);
    expect(result.current.inputValue).toBe('100');
  });

  it('updates amount from valid input', () => {
    const { result } = renderHook(() => useAmountInputState(0));

    act(() => {
      result.current.handleInputChange('1.2');
    });

    expect(result.current.amount).toBe(1.2);
    expect(result.current.inputValue).toBe('1.2');
  });

  it('formats to two decimals on blur', () => {
    const { result } = renderHook(() => useAmountInputState(0));

    act(() => {
      result.current.handleInputChange('1.2');
    });

    act(() => {
      result.current.handleInputBlur();
    });

    expect(result.current.amount).toBe(1.2);
    expect(result.current.inputValue).toBe('1.20');
  });

  it('sets amount to 0 for empty and dot values', () => {
    const { result } = renderHook(() => useAmountInputState(10));

    act(() => {
      result.current.handleInputChange('');
    });
    expect(result.current.amount).toBe(0);
    expect(result.current.inputValue).toBe('');

    act(() => {
      result.current.handleInputChange('.');
    });
    expect(result.current.amount).toBe(0);
    expect(result.current.inputValue).toBe('.');
  });
});
