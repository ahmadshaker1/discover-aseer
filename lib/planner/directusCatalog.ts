import { getDirectusPublicUrl } from "@/lib/directus/config";
import {
  DIRECTUS_COLLECTION_LIMIT,
  directusCollectionFetch,
  directusItemsUrl,
} from "@/lib/directus/collectionCache";

const RESTAURANT_FIELDS = [
  "id",
  "status",
  "name_ar",
  "name_en",
  "title_ar",
  "title_en",
  "city",
  "city_ar",
  "city_en",
  "image_new",
  "image",
  "google_maps_url",
  "location_map",
  "price_range",
  "price_band",
  "cuisine_type",
  "nationality_ar",
  "nationality_en",
  "category_ar",
  "category_en",
  "type",
  "type_ar",
  "type_en",
  "categories",
  "tags",
  "distance_km",
  "rating",
  "reviews_count",
  "content",
  "content_ar",
] as const;

const EXPERIENCE_FIELDS = [
  "id",
  "status",
  "title",
  "title_eng",
  "description",
  "description_eng",
  "image",
  "image_new",
  "link",
  "highlighted",
  "duration",
  "duration_En",
  "minimum_number_of_people",
  "details",
  "type",
  "type_en",
  "tour_agency",
  "tour_agency_en",
  "price",
  "booking_link",
  "target_audience",
] as const;

const EVENT_FIELDS = [
  "id",
  "title",
  "title_en",
  "image",
  "thumbnail",
  "hero_mobile",
  "map",
  "city",
  "city_en",
  "tags",
  "start_date",
  "end_date",
  "date",
  "start_time",
  "end_time",
  "free_event",
  "price",
  "status",
  "event_status",
  "unclickable",
  "suitable_for_kids",
  "audience_type",
  "image_new",
  "images",
  "ticket_link",
  "description",
  "description_en",
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
    title: item.title_en || item.title_ar || item.name_en || item.name_ar,
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
    restaurantsData: asRows(restaurantsPayload),
    experiencesData: asRows(experiencesPayload),
    eventsData: asRows(eventsPayload),
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
    return {
      catalog: mapRestaurantCatalog(asRows(payload)),
      data: asRows(payload),
    };
  }

  if (itemType === "experience") {
    const payload = await fetchCatalogJson(
      directusItemsUrl(base, "experiences", {
        ...listOpts,
        fields: EXPERIENCE_FIELDS,
      }),
    );
    return {
      catalog: mapExperienceCatalog(asRows(payload)),
      data: asRows(payload),
    };
  }

  const payload = await fetchCatalogJson(
    directusItemsUrl(base, "events", {
      ...listOpts,
      fields: EVENT_FIELDS,
    }),
  );
  return {
    catalog: mapEventCatalog(asRows(payload)),
    data: asRows(payload),
  };
}
