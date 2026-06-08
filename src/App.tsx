import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";

// Explicitly pointing to your capital "Pages" folder using relative layout metrics
import Home from "./Pages/home";
import SavedRecipes from "./Pages/SavedRecipes";
import MealPlanner from "./Pages/MealPlanner";
import GroceryList from "./Pages/GroceryList";
import SharedRecipe from "./Pages/SharedRecipe";

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
