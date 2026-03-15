import { NextRequest, NextResponse } from "next/server";

/** Proxies Google Drive image by file ID so it can be displayed (Drive blocks direct hotlinking). */
const FILE_ID_REGEX = /^[a-zA-Z0-9_-]{20,}$/;
const IMAGE_TYPES = /^image\/(jpeg|png|gif|webp|svg\+xml)/;

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id || !FILE_ID_REGEX.test(id)) {
    return NextResponse.json({ error: "Missing or invalid id" }, { status: 400 });
  }

  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
  const fetchOpts = { headers: { "User-Agent": userAgent }, redirect: "follow" as const };

  try {
    // Prefer thumbnail endpoint; it often returns a real image for shared files
    let res = await fetch(
      `https://drive.google.com/thumbnail?id=${id}&sz=w800`,
      fetchOpts
    );
    let contentType = res.headers.get("content-type") || "";

    if (!res.ok || !IMAGE_TYPES.test(contentType)) {
      res = await fetch(
        `https://drive.google.com/uc?export=view&id=${id}`,
        fetchOpts
      );
      contentType = res.headers.get("content-type") || "";
    }

    if (!res.ok || !IMAGE_TYPES.test(contentType)) {
      return NextResponse.json(
        { error: "Image not available" },
        { status: 404 }
      );
    }

    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (e) {
    console.error("Image proxy error:", e);
    return NextResponse.json(
      { error: "Image proxy error" },
      { status: 502 }
    );
  }
}
