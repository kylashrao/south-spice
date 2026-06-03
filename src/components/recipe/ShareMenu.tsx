import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Link2, MessageCircle, Mail, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ShareMenuProps {
  title: string;
  description: string;
  slug: string;
}

export function ShareMenu({ title, description, slug }: ShareMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const url = typeof window !== "undefined"
    ? `${window.location.origin}${window.location.pathname.replace(/\/$/, "")}/recipes/${slug}`
    : `/recipes/${slug}`;

  async function copyLink() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        toast({ title: "Link copied", description: "Paste it anywhere to share this recipe." });
        setTimeout(() => setCopied(false), 2000);
      } catch {
        toast({ title: "Could not copy", description: "Copy the link manually from your browser bar." });
      }
    }
  }

  function shareWhatsApp() {
    const text = encodeURIComponent(`Check out this South Indian recipe: ${title}\n${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  function shareEmail() {
    const subject = encodeURIComponent(`Recipe: ${title}`);
    const body = encodeURIComponent(`I found this recipe on South Spice and thought you would enjoy it:\n\n${title}\n${url}\n\n${description}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
    setOpen(false);
  }

  async function nativeShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
        setOpen(false);
        return;
      } catch {
        // user cancelled — keep menu open
      }
    }
  }

  return (
    <div className="relative">
      <Button
        size="lg"
        variant="outline"
        className="rounded-full px-6"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-2 w-64 bg-card border border-border/60 rounded-xl shadow-xl z-50 overflow-hidden"
              role="menu"
            >
              <div className="p-3">
                <div className="flex items-center justify-between px-2 pb-2 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Share
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="w-6 h-6 rounded-full hover:bg-secondary/60 flex items-center justify-center text-muted-foreground"
                    aria-label="Close share menu"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {typeof navigator.share === "function" && (
                  <button
                    type="button"
                    onClick={nativeShare}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary/50 transition-colors text-left"
                    role="menuitem"
                  >
                    <Share2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Native Share</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={shareWhatsApp}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary/50 transition-colors text-left"
                  role="menuitem"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={shareEmail}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary/50 transition-colors text-left"
                  role="menuitem"
                >
                  <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Email</span>
                </button>

                <div className="border-t border-border/40 my-1" />

                <button
                  type="button"
                  onClick={copyLink}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary/50 transition-colors text-left"
                  role="menuitem"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Link2 className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  <span>{copied ? "Copied" : "Copy link"}</span>
                </button>
              </div>
            </motion.div>

            {/* Backdrop to close on outside click */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
