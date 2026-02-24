import { useState, useCallback } from 'react';
import { getStorageJson, setStorageJson } from '../utils/storage';
import { Currency } from '../domain/currency';

export interface HistoryEntry {
  id: string;
  amount: number;
  currency: Currency;
  chinese: string;
  simplifiedChinese: string;
  english: string;
  timestamp: number;
}

const STORAGE_KEY = 'cheque-converter-history';
const MAX_HISTORY_SIZE = 10;

function loadHistory(): HistoryEntry[] {
  const raw = getStorageJson<HistoryEntry[]>(STORAGE_KEY, []);
  // Migrate legacy entries that predate currency support
  return raw.map((entry) => ({
    ...entry,
    currency: (entry.currency ?? 'HKD') as Currency,
    simplifiedChinese: entry.simplifiedChinese ?? '',
  }));
}

function saveHistory(history: HistoryEntry[]): void {
  setStorageJson(STORAGE_KEY, history);
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory());

  const addToHistory = useCallback(
    (
      amount: number,
      currency: Currency,
      chinese: string,
      simplifiedChinese: string,
      english: string
    ) => {
      const newEntry: HistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        amount,
        currency,
        chinese,
        simplifiedChinese,
        english,
        timestamp: Date.now(),
      };

      setHistory((prev) => {
        const filtered = prev.filter(
          (entry) => !(entry.amount === amount && entry.currency === currency)
        );
        const updated = [newEntry, ...filtered].slice(0, MAX_HISTORY_SIZE);
        saveHistory(updated);
        return updated;
      });
    },
    []
  );

  const removeFromHistory = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((entry) => entry.id !== id);
      saveHistory(updated);
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveHistory([]);
  }, []);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}
