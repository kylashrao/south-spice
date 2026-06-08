import React, { Suspense } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";

// Using absolute path aliases (@/) completely bypasses relative directory tree ghost caches!
import Home from "@/pages/home";
import RecipeDetail from "@/pages/recipe-detail";

const SavedRecipes = React.lazy(() => import("@/pages/saved-recipes"));
const MealPlanner = React.lazy(() => import("@/pages/meal-planner"));
const GroceryList = React.lazy(() => import("@/pages/grocery-list"));
const SharedRecipe = React.lazy(() => import("@/pages/shared-recipe"));
const CategoryPage = React.lazy(() => import("@/pages/category"));
const RegionsPage = React.lazy(() => import("@/pages/regions"));
const NotFound = React.lazy(() => import("@/pages/not-found"));

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Toaster />

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
    </div>
  );
}

export default App;
