import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SubscribeFormProps {
  variant?: "light" | "dark";
  onSubscribed?: (email: string) => void;
}

export function SubscribeForm({ variant = "light", onSubscribed }: SubscribeFormProps) {
  const { subscriber, isSubscribed, subscribe, unsubscribe } = useSubscription();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [justSubscribed, setJustSubscribed] = useState(false);

  useEffect(() => {
    if (!isSubscribed) {
      setJustSubscribed(false);
    }
  }, [isSubscribed]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    subscribe(trimmed);
    setSubmitting(false);
    setJustSubscribed(true);
    setEmail("");
    onSubscribed?.(trimmed);
  }

  const isDark = variant === "dark";
  const inputClasses = isDark
    ? "bg-background/10 border-white/15 text-background placeholder:text-background/50 focus-visible:border-primary"
    : "bg-background border-border";
  const helpTextClasses = isDark ? "text-background/60" : "text-muted-foreground";
  const errorClasses = isDark ? "text-orange-300" : "text-destructive";

  return (
    <div className="w-full">
      <AnimatePresence mode="wait" initial={false}>
        {isSubscribed ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl p-5 flex items-start gap-4 ${
              isDark
                ? "bg-primary/15 border border-primary/30"
                : "bg-primary/10 border border-primary/20"
            }`}
          >
            <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-serif text-lg font-semibold ${isDark ? "text-background" : "text-foreground"}`}>
                {justSubscribed ? "You're on the list!" : "You're subscribed."}
              </p>
              <p className={`text-sm mt-1 ${helpTextClasses}`}>
                We'll send <span className="font-medium">{subscriber?.email}</span> a fresh South Indian recipe every Sunday morning.
              </p>
              <button
                type="button"
                onClick={unsubscribe}
                className={`text-xs mt-3 underline-offset-4 hover:underline ${
                  isDark ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Unsubscribe
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-3"
            noValidate
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${helpTextClasses}`} />
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  aria-invalid={!!error}
                  aria-describedby={error ? "subscribe-error" : undefined}
                  className={`pl-10 h-12 rounded-xl ${inputClasses}`}
                  disabled={submitting}
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="h-12 px-6 rounded-xl font-medium shrink-0"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Joining
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>
            {error ? (
              <p id="subscribe-error" className={`text-sm ${errorClasses}`}>
                {error}
              </p>
            ) : (
              <p className={`text-xs ${helpTextClasses}`}>
                One recipe a week. No spam, unsubscribe anytime.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
