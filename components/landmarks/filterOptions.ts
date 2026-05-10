export interface LabeledFilterOption {
  id: string;
  label: string;
}

/** One row per id; Arabic + English labels for UI and bilingual city matching */
const CITY_DEFS = [
  { id: "abha", ar: "أبها", en: "Abha" },
  { id: "khamis", ar: "خميس مشيط", en: "Khamis Mushait" },
  { id: "tanomah", ar: "تنومة", en: "Tanomah" },
  { id: "bisha", ar: "بيشة", en: "Bisha" },
  { id: "mahayil", ar: "محايل عسير", en: "Mahayil Asir" },
  { id: "najran", ar: "نجران", en: "Najran" },
] as const;

const INTEREST_DEFS = [
  { id: "adventure", ar: "المغامرات", en: "Adventure" },
  { id: "culture", ar: "الثقافة والتراث", en: "Culture & heritage" },
  { id: "nature", ar: "الطبيعة والهواء الطلق", en: "Nature & outdoors" },
  { id: "food", ar: "الطعام والمطاعم", en: "Food & dining" },
  { id: "relaxation", ar: "الاسترخاء", en: "Relaxation" },
  { id: "shopping", ar: "التسوق", en: "Shopping" },
  { id: "historical", ar: "المواقع التاريخية", en: "Historic sites" },
] as const;

const DURATION_DEFS = [
  { id: "short", ar: "قصيرة (1-3 ساعات)", en: "Short (1–3 hours)" },
  { id: "half-day", ar: "نصف يوم (3-6 ساعات)", en: "Half day (3–6 hours)" },
  { id: "full-day", ar: "يوم كامل", en: "Full day" },
  {
    id: "weekend",
    ar: "عطلة نهاية الأسبوع (1-2 أيام)",
    en: "Weekend (1–2 days)",
  },
  { id: "extended", ar: "ممتدة (3+ أيام)", en: "Extended (3+ days)" },
] as const;

const PRICE_DEFS = [
  { id: "free", ar: "مجاني", en: "Free" },
  { id: "budget", ar: "اقتصادي (أقل من 50 ر.س)", en: "Budget (under SAR 50)" },
  {
    id: "mid-range",
    ar: "متوسط (50-200 ر.س)",
    en: "Mid-range (SAR 50–200)",
  },
  {
    id: "luxury",
    ar: "فاخر (أكثر من 200 ر.س)",
    en: "Luxury (above SAR 200)",
  },
] as const;

const TRAVELER_DEFS = [
  { id: "solo", ar: "فردي", en: "Solo" },
  { id: "couple", ar: "زوجين", en: "Couple" },
  { id: "family", ar: "عائلة", en: "Family" },
  {
    id: "small-group",
    ar: "مجموعة صغيرة (3-5 أشخاص)",
    en: "Small group (3–5)",
  },
  {
    id: "large-group",
    ar: "مجموعة كبيرة (6+ أشخاص)",
    en: "Large group (6+)",
  },
] as const;

function pickLocale(locale: string): "ar" | "en" {
  return locale === "en" ? "en" : "ar";
}

function mapDefs<T extends { id: string; ar: string; en: string }>(
  defs: readonly T[],
  locale: string
): LabeledFilterOption[] {
  const lang = pickLocale(locale);
  return defs.map((d) => ({ id: d.id, label: d[lang] }));
}

/** City dropdown / filter rows for the active UI locale */
export function getCityOptions(locale: string): LabeledFilterOption[] {
  return mapDefs(CITY_DEFS, locale);
}

/** Interests checklist / dropdown */
export function getInterestOptions(locale: string): LabeledFilterOption[] {
  return mapDefs(INTEREST_DEFS, locale);
}

export function getDurationOptions(locale: string): LabeledFilterOption[] {
  return mapDefs(DURATION_DEFS, locale);
}

export function getPriceOptions(locale: string): LabeledFilterOption[] {
  return mapDefs(PRICE_DEFS, locale);
}

export function getTravelerOptions(locale: string): LabeledFilterOption[] {
  return mapDefs(TRAVELER_DEFS, locale);
}

/** Match free-text locations against both Arabic and English city labels */
export function locationMatchesCityId(
  haystack: string,
  cityId: string | null
): boolean {
  if (!cityId) return true;
  const row = CITY_DEFS.find((c) => c.id === cityId);
  if (!row) return true;
  return haystack.includes(row.ar) || haystack.includes(row.en);
}

/** Infer landmark/restaurant row city id when only free-text location is known */
export function inferCityIdFromLocation(location: string): string | undefined {
  const h = location;
  for (const c of CITY_DEFS) {
    if (h.includes(c.ar) || h.includes(c.en)) return c.id;
  }
  return undefined;
}

/** @deprecated Prefer getCityOptions(locale) */
export const cityOptions: LabeledFilterOption[] = getCityOptions("ar");
/** @deprecated Prefer getInterestOptions(locale) */
export const interestOptions: LabeledFilterOption[] = getInterestOptions("ar");
/** @deprecated Prefer getDurationOptions(locale) */
export const durationOptions: LabeledFilterOption[] =
  getDurationOptions("ar");
/** @deprecated Prefer getPriceOptions(locale) */
export const priceOptions: LabeledFilterOption[] = getPriceOptions("ar");
/** @deprecated Prefer getTravelerOptions(locale) */
export const travelerOptions: LabeledFilterOption[] =
  getTravelerOptions("ar");
