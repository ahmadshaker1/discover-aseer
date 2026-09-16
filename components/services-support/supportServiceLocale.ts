import {
  getCityLabelById,
  inferCityIdFromLocation,
} from "@/components/landmarks/filterOptions";
import type { LocaleCode } from "@/lib/i18n/localized";
import { pickLocalizedField, prefersLatinContent } from "@/lib/i18n/localized";
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

const LABEL_ZH: Record<string, string> = {
  "مراكز الشرطة": "警察局",
  مستشفيات: "医院",
  المطارات: "机场",
  "الخدمات المساندة": "配套服务",
  "غير مصنف": "未分类",
  "غير محدد": "未指定",
  "غير متوفر": "暂无",
  "بدون اسم": "未命名",
};

function supportLabelDict(locale: LocaleCode): Record<string, string> | null {
  if (locale === "zh") return LABEL_ZH;
  if (locale === "en") return LABEL_EN;
  return null;
}

function normalizeLabelKey(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function pickLocalizedTitle(
  item: ApiSupportService,
  locale: LocaleCode,
): string {
  const localized = pickLocalizedField(
    item as Record<string, unknown>,
    "title",
    locale,
  );
  if (localized) return localized;

  const titleAr = (item.title_ar || "").trim();
  const titleEn = (item.title_en || "").trim();

  if (prefersLatinContent(locale)) {
    const untitled = locale === "zh" ? LABEL_ZH["بدون اسم"] : LABEL_EN["بدون اسم"];
    return titleEn || titleAr || untitled;
  }
  return titleAr || titleEn || "بدون اسم";
}

export function translateSupportLabel(
  value: string,
  locale: LocaleCode,
): string {
  const trimmed = normalizeLabelKey(value);
  const dict = supportLabelDict(locale);
  if (!trimmed || !dict) return trimmed;
  return dict[trimmed] ?? trimmed;
}

export function translateSupportCity(city: string, locale: LocaleCode): string {
  const trimmed = normalizeLabelKey(city);
  if (!trimmed || !prefersLatinContent(locale)) return trimmed;

  const cityId = inferCityIdFromLocation(trimmed);
  if (cityId) return getCityLabelById(cityId, locale);

  return trimmed;
}

export function normalizeSupportNumber(
  value: unknown,
  locale: LocaleCode,
): string {
  if (value == null) {
    return locale === "zh"
      ? LABEL_ZH["غير متوفر"]
      : locale === "en"
        ? LABEL_EN["غير متوفر"]
        : "غير متوفر";
  }
  const normalized = String(value).trim();
  if (normalized.length === 0) {
    return locale === "zh"
      ? LABEL_ZH["غير متوفر"]
      : locale === "en"
        ? LABEL_EN["غير متوفر"]
        : "غير متوفر";
  }
  return normalized;
}
