export const MEAL_SLOTS = ["breakfast", "lunch", "dinner"] as const;
export type MealSlot = (typeof MEAL_SLOTS)[number];

export const MEAL_LABELS: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

export const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const DAY_NAMES_SHORT = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;

/** Returns the Monday at 00:00 local time for the week containing `date`. */
export function startOfWeek(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay(); // 0 Sun .. 6 Sat
  const offset = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + offset);
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function weekKey(date: Date): string {
  const d = startOfWeek(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatWeekRange(weekStart: Date): string {
  const end = addDays(weekStart, 6);
  const sameMonth = weekStart.getMonth() === end.getMonth();
  const sameYear = weekStart.getFullYear() === end.getFullYear();
  const startMonth = weekStart.toLocaleString("en-US", { month: "short" });
  const endMonth = end.toLocaleString("en-US", { month: "short" });

  if (sameMonth && sameYear) {
    return `${startMonth} ${weekStart.getDate()} – ${end.getDate()}, ${weekStart.getFullYear()}`;
  }
  if (sameYear) {
    return `${startMonth} ${weekStart.getDate()} – ${endMonth} ${end.getDate()}, ${weekStart.getFullYear()}`;
  }
  return `${startMonth} ${weekStart.getDate()}, ${weekStart.getFullYear()} – ${endMonth} ${end.getDate()}, ${end.getFullYear()}`;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export type WeekPlan = Partial<Record<MealSlot, string>>[];

export function emptyWeekPlan(): WeekPlan {
  return Array.from({ length: 7 }, () => ({}));
}
