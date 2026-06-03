import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ChefHat, Bookmark, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/lib/mock-data";
import { useSavedRecipes } from "@/hooks/use-saved-recipes";
import { useCookedRatings } from "@/hooks/use-cooked-ratings";
import { useToast } from "@/hooks/use-toast";

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

export function RecipeCard({ recipe, index }: RecipeCardProps) {
  const { isSaved, toggleSaved } = useSavedRecipes();
  const { isCooked, getRating } = useCookedRatings();
  const { toast } = useToast();
  const saved = isSaved(recipe.id);
  const cooked = isCooked(recipe.id);
  const rating = cooked ? getRating(recipe.id) : undefined;

  function handleBookmark(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const nowSaved = toggleSaved(recipe.id);
    toast({
      title: nowSaved ? "Saved to your collection" : "Removed from your collection",
      description: nowSaved
        ? `${recipe.title} is waiting in My Recipes.`
        : `${recipe.title} is no longer saved.`,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group"
    >
      <Link href={`/recipes/${recipe.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-muted mb-4 shadow-sm border border-border/50">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
              {recipe.region}
            </span>
            {rating && (
              <span className="bg-amber-500/90 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                {rating.rating}
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            aria-label={saved ? "Remove from saved" : "Save recipe"}
            aria-pressed={saved}
            onClick={handleBookmark}
            className={`absolute top-4 right-4 h-9 w-9 rounded-full backdrop-blur-sm shadow-sm transition-all duration-300 ${
              saved
                ? "bg-primary text-primary-foreground opacity-100 translate-y-0 hover:bg-primary/90"
                : "bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
          </Button>
        </div>

        <div className="space-y-2 px-1">
          <h3 className="font-serif text-2xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{recipe.cookingTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ChefHat className="w-4 h-4" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>

          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed pt-1">
            {recipe.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
