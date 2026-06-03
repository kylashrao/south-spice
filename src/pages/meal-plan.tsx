import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Printer,
  ShoppingBasket,
  Trash2,
  X,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMealPlan } from "@/hooks/use-meal-plan";
import {
  addDays,
  DAY_NAMES,
  DAY_NAMES_SHORT,
  formatWeekRange,
  isSameDay,
  MEAL_LABELS,
  MEAL_SLOTS,
  startOfWeek,
  type MealSlot,
} from "@/lib/meal-plan-utils";
import { mockRecipes as recipes, type Recipe } from "@/lib/mock-data";
import { aggregateIngredients } from "@/lib/aggregate-ingredients";

export default function MealPlanPage() {
  const today = useMemo(() => new Date(), []);
  const [weekStart, setWeekStart] = useState<Date>(() => startOfWeek(today));
  const { plan, setMeal, clearWeek } = useMealPlan(weekStart);
  const [picker, setPicker] = useState<{ day: number; slot: MealSlot } | null>(
    null,
  );

  const recipesById = useMemo(() => {
    const map = new Map<string, Recipe>();
    for (const r of recipes) map.set(r.id, r);
    return map;
  }, []);

  const filledCount = plan.reduce(
    (acc, day) =>
      acc + MEAL_SLOTS.filter((s) => Boolean(day[s])).length,
    0,
  );

  const plannedSelections = useMemo(() => {
    const list: { recipe: Recipe; servings: number }[] = [];
    for (const day of plan) {
      for (const slot of MEAL_SLOTS) {
        const id = day[slot];
        if (!id) continue;
        const r = recipesById.get(id);
        if (r) list.push({ recipe: r, servings: r.servings });
      }
    }
    return list;
  }, [plan, recipesById]);

  const shoppingItems = useMemo(
    () => aggregateIngredients(plannedSelections),
    [plannedSelections],
  );

  function goToWeek(offset: number) {
    setWeekStart((w) => addDays(w, offset * 7));
  }

  function isCurrentWeek() {
    return isSameDay(weekStart, startOfWeek(today));
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="py-14 md:py-20 bg-card/50 border-b border-border/50 print-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                Plan The Week
              </p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.05]">
                Your weekly meal plan
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mt-5 leading-relaxed">
                Slot recipes into breakfast, lunch and dinner across the week.
                We'll quietly build a combined shopping list at the bottom so
                you can head to the market in one trip.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6">
            {/* Week toolbar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 print-hidden">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => goToWeek(-1)}
                  className="rounded-full"
                  aria-label="Previous week"
                  data-testid="button-prev-week"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => goToWeek(1)}
                  className="rounded-full"
                  aria-label="Next week"
                  data-testid="button-next-week"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <div className="ml-2">
                  <div className="font-serif text-xl md:text-2xl font-semibold leading-tight">
                    {formatWeekRange(weekStart)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {filledCount} {filledCount === 1 ? "meal" : "meals"} planned
                    {!isCurrentWeek() && (
                      <>
                        {" · "}
                        <button
                          type="button"
                          onClick={() => setWeekStart(startOfWeek(today))}
                          className="underline hover:text-foreground"
                        >
                          Jump to this week
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.print()}
                  className="rounded-full gap-2"
                  disabled={filledCount === 0}
                >
                  <Printer className="w-4 h-4" />
                  Print menu
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearWeek}
                  disabled={filledCount === 0}
                  className="rounded-full gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear week
                </Button>
              </div>
            </div>

            {/* Print header (visible only on print) */}
            <div className="print-only mb-6">
              <h1 className="font-serif text-3xl font-bold">Weekly Menu</h1>
              <p className="text-sm">{formatWeekRange(weekStart)}</p>
            </div>

            {/* Week grid */}
            <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 print-avoid-break">
              {plan.map((day, i) => {
                const date = addDays(weekStart, i);
                const isToday = isSameDay(date, today);
                return (
                  <DayCard
                    key={i}
                    dayName={DAY_NAMES[i]}
                    dayShort={DAY_NAMES_SHORT[i]}
                    date={date}
                    isToday={isToday}
                    meals={day}
                    recipesById={recipesById}
                    onAdd={(slot) => setPicker({ day: i, slot })}
                    onRemove={(slot) => setMeal(i, slot, null)}
                  />
                );
              })}
            </div>

            {/* Shopping list */}
            <div className="mt-14 md:mt-20">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2">
                    From your plan
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight">
                    The week's shopping list
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {shoppingItems.length}{" "}
                  {shoppingItems.length === 1 ? "ingredient" : "ingredients"}{" "}
                  across {plannedSelections.length}{" "}
                  {plannedSelections.length === 1 ? "meal" : "meals"}
                </p>
              </div>

              {shoppingItems.length === 0 ? (
                <div className="border border-dashed border-border/80 rounded-3xl p-10 md:p-14 text-center bg-card/40">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <ShoppingBasket className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-2">
                    Nothing on the list yet
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Add a few meals above and the ingredients will combine here
                    automatically — no double-counting, no missed items.
                  </p>
                </div>
              ) : (
                <ShoppingListView items={shoppingItems} />
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <RecipePickerDialog
        open={picker !== null}
        onOpenChange={(o) => !o && setPicker(null)}
        slotLabel={picker ? MEAL_LABELS[picker.slot] : ""}
        dayLabel={
          picker
            ? `${DAY_NAMES[picker.day]}, ${addDays(weekStart, picker.day).toLocaleString(
                "en-US",
                { month: "short", day: "numeric" },
              )}`
            : ""
        }
        onPick={(recipeId) => {
          if (picker) {
            setMeal(picker.day, picker.slot, recipeId);
            setPicker(null);
          }
        }}
      />
    </div>
  );
}

function DayCard({
  dayName,
  dayShort,
  date,
  isToday,
  meals,
  recipesById,
  onAdd,
  onRemove,
}: {
  dayName: string;
  dayShort: string;
  date: Date;
  isToday: boolean;
  meals: Partial<Record<MealSlot, string>>;
  recipesById: Map<string, Recipe>;
  onAdd: (slot: MealSlot) => void;
  onRemove: (slot: MealSlot) => void;
}) {
  return (
    <div
      className={`border rounded-2xl bg-card overflow-hidden flex flex-col print-avoid-break ${
        isToday ? "border-primary/60 ring-1 ring-primary/30" : "border-border/60"
      }`}
    >
      <div
        className={`px-4 py-3 border-b ${
          isToday ? "bg-primary/10 border-primary/30" : "bg-secondary/30 border-border/60"
        }`}
      >
        <div className="flex items-baseline justify-between">
          <div className="font-serif text-lg font-semibold leading-none">
            <span className="hidden lg:inline">{dayShort}</span>
            <span className="lg:hidden">{dayName}</span>
          </div>
          <div
            className={`text-xs font-medium ${
              isToday ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {isToday ? "Today" : date.toLocaleString("en-US", { month: "short", day: "numeric" })}
          </div>
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col gap-2">
        {MEAL_SLOTS.map((slot) => {
          const id = meals[slot];
          const recipe = id ? recipesById.get(id) : undefined;
          return (
            <MealSlotCard
              key={slot}
              slot={slot}
              recipe={recipe}
              onAdd={() => onAdd(slot)}
              onRemove={() => onRemove(slot)}
            />
          );
        })}
      </div>
    </div>
  );
}

function MealSlotCard({
  slot,
  recipe,
  onAdd,
  onRemove,
}: {
  slot: MealSlot;
  recipe: Recipe | undefined;
  onAdd: () => void;
  onRemove: () => void;
}) {
  if (!recipe) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className="group w-full rounded-xl border border-dashed border-border/80 hover:border-primary/60 hover:bg-primary/5 transition-colors p-3 text-left"
        data-testid={`button-add-${slot}`}
      >
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
          {MEAL_LABELS[slot]}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary">
          <Plus className="w-4 h-4" />
          Add a recipe
        </div>
      </button>
    );
  }

  return (
    <div className="group relative rounded-xl border border-border/60 bg-background overflow-hidden">
      <Link
        href={`/recipes/${recipe.slug}`}
        className="block hover:bg-secondary/30 transition-colors"
      >
        <div className="flex">
          <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-secondary">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 p-2.5 pr-9">
            <div className="text-[10px] uppercase tracking-wider text-primary font-semibold leading-none mb-1">
              {MEAL_LABELS[slot]}
            </div>
            <div className="font-serif text-sm font-semibold leading-snug line-clamp-2">
              {recipe.title}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1">
              <Clock className="w-3 h-3" />
              {recipe.cookingTime}
            </div>
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-background/90 border border-border hover:bg-destructive hover:text-destructive-foreground hover:border-destructive flex items-center justify-center transition-colors print-hidden"
        aria-label={`Remove ${recipe.title} from ${MEAL_LABELS[slot]}`}
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

function RecipePickerDialog({
  open,
  onOpenChange,
  slotLabel,
  dayLabel,
  onPick,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slotLabel: string;
  dayLabel: string;
  onPick: (recipeId: string) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recipes;
    return recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.region.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setQuery("");
      }}
    >
      <DialogContent className="max-w-xl p-0 overflow-hidden gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
          <DialogTitle className="font-serif text-2xl">
            Pick a recipe
          </DialogTitle>
          <DialogDescription>
            {dayLabel ? `${slotLabel} · ${dayLabel}` : slotLabel}
          </DialogDescription>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, region or description..."
            className="mt-3 h-11 rounded-xl"
            autoFocus
          />
        </DialogHeader>
        <div className="max-h-[55vh] overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              No recipes match "{query}".
            </p>
          ) : (
            <ul className="divide-y divide-border/40">
              {filtered.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => onPick(r.id)}
                    className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-secondary/40 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img
                        src={r.image}
                        alt={r.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-base font-semibold leading-tight truncate">
                        {r.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                        <span>{r.region}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {r.cookingTime}
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ShoppingListView({
  items,
}: {
  items: ReturnType<typeof aggregateIngredients>;
}) {
  return (
    <div className="border border-border/60 rounded-3xl bg-card overflow-hidden print-avoid-break">
      <ul className="divide-y divide-border/40">
        {items.map((item) => (
          <li
            key={item.key}
            className="px-5 md:px-6 py-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2"
          >
            <div className="flex items-baseline gap-3 min-w-0">
              <span
                className="w-4 h-4 rounded border border-border flex-shrink-0 translate-y-0.5 print-hidden"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <div className="font-medium text-foreground">{item.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  For:{" "}
                  {Array.from(
                    new Set(item.sources.map((s) => s.recipeTitle)),
                  ).join(", ")}
                </div>
              </div>
            </div>
            <div className="text-sm text-foreground font-medium sm:text-right pl-7 sm:pl-0">
              {item.displayQuantity}
            </div>
          </li>
        ))}
      </ul>
      <div className="px-5 md:px-6 py-4 border-t border-border/50 bg-secondary/30 flex items-center gap-2 text-sm text-muted-foreground print-hidden">
        <CalendarDays className="w-4 h-4" />
        Quantities reflect each recipe's default servings.
      </div>
    </div>
  );
}
