"use client";

import { useId, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";
import {
  FormSectionTitle,
  FormSubmitButton,
  FormTextInput,
} from "@/components/tour-guides/TourGuidePortal/TourGuidePortalFormFields";
import {
  araBold,
  ibm,
} from "@/components/experiences/submit/experienceFormStyles";

export default function TourGuideResetPasswordConfirm() {
  const t = useTranslations("tourGuidePortal.auth");
  const locale = useLocale();
  const baseId = useId();
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccessMessage("");

    if (!token) {
      setError(
        locale === "ar"
          ? "رابط الاستعادة غير صالح أو مفقود."
          : "Invalid or missing reset token.",
      );
      setSubmitting(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(
        locale === "ar"
          ? "كلمتا المرور غير متطابقتين."
          : "Passwords do not match.",
      );
      setSubmitting(false);
      return;
    }

    if (newPassword.length < 8) {
      setError(
        locale === "ar"
          ? "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل."
          : "Password must be at least 8 characters long.",
      );
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/tour-guides/auth/reset-password/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(
          locale === "ar"
            ? "تم تغيير كلمة المرور بنجاح! سيتم تحويلك لصفحة الدخول..."
            : "Password changed successfully! Redirecting to login...",
        );
        setTimeout(() => {
          router.push("/tour-guides/portal");
        }, 2500);
      } else {
        let errorMsg = "";
        if (data.error === "Missing token or password.") {
          errorMsg =
            locale === "ar"
              ? "رمز التحقق أو كلمة المرور مفقودة."
              : "Missing token or password.";
        } else if (data.error === "Token is invalid or has expired.") {
          errorMsg =
            locale === "ar"
              ? "رابط الاستعادة غير صالح أو منتهي الصلاحية."
              : "Reset link is invalid or has expired.";
        } else if (data.error === "Invalid token data.") {
          errorMsg =
            locale === "ar"
              ? "بيانات الرابط غير صالحة."
              : "Invalid token data.";
        } else if (data.error === "User not found in database.") {
          errorMsg =
            locale === "ar" ? "المستخدم غير موجود." : "User not found.";
        } else {
          errorMsg =
            locale === "ar"
              ? "حدث خطأ غير متوقع، يرجى المحاولة لاحقاً."
              : "An unexpected error occurred, please try again later.";
        }
        setError(errorMsg);
      }
    } catch (err) {
      console.error(err);
      setError(
        locale === "ar"
          ? "حدث خطأ غير متوقع، يرجى المحاولة لاحقاً."
          : "An unexpected error occurred, please try again later.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[590px]">
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <div>
          <FormSectionTitle>
            {locale === "ar" ? "تعيين كلمة المرور الجديدة" : "Set New Password"}
          </FormSectionTitle>
          <p
            className="-mt-4 mb-8 text-base leading-relaxed text-muted-foreground text-start"
          >
            {locale === "ar"
              ? "الرجاء إدخال كلمة المرور الجديدة وتأكيدها."
              : "Please enter and confirm your new password."}
          </p>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10">
            <FormTextInput
              id={`${baseId}-new-password`}
              label={locale === "ar" ? "كلمة المرور الجديدة" : "New Password"}
              type="password"
              required
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              dir="ltr"
              disabled={submitting || successMessage !== ""}
            />
            <FormTextInput
              id={`${baseId}-confirm-password`}
              label={locale === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
              type="password"
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              dir="ltr"
              disabled={submitting || successMessage !== ""}
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

        <FormSubmitButton disabled={submitting || successMessage !== ""}>
          {submitting
            ? t("submitting")
            : locale === "ar"
              ? "حفظ وتغيير كلمة المرور"
              : "Save New Password"}
        </FormSubmitButton>

        <div className="text-center">
          <Link
            href="/tour-guides/portal"
            className="text-sm font-medium text-primary hover:underline transition-all"
          >
            {locale === "ar"
              ? "إلغاء والعودة لتسجيل الدخول"
              : "Cancel and back to login"}
          </Link>
        </div>
      </form>
    </div>
  );
}
