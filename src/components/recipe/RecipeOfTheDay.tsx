import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, Users, ChefHat, ArrowRight, Sparkles } from "lucide-react";
import type { Recipe } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

interface RecipeOfTheDayProps {
  recipe: Recipe;
  todayLabel: string;
}

export function RecipeOfTheDay({ recipe, todayLabel }: RecipeOfTheDayProps) {
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm"
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[440px] overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 lg:bg-gradient-to-r lg:from-card/0 lg:via-card/0 lg:to-card/40" />

              <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur text-xs font-medium tracking-wider uppercase text-primary shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Recipe of the Day
              </div>
            </div>

            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
                {todayLabel}
              </p>

              <p className="text-sm font-medium text-primary tracking-wider uppercase mb-3">
                {recipe.region}
              </p>

              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-[1.05] mb-5 tracking-tight">
                {recipe.title}
              </h2>

              <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-7">
                {recipe.story}
              </p>

              <dl className="flex flex-wrap gap-x-8 gap-y-3 mb-8 text-sm">
                <Stat icon={<Clock className="w-4 h-4" />} label="Cook" value={recipe.cookingTime} />
                <Stat
                  icon={<Users className="w-4 h-4" />}
                  label="Serves"
                  value={`${recipe.servings}`}
                />
                <Stat
                  icon={<ChefHat className="w-4 h-4" />}
                  label="Level"
                  value={recipe.difficulty}
                />
              </dl>

              <div className="flex flex-wrap gap-3">
                <Link href={`/recipes/${recipe.slug}`}>
                  <Button
                    size="lg"
                    className="rounded-full gap-2"
                    data-testid="button-recipe-of-day-cta"
                  >
                    Cook this today
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/recipes">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full"
                  >
                    Browse more recipes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className="font-serif text-base font-semibold text-foreground leading-tight">
        {value}
      </dd>
    </div>
  );
}
