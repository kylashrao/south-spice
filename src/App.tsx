import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Recipes from "@/pages/recipes";
import Categories from "@/pages/categories";
import MyRecipes from "@/pages/my-recipes";
import RecipeDetail from "@/pages/recipe-detail";
import SearchPage from "@/pages/search";
import ShoppingList from "@/pages/shopping-list";
import Pantry from "@/pages/pantry";
import MealPlan from "@/pages/meal-plan";
import About from "@/pages/about";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Contact from "@/pages/contact";
import CookedHistory from "@/pages/cooked-history";
import Newsletter from "@/pages/newsletter";

//import { Switch, Route } from "wouter";
import Home from "@/pages/home";
import About from "@/pages/about"; // Or wherever your About component is
import Privacy from "@/pages/privacy"; 
import Terms from "@/pages/terms";
import Contact from "@/pages/contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/recipes" component={Recipes} />
      <Route path="/recipes/:slug" component={RecipeDetail} />
      <Route path="/categories" component={Categories} />
      <Route path="/my-recipes" component={MyRecipes} />
      <Route path="/shopping-list" component={ShoppingList} />
      <Route path="/pantry" component={Pantry} />
      <Route path="/meal-plan" component={MealPlan} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/contact" component={Contact} />
      <Route path="/cooked-history" component={CookedHistory} />
      <Route path="/newsletter" component={Newsletter} />
      <Route path="/search" component={SearchPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/contact" component={Contact} />
      
      {/* This handles the fallback 404 if a route doesn't match */}
      <Route>404 Not Found</Route> 
    </Switch>
  );
}

export default App;
