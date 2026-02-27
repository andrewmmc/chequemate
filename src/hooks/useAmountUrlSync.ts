import { useCallback, useEffect, useMemo } from 'react';
import { NextRouter } from 'next/router';
import { parseAmount } from '../schemas/amount';
import { Currency } from '../domain/currency';

const VALID_CURRENCIES: Currency[] = ['HKD', 'RMB', 'USD', 'GBP'];

export function useInitialAmountFromUrl(router: NextRouter) {
  return useMemo(() => {
    if (!router.isReady) return 0;
    return parseAmount(router.query.amount) ?? 0;
  }, [router.isReady, router.query.amount]);
}

export function useInitialCurrencyFromUrl(router: NextRouter): Currency {
  return useMemo(() => {
    if (!router.isReady) return 'HKD';
    const raw = router.query.currency;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return VALID_CURRENCIES.includes(value as Currency) ? (value as Currency) : 'HKD';
  }, [router.isReady, router.query.currency]);
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

export function useCurrencyUrlSync(router: NextRouter): (currency: Currency) => void {
  const setCurrency = useCallback(
    (newCurrency: Currency) => {
      if (!router.isReady) return;

      const nextQuery = { ...router.query };
      nextQuery.currency = newCurrency;

      router.replace(
        {
          pathname: router.pathname,
          query: nextQuery,
        },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  return setCurrency;
}
