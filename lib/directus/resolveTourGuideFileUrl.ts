import { getDirectusPublicUrl } from "./config";

const DIRECTUS_FILE_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Resolve `tourist_guides.image` / file fields: full URL, file UUID, or expanded file object. */
export function resolveTourGuideFileUrl(
  value: unknown,
  directusBase = getDirectusPublicUrl(),
): string | null {
  if (value == null || value === "") return null;

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    const id = typeof record.id === "string" ? record.id.trim() : "";
    if (id && DIRECTUS_FILE_ID.test(id)) {
      return `${directusBase}/assets/${id}`;
    }
    const directUrl =
      typeof record.filename_download === "string"
        ? record.filename_download
        : null;
    if (directUrl?.startsWith("http")) return directUrl;
    return null;
  }

  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (DIRECTUS_FILE_ID.test(trimmed)) {
    return `${directusBase}/assets/${trimmed}`;
  }

  return null;
}

export function hasTourGuideStoredFile(value: unknown): boolean {
  return resolveTourGuideFileUrl(value) != null;
}

export function isTourGuideImageUrl(url: string): boolean {
  if (/\.(jpe?g|png|webp|gif|bmp|svg)(\?|#|$)/i.test(url)) return true;
  return /\/assets\/[0-9a-f-]{36}/i.test(url);
}
