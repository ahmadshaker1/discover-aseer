import { NextResponse } from "next/server";
import { directusRegister, getDirectusServerUrl } from "@/lib/directus/server";
import {
  findDirectusUserByEmail,
  isUnverifiedStatus,
  setDirectusUserStatus,
} from "@/lib/directus/tourGuideEmailVerification";
import { sendTourGuideVerifyEmail } from "@/lib/directus/sendTourGuideVerifyEmail";

function translateMessage(msg: string, isArabic: boolean): string {
  if (!isArabic) return msg;

  const exactMatches: Record<string, string> = {
    "Server is not configured for tour guide auth.":
      "الخادم غير مهيأ لمصادقة المرشد السياحي.",
    "Invalid JSON body.": "بيانات JSON غير صالحة.",
    "All fields are required.": "جميع الحقول مطلوبة.",
    "Password must be at least 8 characters.":
      "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
    "An account with this email already exists. Use the Sign in tab with your password.":
      "يوجد حساب مسجل بهذا البريد الإلكتروني. استخدم علامة تبويب تسجيل الدخول مع كلمة المرور الخاصة بك.",
    "Registration failed.": "فشل التسجيل.",
    "Account created. Check your email for a verification link, then sign in.":
      "تم إنشاء الحساب. تحقق من بريدك الإلكتروني لرابط التأكيد، ثم سجّل الدخول.",
    "This email is registered but not verified yet. We sent a new verification link — check your inbox, then sign in.":
      "هذا البريد مسجّل لكن لم يُؤكَّد بعد. أرسلنا رابط تأكيد جديداً — تحقق من صندوق الوارد ثم سجّل الدخول.",
  };

  if (exactMatches[msg]) {
    return exactMatches[msg];
  }

  return msg;
}

function localeFromRequest(request: Request, isArabic: boolean): "ar" | "en" {
  return isArabic ? "ar" : "en";
}

export async function POST(request: Request) {
  const referer = request.headers.get("referer") || "";
  const isArabic = referer.includes("/ar/") || referer.endsWith("/ar");
  const locale = localeFromRequest(request, isArabic);

  try {
    const baseUrl = getDirectusServerUrl();
    if (!baseUrl) {
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

    const b = body as Record<string, unknown>;
    const email = String(b.email ?? "")
      .trim()
      .toLowerCase();
    const password = String(b.password ?? "");
    const first_name = String(b.first_name ?? "").trim();
    const last_name = String(b.last_name ?? "").trim();

    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json(
        { error: translateMessage("All fields are required.", isArabic) },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          error: translateMessage(
            "Password must be at least 8 characters.",
            isArabic,
          ),
        },
        { status: 400 },
      );
    }

    let result;
    try {
      result = await directusRegister(baseUrl, {
        email,
        password,
        first_name,
        last_name,
      });
    } catch (registerError) {
      const message =
        registerError instanceof Error
          ? registerError.message
          : "Registration failed.";

      if (/already exists/i.test(message)) {
        const existing = await findDirectusUserByEmail(email).catch(() => null);
        if (existing && isUnverifiedStatus(existing.status)) {
          await sendTourGuideVerifyEmail({
            user: existing,
            request,
            locale,
          });
          return NextResponse.json({
            registered: true,
            message: translateMessage(
              "This email is registered but not verified yet. We sent a new verification link — check your inbox, then sign in.",
              isArabic,
            ),
          });
        }
      }

      return NextResponse.json(
        { error: translateMessage(message, isArabic) },
        { status: 400 },
      );
    }

    if (result.kind === "registered") {
      const user = await findDirectusUserByEmail(email);
      if (user) {
        await setDirectusUserStatus(user.id, "unverified");
        void sendTourGuideVerifyEmail({
          user: {
            id: user.id,
            email,
            first_name: user.first_name ?? first_name,
            last_name: user.last_name ?? last_name,
          },
          request,
          locale,
        });
      } else {
        console.error(
          "[tour-guide-auth] registered but user not found for verification",
          email,
        );
      }

      return NextResponse.json({
        registered: true,
        message: translateMessage(result.message, isArabic),
      });
    }

    // Existing verified account with matching password — allow sign-in.
    return NextResponse.json({
      access_token: result.access_token,
      refresh_token: result.refresh_token,
      expires: result.expires,
      user: {
        ...result.user,
        email: result.user.email ?? email,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Registration failed.";
    return NextResponse.json(
      { error: translateMessage(message, isArabic) },
      { status: 400 },
    );
  }
}
