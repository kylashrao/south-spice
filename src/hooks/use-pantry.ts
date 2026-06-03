import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "south-spice:pantry";
const EVENT_NAME = "south-spice:pantry-changed";

function readStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function writeStorage(keys: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    // ignore quota / private mode errors
  }
}

export function usePantry() {
  const [pantry, setPantry] = useState<Set<string>>(
    () => new Set(readStorage()),
  );

  useEffect(() => {
    function syncFromStorage() {
      setPantry(new Set(readStorage()));
    }
    window.addEventListener(EVENT_NAME, syncFromStorage);
    window.addEventListener("storage", syncFromStorage);
    return () => {
      window.removeEventListener(EVENT_NAME, syncFromStorage);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  const has = useCallback((key: string) => pantry.has(key), [pantry]);

  const toggle = useCallback((key: string) => {
    setPantry((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      writeStorage(Array.from(next));
      return next;
    });
  }, []);

  const setMany = useCallback((keys: string[]) => {
    const next = new Set(keys);
    writeStorage(Array.from(next));
    setPantry(next);
  }, []);

  const addMany = useCallback((keys: string[]) => {
    setPantry((prev) => {
      const next = new Set(prev);
      for (const k of keys) next.add(k);
      writeStorage(Array.from(next));
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    writeStorage([]);
    setPantry(new Set());
  }, []);

  return { pantry, has, toggle, setMany, addMany, clear };
}
