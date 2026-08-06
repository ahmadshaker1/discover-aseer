"use client";

import { useId, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  FormSectionTitle,
  FormSubmitButton,
  FormTextInput,
} from "@/components/tour-guides/TourGuidePortal/TourGuidePortalFormFields";

export default function TourGuideForgotPassword() {
  const t = useTranslations("tourGuidePortal.auth");
  const locale = useLocale();
  const baseId = useId();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/tour-guides/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.exists) {
        setSuccessMessage(
          locale === "ar"
            ? "إذا كان بريدك مسجلاً لدينا، فستصلك رسالة تحتوي على رابط إعادة تعيين كلمة المرور."
            : "If your email is registered, you will receive a password reset link.",
        );
        setEmail("");
      } else {
        setError(
          data.error ||
            (locale === "ar"
              ? "هذا الايميل غير موجود"
              : "This email does not exist"),
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[590px]">
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <div>
          <FormSectionTitle>
            {locale === "ar" ? "نسيت كلمة المرور" : "Forgot Password"}
          </FormSectionTitle>
          <p
            className="-mt-4 mb-8 text-base leading-relaxed text-muted-foreground text-start"
          >
            {locale === "ar"
              ? "الرجاء إدخال بريدك الإلكتروني ليتم إرسال رابط إعادة تعيين كلمة المرور."
              : "Please enter your email address to receive a password reset link."}
          </p>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10">
            <FormTextInput
              id={`${baseId}-email`}
              label={t("email")}
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
              disabled={submitting}
            />
          </div>
        </div>

        {error ? (
          <p
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 text-start"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        {successMessage ? (
          <p
            className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 text-start"
            role="status"
          >
            {successMessage}
          </p>
        ) : null}

        <FormSubmitButton disabled={submitting}>
          {submitting
            ? t("submitting")
            : locale === "ar"
              ? "إرسال رابط الاستعادة"
              : "Send Reset Link"}
        </FormSubmitButton>

        <div className="text-center">
          <Link
            href="/tour-guides/portal"
            className="text-sm font-medium text-primary hover:underline transition-all"
          >
            {locale === "ar" ? "العودة لتسجيل الدخول" : "Back to login"}
          </Link>
        </div>
      </form>
    </div>
  );
}
