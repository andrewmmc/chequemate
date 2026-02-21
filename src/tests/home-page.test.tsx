import { act, fireEvent, render, screen } from '@testing-library/react';
import type { NextRouter } from 'next/router';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Home from '../pages/index';

vi.mock('next/head', () => ({
  default: ({ children }: { children: ReactNode }) => children,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('../contexts/LanguageContext', () => ({
  useLanguage: () => ({ locale: 'en', setLocale: vi.fn() }),
}));

const mockUseRouter = vi.fn();
vi.mock('next/router', () => ({
  useRouter: () => mockUseRouter(),
}));

const addToHistory = vi.fn();
const removeFromHistory = vi.fn();
const clearHistory = vi.fn();
let history = [] as Array<{
  id: string;
  amount: number;
  chinese: string;
  english: string;
  timestamp: number;
}>;

vi.mock('../hooks/useHistory', () => ({
  useHistory: () => ({
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  }),
}));

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

describe('Home page flows', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    history = [];
    addToHistory.mockReset();
    removeFromHistory.mockReset();
    clearHistory.mockReset();
  });

  it('syncs URL and adds to history with debounce when typing amount', () => {
    const router = createRouter();
    mockUseRouter.mockReturnValue(router);

    render(<Home />);

    const input = screen.getByLabelText('amountInput.label');
    fireEvent.change(input, { target: { value: '100' } });

    expect(router.replace).toHaveBeenCalledWith(
      { pathname: '/', query: { amount: '100' } },
      undefined,
      { shallow: true }
    );

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(addToHistory).toHaveBeenCalledWith(100, '壹佰元正', 'One Hundred Dollars Only');

    fireEvent.blur(input);
    expect((input as HTMLInputElement).value).toBe('100.00');
  });

  it('updates amount from quick amount and history selection', () => {
    const router = createRouter();
    mockUseRouter.mockReturnValue(router);
    history = [
      {
        id: '1',
        amount: 200,
        chinese: '貳佰元正',
        english: 'Two Hundred Dollars Only',
        timestamp: Date.now(),
      },
    ];

    render(<Home />);

    fireEvent.click(screen.getByRole('button', { name: '$100' }));
    expect(router.replace).toHaveBeenCalledWith(
      { pathname: '/', query: { amount: '100' } },
      undefined,
      { shallow: true }
    );

    fireEvent.click(screen.getByText('HKD 200.00'));
    expect(router.replace).toHaveBeenCalledWith(
      { pathname: '/', query: { amount: '200' } },
      undefined,
      { shallow: true }
    );
  });

  it('hydrates input from amount query once router is ready', () => {
    const router = createRouter({ query: { amount: '1000.5' }, isReady: true });
    mockUseRouter.mockReturnValue(router);

    render(<Home />);

    const input = screen.getByLabelText('amountInput.label') as HTMLInputElement;
    expect(input.value).toBe('1000.5');
  });
});
