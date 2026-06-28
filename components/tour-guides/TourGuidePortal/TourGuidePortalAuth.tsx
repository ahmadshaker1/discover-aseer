"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  FormSectionTitle,
  FormSubmitButton,
  FormTextInput,
} from "@/components/tour-guides/TourGuidePortal/TourGuidePortalFormFields";
import { Button } from "@headlessui/react";
import { araBold, ibm } from "@/components/experiences/submit/experienceFormStyles";
import {
  loginTourGuide,
  registerTourGuide,
  type DirectusAuthSession,
} from "@/lib/directus/tourGuideAuth";

type AuthMode = "login" | "register";

interface TourGuidePortalAuthProps {
  onAuthenticated: (session: DirectusAuthSession) => void;
}

function AuthTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex h-[52px] flex-1 cursor-pointer items-center justify-center rounded-[100px] px-6 text-base font-bold transition-all data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2 ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-transparent text-secondary hover:bg-primary/5"
      }`}
      style={{ fontFamily: araBold }}
    >
      {children}
    </Button>
  );
}

const TourGuidePortalAuth = ({ onAuthenticated }: TourGuidePortalAuthProps) => {
  const t = useTranslations("tourGuidePortal.auth");
  const locale = useLocale();
  const baseId = useId();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setError("");
    setSuccessMessage("");
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      if (mode === "login") {
        const session = await loginTourGuide(email, password);
        onAuthenticated(session);
        return;
      }

      const result = await registerTourGuide({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      if (result.kind === "session") {
        onAuthenticated(result.session);
        return;
      }

      setSuccessMessage(result.message);
      setMode("login");
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errorGeneric"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[590px]">
      <div
        className="mb-8 flex w-full gap-2 rounded-[100px] border border-border bg-surface p-1.5"
        role="tablist"
        aria-label={t("modeSwitcherAria")}
      >
        <AuthTab active={mode === "login"} onClick={() => switchMode("login")}>
          {t("tabLogin")}
        </AuthTab>
        <AuthTab
          active={mode === "register"}
          onClick={() => switchMode("register")}
        >
          {t("tabRegister")}
        </AuthTab>
      </div>

      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <div>
          <FormSectionTitle>
            {mode === "login" ? t("loginTitle") : t("registerTitle")}
          </FormSectionTitle>
          <p
            className="-mt-4 mb-8 text-base leading-relaxed text-muted-foreground text-start"
            style={{ fontFamily: ibm }}
          >
            {mode === "login" ? t("loginSubtitle") : t("registerSubtitle")}
          </p>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10">
            {mode === "register" && (
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
                <FormTextInput
                  id={`${baseId}-first-name`}
                  label={t("firstName")}
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  dir={locale === "ar" ? "rtl" : "ltr"}
                />
                <FormTextInput
                  id={`${baseId}-last-name`}
                  label={t("lastName")}
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  dir={locale === "ar" ? "rtl" : "ltr"}
                />
              </div>
            )}

            <FormTextInput
              id={`${baseId}-email`}
              label={t("email")}
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
            />

            <FormTextInput
              id={`${baseId}-password`}
              label={t("password")}
              type="password"
              required
              minLength={8}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              dir="ltr"
              hint={mode === "register" ? t("passwordHint") : undefined}
            />
          </div>
        </div>

        {error ? (
          <p
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 text-start"
            style={{ fontFamily: ibm }}
            role="alert"
          >
            {error}
          </p>
        ) : null}

        {successMessage ? (
          <p
            className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 text-start"
            style={{ fontFamily: ibm }}
            role="status"
          >
            {successMessage}
          </p>
        ) : null}

        <FormSubmitButton disabled={submitting}>
          {submitting
            ? t("submitting")
            : mode === "login"
              ? t("loginButton")
              : t("registerButton")}
        </FormSubmitButton>
      </form>
    </div>
  );
};

export default TourGuidePortalAuth;
