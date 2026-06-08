import { Switch, Route, Link, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";

// All Pages - Lowercase disk match
import Home from "./pages/home";
import Recipes from "./pages/recipes";
import RecipeDetail from "./pages/recipe-detail";
import Categories from "./pages/categories";
import MyRecipes from "./pages/my-recipes";
import ShoppingList from "./pages/shopping-list";
import Pantry from "./pages/pantry";
import MealPlan from "./pages/meal-plan";
import CookedHistory from "./pages/cooked-history";
import Newsletter from "./pages/newsletter";
import SearchPage from "./pages/search";
import About from "./pages/about";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";
import Contact from "./pages/contact";
import NotFound from "./pages/not-found";

function App() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation Links definition
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/categories", label: "Categories" },
    { href: "/my-recipes", label: "My Book" },
    { href: "/pantry", label: "Pantry" },
    { href: "/meal-plan", label: "Meal Plan" },
    { href: "/cooked-history", label: "Cooked" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20">
      <Toaster />

      {/* Inline Navbar UI - Bypasses all folder pathing bugs completely */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-sm transition-all">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight text-primary hover:opacity-90 transition-opacity">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">South Spice</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/search" className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Search Recipes">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md md:hidden hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? <line x1="18" y1="6" x2="6" y2="18"></line> : <line x1="3" y1="12" x2="21" y2="12"></line>}
                {mobileMenuOpen ? <line x1="6" y1="6" x2="18" y2="18"></line> : <><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b bg-background px-4 pt-2 pb-4 space-y-1 animate-in fade-in slide-in-from-top-5 duration-200">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Core View Routing */}
      <main className="flex-1 animate-fade-in">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/recipes" component={Recipes} />
          <Route path="/recipes/:slug" component={RecipeDetail} />
          <Route path="/categories" component={Categories} />
          <Route path="/my-recipes" component={MyRecipes} />
          <Route path="/shopping-list" component={ShoppingList} />
          <Route path="/pantry" component={Pantry} />
          <Route path="/meal-plan" component={MealPlan} />
          <Route path="/cooked-history" component={CookedHistory} />
          <Route path="/newsletter" component={Newsletter} />
          <Route path="/search" component={SearchPage} />

          {/* Footer Info Hub Links */}
          <Route path="/about" component={About} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/contact" component={Contact} />

          {/* Catch-all 404 View */}
          <Route component={NotFound} />
        </Switch>
      </main>

      {/* Self-contained UI Footer */}
      <footer className="border-t bg-muted/40 backdrop-blur-sm transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 py-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</a>
            <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</a>
            <a href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="mt-4 md:order-1 md:mt-0">
            <p className="text-center text-xs text-muted-foreground/80">
              &copy; {new Date().getFullYear()} South Spice. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
