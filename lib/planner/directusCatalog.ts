import { getDirectusPublicUrl } from "@/lib/directus/config";
import {
  DIRECTUS_COLLECTION_LIMIT,
  directusCollectionFetch,
  directusItemsUrl,
} from "@/lib/directus/collectionCache";

const RESTAURANT_FIELDS = [
  "id",
  "title_en",
  "title_ar",
  "cuisine_type",
  "content",
  "content_ar",
  "status",
] as const;

const EXPERIENCE_FIELDS = [
  "id",
  "title_eng",
  "title",
  "type_en",
  "type",
  "duration_En",
  "duration",
  "description_eng",
  "description",
  "status",
] as const;

const EVENT_FIELDS = [
  "id",
  "title_en",
  "title",
  "description_en",
  "description",
  "end_date",
  "status",
] as const;

type CatalogRow = Record<string, unknown> & { id?: string | number };

function asRows(payload: unknown): CatalogRow[] {
  if (!payload || typeof payload !== "object") return [];
  const data = (payload as { data?: unknown }).data;
  return Array.isArray(data) ? (data as CatalogRow[]) : [];
}

async function fetchCatalogJson(url: string): Promise<unknown> {
  const response = await fetch(url, directusCollectionFetch).catch(() => null);
  if (!response?.ok) return { data: [] };
  return response.json().catch(() => ({ data: [] }));
}

export function mapRestaurantCatalog(rows: CatalogRow[]) {
  return rows.map((item) => ({
    id: item.id,
    title: item.title_en || item.title_ar,
    cuisine: item.cuisine_type,
    description: item.content || item.content_ar,
  }));
}

export function mapExperienceCatalog(rows: CatalogRow[]) {
  return rows.map((item) => ({
    id: item.id,
    title: item.title_eng || item.title,
    type: item.type_en || item.type,
    duration: item.duration_En || item.duration,
    description: item.description_eng || item.description,
  }));
}

export function mapEventCatalog(rows: CatalogRow[]) {
  const todayStr = new Date().toISOString().split("T")[0];
  return rows
    .filter((item) => {
      const end = typeof item.end_date === "string" ? item.end_date : "";
      return !end || end >= todayStr;
    })
    .map((item) => ({
      id: item.id,
      title: item.title_en || item.title,
      description: item.description_en || item.description,
      end_date: item.end_date,
    }));
}

export async function fetchPlannerCatalogs() {
  const base = getDirectusPublicUrl();
  const listOpts = { limit: DIRECTUS_COLLECTION_LIMIT, published: true };

  const [restaurantsPayload, experiencesPayload, eventsPayload] =
    await Promise.all([
      fetchCatalogJson(
        directusItemsUrl(base, "restaurants", {
          ...listOpts,
          fields: RESTAURANT_FIELDS,
        }),
      ),
      fetchCatalogJson(
        directusItemsUrl(base, "experiences", {
          ...listOpts,
          fields: EXPERIENCE_FIELDS,
        }),
      ),
      fetchCatalogJson(
        directusItemsUrl(base, "events", {
          ...listOpts,
          fields: EVENT_FIELDS,
        }),
      ),
    ]);

  return {
    restaurantsCatalog: mapRestaurantCatalog(asRows(restaurantsPayload)),
    experiencesCatalog: mapExperienceCatalog(asRows(experiencesPayload)),
    eventsCatalog: mapEventCatalog(asRows(eventsPayload)),
  };
}

export async function fetchPlannerCatalogByType(
  itemType: "restaurant" | "experience" | "event",
) {
  const base = getDirectusPublicUrl();
  const listOpts = { limit: DIRECTUS_COLLECTION_LIMIT, published: true };

  if (itemType === "restaurant") {
    const payload = await fetchCatalogJson(
      directusItemsUrl(base, "restaurants", {
        ...listOpts,
        fields: RESTAURANT_FIELDS,
      }),
    );
    return mapRestaurantCatalog(asRows(payload));
  }

  if (itemType === "experience") {
    const payload = await fetchCatalogJson(
      directusItemsUrl(base, "experiences", {
        ...listOpts,
        fields: EXPERIENCE_FIELDS,
      }),
    );
    return mapExperienceCatalog(asRows(payload));
  }

  const payload = await fetchCatalogJson(
    directusItemsUrl(base, "events", {
      ...listOpts,
      fields: EVENT_FIELDS,
    }),
  );
  return mapEventCatalog(asRows(payload));
}
