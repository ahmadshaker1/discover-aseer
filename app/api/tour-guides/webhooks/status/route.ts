import { NextResponse } from "next/server";
import {
  TOUR_GUIDE_EMAIL_FIELD,
  TOUR_GUIDE_PUBLISHED_STATUS,
  TOUR_GUIDE_REJECTED_STATUS,
  TOUR_GUIDES_COLLECTION,
} from "@/lib/directus/config";
import { getDirectusServerUrl } from "@/lib/directus/server";
import {
  buildTourGuideStatusEmail,
  type TourGuideStatusEmailKind,
} from "@/lib/email/tourGuideStatusEmails";
import { isSendGridConfigured, sendBrandEmail } from "@/lib/email/sendgrid";

export const runtime = "nodejs";

type DirectusGuideRow = {
  id?: number | string;
  email?: string | null;
  name?: string | null;
  name_en?: string | null;
  status?: string | null;
};

function getWebhookSecret(): string | undefined {
  return (
    process.env.DIRECTUS_WEBHOOK_SECRET?.trim() ||
    process.env.TOUR_GUIDE_STATUS_WEBHOOK_SECRET?.trim()
  );
}

function isAuthorized(request: Request): boolean {
  const secret = getWebhookSecret();
  if (!secret) return false;

  const headerSecret =
    request.headers.get("x-webhook-secret")?.trim() ||
    request.headers.get("x-directus-webhook-secret")?.trim() ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();

  const url = new URL(request.url);
  const querySecret = url.searchParams.get("secret")?.trim();

  return headerSecret === secret || querySecret === secret;
}

function getSiteOrigin(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    "https://discoveraseer.com";
  return raw.replace(/\/+$/, "");
}

function portalUrlForGuide(): string {
  return `${getSiteOrigin()}/ar/tour-guides/portal`;
}

function normalizeStatus(raw: unknown): TourGuideStatusEmailKind | null {
  if (typeof raw !== "string") return null;
  const status = raw.trim().toLowerCase();
  // Directus approval = `published`. Accept `approved` as an alias from flows.
  if (status === TOUR_GUIDE_PUBLISHED_STATUS || status === "approved") {
    return "published";
  }
  if (status === TOUR_GUIDE_REJECTED_STATUS) {
    return "rejected";
  }
  return null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function collectKeys(payload: Record<string, unknown>): string[] {
  const keys = new Set<string>();

  const push = (value: unknown) => {
    if (value == null) return;
    if (Array.isArray(value)) {
      for (const item of value) push(item);
      return;
    }
    if (typeof value === "number" || typeof value === "string") {
      const id = String(value).trim();
      if (id) keys.add(id);
    }
  };

  push(payload.key);
  push(payload.keys);
  push(payload.id);

  const body = asRecord(payload.body);
  if (body) {
    push(body.key);
    push(body.keys);
    push(body.id);
  }

  const item = asRecord(payload.item) || asRecord(body?.item);
  if (item) push(item.id);

  return [...keys];
}

function extractStatus(payload: Record<string, unknown>): string | null {
  const candidates: unknown[] = [
    payload.status,
    asRecord(payload.payload)?.status,
    asRecord(payload.body)?.status,
    asRecord(asRecord(payload.body)?.payload)?.status,
    asRecord(payload.item)?.status,
    asRecord(asRecord(payload.body)?.item)?.status,
  ];

  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function extractInlineGuide(
  payload: Record<string, unknown>,
): DirectusGuideRow | null {
  const candidates = [
    asRecord(payload.item),
    asRecord(asRecord(payload.body)?.item),
    asRecord(payload.payload),
    asRecord(asRecord(payload.body)?.payload),
    payload,
  ];

  for (const row of candidates) {
    if (!row) continue;
    const email = row[TOUR_GUIDE_EMAIL_FIELD] ?? row.email;
    const status = row.status;
    if (typeof email === "string" && email.trim()) {
      return {
        id: (row.id as string | number | undefined) ?? undefined,
        email,
        name: typeof row.name === "string" ? row.name : null,
        name_en: typeof row.name_en === "string" ? row.name_en : null,
        status: typeof status === "string" ? status : null,
      };
    }
  }
  return null;
}

async function fetchGuideById(id: string): Promise<DirectusGuideRow | null> {
  const base = getDirectusServerUrl();
  const token = process.env.DIRECTUS_ADMIN_TOKEN?.trim();
  if (!base || !token) return null;

  const url = new URL(`${base}/items/${TOUR_GUIDES_COLLECTION}/${id}`);
  url.searchParams.set(
    "fields",
    ["id", TOUR_GUIDE_EMAIL_FIELD, "name", "name_en", "status"].join(","),
  );

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(
      "[tour-guide-status-webhook] failed to fetch guide",
      id,
      res.status,
    );
    return null;
  }

  const json = (await res.json()) as { data?: DirectusGuideRow };
  return json.data ?? null;
}

async function sendStatusEmail(guide: DirectusGuideRow, kind: TourGuideStatusEmailKind) {
  const email = guide.email?.trim();
  if (!email) {
    return { ok: false as const, reason: "missing_email" };
  }

  const { subject, html } = buildTourGuideStatusEmail({
    kind,
    nameAr: guide.name,
    nameEn: guide.name_en,
    portalUrl: portalUrlForGuide(),
  });

  await sendBrandEmail({ to: email, subject, html });
  return { ok: true as const, email };
}

/**
 * Directus Flow webhook: when a tourist_guides row status becomes
 * `published` (approved) or `rejected`, email the guide via SendGrid.
 *
 * Auth: `x-webhook-secret` header (or `?secret=`) must match
 * `DIRECTUS_WEBHOOK_SECRET`.
 */
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSendGridConfigured()) {
    return NextResponse.json(
      { error: "SENDGRID_API_KEY is not configured." },
      { status: 503 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const payload = asRecord(raw) ?? {};
  const collection =
    (typeof payload.collection === "string" && payload.collection) ||
    (typeof asRecord(payload.body)?.collection === "string" &&
      String(asRecord(payload.body)?.collection)) ||
    TOUR_GUIDES_COLLECTION;

  if (collection !== TOUR_GUIDES_COLLECTION) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: "ignored_collection",
      collection,
    });
  }

  const statusRaw = extractStatus(payload);
  const kind = normalizeStatus(statusRaw);
  if (!kind) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: "status_not_notifiable",
      status: statusRaw,
    });
  }

  const inline = extractInlineGuide(payload);
  const keys = collectKeys(payload);
  const results: Array<Record<string, unknown>> = [];

  if (inline?.email) {
    try {
      const sent = await sendStatusEmail(
        {
          ...inline,
          status: statusRaw,
        },
        kind,
      );
      results.push({ source: "payload", ...sent, kind });
    } catch (error) {
      console.error("[tour-guide-status-webhook] send failed", error);
      return NextResponse.json(
        {
          error:
            error instanceof Error ? error.message : "Failed to send email.",
        },
        { status: 500 },
      );
    }
  } else if (keys.length > 0) {
    for (const id of keys) {
      const guide = await fetchGuideById(id);
      if (!guide) {
        results.push({ id, ok: false, reason: "guide_not_found" });
        continue;
      }
      try {
        const sent = await sendStatusEmail(guide, kind);
        results.push({ id, source: "directus", ...sent, kind });
      } catch (error) {
        console.error("[tour-guide-status-webhook] send failed", id, error);
        results.push({
          id,
          ok: false,
          reason:
            error instanceof Error ? error.message : "Failed to send email.",
        });
      }
    }
  } else {
    return NextResponse.json(
      {
        error:
          "Missing guide id/keys or email in webhook payload. Configure the Directus Flow to send key/keys or the full item.",
      },
      { status: 400 },
    );
  }

  const sentCount = results.filter((r) => r.ok === true).length;
  return NextResponse.json({
    ok: true,
    kind,
    sent: sentCount,
    results,
  });
}

/** Simple health check for configuring the Directus Flow URL. */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    service: "tour-guide-status-webhook",
    sendgrid: isSendGridConfigured(),
    notifies: [TOUR_GUIDE_PUBLISHED_STATUS, TOUR_GUIDE_REJECTED_STATUS],
  });
}
