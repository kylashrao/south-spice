import type { Recipe } from "@/lib/mock-data";
import { mockRecipes } from "@/lib/mock-data";

export function normalizeIngredientName(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .split(",")[0]
    .replace(/\s+/g, " ")
    .trim();
}

export interface PantryIngredient {
  key: string;
  label: string;
  count: number;
}

export function getAllPantryIngredients(): PantryIngredient[] {
  const map = new Map<string, { label: string; count: number }>();
  for (const recipe of mockRecipes) {
    const seenInRecipe = new Set<string>();
    for (const group of recipe.ingredients) {
      for (const item of group.items) {
        const key = normalizeIngredientName(item.name);
        if (!key) continue;
        if (seenInRecipe.has(key)) continue;
        seenInRecipe.add(key);
        const entry = map.get(key);
        if (entry) {
          entry.count += 1;
        } else {
          const label = key.replace(/\b\w/g, (c) => c.toUpperCase());
          map.set(key, { label, count: 1 });
        }
      }
    }
  }
  return Array.from(map.entries())
    .map(([key, v]) => ({ key, label: v.label, count: v.count }))
    .sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: "base" }),
    );
}

export interface RecipeMatch {
  recipe: Recipe;
  totalIngredients: number;
  matchedCount: number;
  missingCount: number;
  matchPercent: number;
  missing: string[];
}

export function rankRecipesByPantry(pantry: Set<string>): RecipeMatch[] {
  const ranked: RecipeMatch[] = [];

  for (const recipe of mockRecipes) {
    const uniqueKeys = new Set<string>();
    const labelByKey = new Map<string, string>();
    for (const group of recipe.ingredients) {
      for (const item of group.items) {
        const key = normalizeIngredientName(item.name);
        if (!key) continue;
        if (!uniqueKeys.has(key)) {
          uniqueKeys.add(key);
          labelByKey.set(key, item.name);
        }
      }
    }

    const total = uniqueKeys.size;
    let matched = 0;
    const missing: string[] = [];
    for (const key of uniqueKeys) {
      if (pantry.has(key)) {
        matched += 1;
      } else {
        missing.push(labelByKey.get(key) ?? key);
      }
    }

    ranked.push({
      recipe,
      totalIngredients: total,
      matchedCount: matched,
      missingCount: total - matched,
      matchPercent: total > 0 ? Math.round((matched / total) * 100) : 0,
      missing,
    });
  }

  ranked.sort((a, b) => {
    if (b.matchPercent !== a.matchPercent) return b.matchPercent - a.matchPercent;
    if (a.missingCount !== b.missingCount) return a.missingCount - b.missingCount;
    return a.recipe.title.localeCompare(b.recipe.title);
  });

  return ranked;
}

export function getStapleIngredientKeys(threshold = 0.4): string[] {
  const all = getAllPantryIngredients();
  const totalRecipes = mockRecipes.length;
  return all
    .filter((i) => i.count / totalRecipes >= threshold)
    .map((i) => i.key);
}
