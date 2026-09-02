import { directusCollectionFetch, directusItemsUrl } from "@/lib/directus/collectionCache";
import { getDirectusPublicUrl } from "@/lib/directus/config";
import { pickLocalizedField } from "@/lib/i18n/localized";

export type BookletKind = "discover" | "outdoor";

const BOOKLET_FIELDS = [
  "booklet",
  "booklet_en",
  "outdoor_activities",
  "outdoor_activities_en",
] as const;

/**
 * Resolves a published booklet file URL from Directus.
 * Used by `/booklet` and `/api/booklet`.
 */
export async function getBookletAssetUrl(options?: {
  locale?: string;
  kind?: BookletKind;
}): Promise<string | null> {
  const locale = options?.locale === "en" ? "en" : "ar";
  const kind = options?.kind ?? "discover";
  const baseUrl = getDirectusPublicUrl();

  const response = await fetch(
    directusItemsUrl(baseUrl, "booklet", {
      fields: BOOKLET_FIELDS,
      limit: 1,
    }),
    directusCollectionFetch,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch booklet from Directus (${response.status})`);
  }

  const result = await response.json();
  const row = Array.isArray(result?.data) ? result.data[0] : result?.data;
  if (!row || typeof row !== "object") {
    return null;
  }

  const fileId = pickLocalizedField(
    row as Record<string, unknown>,
    kind === "outdoor" ? "outdoor_activities" : "booklet",
    locale,
  );

  if (!fileId) {
    return null;
  }

  // Omit ?download so the browser opens the PDF viewer inline.
  return `${baseUrl}/assets/${fileId}`;
}

export function bookletHref(kind: BookletKind = "discover", locale?: string): string {
  const params = new URLSearchParams();
  if (kind === "outdoor") params.set("type", "outdoor");
  if (locale === "en" || locale === "ar") params.set("locale", locale);
  const query = params.toString();
  return query ? `/booklet?${query}` : "/booklet";
}

/** Append the active locale to an existing `/booklet` href. */
export function localizeBookletHref(href: string, locale: string): string {
  if (!href.startsWith("/booklet")) return href;
  const query = href.includes("?") ? href.slice(href.indexOf("?") + 1) : "";
  const params = new URLSearchParams(query);
  params.set("locale", locale === "en" ? "en" : "ar");
  return `/booklet?${params.toString()}`;
}

export function bookletKindFromSearchParams(
  searchParams: URLSearchParams,
): BookletKind {
  return searchParams.get("type") === "outdoor" ? "outdoor" : "discover";
}

export function bookletLocaleFromRequest(request: Request): "ar" | "en" {
  const { searchParams } = new URL(request.url);
  const queried = searchParams.get("locale");
  if (queried === "en" || queried === "ar") return queried;

  const cookie = request.headers.get("cookie") ?? "";
  const cookieLocale = cookie.match(/(?:^|;\s*)NEXT_LOCALE=(en|ar)/)?.[1];
  if (cookieLocale === "en" || cookieLocale === "ar") return cookieLocale;

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const path = new URL(referer).pathname;
      if (path === "/en" || path.startsWith("/en/")) return "en";
    } catch {
      // Ignore malformed referers and fall back to Arabic.
    }
  }

  return "ar";
}
