import { mockRecipes, type Recipe } from "@/lib/mock-data";

export function getRecipeOfTheDay(date: Date = new Date()): Recipe {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const seed = dayOfYear + date.getFullYear() * 7;
  const index = ((seed % mockRecipes.length) + mockRecipes.length) % mockRecipes.length;
  return mockRecipes[index];
}

export function formatTodayLabel(date: Date = new Date()): string {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
