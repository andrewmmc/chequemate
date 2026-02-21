import { useCallback, useState } from 'react';
import { parseAmount } from '../schemas/amount';

export function useAmountInputState(initialAmount: number) {
  const [amount, setAmount] = useState<number>(() => initialAmount);
  const [inputValue, setInputValue] = useState<string>(() =>
    initialAmount === 0 ? '' : initialAmount.toString()
  );

  const updateAmount = useCallback((newAmount: number) => {
    setAmount(newAmount);
    setInputValue(newAmount === 0 ? '' : newAmount.toString());
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);

    if (value === '' || value === '.') {
      setAmount(0);
      return;
    }

    const validated = parseAmount(value);
    if (validated !== null) {
      setAmount(validated);
    }
  }, []);

  const handleInputBlur = useCallback(() => {
    if (inputValue === '' || inputValue === '.') {
      setInputValue('');
      setAmount(0);
      return;
    }

    const formatted = parseFloat(inputValue).toFixed(2);
    setInputValue(formatted);
    setAmount(parseFloat(formatted));
  }, [inputValue]);

  return {
    amount,
    inputValue,
    updateAmount,
    handleInputChange,
    handleInputBlur,
  };
}
