export const MAP_PLACE_DEFAULT_IMAGE = "/assets/default_background.jpg";

export function resolveMapPlaceImageUrl(imageUrl?: string | null): string {
  const trimmed = imageUrl?.trim();
  return trimmed || MAP_PLACE_DEFAULT_IMAGE;
}
