import { NextResponse } from "next/server";
import { directusLogin, getDirectusServerUrl } from "@/lib/directus/server";

function translateMessage(msg: string, isArabic: boolean): string {
  if (!isArabic) return msg;

  const exactMatches: Record<string, string> = {
    "Server is not configured for tour guide auth.":
      "الخادم غير مهيأ لمصادقة المرشد السياحي.",
    "Invalid JSON body.": "بيانات JSON غير صالحة.",
    "Email and password are required.":
      "البريد الإلكتروني وكلمة المرور مطلوبان.",
    "Login failed.": "فشل تسجيل الدخول.",
    "Sign-in failed.": "فشل تسجيل الدخول.",
  };

  if (exactMatches[msg]) {
    return exactMatches[msg];
  }

  if (/invalid user credentials/i.test(msg)) {
    return "بيانات اعتماد المستخدم غير صالحة.";
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

    const email = String((body as { email?: string })?.email ?? "")
      .trim()
      .toLowerCase();
    const password = String((body as { password?: string })?.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        {
          error: translateMessage("Email and password are required.", isArabic),
        },
        { status: 400 },
      );
    }

    const session = await directusLogin(baseUrl, email, password);
    return NextResponse.json({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires: session.expires,
      user: {
        ...session.user,
        email: session.user.email ?? email,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed.";
    return NextResponse.json(
      { error: translateMessage(message, isArabic) },
      { status: 401 },
    );
  }
}
