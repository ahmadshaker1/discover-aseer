/** Normalize Arabic/Latin search text for forgiving map queries. */
export function normalizeMapSearchText(value: string): string {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/ـ/g, "")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    // Ignore hyphens/dashes so "Al-Soudah" matches "AlSoudah" / "Al Soudah"
    .replace(/[-‐‑‒–—―]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshteinAtMost(a: string, b: string, max: number): boolean {
  if (a === b) return true;
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > max) return false;
  if (la === 0 || lb === 0) return Math.max(la, lb) <= max;

  let prev = Array.from({ length: lb + 1 }, (_, i) => i);
  for (let i = 1; i <= la; i++) {
    const cur = new Array<number>(lb + 1);
    cur[0] = i;
    let rowMin = cur[0];
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (cur[j] < rowMin) rowMin = cur[j];
    }
    if (rowMin > max) return false;
    prev = cur;
  }
  return prev[lb] <= max;
}

/**
 * Find the earliest match for `token` in `haystack` at/after `fromIndex`.
 * Letter order is strict. Only allowance: one-letter typo on a whole word.
 */
function findTokenInOrder(
  haystack: string,
  token: string,
  fromIndex: number,
): number {
  if (!token) return fromIndex;

  const sliceStart = Math.max(0, fromIndex);

  // Strict ordered contains / includes
  const exactAt = haystack.indexOf(token, sliceStart);
  if (exactAt !== -1) {
    return exactAt + token.length;
  }

  // Single-letter mismatch only (insert/delete/substitute), for longer tokens
  if (token.length < 4) return -1;

  const wordRe = /\S+/g;
  let match: RegExpExecArray | null;
  while ((match = wordRe.exec(haystack)) !== null) {
    if (match.index < sliceStart) continue;
    const word = match[0];
    if (word.length < 3) continue;
    if (levenshteinAtMost(word, token, 1)) {
      return match.index + word.length;
    }
  }
  return -1;
}

export interface MapSearchablePlace {
  title: string;
  description: string;
  city: string;
  category?: string;
  categoryAr?: string;
  categoryEn?: string;
  tag?: string;
}

/**
 * Map search: contains match with strict letter order.
 * Typo tolerance: at most one letter difference per token (len >= 4).
 * Query tokens must appear in order. Empty query matches all.
 */
export function placeMatchesMapSearch(
  place: MapSearchablePlace,
  rawQuery: string,
): boolean {
  const query = normalizeMapSearchText(rawQuery);
  if (!query) return true;

  const haystack = normalizeMapSearchText(
    [
      place.title,
      place.description,
      place.city,
      place.category,
      place.categoryAr,
      place.categoryEn,
      place.tag,
    ]
      .filter(Boolean)
      .join(" "),
  );

  if (haystack.includes(query)) return true;

  const tokens = query.split(" ").filter(Boolean);
  let fromIndex = 0;
  for (const token of tokens) {
    const next = findTokenInOrder(haystack, token, fromIndex);
    if (next === -1) return false;
    fromIndex = next;
  }
  return true;
}
