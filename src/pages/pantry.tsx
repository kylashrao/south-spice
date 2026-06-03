import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChefHat,
  Clock,
  Search,
  Sparkles,
  Trash2,
  Utensils,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePantry } from "@/hooks/use-pantry";
import {
  getAllPantryIngredients,
  getStapleIngredientKeys,
  rankRecipesByPantry,
} from "@/lib/pantry-utils";

export default function Pantry() {
  const { pantry, has, toggle, addMany, clear } = usePantry();
  const [query, setQuery] = useState("");

  const allIngredients = useMemo(() => getAllPantryIngredients(), []);
  const staples = useMemo(() => getStapleIngredientKeys(0.4), []);

  const filteredIngredients = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allIngredients;
    return allIngredients.filter((i) => i.label.toLowerCase().includes(q));
  }, [allIngredients, query]);

  const ranked = useMemo(() => rankRecipesByPantry(pantry), [pantry]);

  const cookableNow = ranked.filter((r) => r.matchPercent === 100);
  const almostThere = ranked.filter(
    (r) => r.matchPercent >= 60 && r.matchPercent < 100,
  );
  const more = ranked.filter((r) => r.matchPercent > 0 && r.matchPercent < 60);

  const pantrySize = pantry.size;

  function handleSelectStaples() {
    addMany(staples);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="py-14 md:py-20 bg-card/50 border-b border-border/50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                Cook From What You Have
              </p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.05]">
                What can I make tonight?
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mt-5 leading-relaxed">
                Tick the ingredients sitting in your pantry and fridge — we'll
                surface the recipes you can cook without a grocery run, plus
                ones you're just one or two ingredients away from.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
              {/* Pantry picker */}
              <aside className="lg:col-span-4">
                <div className="sticky lg:top-24">
                  <div className="flex items-baseline justify-between mb-4">
                    <h2 className="font-serif text-2xl font-semibold">
                      Your pantry
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      {pantrySize} selected
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={handleSelectStaples}
                      className="rounded-full gap-2"
                      data-testid="button-add-staples"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Add staples
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={clear}
                      disabled={pantrySize === 0}
                      className="rounded-full gap-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear
                    </Button>
                  </div>

                  <div className="relative mb-4">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search ingredients..."
                      className="pl-9 h-11 rounded-xl"
                      data-testid="input-pantry-search"
                    />
                  </div>

                  <div className="border border-border/60 rounded-2xl bg-card max-h-[60vh] overflow-y-auto">
                    {filteredIngredients.length === 0 ? (
                      <p className="p-6 text-sm text-muted-foreground text-center">
                        No ingredients match "{query}".
                      </p>
                    ) : (
                      <ul className="divide-y divide-border/40">
                        {filteredIngredients.map((ing) => {
                          const checked = has(ing.key);
                          return (
                            <li key={ing.key}>
                              <button
                                type="button"
                                onClick={() => toggle(ing.key)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-secondary/40 transition-colors"
                              >
                                <span
                                  className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                                    checked
                                      ? "bg-primary border-primary text-primary-foreground"
                                      : "border-border"
                                  }`}
                                  aria-hidden="true"
                                >
                                  {checked && <Check className="w-3 h-3" />}
                                </span>
                                <span className="flex-1 text-sm">
                                  {ing.label}
                                </span>
                                <span className="text-[11px] text-muted-foreground">
                                  in {ing.count}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </aside>

              {/* Results */}
              <div className="lg:col-span-8">
                {pantrySize === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="space-y-12">
                    <ResultsBlock
                      title="Cook tonight"
                      subtitle="You have everything for these."
                      matches={cookableNow}
                      tone="primary"
                    />
                    <ResultsBlock
                      title="Almost there"
                      subtitle="Just one or two ingredients away."
                      matches={almostThere}
                      tone="warm"
                    />
                    <ResultsBlock
                      title="A grocery run away"
                      subtitle="A few more things to pick up."
                      matches={more}
                      tone="muted"
                    />
                    {cookableNow.length === 0 &&
                      almostThere.length === 0 &&
                      more.length === 0 && (
                        <div className="border border-border/60 rounded-2xl p-10 text-center bg-card">
                          <p className="text-muted-foreground">
                            None of our recipes match your pantry yet. Try
                            adding a few more ingredients.
                          </p>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-border/80 rounded-3xl p-10 md:p-14 text-center bg-card/40">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
        <Utensils className="w-7 h-7 text-primary" />
      </div>
      <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-3">
        Tell us what's in your kitchen
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
        Tick a few items on the left or hit "Add staples" to get a head start.
        Recipes you can cook will appear here, ranked by how close you are to a
        full match.
      </p>
    </div>
  );
}

function ResultsBlock({
  title,
  subtitle,
  matches,
  tone,
}: {
  title: string;
  subtitle: string;
  matches: ReturnType<typeof rankRecipesByPantry>;
  tone: "primary" | "warm" | "muted";
}) {
  if (matches.length === 0) return null;

  const toneClasses = {
    primary: "bg-primary/10 text-primary border-primary/30",
    warm: "bg-amber-500/15 text-amber-700 border-amber-400/40 dark:text-amber-300",
    muted: "bg-secondary text-muted-foreground border-border",
  } as const;

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold">
          {title}
        </h2>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full border ${toneClasses[tone]}`}
        >
          {matches.length}
        </span>
      </div>
      <p className="text-muted-foreground mb-6">{subtitle}</p>
      <ul className="space-y-4">
        {matches.map((m) => (
          <PantryRecipeCard key={m.recipe.id} match={m} tone={tone} />
        ))}
      </ul>
    </div>
  );
}

function PantryRecipeCard({
  match,
  tone,
}: {
  match: ReturnType<typeof rankRecipesByPantry>[number];
  tone: "primary" | "warm" | "muted";
}) {
  const { recipe, matchedCount, missingCount, matchPercent, missing } = match;

  const barColor =
    tone === "primary"
      ? "bg-primary"
      : tone === "warm"
      ? "bg-amber-500"
      : "bg-muted-foreground/50";

  const visibleMissing = missing.slice(0, 5);
  const extraMissing = Math.max(0, missing.length - visibleMissing.length);

  return (
    <li>
      <Link
        href={`/recipes/${recipe.slug}`}
        className="block group border border-border/60 rounded-2xl bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 sm:h-auto h-44 flex-shrink-0 overflow-hidden bg-secondary">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  {recipe.region}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-tight group-hover:text-primary transition-colors">
                  {recipe.title}
                </h3>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-serif text-2xl font-bold text-foreground">
                  {matchPercent}%
                </div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  match
                </div>
              </div>
            </div>

            <div className="h-1.5 w-full bg-secondary/60 rounded-full overflow-hidden mb-4">
              <div
                className={`h-full ${barColor} rounded-full transition-all`}
                style={{ width: `${matchPercent}%` }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground mb-3">
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {recipe.cookingTime}
              </span>
              <span className="inline-flex items-center gap-1">
                <ChefHat className="w-3.5 h-3.5" />
                {recipe.difficulty}
              </span>
              <span>
                {matchedCount} of {matchedCount + missingCount} ingredients on
                hand
              </span>
            </div>

            {missingCount === 0 ? (
              <p className="text-sm text-foreground/80 font-medium inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                Ready to cook with what you have.
              </p>
            ) : (
              <p className="text-sm text-foreground/80 leading-relaxed">
                <span className="font-medium text-foreground">Need:</span>{" "}
                {visibleMissing.join(", ")}
                {extraMissing > 0 && ` and ${extraMissing} more`}.
              </p>
            )}

            <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              View recipe
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
