import { useState, useCallback } from 'react';
import { getStorageJson, setStorageJson } from '../utils/storage';

export interface HistoryEntry {
  id: string;
  amount: number;
  chinese: string;
  english: string;
  timestamp: number;
}

const STORAGE_KEY = 'cheque-converter-history';
const MAX_HISTORY_SIZE = 10;

function loadHistory(): HistoryEntry[] {
  return getStorageJson<HistoryEntry[]>(STORAGE_KEY, []);
}

function saveHistory(history: HistoryEntry[]): void {
  setStorageJson(STORAGE_KEY, history);
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory());

  const addToHistory = useCallback((amount: number, chinese: string, english: string) => {
    const newEntry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      amount,
      chinese,
      english,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      // Check if this amount already exists
      const filtered = prev.filter((entry) => entry.amount !== amount);

      // Add new entry at the beginning and limit size
      const updated = [newEntry, ...filtered].slice(0, MAX_HISTORY_SIZE);

      // Save to localStorage
      saveHistory(updated);

      return updated;
    });
  }, []);

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
