import {
  buildVerifyEmailUrl,
  createEmailVerificationToken,
  getSiteOriginFromRequest,
  type DirectusAuthUserRow,
} from "@/lib/directus/tourGuideEmailVerification";
import { notifyTourGuideRegistration } from "@/lib/email/sendTourGuideNotification";

export async function sendTourGuideVerifyEmail(options: {
  user: Pick<DirectusAuthUserRow, "id" | "email" | "first_name" | "last_name">;
  request?: Request;
  locale?: "ar" | "en";
}): Promise<{ ok: boolean; skipped?: string; error?: string }> {
  const email = options.user.email?.trim().toLowerCase();
  if (!email) return { ok: false, skipped: "missing_email" };

  const token = createEmailVerificationToken({
    email,
    userId: options.user.id,
  });
  const origin = getSiteOriginFromRequest(options.request);
  const locale = options.locale ?? "ar";
  const verifyUrl = buildVerifyEmailUrl({ origin, locale, token });
  const displayName =
    [options.user.first_name, options.user.last_name]
      .filter(Boolean)
      .join(" ")
      .trim() || email;

  return notifyTourGuideRegistration(
    {
      email,
      name: displayName,
      name_en: displayName,
    },
    verifyUrl,
  );
}
