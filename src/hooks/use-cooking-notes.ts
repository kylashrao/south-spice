import { useCallback, useEffect, useState } from "react";

export interface CookingNote {
  id: string;
  text: string;
  createdAt: number;
}

const STORAGE_KEY = "south-spice:cooking-notes";
const EVENT_NAME = "south-spice:cooking-notes-changed";

type Store = Record<string, CookingNote[]>;

function readStore(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as Store;
    return {};
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch {
    /* ignore */
  }
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useCookingNotes(recipeId: string) {
  const [store, setStore] = useState<Store>(() => readStore());

  useEffect(() => {
    function refresh() {
      setStore(readStore());
    }
    window.addEventListener(EVENT_NAME, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(EVENT_NAME, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const notes: CookingNote[] = store[recipeId] ?? [];

  const addNote = useCallback(
    (text: string) => {
      const current = readStore();
      const list = current[recipeId] ?? [];
      const next: CookingNote[] = [
        { id: generateId(), text: text.trim(), createdAt: Date.now() },
        ...list,
      ];
      const nextStore = { ...current, [recipeId]: next };
      writeStore(nextStore);
      setStore(nextStore);
    },
    [recipeId],
  );

  const deleteNote = useCallback(
    (id: string) => {
      const current = readStore();
      const list = current[recipeId] ?? [];
      const next = list.filter((n) => n.id !== id);
      const nextStore = { ...current, [recipeId]: next };
      writeStore(nextStore);
      setStore(nextStore);
    },
    [recipeId],
  );

  return { notes, addNote, deleteNote };
}
