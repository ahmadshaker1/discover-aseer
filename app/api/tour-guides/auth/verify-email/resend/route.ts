import { NextResponse } from "next/server";
import {
  findDirectusUserByEmail,
  isUnverifiedStatus,
} from "@/lib/directus/tourGuideEmailVerification";
import { sendTourGuideVerifyEmail } from "@/lib/directus/sendTourGuideVerifyEmail";
import { getDirectusServerUrl } from "@/lib/directus/server";

function translateMessage(msg: string, isArabic: boolean): string {
  if (!isArabic) return msg;

  const exactMatches: Record<string, string> = {
    "Server is not configured for tour guide auth.":
      "الخادم غير مهيأ لمصادقة المرشد السياحي.",
    "Invalid JSON body.": "بيانات JSON غير صالحة.",
    "Email is required.": "البريد الإلكتروني مطلوب.",
    "If an unverified account exists for this email, a new verification link was sent.":
      "إذا وُجد حساب غير مؤكَّد لهذا البريد، فقد أُرسل رابط تأكيد جديد.",
  };

  return exactMatches[msg] ?? msg;
}

/**
 * Always returns the same success message (no account enumeration).
 */
export async function POST(request: Request) {
  const referer = request.headers.get("referer") || "";
  const isArabic = referer.includes("/ar/") || referer.endsWith("/ar");
  const locale = isArabic ? "ar" : "en";

  const genericOk = {
    message: translateMessage(
      "If an unverified account exists for this email, a new verification link was sent.",
      isArabic,
    ),
  };

  try {
    if (!getDirectusServerUrl()) {
      return NextResponse.json(
        {
          error: translateMessage(
            "Server is not configured for tour guide auth.",
            isArabic,
          ),
        },
        { status: 503 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: translateMessage("Invalid JSON body.", isArabic) },
        { status: 400 },
      );
    }

    const email = String((body as { email?: string })?.email ?? "")
      .trim()
      .toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: translateMessage("Email is required.", isArabic) },
        { status: 400 },
      );
    }

    const user = await findDirectusUserByEmail(email).catch(() => null);
    if (user && isUnverifiedStatus(user.status)) {
      void sendTourGuideVerifyEmail({ user, request, locale });
    }

    return NextResponse.json(genericOk);
  } catch (error) {
    console.error("[tour-guide-auth] verify-email resend failed", error);
    return NextResponse.json(genericOk);
  }
}
