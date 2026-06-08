import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";

// Bypassing folder-name checking by jumping straight out and back into the explicit file names
import Home from "../src/pages/home";
import RecipeDetail from "../src/pages/recipe-detail";
import SavedRecipes from "../src/pages/saved-recipes";
import MealPlanner from "../src/pages/meal-planner";
import GroceryList from "../src/pages/grocery-list";
import SharedRecipe from "../src/pages/shared-recipe";
import CategoryPage from "../src/pages/category";
import RegionsPage from "./pages/regions"; 
import NotFound from "../src/pages/not-found";

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
