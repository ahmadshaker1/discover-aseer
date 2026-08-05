import { NextResponse } from "next/server";
import {
  TOUR_GUIDE_EMAIL_FIELD,
  TOUR_GUIDE_UNDER_REVIEW_STATUS,
} from "@/lib/directus/config";
import type { DirectusUser } from "@/lib/directus/types";
import {
  coerceDirectusId,
  directusFetchCurrentUser,
  directusFetchMyGuideProfile,
  directusUpdateGuideProfile,
  directusUpsertGuideProfile,
  getBearerToken,
  getDirectusServerUrl,
  parseProfileIdHint,
} from "@/lib/directus/server";
import { notifyTourGuideUnderReview } from "@/lib/email/sendTourGuideNotification";

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
    const knownEmail = request.headers
      .get("x-account-email")
      ?.trim()
      .toLowerCase();
    const user = await directusFetchCurrentUser(
      baseUrl,
      accessToken,
      knownEmail || undefined,
    );
    return { baseUrl, user, accessToken };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized.";
    return {
      error: NextResponse.json({ error: message }, { status: 401 }),
    };
  }
}

function profileStatus(profile: unknown): string | null {
  if (!profile || typeof profile !== "object") return null;
  const status = (profile as { status?: unknown }).status;
  return typeof status === "string" ? status.trim().toLowerCase() : null;
}

function maybeNotifyUnderReview(options: {
  previousStatus: string | null;
  saved: Record<string, unknown>;
  user: DirectusUser;
}) {
  const previous = (options.previousStatus || "").toLowerCase();
  // Avoid spamming while the guide keeps editing an already-submitted application.
  if (previous === TOUR_GUIDE_UNDER_REVIEW_STATUS) return;

  const email =
    (typeof options.saved[TOUR_GUIDE_EMAIL_FIELD] === "string"
      ? options.saved[TOUR_GUIDE_EMAIL_FIELD]
      : null) ||
    (typeof options.saved.email === "string" ? options.saved.email : null) ||
    options.user.email;

  void notifyTourGuideUnderReview({
    email,
    name: typeof options.saved.name === "string" ? options.saved.name : null,
    name_en:
      typeof options.saved.name_en === "string" ? options.saved.name_en : null,
  });
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
    const profileIdHint = parseProfileIdHint(
      request.headers.get("x-profile-id"),
    );
    const profile = await directusFetchMyGuideProfile(
      baseUrl,
      user,
      accessToken,
      profileIdHint,
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
    const bodyRecord = body as Record<string, unknown>;
    const profileIdHint =
      parseProfileIdHint(request.headers.get("x-profile-id")) ??
      coerceDirectusId(bodyRecord.id);

    let previousStatus: string | null = null;
    try {
      const existing = await directusFetchMyGuideProfile(
        baseUrl,
        user,
        accessToken,
        profileIdHint,
      );
      previousStatus = profileStatus(existing);
    } catch {
      previousStatus = null;
    }

    const { id: _ignoredId, ...payload } = bodyRecord;
    const data = await directusUpsertGuideProfile(
      baseUrl,
      user,
      payload,
      accessToken,
      profileIdHint,
    );

    maybeNotifyUnderReview({
      previousStatus,
      saved: data as Record<string, unknown>,
      user,
    });

    return NextResponse.json({ data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not save profile.";
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
  const profileIdHint =
    typeof id === "number" && id > 0
      ? id
      : parseProfileIdHint(request.headers.get("x-profile-id"));
  if (!profileIdHint) {
    return NextResponse.json(
      { error: "Profile id is required." },
      { status: 400 },
    );
  }

  try {
    let previousStatus: string | null = null;
    try {
      const existing = await directusFetchMyGuideProfile(
        baseUrl,
        user,
        accessToken,
        profileIdHint,
      );
      previousStatus = profileStatus(existing);
    } catch {
      previousStatus = null;
    }

    const data = await directusUpdateGuideProfile(
      baseUrl,
      profileIdHint,
      user,
      payload,
      accessToken,
    );

    maybeNotifyUnderReview({
      previousStatus,
      saved: data as Record<string, unknown>,
      user,
    });

    return NextResponse.json({ data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not update profile.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
