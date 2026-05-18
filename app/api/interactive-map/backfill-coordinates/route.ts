import { NextResponse } from "next/server";
import { backfillLocationCoordinates } from "@/lib/maps/directusLocations";
import type { LocaleCode } from "@/lib/i18n/localized";

export const maxDuration = 300;

const getBackfillSecret = (): string | undefined =>
  process.env.INTERACTIVE_MAP_BACKFILL_SECRET?.trim();

const isAuthorized = (request: Request): boolean => {
  const secret = getBackfillSecret();
  if (!secret) return false;

  const headerSecret = request.headers.get("x-backfill-secret")?.trim();
  const url = new URL(request.url);
  const querySecret = url.searchParams.get("secret")?.trim();

  return headerSecret === secret || querySecret === secret;
};

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        error:
          "Unauthorized. Set INTERACTIVE_MAP_BACKFILL_SECRET and pass it via x-backfill-secret header.",
      },
      { status: 401 },
    );
  }

  let limit = 50;
  let locale: LocaleCode = "ar";

  try {
    const body = (await request.json()) as {
      limit?: number;
      locale?: string;
    };
    if (typeof body.limit === "number" && Number.isFinite(body.limit)) {
      limit = body.limit;
    }
    if (body.locale === "en" || body.locale === "ar") {
      locale = body.locale;
    }
  } catch {
    const url = new URL(request.url);
    const queryLimit = Number(url.searchParams.get("limit") ?? "50");
    if (Number.isFinite(queryLimit)) limit = queryLimit;
    if (url.searchParams.get("locale") === "en") locale = "en";
  }

  try {
    const { stats, remaining } = await backfillLocationCoordinates({
      locale,
      limit,
    });

    return NextResponse.json(
      {
        ok: true,
        stats,
        remaining,
        done: remaining === 0,
      },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[interactive-map/backfill] Failed", error);
    return NextResponse.json(
      { ok: false, error: "Backfill failed" },
      { status: 500 },
    );
  }
}
