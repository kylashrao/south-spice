import { useCallback, useEffect, useMemo, useState } from "react";

export interface CookedRating {
  recipeId: string;
  rating: number; // 1-5
  review?: string;
  cookedAt: number;
}

const STORAGE_KEY = "south-spice:cooked-ratings";
const EVENT_NAME = "south-spice:cooked-ratings-changed";

function readStore(): CookedRating[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as CookedRating[];
    return [];
  } catch {
    return [];
  }
}

function writeStore(list: CookedRating[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch {
    /* ignore */
  }
}

export function useCookedRatings() {
  const [list, setList] = useState<CookedRating[]>(() => readStore());

  useEffect(() => {
    function refresh() {
      setList(readStore());
    }
    window.addEventListener(EVENT_NAME, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(EVENT_NAME, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const getRating = useCallback(
    (recipeId: string): CookedRating | undefined =>
      list.find((r) => r.recipeId === recipeId),
    [list],
  );

  const isCooked = useCallback(
    (recipeId: string) => list.some((r) => r.recipeId === recipeId),
    [list],
  );

  const rate = useCallback(
    (recipeId: string, rating: number, review?: string) => {
      const current = readStore();
      const next = current.filter((r) => r.recipeId !== recipeId);
      next.push({
        recipeId,
        rating,
        review: review?.trim() || undefined,
        cookedAt: Date.now(),
      });
      writeStore(next);
      setList(next);
    },
    [],
  );

  const removeRating = useCallback((recipeId: string) => {
    const current = readStore();
    const next = current.filter((r) => r.recipeId !== recipeId);
    writeStore(next);
    setList(next);
  }, []);

  const sortedByRecent = useMemo(() => {
    return [...list].sort((a, b) => b.cookedAt - a.cookedAt);
  }, [list]);

  return { list, getRating, isCooked, rate, removeRating, sortedByRecent };
}
