import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_DIRECTUS_APP_URL ||
      "https://tool-portal.discoveraseer.com";

    // Fetch the booklet info from Directus
    const response = await fetch(`${baseUrl}/items/booklet`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch booklet from Directus, status:",
        response.status,
      );
      return new NextResponse("Failed to fetch from Directus", { status: 502 });
    }

    const result = await response.json();
    const fileId = result?.data?.booklet;

    if (fileId) {
      // Open inline in the browser PDF viewer (omit ?download).
      return NextResponse.redirect(`${baseUrl}/assets/${fileId}`);
    } else {
      console.error("Booklet file ID not found in the response.", result);
      return new NextResponse("Booklet not found in response", { status: 404 });
    }
  } catch (error) {
    console.error("Error in booklet API route:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
