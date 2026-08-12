"use client";

import { useId, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  FormSectionTitle,
  FormSubmitButton,
  FormTextInput,
} from "@/components/tour-guides/TourGuidePortal/TourGuidePortalFormFields";
import {
  loginTourGuide,
  type DirectusAuthSession,
} from "@/lib/directus/tourGuideAuth";

interface TourGuidePortalAuthProps {
  onAuthenticated: (session: DirectusAuthSession) => void;
}

const TourGuidePortalAuth = ({ onAuthenticated }: TourGuidePortalAuthProps) => {
  const t = useTranslations("tourGuidePortal.auth");
  const locale = useLocale();
  const baseId = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showResendVerify, setShowResendVerify] = useState(false);
  const [resending, setResending] = useState(false);

  const resendVerification = async () => {
    if (!email.trim()) return;
    setResending(true);
    setError("");
    try {
      const res = await fetch("/api/tour-guides/auth/verify-email/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setError(data.error || t("errorGeneric"));
        return;
      }
      setSuccessMessage(data.message || t("resendVerifySent"));
      setShowResendVerify(false);
    } catch {
      setError(t("errorGeneric"));
    } finally {
      setResending(false);
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccessMessage("");
    setShowResendVerify(false);

    try {
      const session = await loginTourGuide(email, password);
      onAuthenticated(session);
    } catch (err) {
      const message = err instanceof Error ? err.message : t("errorGeneric");
      setError(message);
      if (
        /verify your email|تأكيد بريدك|verification link|رابط التأكيد/i.test(
          message,
        )
      ) {
        setShowResendVerify(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[590px]">
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <div>
          <FormSectionTitle>{t("loginTitle")}</FormSectionTitle>
          <p className="-mt-4 mb-8 text-base leading-relaxed text-muted-foreground text-start" />

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

            <FormTextInput
              id={`${baseId}-password`}
              label={t("password")}
              type="password"
              required
              minLength={8}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              dir="ltr"
              disabled={submitting}
            />
          </div>
        </div>
        <div className="w-full flex justify-start">
          <Link
            href="/tour-guides/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            {locale === "ar" ? "نسيت كلمة المرور؟" : "Forgot Password?"}
          </Link>
        </div>

        {error ? (
          <div className="flex flex-col gap-3">
            <p
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 text-start"
              role="alert"
            >
              {error}
            </p>
            {showResendVerify ? (
              <button
                type="button"
                onClick={() => void resendVerification()}
                disabled={resending || !email.trim()}
                className="self-start text-sm font-medium text-primary hover:underline disabled:opacity-50"
              >
                {resending ? t("submitting") : t("resendVerify")}
              </button>
            ) : null}
          </div>
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
          {submitting ? t("submitting") : t("loginButton")}
        </FormSubmitButton>
      </form>
    </div>
  );
};

export default TourGuidePortalAuth;
