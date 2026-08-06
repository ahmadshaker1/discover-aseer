import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { buildPasswordResetEmail } from "@/lib/email/tourGuideNotificationEmails";
import { isSendGridConfigured, sendBrandEmail } from "@/lib/email/sendgrid";
import { getSiteOriginFromRequest } from "@/lib/directus/tourGuideEmailVerification";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    if (!isSendGridConfigured()) {
      return NextResponse.json(
        { error: "SendGrid is not configured." },
        { status: 503 },
      );
    }

    const secret = process.env.NEXTAUTH_SECRET || "fallback-secret-for-jwt";
    const token = jwt.sign({ email }, secret, { expiresIn: "15m" });

    const origin = getSiteOriginFromRequest(request);
    const resetUrl = `${origin}/ar/tour-guides/reset-password/confirm?token=${encodeURIComponent(token)}`;

    const { subject, html } = buildPasswordResetEmail({ resetUrl });
    await sendBrandEmail({ to: email, subject, html });

    return NextResponse.json({
      exists: true,
      message: "Email sent successfully via SendGrid",
    });
  } catch (err: unknown) {
    console.error("Error sending email:", err);
    const sgErr = err as {
      response?: { body?: { errors?: { message?: string }[] } };
      message?: string;
    };
    const errorMessage =
      sgErr.response?.body?.errors?.[0]?.message ||
      sgErr.message ||
      "Failed to send reset link.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
