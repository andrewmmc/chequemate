import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHistory, HistoryEntry } from './useHistory';

describe('useHistory', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('initialization', () => {
    it('starts with empty history', () => {
      const { result } = renderHook(() => useHistory());
      expect(result.current.history).toEqual([]);
    });

    it('loads existing history from localStorage', () => {
      const existingHistory: HistoryEntry[] = [
        {
          id: 'test-id-1',
          amount: 100,
          chinese: '壹佰元正',
          english: 'One Hundred Dollars Only',
          timestamp: Date.now(),
        },
      ];
      localStorage.setItem('cheque-converter-history', JSON.stringify(existingHistory));

      const { result } = renderHook(() => useHistory());
      expect(result.current.history).toEqual(existingHistory);
    });

    it('handles corrupted localStorage data gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem('cheque-converter-history', 'invalid json');

      const { result } = renderHook(() => useHistory());
      expect(result.current.history).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('addToHistory', () => {
    it('adds entry to history', () => {
      const { result } = renderHook(() => useHistory());

      act(() => {
        result.current.addToHistory(100, '港幣壹佰元正', 'Hong Kong Dollars One Hundred Only');
      });

      expect(result.current.history).toHaveLength(1);
      expect(result.current.history[0].amount).toBe(100);
      expect(result.current.history[0].chinese).toBe('港幣壹佰元正');
      expect(result.current.history[0].english).toBe('Hong Kong Dollars One Hundred Only');
    });

    it('prepends new entry to beginning', () => {
      const { result } = renderHook(() => useHistory());

      act(() => {
        result.current.addToHistory(100, '港幣壹佰元正', 'Hong Kong Dollars One Hundred Only');
      });
      act(() => {
        result.current.addToHistory(200, '港幣貳佰元正', 'Hong Kong Dollars Two Hundred Only');
      });

      expect(result.current.history).toHaveLength(2);
      expect(result.current.history[0].amount).toBe(200);
      expect(result.current.history[1].amount).toBe(100);
    });

    it('deduplicates by amount', () => {
      const { result } = renderHook(() => useHistory());

      act(() => {
        result.current.addToHistory(100, '港幣壹佰元正', 'Hong Kong Dollars One Hundred Only');
      });
      act(() => {
        result.current.addToHistory(100, '港幣壹佰元正', 'Hong Kong Dollars One Hundred Only');
      });

      expect(result.current.history).toHaveLength(1);
    });

    it('limits history to 10 entries', () => {
      const { result } = renderHook(() => useHistory());

      act(() => {
        for (let i = 1; i <= 15; i++) {
          result.current.addToHistory(i, `港幣${i}元正`, `Hong Kong Dollars ${i} Only`);
        }
      });

      expect(result.current.history).toHaveLength(10);
      // Most recent should be first
      expect(result.current.history[0].amount).toBe(15);
    });

    it('persists to localStorage', () => {
      const { result } = renderHook(() => useHistory());

      act(() => {
        result.current.addToHistory(100, '港幣壹佰元正', 'Hong Kong Dollars One Hundred Only');
      });

      const stored = JSON.parse(localStorage.getItem('cheque-converter-history') || '[]');
      expect(stored).toHaveLength(1);
      expect(stored[0].amount).toBe(100);
    });
  });

  describe('removeFromHistory', () => {
    it('removes entry by id', () => {
      const { result } = renderHook(() => useHistory());

      act(() => {
        result.current.addToHistory(100, '港幣壹佰元正', 'Hong Kong Dollars One Hundred Only');
      });

      const entryId = result.current.history[0].id;

      act(() => {
        result.current.removeFromHistory(entryId);
      });

      expect(result.current.history).toHaveLength(0);
    });

    it('does nothing if id not found', () => {
      const { result } = renderHook(() => useHistory());

      act(() => {
        result.current.addToHistory(100, '港幣壹佰元正', 'Hong Kong Dollars One Hundred Only');
      });

      act(() => {
        result.current.removeFromHistory('non-existent-id');
      });

      expect(result.current.history).toHaveLength(1);
    });

    it('persists removal to localStorage', () => {
      const { result } = renderHook(() => useHistory());

      act(() => {
        result.current.addToHistory(100, '港幣壹佰元正', 'Hong Kong Dollars One Hundred Only');
      });

      const entryId = result.current.history[0].id;

      act(() => {
        result.current.removeFromHistory(entryId);
      });

      const stored = JSON.parse(localStorage.getItem('cheque-converter-history') || '[]');
      expect(stored).toHaveLength(0);
    });
  });

  describe('clearHistory', () => {
    it('clears all entries', () => {
      const { result } = renderHook(() => useHistory());

      act(() => {
        result.current.addToHistory(100, '港幣壹佰元正', 'Hong Kong Dollars One Hundred Only');
        result.current.addToHistory(200, '港幣貳佰元正', 'Hong Kong Dollars Two Hundred Only');
      });

      expect(result.current.history).toHaveLength(2);

      act(() => {
        result.current.clearHistory();
      });

      expect(result.current.history).toHaveLength(0);
    });

    it('clears localStorage', () => {
      const { result } = renderHook(() => useHistory());

      act(() => {
        result.current.addToHistory(100, '港幣壹佰元正', 'Hong Kong Dollars One Hundred Only');
      });

      act(() => {
        result.current.clearHistory();
      });

      expect(localStorage.getItem('cheque-converter-history')).toBe('[]');
    });
  });
});
