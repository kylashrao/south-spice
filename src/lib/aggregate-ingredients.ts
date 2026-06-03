import type { Recipe } from "@/lib/mock-data";
import { parseLeadingNumber, formatQuantity } from "@/lib/scale-quantity";

export interface ShoppingItemSource {
  recipeId: string;
  recipeTitle: string;
  recipeSlug: string;
  group: string;
  originalQuantity: string;
  scaledQuantity: string;
}

export interface ShoppingItem {
  key: string;
  name: string;
  unit: string;
  totalValue: number | null;
  textQuantities: string[];
  displayQuantity: string;
  sources: ShoppingItemSource[];
}

export function aggregateIngredients(
  selections: { recipe: Recipe; servings: number }[],
): ShoppingItem[] {
  const map = new Map<string, ShoppingItem>();

  for (const { recipe, servings } of selections) {
    const ratio = servings / (recipe.servings || 1);

    for (const group of recipe.ingredients) {
      for (const item of group.items) {
        const nameKey = item.name.trim().toLowerCase();
        const parsed = parseLeadingNumber(item.quantity);
        const unit = parsed ? parsed.rest : "";
        const key = parsed
          ? `${nameKey}||UNIT::${unit.toLowerCase()}`
          : `${nameKey}||TEXT::${item.quantity.trim().toLowerCase()}`;

        const scaledQuantity = parsed
          ? `${formatQuantity(parsed.value * ratio)}${unit ? " " + unit : ""}`
          : item.quantity;

        let entry = map.get(key);
        if (!entry) {
          entry = {
            key,
            name: item.name.trim(),
            unit,
            totalValue: parsed ? 0 : null,
            textQuantities: [],
            displayQuantity: "",
            sources: [],
          };
          map.set(key, entry);
        }

        if (parsed && entry.totalValue !== null) {
          entry.totalValue += parsed.value * ratio;
        } else if (!parsed) {
          if (!entry.textQuantities.includes(item.quantity.trim())) {
            entry.textQuantities.push(item.quantity.trim());
          }
        }

        entry.sources.push({
          recipeId: recipe.id,
          recipeTitle: recipe.title,
          recipeSlug: recipe.slug,
          group: group.group,
          originalQuantity: item.quantity,
          scaledQuantity,
        });
      }
    }
  }

  for (const entry of map.values()) {
    if (entry.totalValue !== null) {
      const formatted = formatQuantity(entry.totalValue);
      entry.displayQuantity = entry.unit
        ? `${formatted} ${entry.unit}`
        : formatted;
    } else {
      entry.displayQuantity = entry.textQuantities.join(" · ");
    }
  }

  return Array.from(map.values()).sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
  );
}
