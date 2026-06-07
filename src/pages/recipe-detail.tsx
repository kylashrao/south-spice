import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ChefHat, Users, Bookmark, Printer, Utensils, Lightbulb, Check, Minus, Plus, RotateCcw, Flame, Pencil, Trash2, Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getRecipeBySlug, mockRecipes } from "@/lib/mock-data";
import NotFound from "@/pages/not-found";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { useSavedRecipes } from "@/hooks/use-saved-recipes";
import { useToast } from "@/hooks/use-toast";
import { scaleQuantity } from "@/lib/scale-quantity";
import { CookMode } from "@/components/recipe/CookMode";
import { CookedRatingWidget } from "@/components/recipe/CookedRatingWidget";
import { ShareMenu } from "@/components/recipe/ShareMenu";
import { PrintRecipeCard } from "@/components/recipe/PrintRecipeCard";
import { useCookingNotes } from "@/hooks/use-cooking-notes";
import { useCookedRatings } from "@/hooks/use-cooked-ratings";
import { Textarea } from "@/components/ui/textarea";

const MIN_SERVINGS = 1;
const MAX_SERVINGS = 24;

export default function RecipeDetail() {
  const params = useParams<{ slug: string }>();
  const recipe = getRecipeBySlug(params.slug);
  const { isSaved, toggleSaved } = useSavedRecipes();
  const { notes } = useCookingNotes(recipe?.id ?? "__unknown__");
  const { toast } = useToast();
  const baseServings = recipe?.servings ?? 1;
  const [servings, setServings] = useState<number>(baseServings);
  const [cookModeOpen, setCookModeOpen] = useState(false);

  const recipe = mockRecipes.find((r) => r.slug === params.slug);

    // ADD OPTIONAL CHAINING (?.) AND LOGICAL FALLBACKS (||) HERE:
  const [servings, setServings] = useState(recipe?.servings || 2);
  const [cookedStatus, setCookedStatus] = useState(recipe?.isCooked || false);

  // ------------------------------------------------------------------
  // CRITICAL: MAKE SURE THERE IS NO OTHER "const recipe =" OR 
  // "const [servings] =" BLOCK DIRECTLY BELOW THIS LINE! 
  // If there is, delete it completely.
  // ------------------------------------------------------------------

  // The component should continue smoothly into your handlers and effects:
  const { addRecipe, removeRecipe, isSaved } = useSavedRecipes();
  const saved = recipe ? isSaved(recipe.id) : false;

  useEffect(() => {
    if (recipe) {
      setCookedStatus(recipe.isCooked || false);
    }
  }, [recipe]);

  useEffect(() => {
    setServings(baseServings);
  }, [baseServings]);

  if (!recipe) {
    return <NotFound />;
  }

  const saved = isSaved(recipe.id);
  const ratio = servings / baseServings;
  const isAdjusted = servings !== baseServings;
  const decrement = () => setServings((s) => Math.max(MIN_SERVINGS, s - 1));
  const increment = () => setServings((s) => Math.min(MAX_SERVINGS, s + 1));
  const reset = () => setServings(baseServings);

  function handleSave() {
    if (!recipe) return;
    const nowSaved = toggleSaved(recipe.id);
    toast({
      title: nowSaved ? "Saved to your collection" : "Removed from your collection",
      description: nowSaved
        ? `${recipe.title} is waiting in My Recipes.`
        : `${recipe.title} is no longer saved.`,
    });
  }

  const related = mockRecipes
    .filter((r) => r && recipe && r.id !== recipe.id && r.region === recipe?.region)
    .slice(0, 3);

  const fallbackRelated = mockRecipes.filter((r) => r && recipe && r.id !== recipe.id).slice(0, 3);
  const suggestions = related.length >= 2 ? related : fallbackRelated;

  // ADD THIS ACCIDENT-PREVENTION GUARD:
  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground animate-pulse">Loading recipe details...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900">
      <div className="print-hidden">
        <Navbar />
      </div>

      {/* Print-only recipe card */}
      <div className="print-only">
        <PrintRecipeCard recipe={recipe} servings={servings} ratio={ratio} isAdjusted={isAdjusted} baseServings={baseServings} />
      </div>

      <main className="flex-1 print-hidden">
        {/* Hero */}
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-stone-50 print-hidden" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 print-hidden"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to recipes
            </Link>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <AnimatePresence mode="wait">
                <motion.div
                 key={recipe?.id || 'recipe-detail'} // <--- Safe, bulletproof string key
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                >
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    {recipe.region}
                  </span>
                  {recipe?.tags && recipe.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-secondary/60 text-foreground/80 text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-foreground mb-5">
                  {recipe.title}
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
                  {recipe.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 max-w-xl">
                  <Stat icon={<Clock className="w-4 h-4" />} label="Cook" value={recipe?.cookingTime || "N/A"} />
                  <Stat 
                    icon={<Utensils className="w-4 h-4" />} 
                    label="Prep" 
                    value={recipe?.prepTime ? recipe.prepTime.split("(")[0].trim() : "N/A"} 
                  />
                  <Stat icon={<Users className="w-4 h-4" />} label="Serves" value={`${servings || recipe?.servings || 2}`} />
                  <Stat icon={<ChefHat className="w-4 h-4" />} label="Level" value={recipe?.difficulty || "Easy"} />
                </div>

                <div className="flex flex-wrap gap-3 print-hidden">
                  <Button
                    size="lg"
                    onClick={handleSave}
                    aria-pressed={saved}
                    variant={saved ? "outline" : "default"}
                    className="rounded-full px-6"
                  >
                    {saved ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4 mr-2" />
                        Save Recipe
                      </>
                    )}
                  </Button>
                  <ShareMenu title={recipe.title} description={recipe.description} slug={recipe.slug} />
                  <Button size="lg" variant="ghost" className="rounded-full px-6" onClick={() => window.print()}>
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                </div>

                <div className="mt-4 print-hidden">
                  <CookedRatingWidget recipeId={recipe.id} />
                </div>
              </motion.div>
            </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="order-1 lg:order-2 print-hidden"
              >
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] shadow-2xl border border-border/50">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-24">
          <div className="max-w-3xl">
            <h2 className="font-serif text-sm uppercase tracking-[0.2em] text-primary mb-3">The story</h2>
            <p className="font-serif text-2xl sm:text-3xl leading-snug text-foreground/90">
              {recipe.story}
            </p>
          </div>
        </section>

        {/* Body grid */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Ingredients */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start print-block print-avoid-break">
              <div className="bg-card border border-border/60 rounded-2xl p-6 lg:p-8 shadow-sm print-block">
                <div className="flex items-baseline justify-between gap-3 mb-5">
                  <h2 className="font-serif text-2xl font-semibold">Ingredients</h2>
                  {isAdjusted && (
                    <button
                      type="button"
                      onClick={reset}
                      className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 print-hidden"
                      aria-label="Reset to original servings"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 mb-6 p-3 rounded-xl bg-secondary/40 border border-border/40 print-hidden">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">
                      {servings} {servings === 1 ? "serving" : "servings"}
                    </span>
                    {isAdjusted && (
                      <span className="text-xs text-muted-foreground">
                        (originally {baseServings})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={decrement}
                      disabled={servings <= MIN_SERVINGS}
                      aria-label="Decrease servings"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={increment}
                      disabled={servings >= MAX_SERVINGS}
                      aria-label="Increase servings"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <p className="hidden print-only text-xs mb-4 italic">
                  Scaled for {servings} {servings === 1 ? "serving" : "servings"}
                  {isAdjusted ? ` (originally ${baseServings})` : ""}.
                </p>

                <div className="space-y-7">
                  {recipe.ingredients.map((group) => (
                    <div key={group.group}>
                      <h3 className="font-serif text-xs uppercase tracking-[0.18em] text-primary mb-3">
                        {group.group}
                      </h3>
                      <ul className="space-y-2.5">
                        {group.items.map((item) => (
                          <li
                            key={item.name}
                            className="flex items-baseline justify-between gap-3 py-2 border-b border-border/40 last:border-0"
                          >
                            <span className="text-sm text-foreground/85 leading-relaxed">{item.name}</span>
                            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                              {scaleQuantity(item.quantity, ratio)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Steps */}
            <div className="lg:col-span-8">
              <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold">Method</h2>
                <Button
                  type="button"
                  onClick={() => setCookModeOpen(true)}
                  className="rounded-full gap-2 print-hidden"
                  data-testid="button-cook-mode"
                >
                  <Flame className="w-4 h-4" />
                  Cook Mode
                </Button>
              </div>
              <p className="text-muted-foreground mb-10">
                Take your time. Cooking is best when it is unhurried.
              </p>

              <ol className="space-y-8">
                {recipe.steps.map((step, idx) => (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="flex gap-5 sm:gap-6"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-lg font-semibold shadow-sm">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="pt-1.5">
                      <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-2 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>

              {/* Serving suggestions */}
              <div className="mt-16">
                <h2 className="font-serif text-3xl font-semibold mb-2">Serving suggestions</h2>
                <p className="text-muted-foreground mb-6">A few ways to make it a meal.</p>
                <ul className="space-y-3">
                  {recipe.servingSuggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      className="flex gap-3 items-start text-foreground/85 leading-relaxed"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div className="mt-14 bg-secondary/40 border border-border/60 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <h2 className="font-serif text-2xl font-semibold">Cook's notes</h2>
                </div>
                <ul className="space-y-3">
                  {recipe.tips.map((tip) => (
                    <li
                      key={tip}
                      className="text-foreground/80 leading-relaxed before:content-['—'] before:mr-2 before:text-primary"
                    >
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Your cooking notes */}
              <CookingNotesSection recipeId={recipe.id} />
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20 lg:mt-28 mb-20 print-hidden">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-2">You might also love</h2>
              <p className="text-muted-foreground">More recipes from the same world of flavors.</p>
            </div>
            <Link
              href="/recipes"
              className="hidden sm:inline-block text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              Browse all recipes →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {suggestions.map((r, idx) => (
              <RecipeCard key={r.id} recipe={r} index={idx} />
            ))}
          </div>
        </section>
        {/* Print-only footer */}
        <footer className="print-only print-avoid-break mt-10 pt-4 border-t border-foreground/30 text-xs">
          <p>
            From <strong>South Spice</strong> · {recipe.region} · {typeof window !== "undefined" ? window.location.href : ""}
          </p>
          <p className="mt-1 italic opacity-80">{recipe.story}</p>
        </footer>
      </main>

      <div className="print-hidden">
        <Footer />
      </div>

      <CookMode
        open={cookModeOpen}
        onOpenChange={setCookModeOpen}
        recipeTitle={recipe.title}
        recipeId={recipe.id}
        steps={recipe.steps}
      />
    </div>
  );
}

function CookingNotesSection({ recipeId }: { recipeId: string }) {
  const { notes, addNote, deleteNote } = useCookingNotes(recipeId);
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    addNote(text.trim());
    setText("");
  }

  return (
    <div className="mt-14 border border-border/60 rounded-2xl p-6 sm:p-8 print-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Pencil className="w-5 h-5 text-primary" />
        <h2 className="font-serif text-2xl font-semibold">Your cooking notes</h2>
        <span className="text-xs text-muted-foreground ml-auto">
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your tweaks, substitutions, or reminders... (e.g., used coconut instead of almond, doubled the ginger)"
          className="min-h-[80px] rounded-xl resize-none text-sm leading-relaxed"
        />
        <div className="flex justify-end mt-2">
          <Button
            type="submit"
            size="sm"
            disabled={!text.trim()}
            className="rounded-full gap-2"
          >
            <Pencil className="w-3.5 h-3.5" />
            Add note
          </Button>
        </div>
      </form>

      {notes.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No notes yet. Jot down what you changed so it sticks next time.
        </p>
      ) : (
        <ul className="space-y-3">
          {notes.map((note) => (
            <li
              key={note.id}
              className="flex items-start gap-3 group"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {note.text}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {new Date(note.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => deleteNote(note.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-destructive/10 hover:text-destructive text-muted-foreground"
                aria-label="Delete note"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className="font-serif text-lg font-semibold text-foreground leading-tight">
        {value}
      </span>
    </div>
  );
}
