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

// To this (Destructuring the params prop sent by App.tsx):
export default function RecipeDetail({ params }: { params: { slug: string } }) {
  const [, setLocation] = useLocation();
  const [cookModeOpen, setCookModeOpen] = useState(false);

  // 1. RUN THE LOOKUP IMMEDIATELY AT THE TOP
  const recipe = mockRecipes.find((r) => r.slug === params?.slug);

  // 2. IF RECIPE IS NOT FOUND YET, HALT AND SHOW LOADING IMMEDIATELY
  // This prevents hooks and math ratios from running on broken/empty data!
  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground animate-pulse font-medium">
          Loading recipe details...
        </p>
      </div>
    );
  }

  // 3. NOW THAT WE ARE 100% GUARANTEED TO HAVE A RECIPE, INITIALIZE STATES
  const [servings, setServings] = useState(recipe.servings);
  const [cookedStatus, setCookedStatus] = useState(recipe.isCooked || false);

  const { addRecipe, removeRecipe, isSaved } = useSavedRecipes();
  
  // 4. CALCULATIONS ARE NOW TOTALLY SAFE FROM UNDEFINED CRASHES
  const baseServings = recipe.servings;
  const saved = isSaved(recipe.id);
  const ratio = servings / baseServings;
  const isAdjusted = servings !== baseServings;

  useEffect(() => {
    setCookedStatus(recipe.isCooked || false);
  }, [recipe]);

  const related = mockRecipes
    .filter((r) => r && r.id !== recipe.id && r.region === recipe.region)
    .slice(0, 3);

  // 5. RESTORE YOUR FULL ORIGINAL BEAUTIFUL LAYOUT RETURN BLOCK HERE:
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground">{recipe?.title}</h1>
        <p className="text-muted-foreground mt-2">{recipe?.description}</p>
        
        {/* Simple image check */}
        {recipe?.image && (
          <img src={recipe.image} alt={recipe.title} className="mt-6 rounded-2xl max-w-xl" />
        )}
      </main>

      <Footer />
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
