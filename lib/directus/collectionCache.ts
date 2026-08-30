/** Shared ISR window for public Directus collection reads (1 hour). */
export const DIRECTUS_COLLECTION_REVALIDATE = 3600;

/** Hard cap so listing queries never ask Directus for the whole table. */
export const DIRECTUS_COLLECTION_LIMIT = 100;

/** Public catalog pages fetch and render this many rows per page. */
export const CATALOG_PAGE_SIZE = 20;

export const directusCollectionFetch = {
  next: { revalidate: DIRECTUS_COLLECTION_REVALIDATE },
} as const;

export function parseCatalogPage(raw: unknown): number {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(Math.floor(n), 500);
}

export function catalogTotalPages(
  total: number,
  pageSize = CATALOG_PAGE_SIZE,
): number {
  return Math.max(1, Math.ceil(Math.max(0, total) / pageSize));
}

export function setDirectusListParams(
  params: URLSearchParams,
  options: {
    fields: readonly string[];
    limit?: number;
    published?: boolean;
    page?: number;
    pageSize?: number;
    meta?: boolean;
  },
): URLSearchParams {
  params.set("fields", options.fields.join(","));
  const limit = options.pageSize ?? options.limit ?? DIRECTUS_COLLECTION_LIMIT;
  params.set("limit", String(limit));
  if (options.page && options.page > 0) {
    params.set("page", String(options.page));
  }
  if (options.published) {
    params.set("filter[status][_eq]", "published");
  }
  if (options.meta) {
    params.set("meta", "filter_count");
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
    page?: number;
    pageSize?: number;
    meta?: boolean;
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

export function paginateCatalogItems<T>(
  items: T[],
  currentPage: number,
  pageSize = CATALOG_PAGE_SIZE,
): { page: number; totalPages: number; items: T[] } {
  const totalPages = catalogTotalPages(items.length, pageSize);
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (page - 1) * pageSize;
  return {
    page,
    totalPages,
    items: items.slice(start, start + pageSize),
  };
}

/** Walk Directus list pages until every row is loaded (100 per request). */
export async function fetchDirectusCollectionAll<T>(
  getUrl: (page: number, pageSize: number, meta: boolean) => string,
  init?: RequestInit,
  options?: { pageSize?: number; maxPages?: number },
): Promise<{ rows: T[]; reportedTotal: number | null }> {
  const pageSize = options?.pageSize ?? DIRECTUS_COLLECTION_LIMIT;
  const maxPages = options?.maxPages ?? 50;
  const allRows: T[] = [];
  let reportedTotal: number | null = null;

  for (let page = 1; page <= maxPages; page++) {
    const response = await fetch(getUrl(page, pageSize, page === 1), {
      ...directusCollectionFetch,
      ...init,
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch collection: ${response.statusText}`);
    }
    const json = (await response.json()) as {
      data?: T[];
      meta?: { filter_count?: number };
    };
    const rows = Array.isArray(json.data) ? json.data : [];
    allRows.push(...rows);
    if (page === 1 && typeof json.meta?.filter_count === "number") {
      reportedTotal = json.meta.filter_count;
    }
    if (rows.length < pageSize) break;
    if (reportedTotal != null && allRows.length >= reportedTotal) break;
  }

  return { rows: allRows, reportedTotal };
}
