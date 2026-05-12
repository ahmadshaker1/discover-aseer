import { NextResponse } from "next/server";

const DIRECTUS_BASE_URL = "https://tool-portal.discoveraseer.com/items";
const DIRECTUS_ASSETS_BASE_URL =
  "https://tool-portal.discoveraseer.com/assets/";

type RawRecord = Record<string, unknown>;

function firstString(record: RawRecord, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return "";
}

function firstNumber(record: RawRecord, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const parsedValue = Number(value);
      if (Number.isFinite(parsedValue)) {
        return parsedValue;
      }
    }
  }

  return 0;
}

function normalizeImage(record: RawRecord, keys: string[]) {
  const imageValue = firstString(record, keys);
  if (!imageValue) return "";

  if (imageValue.startsWith("http://") || imageValue.startsWith("https://")) {
    return imageValue;
  }

  return `${DIRECTUS_ASSETS_BASE_URL}${imageValue}`;
}

function normalizeCuisine(record: RawRecord) {
  return {
    id:
      record.id ??
      record.uuid ??
      firstString(record, ["id", "uuid", "slug", "name", "title"]),
    name: firstString(record, [
      "name",
      "title",
      "title_ar",
      "label",
      "arabic_name",
    ]),
    image: normalizeImage(record, [
      "hero_image_url",
      "image",
      "image_url",
      "thumbnail",
      "cover",
      "photo",
      "picture",
    ]),
  };
}

function normalizeRestaurant(record: RawRecord) {
  return {
    id:
      record.id ??
      record.uuid ??
      firstString(record, ["id", "uuid", "slug", "name", "title"]),
    name: firstString(record, [
      "name",
      "title",
      "title_ar",
      "label",
      "arabic_name",
    ]),
    image: normalizeImage(record, [
      "hero_image_url",
      "image",
      "image_url",
      "thumbnail",
      "cover",
      "photo",
      "picture",
    ]),
    reviews_count: firstNumber(record, [
      "reviews_count",
      "reviewsCount",
      "reviews",
      "review_count",
    ]),
    rating: firstNumber(record, ["rating", "score", "stars"]),
    location_text: firstString(record, [
      "location_text",
      "locationText",
      "location",
      "address",
    ]),
    price_range: firstString(record, [
      "price_range",
      "priceRange",
      "price",
      "price_band",
    ]),
    category: firstString(record, ["category", "cuisine", "type", "tag"]),
  };
}

async function fetchCollection(collection: string) {
  const response = await fetch(`${DIRECTUS_BASE_URL}/${collection}?limit=-1`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${collection}: ${response.status}`);
  }

  const payload = await response.json();
  return Array.isArray(payload?.data) ? payload.data : [];
}

function normalizeCollection(collection: string, records: unknown[]) {
  const safeRecords = records.filter(
    (record): record is RawRecord =>
      Boolean(record) && typeof record === "object" && !Array.isArray(record),
  );

  if (collection === "cuisine") {
    return safeRecords.map(normalizeCuisine).filter((item) => item.name);
  }

  if (collection === "restaurants") {
    return safeRecords.map(normalizeRestaurant).filter((item) => item.name);
  }

  return [];
}

export async function GET() {
  try {
    const [cuisinesResult, restaurantsResult] = await Promise.allSettled([
      fetchCollection("cuisine"),
      fetchCollection("restaurants"),
    ]);

    const cuisines =
      cuisinesResult.status === "fulfilled"
        ? normalizeCollection("cuisine", cuisinesResult.value)
        : [];
    const restaurants =
      restaurantsResult.status === "fulfilled"
        ? normalizeCollection("restaurants", restaurantsResult.value)
        : [];

    return NextResponse.json({ cuisines, restaurants });
  } catch (error) {
    console.error("[igcat/food-dining] Failed to load data:", error);
    return NextResponse.json(
      { cuisines: [], restaurants: [] },
      { status: 200 },
    );
  }
}
