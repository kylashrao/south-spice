import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";

// 1. Core Pages (Confirmed working with lowercase filenames)
import Home from "./pages/home";
import RecipeDetail from "./pages/recipe-detail";

// 2. Feature Pages (Updated to reflect exact capitalization on disk)
import SavedRecipes from "./pages/SavedRecipes";
import MealPlanner from "./pages/MealPlanner";
import GroceryList from "./pages/GroceryList";
import SharedRecipe from "./pages/SharedRecipe";
import CategoryPage from "./pages/Category";
import RegionsPage from "./pages/Regions";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Toaster />

      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/recipes/:slug" component={RecipeDetail} />
          <Route path="/saved" component={SavedRecipes} />
          <Route path="/planner" component={MealPlanner} />
          <Route path="/grocery" component={GroceryList} />
          <Route path="/shared/:id" component={SharedRecipe} />
          <Route path="/category/:category" component={CategoryPage} />
          <Route path="/regions" component={RegionsPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
