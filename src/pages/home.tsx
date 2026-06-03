import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { RecipeOfTheDay } from "@/components/recipe/RecipeOfTheDay";
import { SearchBar } from "@/components/recipe/SearchBar";
import { mockRecipes } from "@/lib/mock-data";
import { getRecipeOfTheDay, formatTodayLabel } from "@/lib/recipe-of-day";

export default function Home() {
  const popularRecipes = mockRecipes.filter(r => r.isPopular);
  const recentRecipes = mockRecipes.filter(r => !r.isPopular).slice(0, 4);
  const recipeOfDay = getRecipeOfTheDay();
  const todayLabel = formatTodayLabel();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 md:px-6 pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              
              <div className="flex-1 text-center lg:text-left z-10 space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4 px-4 py-1.5 bg-primary/10 rounded-full">
                    Authentic South Indian Cuisine
                  </span>
                  <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] text-foreground tracking-tight">
                    The Warmth of <br/><span className="text-primary italic font-light">Southern</span> Kitchens.
                  </h1>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
                >
                  Discover timeless recipes passed down through generations. From crispy dosas to soul-warming rasam, bring the vibrant flavors of the South to your table.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="max-w-xl mx-auto lg:mx-0"
                >
                  <SearchBar variant="hero" />
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 w-full max-w-xl lg:max-w-none relative"
              >
                <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] rotate-3 blur-sm" />
                <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-[2rem] shadow-2xl border-4 border-white">
                  <img 
                    src="/images/hero.png" 
                    alt="South Indian Spices" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </motion.div>
              
            </div>
          </div>
        </section>

        {/* Recipe of the Day */}
        <RecipeOfTheDay recipe={recipeOfDay} todayLabel={todayLabel} />

        {/* Featured / Popular Section */}
        <section className="py-20 bg-card/50 border-y border-border/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Curated Classics</h2>
                <p className="text-muted-foreground text-lg max-w-xl">
                  Our most loved traditional recipes, perfect for weekend cooking and family gatherings.
                </p>
              </div>
              <Link href="/recipes" className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline hover:underline-offset-4">
                View all recipes
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularRecipes.map((recipe, idx) => (
                <RecipeCard key={recipe.id} recipe={recipe} index={idx} />
              ))}
            </div>
            
            <div className="mt-10 md:hidden text-center">
              <Button variant="outline" className="w-full h-12 rounded-xl text-base">
                View all recipes
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Spotlight */}
        <section className="py-24 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Explore by Region</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover the diverse culinary landscape of Southern India, from the fiery curries of Andhra to the coconut-rich stews of Kerala.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { name: "Kerala", count: "24 Recipes", color: "bg-emerald-800" },
                { name: "Tamil Nadu", count: "32 Recipes", color: "bg-orange-800" },
                { name: "Karnataka", count: "18 Recipes", color: "bg-amber-700" },
                { name: "Andhra", count: "15 Recipes", color: "bg-red-800" },
              ].map((category, i) => (
                <Link key={category.name} href="/categories" className="block group">
                  <div className={`relative rounded-2xl overflow-hidden aspect-square flex flex-col items-center justify-center p-6 text-center ${category.color} transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <h3 className="relative z-10 font-serif text-2xl md:text-3xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="relative z-10 text-white/80 font-medium text-sm tracking-wide uppercase">{category.count}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Additions */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-12 text-center tracking-tight">Fresh from the Kitchen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {recentRecipes.map((recipe, idx) => (
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
