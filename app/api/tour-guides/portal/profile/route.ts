import { NextResponse } from "next/server";
import type { DirectusUser } from "@/lib/directus/types";
import {
  directusCreateGuideProfile,
  directusFetchCurrentUser,
  directusFetchMyGuideProfile,
  directusUpdateGuideProfile,
  getBearerToken,
  getDirectusServerUrl,
} from "@/lib/directus/server";

async function requireAuth(request: Request) {
  const baseUrl = getDirectusServerUrl();
  if (!baseUrl) {
    return {
      error: NextResponse.json(
        { error: "Server is not configured for tour guide portal." },
        { status: 503 },
      ),
    };
  }

  const accessToken = getBearerToken(request);
  if (!accessToken) {
    return {
      error: NextResponse.json({ error: "Unauthorized." }, { status: 401 }),
    };
  }

  try {
    const knownEmail = request.headers.get("x-account-email")?.trim().toLowerCase();
    const user = await directusFetchCurrentUser(
      baseUrl,
      accessToken,
      knownEmail || undefined,
    );
    return { baseUrl, user, accessToken };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unauthorized.";
    return {
      error: NextResponse.json({ error: message }, { status: 401 }),
    };
  }
}

export async function GET(request: Request) {
  const auth = await requireAuth(request);
  if ("error" in auth && auth.error) return auth.error;

  const { baseUrl, user, accessToken } = auth as {
    baseUrl: string;
    user: DirectusUser;
    accessToken: string;
  };

  try {
    const profile = await directusFetchMyGuideProfile(
      baseUrl,
      user,
      accessToken,
    );
    return NextResponse.json({ data: profile });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not load profile.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth(request);
  if ("error" in auth && auth.error) return auth.error;

  const { baseUrl, user, accessToken } = auth as {
    baseUrl: string;
    user: DirectusUser;
    accessToken: string;
  };

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  try {
    const data = await directusCreateGuideProfile(
      baseUrl,
      user,
      body as Record<string, unknown>,
      accessToken,
    );
    return NextResponse.json({ data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not create profile.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  const auth = await requireAuth(request);
  if ("error" in auth && auth.error) return auth.error;

  const { baseUrl, user, accessToken } = auth as {
    baseUrl: string;
    user: DirectusUser;
    accessToken: string;
  };

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const { id, ...payload } = body as { id?: number } & Record<string, unknown>;
  if (!id || typeof id !== "number") {
    return NextResponse.json({ error: "Profile id is required." }, { status: 400 });
  }

  try {
    const data = await directusUpdateGuideProfile(
      baseUrl,
      id,
      user,
      payload,
      accessToken,
    );
    return NextResponse.json({ data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not update profile.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
