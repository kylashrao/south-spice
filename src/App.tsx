import React, { Suspense } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";

// 1. Direct lowercase folder indexing matches your project's true disk layout
import Home from "./pages/home";
import RecipeDetail from "./pages/recipe-detail";

// 2. Safe Dynamic Lazy Bundles 
const SavedRecipes = React.lazy(() => import("./pages/saved-recipes"));
const MealPlanner = React.lazy(() => import("./pages/meal-planner"));
const GroceryList = React.lazy(() => import("./pages/grocery-list"));
const SharedRecipe = React.lazy(() => import("./pages/shared-recipe"));
const CategoryPage = React.lazy(() => import("./pages/category"));
const RegionsPage = React.lazy(() => import("./pages/regions"));
const NotFound = React.lazy(() => import("./pages/not-found"));

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Toaster />
      
      {/* Keeping Navbar and Footer isolated for the blank page diagnostic check */}
      {/* <Navbar /> */}

      <main className="flex-1">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
            Loading page layout...
          </div>
        }>
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
        </Suspense>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
