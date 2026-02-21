import { renderHook } from '@testing-library/react';
import type { NextRouter } from 'next/router';
import { describe, expect, it, vi } from 'vitest';
import { useAmountUrlSync, useInitialAmountFromUrl } from './useAmountUrlSync';

function createRouter(overrides: Partial<NextRouter> = {}): NextRouter {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    isReady: true,
    isFallback: false,
    isLocaleDomain: false,
    isPreview: false,
    back: vi.fn(),
    beforePopState: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
    reload: vi.fn(),
    replace: vi.fn(),
    events: {
      emit: vi.fn(),
      off: vi.fn(),
      on: vi.fn(),
    },
    forward: vi.fn(),
    ...overrides,
  };
}

describe('useInitialAmountFromUrl', () => {
  it('returns 0 when router is not ready', () => {
    const router = createRouter({ isReady: false, query: { amount: '100' } });
    const { result } = renderHook(() => useInitialAmountFromUrl(router));
    expect(result.current).toBe(0);
  });

  it('parses amount from query', () => {
    const router = createRouter({ query: { amount: '1,000.5' } });
    const { result } = renderHook(() => useInitialAmountFromUrl(router));
    expect(result.current).toBe(1000.5);
  });
});

describe('useAmountUrlSync', () => {
  it('replaces with root when amount is 0', () => {
    const router = createRouter();
    renderHook(() => useAmountUrlSync(router, 0));
    expect(router.replace).toHaveBeenCalledWith('/', undefined, { shallow: true });
  });

  it('replaces with amount query when amount is non-zero', () => {
    const router = createRouter();
    renderHook(() => useAmountUrlSync(router, 100));
    expect(router.replace).toHaveBeenCalledWith('?amount=100', undefined, { shallow: true });
  });
});
