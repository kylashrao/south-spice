import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";

// 1. Core Layouts (Navbar is fully verified and working!)
import Navbar from "./components/navbar";

// 2. All Pages - Verified strict lowercase disk match
import Home from "./pages/home";
import Recipes from "./pages/recipes";
import RecipeDetail from "./pages/recipe-detail";
import Categories from "./pages/categories";
import MyRecipes from "./pages/my-recipes";
import ShoppingList from "./pages/shopping-list";
import Pantry from "./pages/pantry";
import MealPlan from "./pages/meal-plan";
import CookedHistory from "./pages/cooked-history";
import Newsletter from "./pages/newsletter";
import SearchPage from "./pages/search";
import About from "./pages/about";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";
import Contact from "./pages/contact";
import NotFound from "./pages/not-found";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Toaster />
      <Navbar />

      <main className="flex-1">
        <Switch>
          {/* Core Pages */}
          <Route path="/" component={Home} />
          <Route path="/recipes" component={Recipes} />
          <Route path="/recipes/:slug" component={RecipeDetail} />
          <Route path="/categories" component={Categories} />
          <Route path="/my-recipes" component={MyRecipes} />
          <Route path="/shopping-list" component={ShoppingList} />
          <Route path="/pantry" component={Pantry} />
          <Route path="/meal-plan" component={MealPlan} />
          <Route path="/cooked-history" component={CookedHistory} />
          <Route path="/newsletter" component={Newsletter} />
          <Route path="/search" component={SearchPage} />

          {/* Footer / Info Pages */}
          <Route path="/about" component={About} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/contact" component={Contact} />

          {/* Catch-all Fallback 404 */}
          <Route component={NotFound} />
        </Switch>
      </main>

      {/* Self-contained UI Footer to bypass the Git caching bug completely */}
      <footer className="border-t bg-muted/40 backdrop-blur-sm transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 py-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</a>
            <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</a>
            <a href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="mt-4 md:order-1 md:mt-0">
            <p className="text-center text-xs text-muted-foreground/80">
              &copy; {new Date().getFullYear()} South Spice. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
