import { NextResponse } from "next/server";
import {
  directusFetchCurrentUser,
  getBearerToken,
  getDirectusServerUrl,
} from "@/lib/directus/server";

export async function GET(request: Request) {
  const baseUrl = getDirectusServerUrl();
  if (!baseUrl) {
    return NextResponse.json(
      { error: "Server is not configured for tour guide auth." },
      { status: 503 },
    );
  }

  const accessToken = getBearerToken(request);
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const user = await directusFetchCurrentUser(baseUrl, accessToken);
    return NextResponse.json({ user });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not load account.";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
