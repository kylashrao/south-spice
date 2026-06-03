import { useCallback, useEffect, useState } from "react";
import {
  emptyWeekPlan,
  type MealSlot,
  type WeekPlan,
  weekKey,
} from "@/lib/meal-plan-utils";

const STORAGE_KEY = "south-spice:meal-plan";
const EVENT_NAME = "south-spice:meal-plan-changed";

type Store = Record<string, WeekPlan>;

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

export function useMealPlan(week: Date) {
  const key = weekKey(week);
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

  const plan: WeekPlan = store[key] ?? emptyWeekPlan();

  const setMeal = useCallback(
    (dayIndex: number, slot: MealSlot, recipeId: string | null) => {
      const current = readStore();
      const existing = current[key] ?? emptyWeekPlan();
      const next = existing.map((d, i) => {
        if (i !== dayIndex) return d;
        const copy = { ...d };
        if (recipeId === null) {
          delete copy[slot];
        } else {
          copy[slot] = recipeId;
        }
        return copy;
      });
      const nextStore = { ...current, [key]: next };
      writeStore(nextStore);
      setStore(nextStore);
    },
    [key],
  );

  const clearWeek = useCallback(() => {
    const current = readStore();
    const nextStore = { ...current, [key]: emptyWeekPlan() };
    writeStore(nextStore);
    setStore(nextStore);
  }, [key]);

  return { plan, setMeal, clearWeek };
}
