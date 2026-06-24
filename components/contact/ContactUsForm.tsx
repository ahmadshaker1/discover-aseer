"use client";

import {
  FormSectionTitle,
  FormSubmitButton,
  FormTextarea,
  FormTextInput,
  FormYesNoField,
} from "@/components/experiences/submit/ExperienceFormFields";
import { ibm } from "@/components/experiences/submit/experienceFormStyles";
import { useId, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormValues = {
  name: string;
  phone: string;
  email: string;
  fromAseer: boolean | null;
  description: string;
};

const EMPTY_VALUES: FormValues = {
  name: "",
  phone: "",
  email: "",
  fromAseer: null,
  description: "",
};

function isValidPhone(phone: string): boolean {
  return phone.replace(/\D/g, "").length >= 9;
}

export default function ContactUsForm() {
  const t = useTranslations("contactUs");
  const locale = useLocale();
  const baseId = useId();
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [submitMessage, setSubmitMessage] = useState("");

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const canSubmit =
    values.name.trim() !== "" &&
    isValidPhone(values.phone) &&
    EMAIL_RE.test(values.email.trim()) &&
    values.fromAseer !== null &&
    values.description.trim() !== "";

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      setSubmitState("error");
      setSubmitMessage(t("form.errorRequired"));
      return;
    }
    setSubmitState("success");
    setSubmitMessage(t("form.success"));
    setValues(EMPTY_VALUES);
  };

  const textDir = locale === "ar" ? "rtl" : "ltr";

  return (
    <form className="mx-auto w-full max-w-[1026px]" onSubmit={onSubmit} noValidate>
      <FormSectionTitle>{t("form.sectionTitle")}</FormSectionTitle>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
        <FormTextInput
          id={`${baseId}-name`}
          label={t("form.name")}
          required
          value={values.name}
          onChange={(e) => setField("name", e.target.value)}
          dir={textDir}
          autoComplete="name"
        />
        <FormTextInput
          id={`${baseId}-phone`}
          label={t("form.phone")}
          required
          type="tel"
          value={values.phone}
          onChange={(e) => setField("phone", e.target.value)}
          dir="ltr"
          inputMode="tel"
          autoComplete="tel"
          hint={t("form.phoneHint")}
        />
        <FormTextInput
          id={`${baseId}-email`}
          label={t("form.email")}
          required
          type="email"
          value={values.email}
          onChange={(e) => setField("email", e.target.value)}
          dir="ltr"
          autoComplete="email"
          className="md:col-span-2"
        />
        <div className="md:col-span-2">
          <FormYesNoField
            label={t("form.fromAseer")}
            required
            value={values.fromAseer}
            onChange={(value) => setField("fromAseer", value)}
            yesLabel={t("form.fromAseerOptions.yes")}
            noLabel={t("form.fromAseerOptions.no")}
          />
        </div>
        <FormTextarea
          id={`${baseId}-description`}
          label={t("form.description")}
          required
          className="md:col-span-2"
          value={values.description}
          onChange={(e) => setField("description", e.target.value)}
          dir={textDir}
        />
      </div>

      <section
        className="mx-auto mt-12 w-full max-w-[962px] rounded-[12px] sm:mt-16 lg:mt-20"
        aria-label={t("form.formActionsAria")}
      >
        {submitMessage ? (
          <p
            className={`mb-3 text-start text-sm ${
              submitState === "success" ? "text-green-700" : "text-red-600"
            }`}
            style={{ fontFamily: ibm }}
            role="status"
          >
            {submitMessage}
          </p>
        ) : null}
        <FormSubmitButton disabled={!canSubmit}>
          {t("form.submit")}
        </FormSubmitButton>
      </section>
    </form>
  );
}
