import { NextResponse } from "next/server";
import { directusRefresh, getDirectusServerUrl } from "@/lib/directus/server";

export async function POST(request: Request) {
  try {
    const baseUrl = getDirectusServerUrl();
    if (!baseUrl) {
      return NextResponse.json(
        { error: "Server is not configured for tour guide auth." },
        { status: 503 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const refresh_token = String(
      (body as { refresh_token?: string })?.refresh_token ?? "",
    ).trim();

    if (!refresh_token) {
      return NextResponse.json(
        { error: "Refresh token is required." },
        { status: 400 },
      );
    }

    const session = await directusRefresh(baseUrl, refresh_token);
    return NextResponse.json({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires: session.expires,
      user: session.user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not refresh session.";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
