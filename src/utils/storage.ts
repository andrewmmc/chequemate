export function getStorageItem(key: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Failed to read localStorage key "${key}":`, error);
    return null;
  }
}

export function setStorageItem(key: string, value: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Failed to write localStorage key "${key}":`, error);
  }
}

export function getStorageJson<T>(key: string, fallback: T): T {
  const raw = getStorageItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Failed to parse localStorage key "${key}":`, error);
    return fallback;
  }
}

export function setStorageJson<T>(key: string, value: T): void {
  setStorageItem(key, JSON.stringify(value));
}
