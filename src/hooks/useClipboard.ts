import { useCallback, useRef, useState } from 'react';

export function useClipboard(resetDelayMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (value: string) => {
      if (!value) {
        return false;
      }

      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => setCopied(false), resetDelayMs);
        return true;
      } catch (error) {
        console.error('Failed to copy:', error);
        return false;
      }
    },
    [resetDelayMs]
  );

  return { copied, copy };
}
