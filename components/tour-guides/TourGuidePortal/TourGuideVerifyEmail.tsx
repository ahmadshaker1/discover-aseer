"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { FormSectionTitle } from "@/components/tour-guides/TourGuidePortal/TourGuidePortalFormFields";
import {
  araBold,
  ibm,
} from "@/components/experiences/submit/experienceFormStyles";

type VerifyState = "loading" | "success" | "already" | "error";

export default function TourGuideVerifyEmail() {
  const t = useTranslations("tourGuidePortal.auth");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [state, setState] = useState<VerifyState>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setState("error");
      setMessage(t("verifyMissingToken"));
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/tour-guides/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = (await res.json()) as {
          message?: string;
          error?: string;
          alreadyVerified?: boolean;
        };

        if (cancelled) return;

        if (!res.ok) {
          setState("error");
          setMessage(data.error || t("verifyFailed"));
          return;
        }

        setMessage(data.message || t("verifySuccess"));
        setState(data.alreadyVerified ? "already" : "success");
      } catch {
        if (!cancelled) {
          setState("error");
          setMessage(t("verifyFailed"));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, t]);

  return (
    <div className="mx-auto w-full max-w-[590px]">
      <FormSectionTitle>{t("verifyTitle")}</FormSectionTitle>
      <p
        className="-mt-4 mb-8 text-base leading-relaxed text-muted-foreground text-start"
        style={{ fontFamily: ibm }}
      >
        {state === "loading" ? t("verifyLoading") : message}
      </p>

      {state === "loading" ? null : (
        <div className="flex flex-col gap-4">
          {(state === "success" || state === "already") && (
            <Link
              href="/tour-guides/portal"
              className="inline-flex h-[52px] items-center justify-center rounded-[100px] bg-primary px-8 text-base font-bold text-primary-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("verifyGoToSignIn")}
            </Link>
          )}

          {state === "error" ? (
            <div className="flex flex-col gap-3">
              <p
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 text-start"
                style={{ fontFamily: ibm }}
                role="alert"
              >
                {message}
              </p>
              <Link
                href="/tour-guides/portal"
                className="text-sm font-medium text-primary hover:underline text-start"
                style={{ fontFamily: araBold }}
              >
                {locale === "ar"
                  ? "العودة إلى بوابة المرشدين"
                  : "Back to tour guide portal"}
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
