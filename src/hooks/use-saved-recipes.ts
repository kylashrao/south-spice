import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "south-spice:saved-recipes";
const EVENT_NAME = "south-spice:saved-recipes-changed";

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

function writeStorage(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    // ignore quota / private mode errors
  }
}

export function useSavedRecipes() {
  const [savedIds, setSavedIds] = useState<string[]>(() => readStorage());

  useEffect(() => {
    function syncFromStorage() {
      setSavedIds(readStorage());
    }
    window.addEventListener(EVENT_NAME, syncFromStorage);
    window.addEventListener("storage", syncFromStorage);
    return () => {
      window.removeEventListener(EVENT_NAME, syncFromStorage);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds],
  );

  const toggleSaved = useCallback((id: string): boolean => {
    const current = readStorage();
    const exists = current.includes(id);
    const next = exists ? current.filter((v) => v !== id) : [...current, id];
    writeStorage(next);
    setSavedIds(next);
    return !exists;
  }, []);

  const clearSaved = useCallback(() => {
    writeStorage([]);
    setSavedIds([]);
  }, []);

  return { savedIds, isSaved, toggleSaved, clearSaved };
}
