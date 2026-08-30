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
  "city",
  "city_en",
  "type",
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
  const rawCity = String(
    pickLocalizedField(item, "city", locale) || item.city || "غير محدد",
  );
  let filterCity = normalizeCity(rawCity, locale);
  let filterType = normalizeText(item.type, "الخدمات المساندة");

  if (filterType === "الخدمات مستشفيات") filterType = "مستشفيات";
  const title = pickLocalizedTitle(item, locale);

  return {
    id: String(item.id),
    title,
    category: translateSupportLabel(filterType, locale),
    city: translateSupportCity(filterCity, locale),
    type: translateSupportLabel(filterType, locale),
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
