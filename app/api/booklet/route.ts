import { NextResponse } from "next/server";
import {
  bookletKindFromSearchParams,
  bookletLocaleFromRequest,
  getBookletAssetUrl,
} from "@/lib/booklet";

/** @deprecated Prefer `/booklet` — kept for existing navbar / shared links. */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const assetUrl = await getBookletAssetUrl({
      locale: bookletLocaleFromRequest(request),
      kind: bookletKindFromSearchParams(searchParams),
    });

    if (!assetUrl) {
      return new NextResponse("Booklet not found in response", { status: 404 });
    }

    return NextResponse.redirect(assetUrl, 302);
  } catch (error) {
    console.error("Error in booklet API route:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
