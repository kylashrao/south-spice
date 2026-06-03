import { useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star, ChefHat, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { mockRecipes } from "@/lib/mock-data";
import { useCookedRatings } from "@/hooks/use-cooked-ratings";

export default function CookedHistory() {
  const { list, sortedByRecent, removeRating } = useCookedRatings();

  const ratedRecipes = useMemo(() => {
    const map = new Map(mockRecipes.map((r) => [r.id, r]));
    return sortedByRecent
      .map((r) => {
        const recipe = map.get(r.recipeId);
        return recipe ? { recipe, rating: r } : null;
      })
      .filter(Boolean) as { recipe: (typeof mockRecipes)[0]; rating: (typeof list)[0] }[];
  }, [sortedByRecent]);

  const averageRating =
    list.length > 0
      ? (list.reduce((s, r) => s + r.rating, 0) / list.length).toFixed(1)
      : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col">
        <section className="py-16 bg-card/50 border-b border-border/50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                  Your Kitchen Log
                </p>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                  Cooked History
                </h1>
                <p className="text-muted-foreground text-lg mt-3 max-w-2xl">
                  {ratedRecipes.length === 0
                    ? "Mark recipes as cooked and rate them. Your most-loved dishes will appear here."
                    : `${ratedRecipes.length} ${ratedRecipes.length === 1 ? "recipe" : "recipes"} cooked and rated.`}
                </p>
              </div>

              {ratedRecipes.length > 0 && averageRating && (
                <div className="flex items-center gap-2 bg-secondary/50 border border-border/40 rounded-full px-4 py-2 self-start md:self-auto">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="text-sm font-medium">
                    Average rating: {averageRating}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    across {list.length} {list.length === 1 ? "dish" : "dishes"}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {ratedRecipes.length === 0 ? (
          <section className="flex-1 flex items-center justify-center py-20">
            <div className="container mx-auto px-4 text-center max-w-md">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ChefHat className="w-10 h-10 text-primary" />
              </div>
              <h2 className="font-serif text-3xl font-bold mb-4">
                Nothing cooked yet
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                After you try a recipe, rate it on the recipe page. Your
                personal cooked history will build up here.
              </p>
              <Link href="/recipes">
                <Button className="h-12 px-8 text-base rounded-xl">
                  Browse Recipes
                </Button>
              </Link>
            </div>
          </section>
        ) : (
          <section className="py-16">
            <div className="container mx-auto px-4 md:px-6">
              <div className="space-y-6 max-w-4xl">
                {ratedRecipes.map(({ recipe, rating }) => (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex gap-5 items-start p-5 border border-border/60 rounded-2xl bg-card hover:border-primary/40 transition-colors group"
                  >
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      className="block flex-shrink-0"
                    >
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-secondary">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                            {recipe.region}
                          </p>
                          <Link
                            href={`/recipes/${recipe.slug}`}
                            className="block"
                          >
                            <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-tight group-hover:text-primary transition-colors">
                              {recipe.title}
                            </h3>
                          </Link>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeRating(recipe.id)}
                          className="text-xs text-muted-foreground hover:text-destructive flex-shrink-0"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 mt-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating.rating
                                ? "fill-amber-500 text-amber-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-2">
                          {new Date(rating.cookedAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      {rating.review && (
                        <p className="text-sm text-foreground/80 mt-2 leading-relaxed">
                          &ldquo;{rating.review}&rdquo;
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
