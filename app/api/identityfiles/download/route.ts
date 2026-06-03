import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set([
  "dmmo-website-asda.oss-me-central-1.aliyuncs.com",
]);

function sanitizeFilename(filename: string) {
  return filename
    .trim()
    .replace(/[\\/\0]/g, "-")
    .replace(/\s+/g, " ")
    .slice(0, 180);
}

function encodeRFC5987ValueChars(value: string) {
  return encodeURIComponent(value)
    .replace(
      /['()*]/g,
      (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
    )
    .replace(/%(7C|60|5E)/g, (match) => match.toLowerCase());
}

export async function GET(request: NextRequest) {
  const fileUrl = request.nextUrl.searchParams.get("url");
  const requestedFilename =
    request.nextUrl.searchParams.get("filename") || "identity-file.zip";

  if (!fileUrl) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(fileUrl);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (
    parsedUrl.protocol !== "https:" ||
    !ALLOWED_HOSTS.has(parsedUrl.hostname)
  ) {
    return NextResponse.json(
      { error: "Unsupported file host" },
      { status: 400 },
    );
  }

  try {
    const upstreamResponse = await fetch(parsedUrl.toString(), {
      redirect: "follow",
    });

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        { error: "File not available" },
        { status: upstreamResponse.status },
      );
    }

    const contentType =
      upstreamResponse.headers.get("content-type") || "application/zip";
    const fileName = sanitizeFilename(requestedFilename).endsWith(".zip")
      ? sanitizeFilename(requestedFilename)
      : `${sanitizeFilename(requestedFilename)}.zip`;

    const buffer = await upstreamResponse.arrayBuffer();
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName.replace(/"/g, "")}"; filename*=UTF-8''${encodeRFC5987ValueChars(fileName)}`,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Identity file download error:", error);
    return NextResponse.json(
      { error: "Identity file download error" },
      { status: 502 },
    );
  }
}
