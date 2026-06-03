import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, MapPin, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockRecipes, type Recipe } from "@/lib/mock-data";

interface SearchBarProps {
  variant?: "hero" | "compact";
  initialValue?: string;
  autoFocus?: boolean;
  className?: string;
}

export function searchRecipes(query: string): Recipe[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  return mockRecipes
    .map((recipe) => {
      const haystack = [
        recipe.title,
        recipe.region,
        recipe.description,
        recipe.story,
        ...recipe.tags,
        ...recipe.ingredients.flatMap((g) => [g.group, ...g.items.map((i) => i.name)]),
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;
      for (const token of tokens) {
        if (recipe.title.toLowerCase().includes(token)) score += 5;
        if (recipe.region.toLowerCase().includes(token)) score += 3;
        if (recipe.tags.join(" ").toLowerCase().includes(token)) score += 2;
        if (haystack.includes(token)) score += 1;
      }
      return { recipe, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.recipe);
}

export function SearchBar({
  variant = "hero",
  initialValue = "",
  autoFocus = false,
  className = "",
}: SearchBarProps) {
  const [, navigate] = useLocation();
  const [value, setValue] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => searchRecipes(value).slice(0, 5), [value]);
  const popularTerms = ["Dosa", "Biryani", "Kerala", "Vegetarian", "Breakfast"];

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function submit(q: string) {
    const trimmed = q.trim();
    if (!trimmed) {
      navigate("/search");
    } else {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(value);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  const isHero = variant === "hero";

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className={`relative group ${isHero ? "" : ""}`}>
        {isHero && (
          <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl transition-all duration-500 group-hover:bg-primary/10" />
        )}
        <div
          className={`relative flex items-center bg-card rounded-2xl shadow-lg border border-border/50 p-2 transition-all duration-300 ${
            open ? "shadow-xl border-primary/30" : "group-hover:shadow-xl group-hover:border-primary/30"
          }`}
        >
          <Search className={`text-muted-foreground ml-4 ${isHero ? "w-6 h-6" : "w-5 h-5"}`} />
          <Input
            ref={inputRef}
            placeholder="Search recipes, ingredients, or regions..."
            className={`border-0 bg-transparent shadow-none focus-visible:ring-0 px-4 ${
              isHero ? "text-lg h-14" : "text-base h-12"
            }`}
            value={value}
            onFocus={() => setOpen(true)}
            onChange={(e) => {
              setValue(e.target.value);
              setOpen(true);
            }}
            onKeyDown={onKeyDown}
          />
          {value && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setValue("");
                inputRef.current?.focus();
              }}
              className="mr-1 h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <Button
            onClick={() => submit(value)}
            className={`rounded-xl font-medium ${isHero ? "h-14 px-8 text-base" : "h-12 px-6 text-sm"}`}
          >
            Search
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-3 bg-card border border-border/60 rounded-2xl shadow-xl overflow-hidden z-40"
          >
            {value.trim() === "" ? (
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                  Try searching
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularTerms.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => submit(term)}
                      className="px-3 py-1.5 rounded-full text-sm font-medium bg-secondary/60 text-foreground/80 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : suggestions.length === 0 ? (
              <div className="p-6 text-center">
                <p className="font-serif text-lg text-foreground mb-1">No matches yet</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Try a region (Kerala, Tamil Nadu) or an ingredient (coconut, tamarind).
                </p>
                <Button variant="outline" size="sm" onClick={() => submit(value)}>
                  Search anyway
                </Button>
              </div>
            ) : (
              <div className="py-2">
                <p className="px-5 pt-2 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Recipes
                </p>
                <ul>
                  {suggestions.map((recipe) => (
                    <li key={recipe.id}>
                      <button
                        type="button"
                        onClick={() => {
                          navigate(`/recipes/${recipe.slug}`);
                          setOpen(false);
                        }}
                        className="w-full flex items-center gap-4 px-5 py-3 text-left hover:bg-secondary/40 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-base font-semibold text-foreground truncate">
                            {recipe.title}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-3 mt-0.5">
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {recipe.region}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {recipe.cookingTime}
                            </span>
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => submit(value)}
                  className="w-full flex items-center justify-between px-5 py-3 border-t border-border/60 text-sm font-medium text-primary hover:bg-secondary/40 transition-colors"
                >
                  <span>See all results for "{value}"</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
