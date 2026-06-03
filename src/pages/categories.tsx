import { useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mockRecipes, type Recipe } from "@/lib/mock-data";

type RegionInfo = {
  name: string;
  tagline: string;
  description: string;
};

const REGION_META: RegionInfo[] = [
  {
    name: "Tamil Nadu",
    tagline: "Heritage of the Cauvery delta",
    description:
      "Idlis at dawn, fiery Chettinad gravies at noon, and rasam that warms every monsoon evening.",
  },
  {
    name: "Kerala",
    tagline: "God's own coconut coast",
    description:
      "Lacy appams, fragrant stews and sadya feasts shaped by coconut groves and the Arabian Sea.",
  },
  {
    name: "Karnataka",
    tagline: "From Mysore palaces to coastal kitchens",
    description:
      "Crisp dosas, bisi bele bath, and gentle curries with a thread of sweetness in every bite.",
  },
  {
    name: "Telangana",
    tagline: "Bold flavours of the Deccan plateau",
    description:
      "Slow-cooked biryanis, smoky pickles, and millet breads from a land that loves its spice.",
  },
];

type TagInfo = {
  name: string;
  tag: string;
  description: string;
};

const TAG_GROUPS: TagInfo[] = [
  { name: "Breakfast", tag: "Breakfast", description: "Sunrise classics to start the day right." },
  { name: "Vegetarian", tag: "Vegetarian", description: "Plant-forward dishes from every coast." },
  { name: "Festive", tag: "Festive", description: "Celebration platters for special occasions." },
  { name: "Comfort", tag: "Comfort", description: "Soulful bowls for slow, gentle evenings." },
  { name: "Coconut", tag: "Coconut", description: "Coastal cooking with cream and crunch." },
  { name: "Drinks", tag: "Drink", description: "Filter coffee, lassis, and refreshing sips." },
];

function pickCovers(recipes: Recipe[], count = 3): string[] {
  return recipes.slice(0, count).map((r) => r.image);
}

export default function Categories() {
  const regions = useMemo(() => {
    return REGION_META.map((meta) => {
      const recipes = mockRecipes.filter((r) => r.region === meta.name);
      return { ...meta, count: recipes.length, covers: pickCovers(recipes) };
    });
  }, []);

  const tagGroups = useMemo(() => {
    return TAG_GROUPS.map((group) => {
      const matches = mockRecipes.filter((r) =>
        r.tags.some((t) => t.toLowerCase() === group.tag.toLowerCase()),
      );
      return { ...group, count: matches.length, cover: matches[0]?.image };
    }).filter((g) => g.count > 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 via-background to-background pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <p className="text-primary font-medium tracking-[0.18em] uppercase text-xs mb-4">
                Browse our cookbook
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.05] mb-6">
                A culinary tour of the South.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Wander region by region, or pick a mood — quick breakfasts, festive feasts, or
                gentle vegetarian comforts. Every category is hand-picked from our cookbook.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Regional cuisines"
            title="The four kitchens of the South"
            subtitle="Each region brings its own pantry, its own rhythm, and its own table manners."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-10">
            {regions.map((region, i) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/search?region=${encodeURIComponent(region.name)}`}
                  className="group block rounded-3xl overflow-hidden border border-border/60 bg-card shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500"
                >
                  <div className="relative h-56 md:h-64 overflow-hidden bg-muted">
                    <CoverCollage images={region.covers} alt={region.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-background/95 backdrop-blur-sm text-foreground text-xs font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full shadow-sm">
                        {region.count} {region.count === 1 ? "recipe" : "recipes"}
                      </span>
                    </div>
                    <div className="absolute bottom-5 left-6 right-6 text-white">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/80 mb-1">
                        {region.tagline}
                      </p>
                      <h3 className="font-serif text-3xl md:text-4xl font-bold leading-tight drop-shadow-sm">
                        {region.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 md:p-7 flex items-start justify-between gap-4">
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      {region.description}
                    </p>
                    <span className="shrink-0 mt-1 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:translate-x-1">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-card/40 border-y border-border/50 py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeader
              eyebrow="Browse by type"
              title="Pick a mood, find a dish"
              subtitle="From sunrise breakfasts to festive feasts, every craving has a category."
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-10">
              {tagGroups.map((group, i) => (
                <motion.div
                  key={group.tag}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <Link
                    href={`/search?tag=${encodeURIComponent(group.tag)}`}
                    className="group block rounded-2xl overflow-hidden bg-background border border-border/60 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {group.cover && (
                        <img
                          src={group.cover}
                          alt={group.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight drop-shadow-sm">
                          {group.name}
                        </h3>
                        <p className="text-xs text-white/85 mt-0.5">
                          {group.count} {group.count === 1 ? "recipe" : "recipes"}
                        </p>
                      </div>
                    </div>
                    <div className="px-4 py-3 text-sm text-muted-foreground leading-relaxed">
                      {group.description}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-primary font-semibold tracking-[0.18em] uppercase text-xs mb-3">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
        {title}
      </h2>
      <p className="text-muted-foreground text-lg leading-relaxed">{subtitle}</p>
    </div>
  );
}

function CoverCollage({ images, alt }: { images: string[]; alt: string }) {
  if (images.length === 0) {
    return <div className="w-full h-full bg-secondary" aria-hidden />;
  }
  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    );
  }
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-1 w-full h-full">
      <img
        src={images[0]}
        alt={alt}
        className="row-span-2 col-span-2 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <img
        src={images[1]}
        alt=""
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {images[2] ? (
        <img
          src={images[2]}
          alt=""
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="bg-secondary" />
      )}
    </div>
  );
}
