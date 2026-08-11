import {
  TOUR_GUIDE_EMAIL_FIELD,
  TOUR_GUIDES_COLLECTION,
} from "@/lib/directus/config";
import { getDirectusServerUrl } from "@/lib/directus/server";
import { notifyTourGuideLicense } from "@/lib/email/sendTourGuideNotification";
import { isSendGridConfigured } from "@/lib/email/sendgrid";

type GuideLicenseRow = {
  id?: number | string;
  email?: string | null;
  name?: string | null;
  name_en?: string | null;
  date?: string | null;
  status?: string | null;
};

export type LicenseCronResult = {
  ok: boolean;
  service: "tour-guide-license-expiry-cron";
  today: string;
  reminderDays: number[];
  scanned: number;
  expiringSent: number;
  expiredSent: number;
  results: Array<Record<string, unknown>>;
  error?: string;
};

/** Parse `YYYY-MM-DD` (or ISO datetime) as a UTC calendar date. */
function parseDateOnly(raw: string | null | undefined): Date | null {
  const value = (raw || "").trim();
  if (!value) return null;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!year || !month || !day) return null;
  return new Date(Date.UTC(year, month - 1, day));
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function utcToday(): Date {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
}

function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

export function getLicenseReminderDays(): number[] {
  const raw =
    process.env.TOUR_GUIDE_LICENSE_EXPIRY_REMINDER_DAYS?.trim() || "30,7";
  const days = raw
    .split(/[,\s]+/)
    .map((part) => Number.parseInt(part, 10))
    .filter((n) => Number.isFinite(n) && n >= 0);
  return days.length > 0 ? [...new Set(days)].sort((a, b) => b - a) : [30, 7];
}

async function fetchGuidesWithLicenseDate(): Promise<GuideLicenseRow[]> {
  const base = getDirectusServerUrl();
  const token = process.env.DIRECTUS_ADMIN_TOKEN?.trim();
  if (!base || !token) {
    throw new Error("DIRECTUS_ADMIN_TOKEN / Directus URL is not configured.");
  }

  const url = new URL(`${base}/items/${TOUR_GUIDES_COLLECTION}`);
  url.searchParams.set(
    "fields",
    ["id", TOUR_GUIDE_EMAIL_FIELD, "name", "name_en", "date", "status"].join(
      ",",
    ),
  );
  url.searchParams.set("filter[date][_nnull]", "true");
  url.searchParams.set(`filter[${TOUR_GUIDE_EMAIL_FIELD}][_nnull]`, "true");
  url.searchParams.set("limit", "-1");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch guides for license cron: ${response.status}`,
    );
  }

  const json = (await response.json()) as { data?: GuideLicenseRow[] };
  return json.data ?? [];
}

/** Core license reminder/expired job — used by in-app scheduler and HTTP cron route. */
export async function runTourGuideLicenseExpiryJob(): Promise<LicenseCronResult> {
  if (!isSendGridConfigured()) {
    return {
      ok: false,
      service: "tour-guide-license-expiry-cron",
      today: toIsoDate(utcToday()),
      reminderDays: getLicenseReminderDays(),
      scanned: 0,
      expiringSent: 0,
      expiredSent: 0,
      results: [],
      error: "SENDGRID_API_KEY is not configured.",
    };
  }

  const today = utcToday();
  const windows = getLicenseReminderDays();
  const guides = await fetchGuidesWithLicenseDate();

  const results: Array<Record<string, unknown>> = [];
  let expiringSent = 0;
  let expiredSent = 0;

  for (const guide of guides) {
    const expiry = parseDateOnly(guide.date);
    if (!expiry) {
      results.push({ id: guide.id, skipped: "invalid_date" });
      continue;
    }

    const daysUntil = daysBetween(today, expiry);
    const expiryIso = toIsoDate(expiry);

    if (windows.includes(daysUntil)) {
      const sent = await notifyTourGuideLicense(guide, {
        kind: "expiring",
        expiryDate: expiryIso,
        daysUntilExpiry: daysUntil,
      });
      if (sent.ok) expiringSent += 1;
      results.push({
        id: guide.id,
        kind: "expiring",
        daysUntil,
        expiryDate: expiryIso,
        ...sent,
      });
      continue;
    }

    // One-shot: notify the day after expiry (daysUntil === -1).
    if (daysUntil === -1) {
      const sent = await notifyTourGuideLicense(guide, {
        kind: "expired",
        expiryDate: expiryIso,
      });
      if (sent.ok) expiredSent += 1;
      results.push({
        id: guide.id,
        kind: "expired",
        daysUntil,
        expiryDate: expiryIso,
        ...sent,
      });
    }
  }

  return {
    ok: true,
    service: "tour-guide-license-expiry-cron",
    today: toIsoDate(today),
    reminderDays: windows,
    scanned: guides.length,
    expiringSent,
    expiredSent,
    results,
  };
}
