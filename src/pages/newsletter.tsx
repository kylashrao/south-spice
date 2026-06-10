import { useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Mail, Clock, BookOpen, Sparkles, ArrowRight, Check } from "lucide-react";
//import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { SubscribeForm } from "@/components/subscribe/SubscribeForm";
import { useSubscription } from "@/hooks/use-subscription";
import { getRecipeOfTheDay } from "@/lib/recipe-of-day";

const WEEKS = [
  {
    week: "Week of May 18",
    recipe: "Kerala Fish Curry",
    tag: "Kerala coastal classic",
    tip: "Toast whole spices in a dry pan for 20 seconds before grinding for deeper, rounder flavour.",
    spotlight: "Fresh turmeric rhizomes are in season now. Their bright orange colour and peppery warmth elevate any curry.",
  },
  {
    week: "Week of May 11",
    recipe: "Hyderabadi Chicken Biryani",
    tag: "Festive, slow-cooked",
    tip: "Marinate overnight. The longer the wait, the more the yoghurt and spices penetrate the meat.",
    spotlight: "Saffron sourced from Kashmir is at peak availability this month. A few strands are all you need.",
  },
  {
    week: "Week of May 4",
    recipe: "Masala Dosa",
    tag: "Crispy Karnataka favourite",
    tip: "Ferment your dosa batter for at least 8 hours in a warm, undisturbed corner of the kitchen.",
    spotlight: "Ponni rice from Tamil Nadu is ideal for dosa batter \u2014 its mild starchiness creates the perfect crisp.",
  },
];

const PAST_EDITIONS = [
  "Tamil Nadu style sambar with freshly ground masala",
  "Karnataka bisi bele bath \u2014 the temple town recipe",
  "Kerala avial, a medley of coconut and seasonal vegetables",
  "Andhra gongura pachadi \u2014 the sorrel leaf pickle",
  "Chettinad pepper chicken with cracked black spice",
  "Mysore pak \u2014 the royal sweet of Karnataka",
];

export default function NewsletterPage() {
  const { isSubscribed, subscriber } = useSubscription();
  const featured = useMemo(() => getRecipeOfTheDay(), []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/*<Navbar /> */}

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-secondary/60 via-background to-background pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <p className="text-primary font-medium tracking-[0.18em] uppercase text-xs mb-4">
                South Spice Weekly
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.05] mb-6">
                A new recipe in your inbox, every Sunday morning.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                One hand-picked South Indian recipe each week, with a seasonal ingredient spotlight and a practical cooking tip from our test kitchen. No spam. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Subscribe or confirmation */}
        <section className="container mx-auto px-4 md:px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-xl"
          >
            {isSubscribed ? (
              <div className="rounded-2xl bg-primary/10 border border-primary/20 p-6 flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-serif text-lg font-semibold">You are already subscribed.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We send a fresh recipe to <span className="font-medium">{subscriber?.email}</span> every Sunday.
                  </p>
                </div>
              </div>
            ) : (
              <SubscribeForm variant="light" />
            )}
          </motion.div>
        </section>

        {/* What you get */}
        <section className="bg-card/40 border-y border-border/50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mb-14">
              <p className="text-primary font-medium tracking-[0.18em] uppercase text-xs mb-3">
                What you receive
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Three things every week.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {[
                {
                  icon: BookOpen,
                  title: "Featured Recipe",
                  body: "A complete, tested recipe with ingredients, step-by-step instructions, and our own kitchen notes. Always one you can cook this week.",
                },
                {
                  icon: Sparkles,
                  title: "Seasonal Spotlight",
                  body: "We follow the harvest calendar. You will know what's in season, where to find it, and why it matters for the dish you are making.",
                },
                {
                  icon: Clock,
                  title: "Practical Tip",
                  body: "One technique, shortcut, or piece of wisdom from our test kitchen. Small enough to remember, useful enough to change how you cook.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* This week's preview */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-primary font-medium tracking-[0.18em] uppercase text-xs mb-3">
                  This week
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  A taste of what is coming.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Featured recipe card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl overflow-hidden border border-border/60 bg-card shadow-sm"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 text-white">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/80 mb-1">Featured recipe</p>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight">{featured.title}</h3>
                  </div>
                </div>
                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{featured.region}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <span>{featured.cookingTime}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <span>{featured.difficulty}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{featured.description}</p>
                  <Link href={`/recipes/${featured.slug}`}>
                    <Button variant="outline" className="rounded-full gap-2">
                      View full recipe
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Weekly editions list */}
              <div className="space-y-6">
                {WEEKS.map((week, i) => (
                  <motion.div
                    key={week.week}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="rounded-xl border border-border/60 bg-card p-6 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                          {week.week}
                        </p>
                        <p className="font-serif text-lg font-semibold">{week.recipe}</p>
                      </div>
                    </div>
                    <div className="pl-11 space-y-3">
                      <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-foreground/80">
                        {week.tag}
                      </span>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="text-foreground font-medium">Tip:</span> {week.tip}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="text-foreground font-medium">Spotlight:</span> {week.spotlight}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Past editions */}
        <section className="bg-card/40 border-y border-border/50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-primary font-medium tracking-[0.18em] uppercase text-xs mb-3">
                From the archive
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Recipes we have already shared.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {PAST_EDITIONS.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-xl border border-border/40 bg-background px-5 py-4 text-sm text-muted-foreground hover:border-primary/30 transition-colors"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
            <Mail className="w-10 h-10 text-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
              Join the Sunday ritual.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              One recipe. One spotlight. One tip. Every Sunday, before your coffee cools.
            </p>
            <div className="max-w-md mx-auto">
              {isSubscribed ? (
                <p className="text-muted-foreground">
                  You are subscribed as <span className="font-medium text-foreground">{subscriber?.email}</span>. See you Sunday.
                </p>
              ) : (
                <SubscribeForm variant="light" />
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
