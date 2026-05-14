/**
 * Resolve Google Maps share / place URLs to latitude & longitude by following
 * redirects and parsing common URL patterns. No browser required.
 *
 * Falls back to null when Google returns HTML-only flows (then keep city centroid).
 */

const DEFAULT_TIMEOUT_MS = 8_000;

const GOOGLE_MAPS_HOST_HINTS = [
  "google.com/maps",
  "maps.google.com",
  "maps.app.goo.gl",
  "goo.gl/maps",
  "g.co/maps",
];

export function isGoogleMapsLikeUrl(url: string): boolean {
  const u = url.trim().toLowerCase();
  if (!u.startsWith("http://") && !u.startsWith("https://")) return false;
  return GOOGLE_MAPS_HOST_HINTS.some((h) => u.includes(h));
}

/** Google place URLs use @latitude,longitude after the @ marker. */
const parseLatLngFromText = (text: string): { lat: number; lng: number } | null => {
  const decoded = tryDecodeUri(text);

  const try3d4d = (s: string): { lat: number; lng: number } | null => {
    const m = s.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/i);
    if (!m) return null;
    const lat = Number(m[1]);
    const lng = Number(m[2]);
    return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
  };

  const tryAtPair = (s: string): { lat: number; lng: number } | null => {
    const re = /@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/g;
    let best: { lat: number; lng: number } | null = null;
    let m: RegExpExecArray | null;
    while ((m = re.exec(s)) !== null) {
      const a = Number(m[1]);
      const b = Number(m[2]);
      if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
      const pair = orderAsLatLng(a, b);
      if (pair) best = pair;
    }
    return best;
  };

  const tryLlOrQuery = (s: string): { lat: number; lng: number } | null => {
    const re = /(?:[?&](?:ll|q|query)=)(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(s)) !== null) {
      const a = Number(m[1]);
      const b = Number(m[2]);
      if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
      const pair = orderAsLatLng(a, b);
      if (pair) return pair;
    }
    return null;
  };

  for (const s of [decoded, text]) {
    const a = try3d4d(s);
    if (a) return a;
    const b = tryAtPair(s);
    if (b) return b;
    const c = tryLlOrQuery(s);
    if (c) return c;
  }
  return null;
};

function tryDecodeUri(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

/** Prefer Saudi-like bounds: lat ~12–32, lng ~34–56. */
function orderAsLatLng(a: number, b: number): { lat: number; lng: number } | null {
  const aLatLike = a >= 12 && a <= 35 && b >= 34 && b <= 60;
  const bLatLike = b >= 12 && b <= 35 && a >= 34 && a <= 60;
  if (aLatLike) return { lat: a, lng: b };
  if (bLatLike) return { lat: b, lng: a };
  if (Math.abs(a) <= 90 && Math.abs(b) <= 180) return { lat: a, lng: b };
  return null;
}

const extractMapsUrlCandidatesFromHtml = (html: string): string[] => {
  const out: string[] = [];
  const hrefRe =
    /https?:\/\/(?:www\.)?google\.com\/maps[^\s"'<>]*/gi;
  let m: RegExpExecArray | null;
  while ((m = hrefRe.exec(html)) !== null) {
    out.push(m[0].replace(/&amp;/g, "&"));
  }
  const og = html.match(
    /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i,
  );
  if (og?.[1]) out.push(og[1]);
  return [...new Set(out)];
};

async function fetchFinalUrlAndOptionalHtml(
  url: string,
  timeoutMs: number,
): Promise<{ finalUrl: string; htmlSnippet: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      cache: "no-store",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9,ar;q=0.8",
      },
    });
    const finalUrl = response.url;
    const ct = response.headers.get("content-type") ?? "";
    let htmlSnippet = "";
    if (ct.includes("text/html")) {
      const text = await response.text();
      htmlSnippet = text.slice(0, 400_000);
    }
    return { finalUrl, htmlSnippet };
  } finally {
    clearTimeout(timer);
  }
}

export async function resolveGoogleMapsUrlToCoordinates(
  url: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<{ lat: number; lng: number } | null> {
  const trimmed = url.trim();
  if (!trimmed || !isGoogleMapsLikeUrl(trimmed)) return null;

  try {
    const { finalUrl, htmlSnippet } = await fetchFinalUrlAndOptionalHtml(
      trimmed,
      timeoutMs,
    );

    const fromFinal = parseLatLngFromText(finalUrl);
    if (fromFinal) return fromFinal;

    if (htmlSnippet) {
      const fromHtml = parseLatLngFromText(htmlSnippet);
      if (fromHtml) return fromHtml;

      const candidates = extractMapsUrlCandidatesFromHtml(htmlSnippet)
        .filter((c) => c !== trimmed && c !== finalUrl && isGoogleMapsLikeUrl(c))
        .slice(0, 4);
      for (const candidate of candidates) {
        const nested = parseLatLngFromText(candidate);
        if (nested) return nested;
        try {
          const inner = await fetchFinalUrlAndOptionalHtml(candidate, timeoutMs);
          const p =
            parseLatLngFromText(inner.finalUrl) ??
            parseLatLngFromText(inner.htmlSnippet);
          if (p) return p;
        } catch {
          /* ignore nested fetch errors */
        }
      }
    }
  } catch {
    return null;
  }

  return null;
}

export interface MapPlaceWithCoords {
  hasPreciseCoordinates: boolean;
  hasCoordinates: boolean;
  mapsUrl?: string;
  latitude: number | null;
  longitude: number | null;
}

export async function enrichPlacesWithGoogleMapsCoordinates<
  T extends MapPlaceWithCoords,
>(places: readonly T[], options?: { concurrency?: number; timeoutMs?: number; enabled?: boolean }): Promise<T[]> {
  if (options?.enabled === false) return [...places];

  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const concurrency = Math.min(
    12,
    Math.max(1, options?.concurrency ?? 8),
  );

  const targets = places.filter(
    (p) =>
      !p.hasPreciseCoordinates &&
      p.mapsUrl &&
      isGoogleMapsLikeUrl(p.mapsUrl),
  );
  const uniqueUrls = [...new Set(targets.map((p) => p.mapsUrl!.trim()))];

  const resolved = new Map<string, { lat: number; lng: number } | null>();

  let next = 0;
  const worker = async () => {
    while (true) {
      const i = next++;
      if (i >= uniqueUrls.length) break;
      const u = uniqueUrls[i];
      const coords = await resolveGoogleMapsUrlToCoordinates(u, timeoutMs);
      resolved.set(u, coords);
    }
  };

  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  return places.map((p) => {
    if (p.hasPreciseCoordinates || !p.mapsUrl) return p;
    const key = p.mapsUrl.trim();
    const c = resolved.get(key);
    if (!c) return p;
    return {
      ...p,
      latitude: c.lat,
      longitude: c.lng,
      hasPreciseCoordinates: true,
      hasCoordinates: true,
    };
  });
}
