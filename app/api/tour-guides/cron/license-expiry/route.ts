import { NextResponse } from "next/server";
import { isCronAuthorized } from "@/lib/cron/auth";
import {
  getLicenseReminderDays,
  runTourGuideLicenseExpiryJob,
} from "@/lib/cron/tourGuideLicenseExpiry";
import { isSendGridConfigured } from "@/lib/email/sendgrid";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Manual / ops trigger for the same job the in-app scheduler runs daily.
 * Auth still required so the endpoint is not public.
 */
export async function POST(request: Request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runTourGuideLicenseExpiryJob();
    if (!result.ok && result.error) {
      return NextResponse.json(result, { status: 503 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("[tour-guide-license-cron] failed", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "License cron failed.",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  if (url.searchParams.get("run") === "1") {
    return POST(request);
  }

  return NextResponse.json({
    ok: true,
    service: "tour-guide-license-expiry-cron",
    mode: "in-app scheduler + optional HTTP trigger",
    sendgrid: isSendGridConfigured(),
    reminderDays: getLicenseReminderDays(),
    schedule:
      process.env.TOUR_GUIDE_LICENSE_CRON?.trim() || "0 8 * * * (UTC, default)",
    hint: "Job runs automatically inside the Node process. POST (or GET ?run=1) to trigger manually.",
  });
}
