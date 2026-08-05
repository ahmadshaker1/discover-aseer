import { isSendGridConfigured, sendBrandEmail } from "@/lib/email/sendgrid";
import {
  buildTourGuideLicenseEmail,
  buildTourGuideRegistrationEmail,
  buildTourGuideUnderReviewEmail,
  getTourGuidePortalUrl,
} from "@/lib/email/tourGuideNotificationEmails";
import {
  buildTourGuideStatusEmail,
  type TourGuideStatusEmailKind,
} from "@/lib/email/tourGuideStatusEmails";

export type TourGuideNotifyGuide = {
  email?: string | null;
  name?: string | null;
  name_en?: string | null;
};

async function sendSafe(
  guide: TourGuideNotifyGuide,
  build: () => { subject: string; html: string },
  label: string,
): Promise<{ ok: boolean; skipped?: string; error?: string }> {
  const email = guide.email?.trim();
  if (!email) return { ok: false, skipped: "missing_email" };
  if (!isSendGridConfigured()) return { ok: false, skipped: "sendgrid_unconfigured" };

  try {
    const { subject, html } = build();
    await sendBrandEmail({ to: email, subject, html });
    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send email.";
    console.error(`[tour-guide-email] ${label} failed`, email, error);
    return { ok: false, error: message };
  }
}

export function notifyTourGuideRegistration(guide: TourGuideNotifyGuide) {
  return sendSafe(
    guide,
    () =>
      buildTourGuideRegistrationEmail({
        nameAr: guide.name,
        nameEn: guide.name_en,
        portalUrl: getTourGuidePortalUrl(),
      }),
    "registration",
  );
}

export function notifyTourGuideUnderReview(guide: TourGuideNotifyGuide) {
  return sendSafe(
    guide,
    () =>
      buildTourGuideUnderReviewEmail({
        nameAr: guide.name,
        nameEn: guide.name_en,
        portalUrl: getTourGuidePortalUrl(),
      }),
    "under_review",
  );
}

export function notifyTourGuideStatus(
  guide: TourGuideNotifyGuide,
  kind: TourGuideStatusEmailKind,
) {
  return sendSafe(
    guide,
    () =>
      buildTourGuideStatusEmail({
        kind,
        nameAr: guide.name,
        nameEn: guide.name_en,
        portalUrl: getTourGuidePortalUrl(),
      }),
    kind,
  );
}

export function notifyTourGuideLicense(
  guide: TourGuideNotifyGuide,
  options: {
    kind: "expiring" | "expired";
    expiryDate: string;
    daysUntilExpiry?: number;
  },
) {
  return sendSafe(
    guide,
    () =>
      buildTourGuideLicenseEmail({
        kind: options.kind,
        nameAr: guide.name,
        nameEn: guide.name_en,
        expiryDate: options.expiryDate,
        daysUntilExpiry: options.daysUntilExpiry,
        portalUrl: getTourGuidePortalUrl(),
      }),
    `license_${options.kind}`,
  );
}
