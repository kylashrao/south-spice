//import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { mockRecipes } from "@/lib/mock-data";

export default function Recipes() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* <Navbar /> */}
      
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-card/50 border-b border-border/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">All Recipes</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Explore our complete collection of authentic South Indian dishes, from breakfast staples to festive desserts.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {mockRecipes.map((recipe, idx) => (
                <RecipeCard key={recipe.id} recipe={recipe} index={idx} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
