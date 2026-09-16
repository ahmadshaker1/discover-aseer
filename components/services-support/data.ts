import type { LocaleCode } from "@/lib/i18n/localized";
import type {
  ApiSupportService,
  SupportService,
} from "./types";
import { pickLocalizedField } from "@/lib/i18n/localized";
import {
  normalizeSupportNumber,
  pickLocalizedTitle,
  translateSupportCity,
  translateSupportLabel,
} from "./supportServiceLocale";
import { normalizeMapsUrl, normalizeText } from "./utils";
import {
  catalogTotalPages,
  fetchDirectusCollectionAll,
  directusItemsUrl,
} from "@/lib/directus/collectionCache";

const SUPPORT_SERVICE_FIELDS = [
  "id",
  "title_ar",
  "title_en",
  "title_cn",
  "city",
  "city_en",
  "city_cn",
  "type",
  "type_cn",
  "location",
  "support_services_number",
  "latitude",
  "longitude",
] as const;

const SUPPORT_SERVICES_API_BASE =
  process.env.NEXT_PUBLIC_SERVICES_API_BASE?.replace(/\/$/, "") ||
  "https://tool-portal.discoveraseer.com";


function isPublished(item: ApiSupportService): boolean {
  if (!item.status) return true;
  return item.status === "published";
}

const normalizeCity = (city: string, locale: LocaleCode): string => {
  const c = city.trim();
  if (locale === "en") {
    const map: Record<string, string> = {
      أبها: "Abha",
      "خميس مشيط": "Khamis Mushait",
      السودة: "Al Soudah",
      بيشة: "Bisha",
      تنومة: "Tanomah",
      النماص: "Al Namas",
      "محايل عسير": "Mahayil Aseer",
      "رجال ألمع": "Rijal Almaa",
    };
    return map[c] || c;
  }
  if (locale === "zh") {
    const map: Record<string, string> = {
      أبها: "艾卜哈",
      Abha: "艾卜哈",
      "خميس مشيط": "海米斯穆谢特",
      "Khamis Mushait": "海米斯穆谢特",
      السودة: "苏达",
      "Al Soudah": "苏达",
      بيشة: "比沙",
      Bisha: "比沙",
      تنومة: "塔努马",
      Tanomah: "塔努马",
      النماص: "纳马斯",
      "Al Namas": "纳马斯",
      "محايل عسير": "迈哈伊勒阿西尔",
      "Mahayil Aseer": "迈哈伊勒阿西尔",
      "رجال ألمع": "里贾勒阿尔马",
      "Rijal Almaa": "里贾勒阿尔马",
    };
    return map[c] || c;
  }
  if (locale === "ar") {
    const map: Record<string, string> = {
      Abha: "أبها",
      "Khamis Mushait": "خميس مشيط",
      "Al Soudah": "السودة",
      Bisha: "بيشة",
      Tanomah: "تنومة",
      "Al Namas": "النماص",
      "Mahayil Aseer": "محايل عسير",
      "Rijal Almaa": "رجال ألمع",
    };
    return map[c] || c;
  }
  return c;
};

function transformApiSupportService(
  item: ApiSupportService,
  locale: LocaleCode,
): SupportService {
  const rawCity = String(item.city || item.city_en || "غير محدد");
  let filterCity = normalizeCity(rawCity, "ar");
  let filterType = normalizeText(item.type, "الخدمات المساندة");

  if (filterType === "الخدمات مستشفيات") filterType = "مستشفيات";
  const title = pickLocalizedTitle(item, locale);
  const typeLabel =
    pickLocalizedField(item, "type", locale) ||
    translateSupportLabel(filterType, locale);

  return {
    id: String(item.id),
    title,
    category: typeLabel,
    city:
      pickLocalizedField(item, "city", locale) ||
      translateSupportCity(filterCity, locale),
    type: typeLabel,
    supportNumber: normalizeSupportNumber(item.support_services_number, locale),
    mapsUrl: normalizeMapsUrl(item.location, title),
    filterCity,
    filterType,
  };
}

export async function fetchSupportServices(
  locale: LocaleCode = "ar",
): Promise<{
  items: SupportService[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const empty = { items: [] as SupportService[], total: 0, page: 1, totalPages: 1 };
  try {
    const { rows } = await fetchDirectusCollectionAll<ApiSupportService>(
      (page, pageSize, meta) =>
        directusItemsUrl(SUPPORT_SERVICES_API_BASE, "support_service", {
          fields: SUPPORT_SERVICE_FIELDS,
          page,
          pageSize,
          meta,
        }),
    );
    const items = rows
      .filter(isPublished)
      .map((item) => transformApiSupportService(item, locale));
    return {
      items,
      total: items.length,
      page: 1,
      totalPages: catalogTotalPages(items.length, items.length || 1),
    };
  } catch (error) {
    console.error("Error fetching support services:", error);
    return empty;
  }
}
