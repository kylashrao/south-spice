import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { SearchBar, searchRecipes } from "@/components/recipe/SearchBar";
import { mockRecipes } from "@/lib/mock-data";

const REGIONS = ["All", "Tamil Nadu", "Kerala", "Karnataka", "Telangana", "South India"];
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"] as const;

function useQueryParam(name: string): string {
  const [location] = useLocation();
  return useMemo(() => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    const params = new URLSearchParams(search);
    return params.get(name) ?? "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, name]);
}

export default function SearchPage() {
  const initialQuery = useQueryParam("q");
  const initialRegion = useQueryParam("region");
  const initialTag = useQueryParam("tag");
  const [region, setRegion] = useState<string>(
    REGIONS.includes(initialRegion) ? initialRegion : "All",
  );
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number]>("All");

  useEffect(() => {
    setRegion(REGIONS.includes(initialRegion) ? initialRegion : "All");
  }, [initialRegion]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  }, [initialQuery, initialRegion, initialTag]);

  const baseResults = useMemo(() => {
    if (!initialQuery.trim()) return mockRecipes;
    return searchRecipes(initialQuery);
  }, [initialQuery]);

  const filtered = useMemo(() => {
    const tag = initialTag.trim().toLowerCase();
    return baseResults.filter((r) => {
      if (region !== "All" && r.region !== region) return false;
      if (difficulty !== "All" && r.difficulty !== difficulty) return false;
      if (tag && !r.tags.some((t) => t.toLowerCase() === tag)) return false;
      return true;
    });
  }, [baseResults, region, difficulty, initialTag]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-secondary/50 via-background to-background pt-12 pb-10 md:pt-16 md:pb-12">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <p className="text-primary font-medium tracking-wider uppercase text-xs mb-3">
                {initialQuery
                  ? "Search results"
                  : initialRegion
                    ? "Regional cuisine"
                    : initialTag
                      ? "Browse by type"
                      : "Browse all recipes"}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground mb-3">
                {initialQuery ? (
                  <>
                    Recipes for <span className="text-primary italic font-light">"{initialQuery}"</span>
                  </>
                ) : initialRegion ? (
                  <>
                    Tastes of <span className="text-primary italic font-light">{initialRegion}</span>
                  </>
                ) : initialTag ? (
                  <>
                    <span className="text-primary italic font-light">{initialTag}</span> recipes
                  </>
                ) : (
                  <>The whole pantry, at your fingertips.</>
                )}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {initialQuery
                  ? `Found ${filtered.length} ${filtered.length === 1 ? "recipe" : "recipes"} that match your search.`
                  : initialRegion || initialTag
                    ? `Showing ${filtered.length} ${filtered.length === 1 ? "recipe" : "recipes"}. Refine further below or search above.`
                    : "Filter by region or difficulty, or refine your search above."}
              </p>
            </motion.div>

            <div className="mt-8 max-w-3xl">
              <SearchBar variant="hero" initialValue={initialQuery} />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 py-12">
          {/* Filters */}
          <div className="flex flex-col gap-4 mb-10">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <SlidersHorizontal className="w-4 h-4" />
              Refine results
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <FilterGroup
                label="Region"
                options={REGIONS}
                value={region}
                onChange={setRegion}
              />
              <div className="hidden sm:block w-px h-6 bg-border/60" />
              <FilterGroup
                label="Difficulty"
                options={[...DIFFICULTIES]}
                value={difficulty}
                onChange={(v) => setDifficulty(v as (typeof DIFFICULTIES)[number])}
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState query={initialQuery} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((recipe, idx) => (
                <RecipeCard key={recipe.id} recipe={recipe} index={idx} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground/80 border-border/60 hover:border-primary/50 hover:text-primary"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  const [, navigate] = useLocation();
  return (
    <div className="text-center py-20 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-secondary/60 flex items-center justify-center mx-auto mb-6">
        <SearchIcon className="w-7 h-7 text-muted-foreground" />
      </div>
      <h2 className="font-serif text-3xl font-semibold mb-3">
        Nothing matched {query ? `"${query}"` : "those filters"}
      </h2>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        Try a broader term, a different region, or browse all our recipes for inspiration.
      </p>
      <Button
        variant="outline"
        className="rounded-full px-6"
        onClick={() => navigate("/recipes")}
      >
        Browse all recipes
      </Button>
    </div>
  );
}
