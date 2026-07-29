import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  // إعداد مفتاح SendGrid هنا لضمان قراءته بشكل صحيح
  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    if (!process.env.SENDGRID_API_KEY) {
      return NextResponse.json(
        { error: "SendGrid is not configured." },
        { status: 503 },
      );
    }

    // هنا نقوم بإنشاء Token آمن يحتوي على الإيميل وينتهي بعد 15 دقيقة
    const secret = process.env.NEXTAUTH_SECRET || "fallback-secret-for-jwt";
    const token = jwt.sign({ email }, secret, { expiresIn: "15m" });

    // رابط صفحة تعيين كلمة المرور الجديدة في موقعنا
    // نمرر التوكن في الرابط لكي نتأكد منه في الصفحة التالية
    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_DIRECTUS_APP_URL ||
      "http://localhost:3000";
    const resetUrl = `${origin}/ar/tour-guides/reset-password/confirm?token=${token}`;

    // إعداد رسالة الإيميل
    const msg = {
      to: email,
      from: "noreply@discoveraseer.com",
      subject: "إعادة تعيين كلمة المرور - اكتشف عسير",
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; text-align: right; padding: 20px; background-color: #f9fafb; color: #111827;">
          <h2 style="color: #0b5c46;">طلب إعادة تعيين كلمة المرور</h2>
          <p>لقد طلبنا إعادة تعيين كلمة المرور الخاصة بحسابك في اكتشف عسير.</p>
          <p>إذا لم تكن أنت من طلب ذلك، يرجى تجاهل هذا الإيميل.</p>
          <p>لتعيين كلمة مرور جديدة، اضغط على الزر أدناه:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0b5c46; color: white; text-decoration: none; border-radius: 6px; margin-top: 10px;">
            تعيين كلمة مرور جديدة
          </a>
          <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">
            هذا الرابط صالح لمدة 15 دقيقة فقط.
          </p>
        </div>
      `,
    };

    // إرسال الإيميل عبر SendGrid
    await sgMail.send(msg);

    // نرجع للمستخدم بأن الطلب نجح لكي تظهر رسالة النجاح في الواجهة
    return NextResponse.json({
      exists: true,
      message: "Email sent successfully via SendGrid",
    });
  } catch (err: any) {
    console.error("Error sending email:", err);
    // Extract SendGrid detailed error if present
    const errorMessage =
      err.response?.body?.errors?.[0]?.message ||
      err.message ||
      "Failed to send reset link.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
