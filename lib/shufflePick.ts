/** Shuffle a copy of `items` (Fisher–Yates) and return up to `count` entries. */
export function shufflePick<T>(items: T[], count: number): T[] {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const current = copy[i]!;
    copy[i] = copy[j]!;
    copy[j] = current;
  }
  return copy.slice(0, Math.max(0, count));
}
