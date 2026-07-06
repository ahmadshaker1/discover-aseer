import { NextResponse } from "next/server";
import { directusLogin, getDirectusServerUrl } from "@/lib/directus/server";

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

    const email = String((body as { email?: string })?.email ?? "")
      .trim()
      .toLowerCase();
    const password = String((body as { password?: string })?.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    const session = await directusLogin(baseUrl, email, password);
    return NextResponse.json({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires: session.expires,
      user: {
        ...session.user,
        email: session.user.email ?? email,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Login failed.";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
