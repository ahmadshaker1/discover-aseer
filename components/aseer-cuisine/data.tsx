export interface AseerCuisineDish {
  id: string;
  title: string;
  image: string;
  mainIngredient: string;
  timeText: string;
  rating: number;
  reviews: number;
}

interface ApiCuisineItem {
  id: string | number;
  status?: string | null;
  /** Legacy Directus field */
  title?: string | null;
  title_ar?: string | null;
  title_en?: string | null;
  thumbnail?: string | null;
  hero_image_url?: string | null;
  subtitle_ar?: string | null;
  subtitle_en?: string | null;
  main_ingredient?: string | null;
  cuisine_type?: string | null;
  time_to_prepare?: number | null;
}

interface ApiCuisineResponse {
  data: ApiCuisineItem[];
}

function pickCuisineTitle(item: ApiCuisineItem, locale: string): string {
  const ar = (item.title_ar ?? "").trim();
  const en = (item.title_en ?? "").trim();
  const legacy = (item.title ?? "").trim();
  if (locale === "en") {
    return en || ar || legacy || "Aseeri specialty";
  }
  return ar || en || legacy || "وصفة عسيرية";
}

function pickCuisineSubtitle(item: ApiCuisineItem, locale: string): string {
  const ar = (item.subtitle_ar ?? "").trim();
  const en = (item.subtitle_en ?? "").trim();
  if (locale === "en") {
    return en || ar;
  }
  return ar || en;
}

function mapCuisineItem(item: ApiCuisineItem, directusUrl: string, locale: string): AseerCuisineDish {
  const imageAsset = item.hero_image_url || item.thumbnail;
  const trimmed = imageAsset?.trim() ?? "";
  const image = trimmed
    ? /^https?:\/\//i.test(trimmed) || trimmed.startsWith("//") || trimmed.startsWith("/")
      ? trimmed
      : `${directusUrl}/assets/${trimmed}`
    : "/assets/activities/aseer-cuisine.jpg";

  const minutes = item.time_to_prepare && item.time_to_prepare > 0 ? item.time_to_prepare : 30;
  const subtitle = pickCuisineSubtitle(item, locale);

  return {
    id: String(item.id),
    title: pickCuisineTitle(item, locale),
    image,
    mainIngredient: (
      item.main_ingredient ||
      subtitle ||
      item.cuisine_type ||
      "لحم"
    ).trim(),
    timeText: `${minutes} دقيقة`,
    rating: 4.8,
    reviews: 233,
  };
}

export async function fetchAseerCuisineDishes(options?: { locale?: string }): Promise<AseerCuisineDish[]> {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "");
  if (!directusUrl) return [];

  const locale = options?.locale === "en" ? "en" : "ar";

  try {
    const query = "filter[status][_eq]=published&limit=4";
    const response = await fetch(`${directusUrl}/items/cuisine?${query}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];

    const data: ApiCuisineResponse = await response.json();
    if (!Array.isArray(data.data)) return [];

    return data.data.map((item) => mapCuisineItem(item, directusUrl, locale));
  } catch {
    return [];
  }
}
