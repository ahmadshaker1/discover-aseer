import type { LocaleCode } from "@/lib/i18n/localized";
import type {
  ApiSupportService,
  SupportService,
  SupportServicesApiResponse,
} from "./types";
import {
  normalizeSupportNumber,
  pickLocalizedTitle,
  translateSupportCity,
  translateSupportLabel,
} from "./supportServiceLocale";
import { normalizeMapsUrl, normalizeText } from "./utils";

const SUPPORT_SERVICES_API_BASE =
  process.env.NEXT_PUBLIC_SERVICES_API_BASE?.replace(/\/$/, "") ||
  "https://tool-portal.discoveraseer.com";

const SUPPORT_SERVICES_ITEMS_PATH = "/items/support_service" as const;

function isPublished(item: ApiSupportService): boolean {
  if (!item.status) return true;
  return item.status === "published";
}

function transformApiSupportService(
  item: ApiSupportService,
  locale: LocaleCode,
): SupportService {
  const filterCity = normalizeText(item.city, "غير محدد");
  const filterType = normalizeText(item.type, "غير مصنف");
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
): Promise<SupportService[]> {
  try {
    const response = await fetch(
      `${SUPPORT_SERVICES_API_BASE}${SUPPORT_SERVICES_ITEMS_PATH}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch support services: ${response.status} ${response.statusText}`,
      );
    }

    const apiData: SupportServicesApiResponse = await response.json();
    const rows = Array.isArray(apiData?.data) ? apiData.data : [];
    return rows.filter(isPublished).map((item) => transformApiSupportService(item, locale));
  } catch (error) {
    console.error("Error fetching support services:", error);
    return [];
  }
}
