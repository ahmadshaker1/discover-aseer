import { getDirectusPublicUrl } from "@/lib/directus/config";
import {
  DIRECTUS_COLLECTION_LIMIT,
  directusCollectionFetch,
  directusItemsUrl,
} from "@/lib/directus/collectionCache";

const RESTAURANT_FIELDS = [
  "id",
  "title_ar",
  "title_en",
  "city",
  "image_new",
  "image",
  "location_map",
  "cuisine_type",
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
  "map",
  "city",
  "city_en",
  "start_date",
  "end_date",
  "free_event",
  "price",
  "status",
  "event_status",
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

export async function fetchPlannerCatalogs(options?: {
  skipRestaurants?: boolean;
  foodPreferences?: string[];
  companion?: string | null;
  interests?: string[];
}) {
  const base = getDirectusPublicUrl();
  const listOpts = { limit: DIRECTUS_COLLECTION_LIMIT, published: true };

  const [restaurantsPayload, experiencesPayload, eventsPayload] =
    await Promise.all([
      options?.skipRestaurants
        ? Promise.resolve({ data: [] })
        : fetchCatalogJson(
            directusItemsUrl(base, "restaurants", {
              limit: 150,
              fields: RESTAURANT_FIELDS,
            }),
          ),
      fetchCatalogJson(
        directusItemsUrl(base, "experiences", {
          limit: 150,
          published: true,
          fields: EXPERIENCE_FIELDS,
        }),
      ),
      fetchCatalogJson(
        directusItemsUrl(base, "events", {
          limit: 150,
          fields: EVENT_FIELDS,
        }) + "&filter[event_status][_eq]=Now",
      ),
    ]);

  const rawRestaurantsData = asRows(restaurantsPayload);
  const restaurantsData =
    options?.foodPreferences && options.foodPreferences.length > 0
      ? rawRestaurantsData.filter((r) => {
          if (!Array.isArray(r.cuisine_type)) return false;
          return r.cuisine_type.some((type: any) =>
            options.foodPreferences!.includes(type),
          );
        })
      : rawRestaurantsData;

  const rawExperiencesData = asRows(experiencesPayload);
  const companionMapping: Record<string, string> = {
    solo: "فردي",
    group: "مجموعات",
    couple: "زوجين",
    family: "عائلة",
  };

  const experiencesData = rawExperiencesData.filter((exp) => {
    if (options?.companion && companionMapping[options.companion]) {
      const targetAudience = exp.target_audience;
      const expectedAudience = companionMapping[options.companion];
      if (Array.isArray(targetAudience)) {
        if (
          !targetAudience.some((a: any) => String(a).includes(expectedAudience))
        )
          return false;
      } else if (typeof targetAudience === "string") {
        if (!targetAudience.includes(expectedAudience)) return false;
      } else {
        return false;
      }
    }

    if (options?.interests && options.interests.length > 0) {
      const expTypeEn = exp.type_en;
      if (Array.isArray(expTypeEn)) {
        if (!expTypeEn.some((t: any) => options.interests!.includes(t)))
          return false;
      } else if (typeof expTypeEn === "string") {
        if (!options.interests.includes(expTypeEn)) return false;
      } else {
        return false;
      }
    }
    return true;
  });

  return {
    restaurantsCatalog: mapRestaurantCatalog(restaurantsData),
    experiencesCatalog: mapExperienceCatalog(experiencesData),
    eventsCatalog: mapEventCatalog(asRows(eventsPayload)),
    restaurantsData: restaurantsData,
    experiencesData: experiencesData,
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
        limit: 150,
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
        limit: 150,
        published: true,
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
      limit: 150,
      fields: EVENT_FIELDS,
    }) + "&filter[event_status][_eq]=Now",
  );
  return {
    catalog: mapEventCatalog(asRows(payload)),
    data: asRows(payload),
  };
}
