import { NextResponse } from "next/server";
import { getBookletAssetUrl } from "@/lib/booklet";

/** @deprecated Prefer `/booklet` — kept for existing navbar / shared links. */
export async function GET() {
  try {
    const assetUrl = await getBookletAssetUrl();

    if (!assetUrl) {
      return new NextResponse("Booklet not found in response", { status: 404 });
    }

    return NextResponse.redirect(assetUrl, 302);
  } catch (error) {
    console.error("Error in booklet API route:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
