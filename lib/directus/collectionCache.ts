/** Shared ISR window for public Directus collection reads (1 hour). */
export const DIRECTUS_COLLECTION_REVALIDATE = 3600;

/** Hard cap so listing queries never ask Directus for the whole table. */
export const DIRECTUS_COLLECTION_LIMIT = 100;

export const directusCollectionFetch = {
  next: { revalidate: DIRECTUS_COLLECTION_REVALIDATE },
} as const;

export function setDirectusListParams(
  params: URLSearchParams,
  options: {
    fields: readonly string[];
    limit?: number;
    published?: boolean;
  },
): URLSearchParams {
  params.set("fields", options.fields.join(","));
  params.set("limit", String(options.limit ?? DIRECTUS_COLLECTION_LIMIT));
  if (options.published) {
    params.set("filter[status][_eq]", "published");
  }
  return params;
}

export function directusItemsUrl(
  baseUrl: string,
  collection: string,
  options: {
    fields: readonly string[];
    limit?: number;
    published?: boolean;
    extra?: Record<string, string>;
  },
): string {
  const url = new URL(`${baseUrl.replace(/\/$/, "")}/items/${collection}`);
  setDirectusListParams(url.searchParams, options);
  if (options.extra) {
    for (const [key, value] of Object.entries(options.extra)) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}
