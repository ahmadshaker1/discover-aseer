import {
  getCityLabelById,
  inferCityIdFromLocation,
} from "@/components/landmarks/filterOptions";
import type { LocaleCode } from "@/lib/i18n/localized";
import type { ApiSupportService } from "./types";

export const SUPPORT_CATEGORY_FILTER_KEYS = [
  "مستشفيات",
  "مراكز الشرطة",
  "المطارات",
] as const;

const LABEL_EN: Record<string, string> = {
  "مراكز الشرطة": "Police stations",
  مستشفيات: "Hospitals",
  المطارات: "Airports",
  "الخدمات المساندة": "Support services",
  "غير مصنف": "Uncategorized",
  "غير محدد": "Not specified",
  "غير متوفر": "Not available",
  "بدون اسم": "Untitled",
};

function normalizeLabelKey(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function pickLocalizedTitle(
  item: ApiSupportService,
  locale: LocaleCode,
): string {
  const titleAr = (item.title_ar || "").trim();
  const titleEn = (item.title_en || "").trim();

  if (locale === "en") {
    return titleEn || titleAr || LABEL_EN["بدون اسم"];
  }
  return titleAr || titleEn || "بدون اسم";
}

export function translateSupportLabel(
  value: string,
  locale: LocaleCode,
): string {
  const trimmed = normalizeLabelKey(value);
  if (!trimmed || locale !== "en") return trimmed;
  return LABEL_EN[trimmed] ?? trimmed;
}

export function translateSupportCity(city: string, locale: LocaleCode): string {
  const trimmed = normalizeLabelKey(city);
  if (!trimmed || locale !== "en") return trimmed;

  const cityId = inferCityIdFromLocation(trimmed);
  if (cityId) return getCityLabelById(cityId, "en");

  return trimmed;
}

export function normalizeSupportNumber(
  value: unknown,
  locale: LocaleCode,
): string {
  if (value == null) {
    return locale === "en" ? LABEL_EN["غير متوفر"] : "غير متوفر";
  }
  const normalized = String(value).trim();
  if (normalized.length === 0) {
    return locale === "en" ? LABEL_EN["غير متوفر"] : "غير متوفر";
  }
  return normalized;
}
