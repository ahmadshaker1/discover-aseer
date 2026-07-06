import { NextResponse } from "next/server";
import { directusRegister, getDirectusServerUrl } from "@/lib/directus/server";

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

    const b = body as Record<string, unknown>;
    const email = String(b.email ?? "").trim().toLowerCase();
    const password = String(b.password ?? "");
    const first_name = String(b.first_name ?? "").trim();
    const last_name = String(b.last_name ?? "").trim();

    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    const result = await directusRegister(baseUrl, {
      email,
      password,
      first_name,
      last_name,
    });

    if (result.kind === "registered") {
      return NextResponse.json({
        registered: true,
        message: result.message,
      });
    }

    return NextResponse.json({
      access_token: result.access_token,
      refresh_token: result.refresh_token,
      expires: result.expires,
      user: {
        ...result.user,
        email: result.user.email ?? email,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Registration failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
