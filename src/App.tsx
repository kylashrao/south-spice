import React, { Suspense } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";

// Note the Capital "P" in Pages to perfectly match your folder structure!
import Home from "./Pages/home";
import RecipeDetail from "./Pages/recipe-detail";

// Dynamically lazy load the secondary pages using the exact matching path strings
const SavedRecipes = React.lazy(() => import("./Pages/saved-recipes"));
const MealPlanner = React.lazy(() => import("./Pages/meal-planner"));
const GroceryList = React.lazy(() => import("./Pages/grocery-list"));
const SharedRecipe = React.lazy(() => import("./Pages/shared-recipe"));
const CategoryPage = React.lazy(() => import("./Pages/category"));
const RegionsPage = React.lazy(() => import("./Pages/regions"));
const NotFound = React.lazy(() => import("./Pages/not-found"));

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Toaster />
      
      {/* Keeping Navbar and Footer commented out for our diagnostic check */}
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
