import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

const DEFAULT_WEATHER = {
  tempMin: 18,
  tempMax: 21,
  condition: "أمطار",
  iconCode: "10d",
  iconUrl: "https://openweathermap.org/img/wn/10d@2x.png",
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat") ?? "18.2164";
    const lon = searchParams.get("lon") ?? "42.5053";
    const area = searchParams.get("area") ?? "أبها";

    if (!OPENWEATHER_API_KEY) {
      return NextResponse.json(
        { ...DEFAULT_WEATHER, area, source: "fallback_no_key" },
        { status: 200 },
      );
    }

    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=ar`;

    const response = await fetch(endpoint, {
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { ...DEFAULT_WEATHER, area, source: "fallback_api_unavailable" },
        { status: 200 },
      );
    }

    const data = await response.json();
    const tempMin = Math.round(Number(data?.main?.temp_min ?? 18));
    const tempMax = Math.round(Number(data?.main?.temp_max ?? 21));
    const condition = String(data?.weather?.[0]?.description || "أمطار");
    const iconCode = String(data?.weather?.[0]?.icon || "10d");
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return NextResponse.json({
      tempMin,
      tempMax,
      condition,
      iconCode,
      iconUrl,
      area,
      lat,
      lon,
    });
  } catch {
    return NextResponse.json(
      { ...DEFAULT_WEATHER, source: "fallback_exception" },
      { status: 200 },
    );
  }
}

