export function scaleQuantity(quantity: string, ratio: number): string {
  if (ratio === 1 || !quantity) return quantity;

  const trimmed = quantity.trim();
  const match = trimmed.match(
    /^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?|\.\d+)(\s*(?:-|–|to)\s*(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?|\.\d+))?(\s*.*)$/,
  );

  if (!match) return quantity;

  const [, first, rangePart, second, restRaw] = match;
  const rest = (restRaw || "").trim();

  const scaledFirst = formatQuantity(parseNumber(first) * ratio);

  if (rangePart && second) {
    const scaledSecond = formatQuantity(parseNumber(second) * ratio);
    return `${scaledFirst}–${scaledSecond}${rest ? " " + rest : ""}`;
  }

  return rest ? `${scaledFirst} ${rest}` : scaledFirst;
}

export function parseLeadingNumber(
  quantity: string,
): { value: number; rest: string } | null {
  const m = quantity.trim().match(
    /^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?|\.\d+)\s*(.*)$/,
  );
  if (!m) return null;
  return { value: parseNumber(m[1]), rest: m[2].trim() };
}

function parseNumber(input: string): number {
  const s = input.trim();
  if (s.includes(" ")) {
    const [whole, frac] = s.split(/\s+/);
    const [n, d] = frac.split("/").map(Number);
    return Number(whole) + n / d;
  }
  if (s.includes("/")) {
    const [n, d] = s.split("/").map(Number);
    return n / d;
  }
  return Number(s);
}

const COMMON_FRACTIONS: { value: number; label: string }[] = [
  { value: 1 / 8, label: "1/8" },
  { value: 1 / 4, label: "1/4" },
  { value: 1 / 3, label: "1/3" },
  { value: 1 / 2, label: "1/2" },
  { value: 2 / 3, label: "2/3" },
  { value: 3 / 4, label: "3/4" },
];

export function formatQuantity(value: number): string {
  if (!isFinite(value) || value <= 0) return "0";

  const rounded = Math.round(value);
  if (Math.abs(value - rounded) < 0.04) return String(rounded);

  const whole = Math.floor(value);
  const frac = value - whole;

  let best = COMMON_FRACTIONS[0];
  let bestDiff = Math.abs(frac - best.value);
  for (const f of COMMON_FRACTIONS) {
    const d = Math.abs(frac - f.value);
    if (d < bestDiff) {
      best = f;
      bestDiff = d;
    }
  }

  if (bestDiff < 0.06) {
    return whole > 0 ? `${whole} ${best.label}` : best.label;
  }

  if (value >= 10) return String(Math.round(value));

  const oneDecimal = value.toFixed(1).replace(/\.0$/, "");
  return oneDecimal;
}
