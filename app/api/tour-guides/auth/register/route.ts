import { NextResponse } from "next/server";
import { directusRegister, getDirectusServerUrl } from "@/lib/directus/server";
import { notifyTourGuideRegistration } from "@/lib/email/sendTourGuideNotification";

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
    "Your account was created. If email verification is enabled in Directus, verify your email first, then sign in with the same password.":
      "تم إنشاء حسابك. إذا كان التحقق من البريد الإلكتروني ممكّنًا، يرجى التحقق من بريدك أولاً، ثم تسجيل الدخول بنفس كلمة المرور.",
  };

  if (exactMatches[msg]) {
    return exactMatches[msg];
  }

  if (msg.startsWith("Your account was created but automatic sign-in failed")) {
    return "تم إنشاء حسابك ولكن فشل تسجيل الدخول التلقائي. يرجى تسجيل الدخول يدوياً.";
  }

  return msg;
}

export async function POST(request: Request) {
  const referer = request.headers.get("referer") || "";
  const isArabic = referer.includes("/ar/") || referer.endsWith("/ar");

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

    const result = await directusRegister(baseUrl, {
      email,
      password,
      first_name,
      last_name,
    });

    // Fire-and-forget — never block account creation on email delivery.
    void notifyTourGuideRegistration({
      email,
      name: `${first_name} ${last_name}`.trim(),
      name_en: `${first_name} ${last_name}`.trim(),
    });

    if (result.kind === "registered") {
      return NextResponse.json({
        registered: true,
        message: translateMessage(result.message, isArabic),
      });
    }

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
