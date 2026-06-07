import { Link } from "wouter";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubscribeForm } from "@/components/subscribe/SubscribeForm";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 md:py-24 print-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 md:mb-20 max-w-3xl mx-auto text-center">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            South Spice Weekly
          </p>
          <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-3">
            A new recipe in your inbox, every Sunday.
          </h3>
          <p className="text-muted/70 text-base md:text-lg mb-6 leading-relaxed">
            Hand-picked South Indian recipes, seasonal cooking notes, and stories from our kitchen.
          </p>
          <div className="max-w-md mx-auto text-left">
            <SubscribeForm variant="dark" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pt-12 border-t border-white/10">
          
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#C85A32] bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-2xl italic">
                S
              </div>
              <span className="font-serif font-bold text-3xl tracking-tight">
                South Spice
              </span>
            </Link>
            <p className="text-muted/80 text-lg max-w-sm leading-relaxed font-light">
              Bringing the authentic flavors, warm aromas, and timeless traditions of the South Indian kitchen into your home.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10 rounded-full">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10 rounded-full">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10 rounded-full">
                <Facebook className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-serif text-xl font-medium tracking-wide">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/newsletter" className="text-muted/80 hover:text-primary transition-colors">Newsletter</Link></li>
              <li><Link href="/recipes" className="text-muted/80 hover:text-primary transition-colors">All Recipes</Link></li>
              <li><Link href="/categories" className="text-muted/80 hover:text-primary transition-colors">Categories</Link></li>
              <li><Link href="/search?tag=Festive" className="text-muted/80 hover:text-primary transition-colors">Seasonal Picks</Link></li>
              <li><Link href="/search?tag=Quick" className="text-muted/80 hover:text-primary transition-colors">Quick & Easy</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-serif text-xl font-medium tracking-wide">Legal</h4>
            <ul className="space-y-4">
              <li><a href="/about" className="text-muted/80 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/privacy" className="text-muted/80 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-muted/80 hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="/contact" className="text-muted/80 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted/60">
          <p>© {new Date().getFullYear()} South Spice. All rights reserved.</p>
          <p>Crafted with intention.</p>
        </div>
      </div>
    </footer>
  );
}
