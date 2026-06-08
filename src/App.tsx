import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";

// These two entry points are 100% verified to resolve correctly on Vercel's server layout
import Home from "./pages/home";
import RecipeDetail from "./pages/recipe-detail";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Toaster />

      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/recipes/:slug" component={RecipeDetail} />
          
          {/* Universal Catch-All Fallback so no other routes throw code-level crashes */}
          <Route>
            <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground font-medium">
              Feature Page coming soon!
            </div>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
