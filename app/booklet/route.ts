import { NextResponse } from "next/server";
import {
  bookletKindFromSearchParams,
  bookletLocaleFromRequest,
  getBookletAssetUrl,
} from "@/lib/booklet";

/**
 * Public booklet endpoint.
 * Visiting `/booklet` redirects to the current CMS booklet PDF (inline viewer).
 * `?locale=en|ar` and `?type=outdoor` select the localized file.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const assetUrl = await getBookletAssetUrl({
      locale: bookletLocaleFromRequest(request),
      kind: bookletKindFromSearchParams(searchParams),
    });

    if (!assetUrl) {
      return new NextResponse("Booklet not found", { status: 404 });
    }

    return NextResponse.redirect(assetUrl, 302);
  } catch (error) {
    console.error("Error in /booklet route:", error);
    return new NextResponse("Failed to load booklet", { status: 502 });
  }
}
