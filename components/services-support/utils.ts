import type { ApiSupportService } from "./types";

const ARABIC_TEXT_REGEX = /[\u0600-\u06FF]/;

function hasArabicText(value: string): boolean {
  return ARABIC_TEXT_REGEX.test(value);
}

export function pickArabicTitle(item: ApiSupportService): string {
  const titleAr = (item.title_ar || "").trim();
  const titleEn = (item.title_en || "").trim();

  // Keep this fallback while backend finalizes `title_ar/title_en` alignment.
  if (titleAr && hasArabicText(titleAr)) return titleAr;
  if (titleEn && hasArabicText(titleEn)) return titleEn;

  return titleAr || titleEn || "بدون اسم";
}

export function normalizeSupportNumber(value: unknown): string {
  if (value == null) return "غير متوفر";
  const normalized = String(value).trim();
  return normalized.length > 0 ? normalized : "غير متوفر";
}

export function normalizeMapsUrl(value: string | null | undefined, title: string): string {
  const clean = (value || "").trim();
  if (clean) return clean;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title)}`;
}

export function normalizeText(value: string | null | undefined, fallback: string): string {
  const clean = (value || "").trim();
  return clean || fallback;
}
