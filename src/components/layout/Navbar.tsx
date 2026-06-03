import React from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubscribeDialog } from "@/components/subscribe/SubscribeDialog";
import { useSubscription } from "@/hooks/use-subscription";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { isSubscribed } = useSubscription();

  const links = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/categories", label: "Categories" },
    { href: "/pantry", label: "What Can I Make?" },
    { href: "/meal-plan", label: "Meal Plan" },
    { href: "/my-recipes", label: "My Recipes" },
    { href: "/cooked-history", label: "Cooked" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 z-50 relative">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-xl italic shadow-sm">
            S
          </div>
          <span className="font-serif font-bold text-2xl tracking-tight text-foreground">
            South Spice
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center gap-4 lg:gap-6 xl:gap-8 flex-1 min-w-0 px-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs lg:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                (link.href === "/my-recipes" || link.href === "/cooked-history")
                  ? "hidden lg:inline-block"
                  : ""
              } ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
          <Link href="/search">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-muted-foreground hover:text-primary"
              aria-label="Search recipes"
            >
              <Search className="w-5 h-5" />
            </Button>
          </Link>
          <SubscribeDialog>
            <Button className="rounded-full font-medium tracking-wide gap-1.5 text-xs lg:text-sm px-3 lg:px-4">
              {isSubscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  Subscribed
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </SubscribeDialog>
        </div>

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </Button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-0 left-0 w-full h-[100dvh] bg-background z-40 flex flex-col pt-24 px-6 md:hidden">
            <nav className="flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-3xl font-serif font-medium transition-colors hover:text-primary ${
                    location === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-12 flex flex-col gap-4">
              <Link href="/search" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start gap-3 h-14 rounded-xl text-lg">
                  <Search className="w-5 h-5" />
                  Search Recipes
                </Button>
              </Link>
              <SubscribeDialog>
                <Button className="w-full h-14 rounded-xl text-lg font-medium gap-2">
                  {isSubscribed ? (
                    <>
                      <Check className="w-5 h-5" />
                      Subscribed
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </SubscribeDialog>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
