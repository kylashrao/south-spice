import { useEffect, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SubscribeForm } from "./SubscribeForm";
import { useSubscription } from "@/hooks/use-subscription";

interface SubscribeDialogProps {
  children: ReactNode;
}

export function SubscribeDialog({ children }: SubscribeDialogProps) {
  const [open, setOpen] = useState(false);
  const { isSubscribed } = useSubscription();
  const [autoCloseAfter, setAutoCloseAfter] = useState<string | null>(null);

  useEffect(() => {
    if (!autoCloseAfter) return;
    const t = window.setTimeout(() => {
      setOpen(false);
      setAutoCloseAfter(null);
    }, 1800);
    return () => window.clearTimeout(t);
  }, [autoCloseAfter]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-border/60">
        <div className="bg-gradient-to-br from-secondary/70 via-background to-background p-8 md:p-10">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            South Spice Weekly
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight mb-3">
            {isSubscribed ? "You're already in the kitchen with us." : "A new recipe in your inbox, every Sunday."}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {isSubscribed
              ? "Thanks for being part of South Spice. Every Sunday morning, look out for a fresh recipe waiting in your inbox."
              : "Join our community for a hand-picked South Indian recipe each week, plus seasonal cooking notes from our kitchen."}
          </p>
          <SubscribeForm
            variant="light"
            onSubscribed={(email) => setAutoCloseAfter(email)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
