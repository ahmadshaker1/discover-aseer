import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

const DEFAULT_ICON_CODE = "10d";
const DEFAULT_ICON_URL = `https://openweathermap.org/img/wn/${DEFAULT_ICON_CODE}@2x.png`;

function resolveWeatherLang(locale: string | null): "en" | "ar" {
  return locale === "en" ? "en" : "ar";
}

function defaultCondition(lang: "en" | "ar"): string {
  return lang === "en" ? "Rain" : "أمطار";
}

function buildFallbackPayload(
  lang: "en" | "ar",
  source: string,
  area: string,
  lat: string,
  lon: string,
) {
  return {
    temp: 18,
    condition: defaultCondition(lang),
    iconCode: DEFAULT_ICON_CODE,
    iconUrl: DEFAULT_ICON_URL,
    area,
    lat,
    lon,
    source,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat") ?? "18.2164";
  const lon = searchParams.get("lon") ?? "42.5053";
  const area = searchParams.get("area") ?? "أبها";
  const lang = resolveWeatherLang(searchParams.get("locale"));

  try {
    if (!OPENWEATHER_API_KEY) {
      return NextResponse.json(
        buildFallbackPayload(lang, "fallback_no_key", area, lat, lon),
        { status: 200 },
      );
    }

    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=${lang}`;

    const response = await fetch(endpoint, {
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      return NextResponse.json(
        buildFallbackPayload(lang, "fallback_api_unavailable", area, lat, lon),
        { status: 200 },
      );
    }

    const data = await response.json();
    const temp = Math.round(Number(data?.main?.temp ?? 18));
    const condition = String(
      data?.weather?.[0]?.description || defaultCondition(lang),
    );
    const iconCode = String(data?.weather?.[0]?.icon || DEFAULT_ICON_CODE);
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return NextResponse.json({
      temp,
      condition,
      iconCode,
      iconUrl,
      area,
      lat,
      lon,
      source: "live",
    });
  } catch {
    return NextResponse.json(
      buildFallbackPayload(lang, "fallback_exception", area, lat, lon),
      { status: 200 },
    );
  }
}
