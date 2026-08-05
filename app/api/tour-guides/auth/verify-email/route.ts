import { NextResponse } from "next/server";
import {
  findDirectusUserByEmail,
  isUnverifiedStatus,
  setDirectusUserStatus,
  verifyEmailVerificationToken,
} from "@/lib/directus/tourGuideEmailVerification";
import { getDirectusServerUrl } from "@/lib/directus/server";

function translateMessage(msg: string, isArabic: boolean): string {
  if (!isArabic) return msg;

  const exactMatches: Record<string, string> = {
    "Server is not configured for tour guide auth.":
      "الخادم غير مهيأ لمصادقة المرشد السياحي.",
    "Verification token is required.": "رمز التأكيد مطلوب.",
    "Invalid or expired verification link.":
      "رابط التأكيد غير صالح أو منتهٍ.",
    "User not found.": "المستخدم غير موجود.",
    "Email already verified. You can sign in.":
      "البريد مؤكَّد مسبقاً. يمكنك تسجيل الدخول.",
    "Email verified successfully. You can sign in.":
      "تم تأكيد البريد بنجاح. يمكنك تسجيل الدخول.",
    "Verification failed.": "فشل التأكيد.",
  };

  return exactMatches[msg] ?? msg;
}

function isArabicRequest(request: Request): boolean {
  const referer = request.headers.get("referer") || "";
  const url = request.url || "";
  return (
    referer.includes("/ar/") ||
    referer.endsWith("/ar") ||
    url.includes("/ar/") ||
    url.includes("locale=ar")
  );
}

async function verifyTokenAndActivate(
  token: string,
  isArabic: boolean,
): Promise<NextResponse> {
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

  if (!token.trim()) {
    return NextResponse.json(
      {
        error: translateMessage("Verification token is required.", isArabic),
      },
      { status: 400 },
    );
  }

  let payload: { email: string; userId: string };
  try {
    payload = verifyEmailVerificationToken(token);
  } catch {
    return NextResponse.json(
      {
        error: translateMessage(
          "Invalid or expired verification link.",
          isArabic,
        ),
      },
      { status: 400 },
    );
  }

  const user = await findDirectusUserByEmail(payload.email);
  if (!user || user.id !== payload.userId) {
    return NextResponse.json(
      { error: translateMessage("User not found.", isArabic) },
      { status: 404 },
    );
  }

  if (!isUnverifiedStatus(user.status)) {
    return NextResponse.json({
      verified: true,
      alreadyVerified: true,
      message: translateMessage(
        "Email already verified. You can sign in.",
        isArabic,
      ),
    });
  }

  await setDirectusUserStatus(user.id, "active");

  return NextResponse.json({
    verified: true,
    message: translateMessage(
      "Email verified successfully. You can sign in.",
      isArabic,
    ),
  });
}

export async function GET(request: Request) {
  const isArabic = isArabicRequest(request);
  const token = new URL(request.url).searchParams.get("token") ?? "";

  try {
    return await verifyTokenAndActivate(token, isArabic);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Verification failed.";
    return NextResponse.json(
      { error: translateMessage(message, isArabic) },
      { status: 400 },
    );
  }
}

export async function POST(request: Request) {
  const isArabic = isArabicRequest(request);

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const token = String((body as { token?: string })?.token ?? "");
    return await verifyTokenAndActivate(token, isArabic);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Verification failed.";
    return NextResponse.json(
      { error: translateMessage(message, isArabic) },
      { status: 400 },
    );
  }
}
