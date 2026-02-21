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
    if (!router.isReady) return;

    const currentAmount = parseAmount(router.query.amount) ?? 0;
    if (currentAmount === amount) return;

    const nextQuery = { ...router.query };
    if (amount === 0) {
      delete nextQuery.amount;
    } else {
      nextQuery.amount = amount.toString();
    }

    router.replace(
      {
        pathname: router.pathname,
        query: nextQuery,
      },
      undefined,
      { shallow: true }
    );
  }, [amount, router]);
}
