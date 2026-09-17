import { useCallback, useEffect, useState } from "react";

/**
 * useState kabi ishlaydi, lekin qiymatni localStorage'da ham saqlaydi,
 * shunday qilib sahifa yangilansa ham (refresh) ma'lumot yo'qolmaydi.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Xotira to'lgan yoki localStorage bloklangan bo'lishi mumkin - ilova baribir ishlashda davom etadi
    }
  }, [key, value]);

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* no-op */
    }
    setValue(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue, remove] as const;
}
