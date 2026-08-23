import { NextResponse } from "next/server";
import {
  DIRECTUS_COLLECTION_LIMIT,
  DIRECTUS_COLLECTION_REVALIDATE,
  directusCollectionFetch,
  directusItemsUrl,
} from "@/lib/directus/collectionCache";

// Literal required by Next.js segment config (must match DIRECTUS_COLLECTION_REVALIDATE).
export const revalidate = 86400;

export async function GET() {
  const baseUrl = (
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_TOOL_PORTAL_DIRECTUS_URL?.replace(/\/$/, "") ||
    "https://tool-portal.discoveraseer.com"
  ).replace(/\/$/, "");

  const readToken = process.env.DIRECTUS_READ_TOKEN?.trim();

  const headers: HeadersInit = {};
  if (readToken) {
    headers["Authorization"] = `Bearer ${readToken}`;
  }

  try {
    const response = await fetch(
      directusItemsUrl(baseUrl, "seasons", {
        fields: [
          "id",
          "status",
          "title",
          "title_ar",
          "title_en",
          "start_date",
          "end_date",
        ],
        limit: DIRECTUS_COLLECTION_LIMIT,
        published: true,
      }),
      { headers, ...directusCollectionFetch },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch seasons: ${response.status}`);
    }

    const json = await response.json();
    return NextResponse.json(json, { status: 200 });
  } catch (error) {
    console.error("[interactive-map/api] Failed to fetch seasons", error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
