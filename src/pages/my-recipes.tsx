import { useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Bookmark, Trash2, ShoppingBasket } from "lucide-react";
//import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { mockRecipes } from "@/lib/mock-data";
import { useSavedRecipes } from "@/hooks/use-saved-recipes";
import { useToast } from "@/hooks/use-toast";

export default function MyRecipes() {
  const { savedIds, clearSaved } = useSavedRecipes();
  const { toast } = useToast();

  const savedRecipes = useMemo(
    () => mockRecipes.filter((r) => savedIds.includes(r.id)),
    [savedIds],
  );

  function handleClear() {
    if (savedRecipes.length === 0) return;
    clearSaved();
    toast({
      title: "Collection cleared",
      description: "All saved recipes have been removed.",
    });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/*<Navbar /> */}

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
                  Your Collection
                </p>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                  My Saved Recipes
                </h1>
                <p className="text-muted-foreground text-lg mt-3 max-w-2xl">
                  {savedRecipes.length === 0
                    ? "Recipes you bookmark will live here, ready for the next time you're in the kitchen."
                    : `${savedRecipes.length} ${savedRecipes.length === 1 ? "recipe" : "recipes"} saved and ready to cook.`}
                </p>
              </div>

              {savedRecipes.length > 0 && (
                <div className="flex flex-wrap gap-3 self-start md:self-auto">
                  <Link href="/shopping-list">
                    <Button
                      className="rounded-full gap-2"
                      data-testid="button-open-shopping-list"
                    >
                      <ShoppingBasket className="w-4 h-4" />
                      Shopping list
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="rounded-full gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear collection
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {savedRecipes.length === 0 ? (
          <section className="flex-1 flex items-center justify-center py-20">
            <div className="container mx-auto px-4 text-center max-w-md">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-10 h-10 text-primary" />
              </div>
              <h2 className="font-serif text-3xl font-bold mb-4">No saved recipes yet</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Explore our collection and tap the bookmark icon on any recipe to save it here for quick access later.
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {savedRecipes.map((recipe, index) => (
                  <RecipeCard key={recipe.id} recipe={recipe} index={index} />
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
