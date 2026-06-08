import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";

// Explicitly pointing to your capital "Pages" folder using relative layout metrics
import Home from "./Pages/home";
import RecipeDetail from "./Pages/recipe-detail";
import SavedRecipes from "./Pages/saved-recipes";
import MealPlanner from "./Pages/meal-planner";
import GroceryList from "./Pages/grocery-list";
import SharedRecipe from "./Pages/shared-recipe";
import CategoryPage from "./Pages/category";
import RegionsPage from "./Pages/regions";
import NotFound from "./Pages/not-found";

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
