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
  title?: string | null;
  title_ar?: string | null;
  thumbnail?: string | null;
  hero_image_url?: string | null;
  main_ingredient?: string | null;
  cuisine_type?: string | null;
  time_to_prepare?: number | null;
}

interface ApiCuisineResponse {
  data: ApiCuisineItem[];
}

function mapCuisineItem(item: ApiCuisineItem, directusUrl: string): AseerCuisineDish {
  const imageAsset = item.thumbnail || item.hero_image_url;
  const trimmed = imageAsset?.trim() ?? "";
  const image = trimmed
    ? /^https?:\/\//i.test(trimmed) || trimmed.startsWith("//") || trimmed.startsWith("/")
      ? trimmed
      : `${directusUrl}/assets/${trimmed}`
    : "/assets/activities/aseer-cuisine.jpg";

  const minutes = item.time_to_prepare && item.time_to_prepare > 0 ? item.time_to_prepare : 30;

  return {
    id: String(item.id),
    title: (item.title_ar || item.title || "").trim() || "وصفة عسيرية",
    image,
    mainIngredient: (item.main_ingredient || item.cuisine_type || "لحم").trim(),
    timeText: `${minutes} دقيقة`,
    rating: 4.8,
    reviews: 233,
  };
}

export async function fetchAseerCuisineDishes(): Promise<AseerCuisineDish[]> {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "");
  if (!directusUrl) return [];

  try {
    const response = await fetch(`${directusUrl}/items/cuisine`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];

    const data: ApiCuisineResponse = await response.json();
    if (!Array.isArray(data.data)) return [];

    return data.data
      .filter((item) => item.status === "published" || item.status === "draft" || !item.status)
      .map((item) => mapCuisineItem(item, directusUrl));
  } catch {
    return [];
  }
}
