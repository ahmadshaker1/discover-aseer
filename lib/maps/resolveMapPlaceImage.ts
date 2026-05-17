export type MapImageSource =
  | "attractions"
  | "restaurants"
  | "events"
  | "accomodation"
  | "support_service";

const IMAGE_KEYS_BY_SOURCE: Record<MapImageSource, string[]> = {
  attractions: [
    "hero_image",
    "cover_image",
    "destination_image",
    "thumbnail",
    "image",
    "image_new",
  ],
  restaurants: ["image_new", "image"],
  events: ["image", "thumbnail", "hero_mobile", "image_new", "hero_image"],
  accomodation: ["image", "cover_image", "thumbnail", "hero_image"],
  support_service: ["image", "thumbnail", "hero_image", "cover_image"],
};

const asText = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const isBlockedImageHost = (value: string): boolean =>
  /drive\.google\.com|docs\.google\.com/i.test(value);

const isDirectUrl = (value: string): boolean =>
  /^https?:\/\//i.test(value) || value.startsWith("//");

export function resolveMapPlaceImageUrl(
  row: Record<string, unknown>,
  source: MapImageSource,
  directusBaseUrl: string,
): string | undefined {
  const base = directusBaseUrl.replace(/\/$/, "");

  for (const key of IMAGE_KEYS_BY_SOURCE[source]) {
    const raw = asText(row[key]);
    if (!raw) continue;

    if (isDirectUrl(raw)) {
      if (isBlockedImageHost(raw)) continue;
      return raw.startsWith("//") ? `https:${raw}` : raw;
    }

    if (raw.startsWith("/")) return raw;

    if (isBlockedImageHost(raw)) continue;

    return `${base}/assets/${raw}`;
  }

  return undefined;
}
