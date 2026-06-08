import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";

// 1. Core Pages (Confirmed working lowercase folder structure)
import Home from "./pages/home";
import RecipeDetail from "./pages/recipe-detail";

// 2. Secondary Feature Pages 
import SavedRecipes from "./pages/saved-recipes";
import MealPlanner from "./pages/meal-planner";
import GroceryList from "./pages/grocery-list";
import SharedRecipe from "./pages/shared-recipe";
import CategoryPage from "./pages/category";
import RegionsPage from "./pages/regions";
import NotFound from "./pages/not-found";

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
