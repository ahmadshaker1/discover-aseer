import { NextResponse } from "next/server";
import { fetchMapLocations } from "@/lib/maps/directusLocations";
import type { LocaleCode } from "@/lib/i18n/localized";
import { DIRECTUS_COLLECTION_REVALIDATE } from "@/lib/directus/collectionCache";

// Literal required by Next.js segment config (must match DIRECTUS_COLLECTION_REVALIDATE).
export const revalidate = 3600;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale: LocaleCode = url.searchParams.get("locale") === "en" ? "en" : "ar";
  const resolve = url.searchParams.get("resolve") === "true";
  const resolveLimit = Number(url.searchParams.get("resolveLimit") ?? "40");
  const geocode = url.searchParams.get("geocode") === "true";
  const geocodeLimit = Number(url.searchParams.get("geocodeLimit") ?? "25");

  try {
    const { places, stats } = await fetchMapLocations({
      locale,
      resolve,
      resolveLimit: Number.isFinite(resolveLimit) ? resolveLimit : 40,
      geocode,
      geocodeLimit: Number.isFinite(geocodeLimit) ? geocodeLimit : 25,
    });

    return NextResponse.json(
      { data: places, stats },
      {
        status: 200,
        headers: {
          "Cache-Control": `public, s-maxage=${DIRECTUS_COLLECTION_REVALIDATE}, stale-while-revalidate=60`,
        },
      },
    );
  } catch (error) {
    console.error("[interactive-map/api] Failed to fetch locations", error);
    return NextResponse.json(
      {
        data: [],
        stats: {
          totalFetched: 0,
          published: 0,
          listed: 0,
          withCoordinates: 0,
          withoutCoordinates: 0,
          resolvedThisRequest: 0,
          geocodedThisRequest: 0,
          geocodePersistFailed: 0,
          geocodeFailed: 0,
          geocodeSkippedNoUrl: 0,
          byCategoryAr: {},
          eventsFetchOk: false,
          eventsListed: 0,
        },
      },
      { status: 500 },
    );
  }
}
