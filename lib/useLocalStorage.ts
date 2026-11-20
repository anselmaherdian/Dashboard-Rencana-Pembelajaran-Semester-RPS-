"use client";
import { useEffect, useState } from "react";

// Custom hook: state yang disimpan di LocalStorage (hanya untuk data non-sensitif).
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) setValue(JSON.parse(saved) as T);
    } catch {}
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value, ready]);

  return [value, setValue] as const;
}
