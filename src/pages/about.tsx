import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChefHat, Heart, MapPin, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="py-14 md:py-20 bg-card/50 border-b border-border/50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                Our Story
              </p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.05]">
                About South Spice
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mt-5 leading-relaxed">
                A small, warm kitchen on the internet where South Indian recipes
                are preserved, explained, and made approachable for cooks
                everywhere.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 py-14 md:py-20">
          <div className="max-w-3xl mx-auto space-y-14">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-2xl md:text-3xl font-semibold">
                  Why we started
                </h2>
              </div>
              <p className="text-foreground/85 leading-relaxed">
                South Indian cooking is often reduced to "curry" in the global
                imagination. In reality, it is one of the most diverse, ancient,
                and vegetable-forward cuisines on the planet. From the
                coconut-rich coasts of Kerala to the tamarind-laced gravies of
                Chettinad, the pepper hills of the Western Ghats to the
                slow-cooked biryanis of Hyderabad, every region has its own
                grammar.
              </p>
              <p className="text-foreground/85 leading-relaxed mt-4">
                South Spice was built to give these recipes the editorial care
                they deserve. Each dish includes the story behind it, a clear
                method written in plain language, scaling for any number of
                guests, and tips that come from real home-kitchen experience.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <ChefHat className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-2xl md:text-3xl font-semibold">
                  How we test recipes
                </h2>
              </div>
              <p className="text-foreground/85 leading-relaxed">
                Every recipe on this site is researched from traditional sources,
                cross-checked with family cooks, and written with precise
                measurements. We explain techniques that might be unfamiliar,
                like tempering mustard seeds in hot oil or grinding fresh
                masalas, so that even a first-time cook can follow along with
                confidence.
              </p>
              <p className="text-foreground/85 leading-relaxed mt-4">
                Ingredients are listed with both everyday names and regional
                alternatives. If you can't find curry leaves, we tell you.
                If a spice can be swapped without losing the soul of the dish,
                we say so. The goal is honest, flexible guidance, not rigid
                dogma.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-2xl md:text-3xl font-semibold">
                  What we believe
                </h2>
              </div>
              <ul className="space-y-3">
                {[
                  "Cooking should feel restorative, not stressful.",
                  "Recipes are starting points, not contracts.",
                  "The best meals often come from improvising with what you have.",
                  "South Indian food deserves to be understood on its own terms.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-foreground/85 leading-relaxed"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-2xl md:text-3xl font-semibold">
                  Where we are
                </h2>
              </div>
              <p className="text-foreground/85 leading-relaxed">
                South Spice is a digital publication with roots in Chennai,
                Kochi, and Hyderabad. Our recipe research and photography are
                done in home kitchens across these cities, then brought online
                so anyone, anywhere, can cook something remarkable tonight.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
