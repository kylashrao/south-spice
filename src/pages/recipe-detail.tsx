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

  export default function RecipeDetail({ params }: { params?: { slug?: string } }) {
  // --- TEMPORARY FORCE-RENDER DEBUG BLOCK ---
  return (
    <div style={{ 
      padding: '50px', 
      background: '#0f172a', 
      color: '#f8fafc', 
      minHeight: '100vh', 
      fontFamily: 'sans-serif',
      position: 'relative',
      zIndex: 99999 
    }}>
      <h1 style={{ color: '#38bdf8', fontSize: '32px', marginBottom: '20px' }}>
        🚀 Debug Mode: Target Page Mounted!
      </h1>
      <p style={{ fontSize: '18px' }}><strong>Current Window Path:</strong> {window.location.pathname}</p>
      <p style={{ fontSize: '18px' }}><strong>Incoming Prop Params Object:</strong> {JSON.stringify(params)}</p>
      <p style={{ fontSize: '18px' }}><strong>Detected Slug Token:</strong> {params?.slug || "No slug received via props"}</p>
    </div>
  );
  // --- END DEBUG BLOCK ---

  // Leave your old hooks, calculations, and normal return block untouched below this.
  // We'll restore them the second we see what this prints!
