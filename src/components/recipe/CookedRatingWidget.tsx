import { useState } from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCookedRatings } from "@/hooks/use-cooked-ratings";
import { useToast } from "@/hooks/use-toast";

export function CookedRatingWidget({ recipeId }: { recipeId: string }) {
  const { getRating, rate, removeRating } = useCookedRatings();
  const { toast } = useToast();
  const existing = getRating(recipeId);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState(existing?.review ?? "");
  const [showForm, setShowForm] = useState(false);

  function handleRate(value: number) {
    rate(recipeId, value, review || undefined);
    toast({
      title: value >= 4 ? "You loved it!" : value <= 2 ? "Noted." : "Thanks for cooking!",
      description: "Your rating has been saved.",
    });
  }

  function handleRemove() {
    removeRating(recipeId);
    setReview("");
    setShowForm(false);
    toast({
      title: "Rating removed",
      description: "This recipe is no longer in your cooked history.",
    });
  }

  function handleSaveReview() {
    if (!existing) return;
    rate(recipeId, existing.rating, review.trim() || undefined);
    toast({
      title: "Review saved",
      description: "Your note has been updated.",
    });
  }

  if (existing && !showForm) {
    return (
      <div className="inline-flex items-center gap-3 bg-secondary/50 border border-border/40 rounded-full px-4 py-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < existing.rating
                  ? "fill-amber-500 text-amber-500"
                  : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          You made this
        </span>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="text-xs text-primary hover:underline underline-offset-2 ml-1"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleRemove}
          className="text-muted-foreground hover:text-destructive ml-1"
          aria-label="Remove rating"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">I cooked this:</span>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => {
            const value = i + 1;
            const filled = existing ? value <= existing.rating : value <= hovered;
            return (
              <button
                key={value}
                type="button"
                onMouseEnter={() => setHovered(value)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => handleRate(value)}
                className="p-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-transform hover:scale-110"
                aria-label={`Rate ${value} stars`}
              >
                <Star
                  className={`w-6 h-6 ${
                    filled
                      ? "fill-amber-500 text-amber-500"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            );
          })}
        </div>
        {hovered > 0 && (
          <span className="text-xs text-muted-foreground">
            {hovered === 1 ? "Not great" : hovered === 2 ? "Okay" : hovered === 3 ? "Good" : hovered === 4 ? "Really good" : "Excellent"}
          </span>
        )}
      </div>

      {(existing || showForm) && (
        <div className="max-w-md">
          <Textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="What did you change? How did it turn out?"
            className="min-h-[60px] rounded-xl resize-none text-sm"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              Optional — max 200 characters
            </span>
            <div className="flex items-center gap-2">
              {existing && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setShowForm(false);
                    setReview(existing.review ?? "");
                  }}
                  className="rounded-full text-xs h-8"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="button"
                size="sm"
                onClick={handleSaveReview}
                disabled={!existing}
                className="rounded-full gap-1.5 text-xs h-8"
              >
                Save review
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
