import { useEffect, useMemo } from 'react';
import { NextRouter } from 'next/router';
import { parseAmount } from '../schemas/amount';

export function useInitialAmountFromUrl(router: NextRouter) {
  return useMemo(() => {
    if (!router.isReady) return 0;
    return parseAmount(router.query.amount) ?? 0;
  }, [router.isReady, router.query.amount]);
}

export function useAmountUrlSync(router: NextRouter, amount: number) {
  useEffect(() => {
    if (amount === 0) {
      router.replace('/', undefined, { shallow: true });
    } else {
      router.replace(`?amount=${amount}`, undefined, { shallow: true });
    }
  }, [amount, router]);
}
