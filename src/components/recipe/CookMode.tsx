import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Check, Flame, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useCookingNotes } from "@/hooks/use-cooking-notes";

type Step = { title: string; body: string };

interface CookModeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipeTitle: string;
  recipeId: string;
  steps: Step[];
}

export function CookMode({ open, onOpenChange, recipeTitle, recipeId, steps }: CookModeProps) {
  const [index, setIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const { notes, addNote, deleteNote } = useCookingNotes(recipeId);

  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        setIndex((i) => Math.min(steps.length - 1, i + 1));
      } else if (e.key === "ArrowLeft") {
        setIndex((i) => Math.max(0, i - 1));
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, steps.length]);

  const total = steps.length;
  const step = steps[index];
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const progress = total > 0 ? ((index + 1) / total) * 100 : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-none w-screen h-[100dvh] sm:h-[100dvh] p-0 gap-0 border-0 rounded-none bg-background sm:rounded-none flex flex-col"
        showCloseButton={false}
      >
        <header className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-border/60 bg-card/60 backdrop-blur">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Cook Mode
              </p>
              <p className="font-serif text-base sm:text-lg font-semibold truncate">
                {recipeTitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {notes.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowNotes((s) => !s)}
                aria-label="Toggle cooking notes"
                className={`rounded-full h-10 w-10 ${showNotes ? "bg-primary/10 text-primary" : ""}`}
                title={`${notes.length} note${notes.length === 1 ? "" : "s"}`}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              aria-label="Exit cook mode"
              className="rounded-full h-10 w-10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <div className="px-5 sm:px-8 pt-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span className="uppercase tracking-[0.18em]">
              Step {index + 1} of {total}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-secondary/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 sm:py-10 flex items-start sm:items-center justify-center">
          <div className="w-full max-w-3xl">
            {showNotes && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-8 border border-border/60 rounded-2xl bg-card/70 p-4 sm:p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">
                    Your cooking notes
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowNotes(false)}
                    className="text-muted-foreground hover:text-foreground text-xs"
                  >
                    Hide
                  </button>
                </div>
                {notes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No notes yet. Close Cook Mode and add notes on the recipe page.
                  </p>
                ) : (
                  <ul className="space-y-2 mb-3">
                    {notes.map((note) => (
                      <li key={note.id} className="flex items-start gap-2 group">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                        <p className="text-sm text-foreground/85 leading-relaxed flex-1 whitespace-pre-wrap">
                          {note.text}
                        </p>
                        <button
                          type="button"
                          onClick={() => deleteNote(note.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-destructive/10 hover:text-destructive text-muted-foreground flex-shrink-0"
                          aria-label="Delete note"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex items-start gap-2">
                  <Textarea
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Jot a quick note from the kitchen..."
                    className="min-h-[56px] rounded-xl resize-none text-sm flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    disabled={!newNoteText.trim()}
                    onClick={() => {
                      if (!newNoteText.trim()) return;
                      addNote(newNoteText.trim());
                      setNewNoteText("");
                    }}
                    className="rounded-full gap-1.5 flex-shrink-0 self-end"
                  >
                    <Pencil className="w-3 h-3" />
                    Add
                  </Button>
                </div>
              </motion.div>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <p className="font-serif text-sm uppercase tracking-[0.22em] text-primary mb-4">
                  Step {index + 1}
                </p>
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-6 sm:mb-8">
                  {step?.title}
                </h2>
                <p className="text-lg sm:text-2xl leading-relaxed text-foreground/85">
                  {step?.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <footer className="border-t border-border/60 bg-card/60 backdrop-blur px-5 sm:px-8 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={isFirst}
              className="rounded-full gap-2 min-w-[120px]"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="hidden sm:flex items-center gap-1.5">
              {steps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to step ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? "w-8 bg-primary"
                      : i < index
                      ? "w-2 bg-primary/50"
                      : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>

            {isLast ? (
              <Button
                type="button"
                size="lg"
                onClick={() => onOpenChange(false)}
                className="rounded-full gap-2 min-w-[120px]"
              >
                <Check className="w-4 h-4" />
                Done
              </Button>
            ) : (
              <Button
                type="button"
                size="lg"
                onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
                className="rounded-full gap-2 min-w-[120px]"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
