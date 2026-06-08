import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";

// Core Layout Wrappers
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// All Pages - Exact Match to your lowercase disk filenames
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
    <div className="min-h-screen flex flex-col bg-background">
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

      <Footer />
    </div>
  );
}

export default App;
