import { NextResponse } from "next/server";
import { getBookletAssetUrl } from "@/lib/booklet";

/**
 * Public booklet endpoint.
 * Visiting `/booklet` redirects to the current CMS booklet PDF (inline viewer).
 */
export async function GET() {
  try {
    const assetUrl = await getBookletAssetUrl();

    if (!assetUrl) {
      return new NextResponse("Booklet not found", { status: 404 });
    }

    return NextResponse.redirect(assetUrl, 302);
  } catch (error) {
    console.error("Error in /booklet route:", error);
    return new NextResponse("Failed to load booklet", { status: 502 });
  }
}
