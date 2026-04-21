import { NextResponse } from "next/server";

interface DirectusLocationRow {
  id?: number | string;
  status?: string | null;
  category_ar?: string | null;
  category_en?: string | null;
  type_ar?: string | null;
  type_en?: string | null;
  name_ar?: string | null;
  name_en?: string | null;
  city_ar?: string | null;
  city_en?: string | null;
  description_ar?: string | null;
  description_en?: string | null;
  booking_info_ar?: string | null;
  booking_info_en?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
}

interface DirectusLocationResponse {
  data?: DirectusLocationRow[];
}

interface MapPlace {
  id: string;
  title: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  hasCoordinates: boolean;
  category: string;
  city: string;
  tag?: string;
}

export async function GET() {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "");
  const readToken = process.env.DIRECTUS_READ_TOKEN?.trim();

  if (!directusUrl) {
    return NextResponse.json({ data: [] as MapPlace[], error: "Missing Directus base URL" }, { status: 500 });
  }

  try {
    const response = await fetch(
      `${directusUrl}/items/locations?limit=1000`,
      {
        headers: readToken ? { Authorization: `Bearer ${readToken}` } : undefined,
        next: { revalidate: 120 },
      },
    );

    if (!response.ok) {
      return NextResponse.json({ data: [] as MapPlace[] }, { status: response.status });
    }

    const json: DirectusLocationResponse = await response.json();
    const rows = Array.isArray(json.data) ? json.data : [];

    const mapped = rows
      .filter((row) => !row.status || row.status === "published")
      .map((row, index): MapPlace => {
        const lat = Number(row.latitude);
        const lng = Number(row.longitude);
        const hasCoordinates = Number.isFinite(lat) && Number.isFinite(lng);

        return {
          id: String(row.id ?? index + 1),
          title: row.name_ar?.trim() || row.name_en?.trim() || `موقع ${index + 1}`,
          description:
            row.category_ar?.trim() ||
            row.type_ar?.trim() ||
            row.category_en?.trim() ||
            row.type_en?.trim() ||
            "موقع سياحي",
          category: row.category_ar?.trim() || row.category_en?.trim() || row.type_ar?.trim() || "استفسارات",
          city: row.city_ar?.trim() || row.city_en?.trim() || "عسير",
          tag: row.type_ar?.trim() || row.type_en?.trim() || undefined,
          latitude: hasCoordinates ? lat : null,
          longitude: hasCoordinates ? lng : null,
          hasCoordinates,
        };
      });

    return NextResponse.json({ data: mapped }, { status: 200 });
  } catch (error) {
    console.error("[interactive-map/api] Failed to fetch locations", error);
    return NextResponse.json({ data: [] as MapPlace[] }, { status: 500 });
  }
}
