import { Switch, Route } from "wouter";
import Home from "./pages/home";
import RecipeDetail from "./pages/recipe-detail";
// CHANGE THESE LINES:
// Add explicit '.tsx' endings to clear the module resolution block:
import SavedRecipes from "./pages/saved-recipes.tsx";
import MealPlanner from "./pages/meal-planner.tsx";
import GroceryList from "./pages/grocery-list.tsx";
import SharedRecipe from "./pages/shared-recipe.tsx";
import CategoryPage from "./pages/category.tsx";
import RegionsPage from "./pages/regions.tsx";
import CategoryPage from "./pages/category";
import RegionsPage from "./pages/regions";
import NotFound from "./pages/not-found";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Toaster />
      
      {/* 1. TEMPORARILY COMMENT OUT NAVBAR */}
      {/* <Navbar /> */}

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

      {/* 2. TEMPORARILY COMMENT OUT FOOTER */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
