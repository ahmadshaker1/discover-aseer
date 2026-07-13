import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = (
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_TOOL_PORTAL_DIRECTUS_URL?.replace(/\/$/, "") ||
    "https://tool-portal.discoveraseer.com"
  ).replace(/\/$/, "");

  const readToken = process.env.DIRECTUS_READ_TOKEN?.trim();

  const headers: HeadersInit = {
    "Cache-Control": "no-store",
  };
  if (readToken) {
    headers["Authorization"] = `Bearer ${readToken}`;
  }

  try {
    const response = await fetch(
      `${baseUrl}/items/seasons?filter[status][_eq]=published`,
      { headers, cache: "no-store" },
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
