import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  Minus,
  Plus,
  Printer,
  ShoppingBasket,
  Users,
  RotateCcw,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { mockRecipes } from "@/lib/mock-data";
import { useSavedRecipes } from "@/hooks/use-saved-recipes";
import { aggregateIngredients } from "@/lib/aggregate-ingredients";

const MIN_SERVINGS = 1;
const MAX_SERVINGS = 24;

export default function ShoppingList() {
  const { savedIds } = useSavedRecipes();

  const savedRecipes = useMemo(
    () => mockRecipes.filter((r) => savedIds.includes(r.id)),
    [savedIds],
  );

  const [servingsMap, setServingsMap] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    setServingsMap((current) => {
      const next: Record<string, number> = {};
      for (const r of savedRecipes) {
        next[r.id] = current[r.id] ?? r.servings;
      }
      return next;
    });
  }, [savedRecipes]);

  const items = useMemo(() => {
    return aggregateIngredients(
      savedRecipes.map((r) => ({
        recipe: r,
        servings: servingsMap[r.id] ?? r.servings,
      })),
    );
  }, [savedRecipes, servingsMap]);

  const totalItems = items.length;
  const checkedCount = items.reduce(
    (acc, item) => (checked.has(item.key) ? acc + 1 : acc),
    0,
  );

  function toggleChecked(key: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function setServings(id: string, value: number) {
    setServingsMap((prev) => ({
      ...prev,
      [id]: Math.max(MIN_SERVINGS, Math.min(MAX_SERVINGS, value)),
    }));
  }

  function resetAll() {
    const next: Record<string, number> = {};
    for (const r of savedRecipes) next[r.id] = r.servings;
    setServingsMap(next);
    setChecked(new Set());
  }

  function handlePrint() {
    if (typeof window !== "undefined") window.print();
  }

  if (savedRecipes.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="print-hidden">
          <Navbar />
        </div>
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="container mx-auto px-4 text-center max-w-md">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBasket className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-4">
              Your shopping list is empty
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Save a few recipes first and we'll combine all their ingredients
              into one tidy printable list.
            </p>
            <Link href="/recipes">
              <Button className="h-12 px-8 text-base rounded-xl">
                Browse Recipes
              </Button>
            </Link>
          </div>
        </main>
        <div className="print-hidden">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="print-hidden">
        <Navbar />
      </div>

      <main className="flex-1">
        <header className="hidden print-only mb-6">
          <h1 className="font-serif text-3xl font-bold">South Spice — Shopping List</h1>
          <p className="text-sm mt-1 italic opacity-80">
            For {savedRecipes.length}{" "}
            {savedRecipes.length === 1 ? "recipe" : "recipes"} · {totalItems}{" "}
            {totalItems === 1 ? "item" : "items"}
          </p>
        </header>

        <section className="py-12 md:py-16 bg-card/50 border-b border-border/50 print-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <Link
              href="/my-recipes"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to My Recipes
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                  Pantry-Ready
                </p>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                  Shopping List
                </h1>
                <p className="text-muted-foreground text-lg mt-3 max-w-2xl">
                  Ingredients from{" "}
                  <strong className="text-foreground">
                    {savedRecipes.length}
                  </strong>{" "}
                  saved {savedRecipes.length === 1 ? "recipe" : "recipes"},
                  consolidated into one tidy checklist.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={resetAll}
                  className="rounded-full gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
                <Button
                  onClick={handlePrint}
                  className="rounded-full gap-2"
                  data-testid="button-print-list"
                >
                  <Printer className="w-4 h-4" />
                  Print list
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
              {/* Recipes panel */}
              <aside className="lg:col-span-4 print-hidden">
                <h2 className="font-serif text-2xl font-semibold mb-5">
                  Cooking for
                </h2>
                <ul className="space-y-3">
                  {savedRecipes.map((r) => {
                    const current = servingsMap[r.id] ?? r.servings;
                    const adjusted = current !== r.servings;
                    return (
                      <li
                        key={r.id}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-card"
                      >
                        <Link
                          href={`/recipes/${r.slug}`}
                          className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-secondary"
                        >
                          <img
                            src={r.image}
                            alt={r.title}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/recipes/${r.slug}`}
                            className="font-serif font-semibold text-sm leading-tight line-clamp-2 hover:text-primary"
                          >
                            {r.title}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {r.region}
                            {adjusted ? ` · originally ${r.servings}` : ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() => setServings(r.id, current - 1)}
                            disabled={current <= MIN_SERVINGS}
                            aria-label={`Decrease servings for ${r.title}`}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <div className="min-w-[2.5rem] text-center text-sm font-semibold flex items-center justify-center gap-1">
                            <Users className="w-3 h-3 text-muted-foreground" />
                            {current}
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() => setServings(r.id, current + 1)}
                            disabled={current >= MAX_SERVINGS}
                            aria-label={`Increase servings for ${r.title}`}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </aside>

              {/* Checklist */}
              <div className="lg:col-span-8">
                <div className="flex items-baseline justify-between mb-5 print-hidden">
                  <h2 className="font-serif text-2xl font-semibold">
                    Ingredients
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {checkedCount} of {totalItems} checked
                  </p>
                </div>

                <ul className="divide-y divide-border/60 border border-border/60 rounded-2xl bg-card overflow-hidden">
                  {items.map((item) => {
                    const isChecked = checked.has(item.key);
                    return (
                      <li
                        key={item.key}
                        className="flex items-start gap-4 p-4 sm:p-5 print-avoid-break"
                      >
                        <button
                          type="button"
                          onClick={() => toggleChecked(item.key)}
                          aria-pressed={isChecked}
                          aria-label={`Mark ${item.name} as ${isChecked ? "unchecked" : "checked"}`}
                          className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-colors print-hidden ${
                            isChecked
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-border hover:border-primary"
                          }`}
                        >
                          {isChecked && (
                            <svg
                              viewBox="0 0 16 16"
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 8.5 7 12 13 4.5" />
                            </svg>
                          )}
                        </button>
                        <span className="hidden print-only mt-1 w-4 h-4 border border-foreground rounded-sm flex-shrink-0" />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-3 flex-wrap">
                            <span
                              className={`font-medium ${
                                isChecked
                                  ? "line-through text-muted-foreground"
                                  : "text-foreground"
                              } print:no-underline print:text-foreground`}
                            >
                              {item.name}
                            </span>
                            <span className="text-sm font-semibold text-primary whitespace-nowrap">
                              {item.displayQuantity}
                            </span>
                          </div>
                          {item.sources.length > 1 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              For {item.sources.length} recipes:{" "}
                              {item.sources
                                .map((s) => `${s.recipeTitle} (${s.scaledQuantity})`)
                                .join(" · ")}
                            </p>
                          )}
                          {item.sources.length === 1 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              For {item.sources[0].recipeTitle}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <p className="text-xs text-muted-foreground mt-4 print-hidden">
                  Quantities for the same ingredient and unit are added
                  together. Items with descriptive quantities like "to taste" or
                  "a pinch" are listed as-is.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="hidden print-only mt-10 pt-4 border-t border-foreground/30 text-xs">
          <p>From <strong>South Spice</strong> · {savedRecipes.map((r) => r.title).join(" · ")}</p>
        </footer>
      </main>

      <div className="print-hidden">
        <Footer />
      </div>
    </div>
  );
}
