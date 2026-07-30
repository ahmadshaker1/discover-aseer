import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDirectusServerUrl } from "@/lib/directus/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Missing token or password." },
        { status: 400 },
      );
    }

    // فك تشفير التوكن لمعرفة الإيميل وتاريخ الانتهاء
    const secret = process.env.NEXTAUTH_SECRET || "fallback-secret-for-jwt";
    let decoded: any;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return NextResponse.json(
        { error: "Token is invalid or has expired." },
        { status: 401 },
      );
    }

    const email = decoded.email;
    if (!email) {
      return NextResponse.json(
        { error: "Invalid token data." },
        { status: 400 },
      );
    }

    // نحتاج للاتصال بـ Directus لتحديث كلمة المرور
    const baseUrl = getDirectusServerUrl();
    if (!baseUrl) {
      console.error("Directus server is not configured.");
      return NextResponse.json({ error: "internal_error" }, { status: 503 });
    }

    const adminToken = process.env.DIRECTUS_ADMIN_TOKEN?.trim();
    if (!adminToken) {
      console.error(
        "لا يمكن إكمال هذه الخطوة حالياً لعدم وجود DIRECTUS_ADMIN_TOKEN في السيرفر لتعديل بيانات المستخدم.",
      );
      return NextResponse.json({ error: "internal_error" }, { status: 503 });
    }

    // 1. البحث عن المستخدم لاستخراج الـ ID الخاص به
    const searchRes = await fetch(
      `${baseUrl}/users?filter[email][_eq]=${encodeURIComponent(email)}`,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
        cache: "no-store",
      },
    );

    if (!searchRes.ok) {
      const errorText = await searchRes.text();
      console.error("Directus Search Error:", errorText);
      return NextResponse.json({ error: "internal_error" }, { status: 500 });
    }

    const searchData = await searchRes.json();
    if (!searchData.data || searchData.data.length === 0) {
      return NextResponse.json(
        { error: "User not found in database." },
        { status: 404 },
      );
    }

    const userId = searchData.data[0].id;

    // 2. تحديث كلمة المرور للمستخدم
    const updateRes = await fetch(`${baseUrl}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        password: newPassword,
      }),
    });

    if (!updateRes.ok) {
      const errorText = await updateRes.text();
      console.error("Directus Update Error:", errorText);
      return NextResponse.json({ error: "internal_error" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reset Password Confirm Error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
