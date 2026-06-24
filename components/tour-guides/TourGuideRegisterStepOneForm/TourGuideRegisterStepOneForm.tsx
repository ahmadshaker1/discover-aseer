"use client";

import { useEffect, useId, useMemo, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export const TOUR_GUIDE_REQUIRED_FIELDS_COUNT = 18;

const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";
const araBold = "var(--font-ara-hamah-1964), sans-serif";

type SpecializationId =
  | "land"
  | "marine"
  | "aerial"
  | "heritage"
  | "recreational"
  | "other";

const SPECIALIZATION_IDS: SpecializationId[] = [
  "land",
  "marine",
  "aerial",
  "heritage",
  "recreational",
  "other",
];

/** Values sent to the registration API (Arabic labels). */
const SPECIALIZATION_AR: Record<SpecializationId, string> = {
  land: "متخصص في التجارب والأنشطة البرية",
  marine: "متخصص في التجارب والأنشطة البحرية",
  aerial: "متخصص في التجارب والأنشطة الهوائية",
  heritage: "متخصص في التجارب والأنشطة التراثية والثقافية",
  recreational: "متخصص في سياحة الاستجمام",
  other: "أخرى",
};

const LANGUAGE_LEVEL_VALUES = ["beginner", "intermediate", "advanced"] as const;

const FIELD_GROUP = "flex flex-col gap-2 text-start";
const FIELD_INPUT =
  "h-12 w-full rounded-lg border border-border bg-background text-foreground px-4 text-start";
const CHECK_ROW =
  "flex items-start justify-start gap-3 rounded-lg border border-border bg-background px-3 py-2";
const CHECK_LABEL = "flex items-start justify-start gap-3";

type FormValues = {
  name_ar: string;
  name_en: string;
  gender: "" | "ذكر" | "أنثى";
  National_ID_number: string;
  residence: "" | "aseer" | "other";
  About_me: string;
  License_number: string;
  License_expiry_date: string;
  english_language: "" | "beginner" | "intermediate" | "advanced";
  Arabic_language: "" | "beginner" | "intermediate" | "advanced";
  Other_languages: string;
  Other_languages_level: "" | "beginner" | "intermediate" | "advanced";
  Specialization: string;
  Email: string;
  transportation: "" | "yes" | "no";
  WhatsApp_number: string;
  Mobile_number: string;
  Instagram: string;
  Website: string;
  TikTok: string;
  X_platform: string;
  commitment1: boolean;
  commitment2: boolean;
  commitment3: boolean;
  commitment4: boolean;
};

const EMPTY_VALUES: FormValues = {
  name_ar: "",
  name_en: "",
  gender: "",
  National_ID_number: "",
  residence: "",
  About_me: "",
  License_number: "",
  License_expiry_date: "",
  english_language: "",
  Arabic_language: "",
  Other_languages: "",
  Other_languages_level: "",
  Specialization: "",
  Email: "",
  transportation: "",
  WhatsApp_number: "",
  Mobile_number: "",
  Instagram: "",
  Website: "",
  TikTok: "",
  X_platform: "",
  commitment1: false,
  commitment2: false,
  commitment3: false,
  commitment4: false,
};

function UploadAreaIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.50033 1.41667C7.68049 1.41659 6.87813 1.65359 6.18992 2.09911C5.50171 2.54464 4.95702 3.17968 4.62149 3.92771C4.57377 4.03496 4.52489 4.14168 4.47487 4.24787L4.4607 4.24858C4.41537 4.25 4.35374 4.25 4.25033 4.25C3.49888 4.25 2.77821 4.54851 2.24686 5.07986C1.7155 5.61122 1.41699 6.33189 1.41699 7.08333C1.41699 7.83478 1.7155 8.55545 2.24686 9.0868C2.77821 9.61816 3.49888 9.91667 4.25033 9.91667H4.37216L5.78883 8.5H4.25033C3.8746 8.5 3.51427 8.35074 3.24859 8.08507C2.98291 7.81939 2.83366 7.45906 2.83366 7.08333C2.83366 6.70761 2.98291 6.34728 3.24859 6.0816C3.51427 5.81592 3.8746 5.66667 4.25033 5.66667H4.29566C4.44299 5.66667 4.61441 5.66737 4.75608 5.63833C4.93222 5.60745 5.10065 5.54249 5.25191 5.44708C5.42262 5.33658 5.5402 5.19917 5.62945 5.07379C5.68417 4.99305 5.7318 4.90773 5.77183 4.81879C5.80937 4.74087 5.85541 4.63817 5.91066 4.51562L5.91349 4.50854C6.13691 4.00928 6.50004 3.58534 6.95905 3.28787C7.41806 2.9904 7.95335 2.83212 8.50033 2.83212C9.0473 2.83212 9.58259 2.9904 10.0416 3.28787C10.5006 3.58534 10.8637 4.00928 11.0872 4.50854L11.0907 4.51562C11.1452 4.63817 11.1913 4.74017 11.2288 4.81879C11.2614 4.8875 11.3096 4.98737 11.3712 5.07379C11.4605 5.19846 11.5773 5.33658 11.7487 5.44779C11.9202 5.55829 12.0937 5.60858 12.2446 5.63904C12.3862 5.66737 12.5577 5.66738 12.705 5.66738L12.7503 5.66667C13.126 5.66667 13.4864 5.81592 13.7521 6.0816C14.0177 6.34728 14.167 6.70761 14.167 7.08333C14.167 7.45906 14.0177 7.81939 13.7521 8.08507C13.4864 8.35074 13.126 8.5 12.7503 8.5H11.2118L12.6285 9.91667H12.7503C13.5018 9.91667 14.2224 9.61816 14.7538 9.0868C15.2851 8.55545 15.5837 7.83478 15.5837 7.08333C15.5837 6.33189 15.2851 5.61122 14.7538 5.07986C14.2224 4.54851 13.5018 4.25 12.7503 4.25C12.6469 4.25 12.5853 4.25 12.5399 4.24858H12.5258C12.2315 3.41731 11.6859 2.69815 10.9646 2.19075C10.2434 1.68335 9.38216 1.41283 8.50033 1.41667Z"
        fill="currentColor"
      />
      <path
        d="M8.50014 8.5L7.99935 7.9992L8.50014 7.49841L9.00093 7.9992L8.50014 8.5ZM9.20847 14.875C9.20847 15.0629 9.13385 15.243 9.00101 15.3759C8.86817 15.5087 8.688 15.5833 8.50014 15.5833C8.31228 15.5833 8.13211 15.5087 7.99927 15.3759C7.86644 15.243 7.79181 15.0629 7.79181 14.875H9.20847ZM5.16602 10.8325L7.99935 7.9992L9.00093 9.00079L6.1676 11.8341L5.16602 10.8325ZM9.00093 7.9992L11.8343 10.8325L10.8327 11.8341L7.99935 9.00079L9.00093 7.9992ZM9.20847 8.5V14.875H7.79181V8.5H9.20847Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface TourGuideRegisterStepOneFormProps {
  onCompletionChange: (completedCount: number) => void;
}

function isLicenseDateValid(dateText: string): boolean {
  if (!dateText) return false;
  const picked = new Date(`${dateText}T00:00:00`);
  if (Number.isNaN(picked.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return picked.getTime() >= today.getTime();
}

function buildSpecializationValue(
  selectedSpecializations: SpecializationId[],
  otherSpecialization: string,
) {
  const list = selectedSpecializations
    .filter((item) => item !== "other")
    .map((id) => SPECIALIZATION_AR[id]);
  if (selectedSpecializations.includes("other")) {
    const trimmedOther = otherSpecialization.trim();
    if (trimmedOther) {
      list.push(trimmedOther);
    } else if (list.length === 0) {
      list.push(SPECIALIZATION_AR.other);
    }
  }
  return list.join(", ");
}

const TourGuideRegisterStepOneForm = ({
  onCompletionChange,
}: TourGuideRegisterStepOneFormProps) => {
  const t = useTranslations("tourGuidesRegister");
  const locale = useLocale();
  const baseId = useId();
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    SpecializationId[]
  >([]);
  const [otherSpecialization, setOtherSpecialization] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [licenseAttachmentFile, setLicenseAttachmentFile] =
    useState<File | null>(null);
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const specializationValue = useMemo(
    () =>
      buildSpecializationValue(selectedSpecializations, otherSpecialization),
    [selectedSpecializations, otherSpecialization],
  );

  const completedCount = useMemo(() => {
    return [
      values.name_ar.trim() !== "",
      values.name_en.trim() !== "",
      values.gender !== "",
      values.National_ID_number.trim() !== "",
      profileImageFile != null,
      values.License_number.trim() !== "",
      isLicenseDateValid(values.License_expiry_date),
      licenseAttachmentFile != null,
      values.Arabic_language !== "",
      values.english_language !== "",
      values.transportation !== "",
      specializationValue.trim() !== "",
      values.Email.trim() !== "",
      values.Mobile_number.trim() !== "",
      values.commitment1,
      values.commitment2,
      values.commitment3,
      values.commitment4,
    ].filter(Boolean).length;
  }, [values, profileImageFile, licenseAttachmentFile, specializationValue]);

  const canSubmit = completedCount >= TOUR_GUIDE_REQUIRED_FIELDS_COUNT;

  useEffect(() => {
    onCompletionChange(completedCount);
  }, [completedCount, onCompletionChange]);

  const setField = <K extends keyof FormValues>(
    key: K,
    value: FormValues[K],
  ) => {
    if (submitState !== "idle") {
      setSubmitState("idle");
      setSubmitMessage("");
    }
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const onProfileImageChange = (list: FileList | null) => {
    if (submitState !== "idle") {
      setSubmitState("idle");
      setSubmitMessage("");
    }
    setProfileImageFile(list?.[0] ?? null);
  };

  const onLicenseAttachmentChange = (list: FileList | null) => {
    if (submitState !== "idle") {
      setSubmitState("idle");
      setSubmitMessage("");
    }
    setLicenseAttachmentFile(list?.[0] ?? null);
  };

  const toggleSpecialization = (value: SpecializationId) => {
    const exists = selectedSpecializations.includes(value);
    if (exists) {
      const next = selectedSpecializations.filter((item) => item !== value);
      setSelectedSpecializations(next);
      if (value === "other") {
        setOtherSpecialization("");
      }
      setField(
        "Specialization",
        buildSpecializationValue(
          next,
          value === "other" ? "" : otherSpecialization,
        ),
      );
      return;
    }

    const next = [...selectedSpecializations, value];
    setSelectedSpecializations(next);
    setField(
      "Specialization",
      buildSpecializationValue(next, otherSpecialization),
    );
  };

  const languageLevelLabel = (
    value: (typeof LANGUAGE_LEVEL_VALUES)[number],
  ) => {
    if (value === "beginner") return t("form.levelBeginner");
    if (value === "intermediate") return t("form.levelIntermediate");
    return t("form.levelAdvanced");
  };

  const onOtherSpecializationChange = (value: string) => {
    setOtherSpecialization(value);
    setField(
      "Specialization",
      buildSpecializationValue(selectedSpecializations, value),
    );
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit || submitState === "submitting") {
      return;
    }

    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      if (profileImageFile) {
        formData.append("Personal_photo", profileImageFile);
      }

      if (licenseAttachmentFile) {
        formData.append("Tourist_Guide_License", licenseAttachmentFile);
      }

      const response = await fetch("/api/tour-guides/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error ?? t("form.errorSubmit"));
      }

      setSubmitState("success");
      setSubmitMessage(t("form.success"));
      setValues(EMPTY_VALUES);
      setSelectedSpecializations([]);
      setOtherSpecialization("");
      setProfileImageFile(null);
      setLicenseAttachmentFile(null);
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error ? error.message : t("form.errorGeneric"),
      );
    }
  };

  return (
    <form className="mx-auto w-full max-w-[1026px]" onSubmit={onSubmit}>
      <div className="mb-10">
        <h2
          className="mb-6 text-2xl font-bold text-foreground text-start"
          style={{ fontFamily: araBold }}
        >
          {t("form.personalInfo")}
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          <div className={FIELD_GROUP}>
            <label
              htmlFor={`${baseId}-name-ar`}
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.nameAr")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-name-ar`}
              value={values.name_ar}
              onChange={(e) => setField("name_ar", e.target.value)}
              className={FIELD_INPUT}
              style={{ fontFamily: ibm }}
              dir="rtl"
            />
          </div>

          <div className={FIELD_GROUP}>
            <label
              htmlFor={`${baseId}-name-en`}
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.nameEn")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-name-en`}
              value={values.name_en}
              onChange={(e) => setField("name_en", e.target.value)}
              className={FIELD_INPUT}
              style={{ fontFamily: ibm }}
              dir="ltr"
            />
          </div>

          <div className={FIELD_GROUP}>
            <label
              htmlFor={`${baseId}-gender`}
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.gender")} <span className="text-red-600">*</span>
            </label>
            <select
              id={`${baseId}-gender`}
              value={values.gender}
              onChange={(e) =>
                setField("gender", e.target.value as FormValues["gender"])
              }
              className={FIELD_INPUT}
              style={{ fontFamily: ibm }}
            >
              <option value="">{t("form.select")}</option>
              <option value="ذكر">{t("form.genderMale")}</option>
              <option value="أنثى">{t("form.genderFemale")}</option>
            </select>
          </div>

          <div className={FIELD_GROUP}>
            <label
              htmlFor={`${baseId}-nid`}
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.nationalId")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-nid`}
              value={values.National_ID_number}
              onChange={(e) => setField("National_ID_number", e.target.value)}
              className={FIELD_INPUT}
              style={{ fontFamily: ibm }}
              inputMode="numeric"
            />
          </div>

          <div className={FIELD_GROUP}>
            <label
              htmlFor={`${baseId}-residence`}
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.residence")}
            </label>
            <select
              id={`${baseId}-residence`}
              value={values.residence}
              onChange={(e) =>
                setField("residence", e.target.value as FormValues["residence"])
              }
              className={FIELD_INPUT}
              style={{ fontFamily: ibm }}
            >
              <option value="">{t("form.select")}</option>
              <option value="aseer">{t("form.residenceAseer")}</option>
              <option value="other">{t("form.residenceOther")}</option>
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col gap-2 text-start">
            <label
              htmlFor={`${baseId}-bio`}
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.aboutMe")}
            </label>
            <textarea
              id={`${baseId}-bio`}
              value={values.About_me}
              onChange={(e) => setField("About_me", e.target.value)}
              className="min-h-[110px] w-full rounded-lg border border-border bg-background text-foreground p-4 text-start"
              style={{ fontFamily: ibm }}
              dir={locale === "ar" ? "rtl" : "ltr"}
            />
          </div>
          <div className={FIELD_GROUP}>
            <p
              className="mb-1 text-start text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.profilePhoto")} <span className="text-red-600">*</span>
            </p>
            <label
              htmlFor={`${baseId}-profile-image`}
              className="flex min-h-[130px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-surface px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              <input
                id={`${baseId}-profile-image`}
                type="file"
                className="sr-only"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) => onProfileImageChange(e.target.files)}
              />
              <span
                className="flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-[49px] bg-primary/10"
                aria-hidden
              >
                <UploadAreaIcon />
              </span>
              <span
                className="text-center text-[14px] font-bold leading-[120%] text-primary"
                style={{ fontFamily: araBold }}
              >
                {t("form.browsePhoto")}
              </span>
              <span
                className="text-xs text-muted-foreground"
                style={{ fontFamily: ibm }}
              >
                {t("form.fileTypesImage")}
              </span>
              {profileImageFile ? (
                <span
                  className="mt-2 text-xs text-primary"
                  style={{ fontFamily: ibm }}
                >
                  {profileImageFile.name}
                </span>
              ) : null}
            </label>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2
          className="mb-6 text-2xl font-bold text-foreground text-start"
          style={{ fontFamily: araBold }}
        >
          {t("form.generalInfo")}
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          <div className={FIELD_GROUP}>
            <label
              htmlFor={`${baseId}-license-number`}
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.licenseNumber")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-license-number`}
              value={values.License_number}
              onChange={(e) => setField("License_number", e.target.value)}
              className={FIELD_INPUT}
              style={{ fontFamily: ibm }}
            />
          </div>

          <div className={FIELD_GROUP}>
            <label
              htmlFor={`${baseId}-license-date`}
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.licenseExpiry")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-license-date`}
              type="date"
              value={values.License_expiry_date}
              onChange={(e) => setField("License_expiry_date", e.target.value)}
              className="h-12 w-full rounded-lg border border-border bg-background text-foreground px-4 dark:[color-scheme:dark]"
              style={{ fontFamily: ibm }}
            />
          </div>

          <div className={FIELD_GROUP}>
            <label
              htmlFor={`${baseId}-arabic-level`}
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.arabicLanguage")} <span className="text-red-600">*</span>
            </label>
            <select
              id={`${baseId}-arabic-level`}
              value={values.Arabic_language}
              onChange={(e) =>
                setField(
                  "Arabic_language",
                  e.target.value as FormValues["Arabic_language"],
                )
              }
              className={FIELD_INPUT}
              style={{ fontFamily: ibm }}
            >
              <option value="">{t("form.select")}</option>
              {LANGUAGE_LEVEL_VALUES.map((value) => (
                <option key={value} value={value}>
                  {languageLevelLabel(value)}
                </option>
              ))}
            </select>
          </div>

          <div className={FIELD_GROUP}>
            <label
              htmlFor={`${baseId}-english-level`}
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.englishLanguage")}{" "}
              <span className="text-red-600">*</span>
            </label>
            <select
              id={`${baseId}-english-level`}
              value={values.english_language}
              onChange={(e) =>
                setField(
                  "english_language",
                  e.target.value as FormValues["english_language"],
                )
              }
              className={FIELD_INPUT}
              style={{ fontFamily: ibm }}
            >
              <option value="">{t("form.select")}</option>
              {LANGUAGE_LEVEL_VALUES.map((value) => (
                <option key={value} value={value}>
                  {languageLevelLabel(value)}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className={FIELD_GROUP}>
              <label
                htmlFor={`${baseId}-other-languages`}
                className="text-base font-bold text-foreground"
                style={{ fontFamily: araBold }}
              >
                {t("form.otherLanguages")}
              </label>
              <input
                id={`${baseId}-other-languages`}
                value={values.Other_languages}
                onChange={(e) => setField("Other_languages", e.target.value)}
                className={FIELD_INPUT}
                style={{ fontFamily: ibm }}
                placeholder={t("form.otherLanguagesPlaceholder")}
              />
            </div>
            <div className={FIELD_GROUP}>
              <label
                htmlFor={`${baseId}-other-languages-level`}
                className="text-base font-bold text-foreground"
                style={{ fontFamily: araBold }}
              >
                {t("form.otherLanguagesLevel")}
              </label>
              <select
                id={`${baseId}-other-languages-level`}
                value={values.Other_languages_level}
                onChange={(e) =>
                  setField(
                    "Other_languages_level",
                    e.target.value as FormValues["Other_languages_level"],
                  )
                }
                className={FIELD_INPUT}
                style={{ fontFamily: ibm }}
              >
                <option value="">{t("form.select")}</option>
                {LANGUAGE_LEVEL_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {languageLevelLabel(value)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-3 text-start">
            <p
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.specialization")} <span className="text-red-600">*</span>
            </p>
            <div className="grid grid-cols-1 gap-2">
              {SPECIALIZATION_IDS.map((item) => (
                <label key={item} className={CHECK_ROW}>
                  <input
                    type="checkbox"
                    className="mt-0.5 shrink-0"
                    checked={selectedSpecializations.includes(item)}
                    onChange={() => toggleSpecialization(item)}
                  />
                  <span
                    className="flex-1 text-sm text-start text-foreground"
                    style={{ fontFamily: ibm }}
                  >
                    {t(`form.specializations.${item}`)}
                  </span>
                </label>
              ))}
            </div>
            {selectedSpecializations.includes("other") ? (
              <input
                value={otherSpecialization}
                onChange={(e) => onOtherSpecializationChange(e.target.value)}
                className={FIELD_INPUT}
                style={{ fontFamily: ibm }}
                placeholder={t("form.otherSpecializationPlaceholder")}
              />
            ) : null}
          </div>

          <div className={FIELD_GROUP}>
            <label
              htmlFor={`${baseId}-transportation`}
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.transportation")} <span className="text-red-600">*</span>
            </label>
            <select
              id={`${baseId}-transportation`}
              value={values.transportation}
              onChange={(e) =>
                setField(
                  "transportation",
                  e.target.value as FormValues["transportation"],
                )
              }
              className={FIELD_INPUT}
              style={{ fontFamily: ibm }}
            >
              <option value="">{t("form.select")}</option>
              <option value="yes">{t("form.yes")}</option>
              <option value="no">{t("form.no")}</option>
            </select>
          </div>
          <div className={FIELD_GROUP}>
            <p
              className="mb-1 text-start text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.licenseAttachment")}{" "}
              <span className="text-red-600">*</span>
            </p>
            <label
              htmlFor={`${baseId}-license-attachment`}
              className="flex min-h-[130px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-surface px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              <input
                id={`${baseId}-license-attachment`}
                type="file"
                className="sr-only"
                accept=".jpg,.jpeg,.pdf"
                onChange={(e) => onLicenseAttachmentChange(e.target.files)}
              />
              <span
                className="flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-[49px] bg-primary/10"
                aria-hidden
              >
                <UploadAreaIcon />
              </span>
              <span
                className="text-center text-[14px] font-bold leading-[120%] text-primary"
                style={{ fontFamily: araBold }}
              >
                {t("form.browseAttachment")}
              </span>
              <span
                className="text-xs text-muted-foreground"
                style={{ fontFamily: ibm }}
              >
                {t("form.fileTypesLicense")}
              </span>
              {licenseAttachmentFile ? (
                <span
                  className="mt-2 text-xs text-primary"
                  style={{ fontFamily: ibm }}
                >
                  {licenseAttachmentFile.name}
                </span>
              ) : null}
            </label>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2
          className="mb-6 text-2xl font-bold text-foreground text-start"
          style={{ fontFamily: araBold }}
        >
          {t("form.contactInfo")}
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          <div className={FIELD_GROUP}>
            <label
              htmlFor={`${baseId}-email`}
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.email")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-email`}
              type="email"
              value={values.Email}
              onChange={(e) => setField("Email", e.target.value)}
              className={FIELD_INPUT}
              style={{ fontFamily: ibm }}
              dir="ltr"
            />
          </div>

          <div className={FIELD_GROUP}>
            <label
              htmlFor={`${baseId}-mobile`}
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.mobile")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-mobile`}
              value={values.Mobile_number}
              onChange={(e) => setField("Mobile_number", e.target.value)}
              className={FIELD_INPUT}
              style={{ fontFamily: ibm }}
              inputMode="tel"
            />
          </div>

          <div className={FIELD_GROUP}>
            <label
              htmlFor={`${baseId}-whatsapp`}
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {t("form.whatsapp")}
            </label>
            <input
              id={`${baseId}-whatsapp`}
              value={values.WhatsApp_number}
              onChange={(e) => setField("WhatsApp_number", e.target.value)}
              className={FIELD_INPUT}
              style={{ fontFamily: ibm }}
              inputMode="tel"
            />
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2
          className="mb-6 text-2xl font-bold text-foreground text-start"
          style={{ fontFamily: araBold }}
        >
          {t("form.socialAccounts")}
        </h2>
        <div className={FIELD_GROUP}>
          <label
            htmlFor={`${baseId}-website`}
            className="text-base font-bold text-foreground"
            style={{ fontFamily: araBold }}
          >
            {t("form.website")}
          </label>
          <input
            id={`${baseId}-website`}
            value={values.Website}
            onChange={(e) => setField("Website", e.target.value)}
            className={FIELD_INPUT}
            style={{ fontFamily: ibm }}
            dir="ltr"
          />
        </div>

        <div className={FIELD_GROUP}>
          <label
            htmlFor={`${baseId}-instagram`}
            className="text-base font-bold text-foreground"
            style={{ fontFamily: araBold }}
          >
            {t("form.instagram")}
          </label>
          <input
            id={`${baseId}-instagram`}
            value={values.Instagram}
            onChange={(e) => setField("Instagram", e.target.value)}
            className={FIELD_INPUT}
            style={{ fontFamily: ibm }}
            dir="ltr"
          />
        </div>

        <div className={FIELD_GROUP}>
          <label
            htmlFor={`${baseId}-x`}
            className="text-base font-bold text-foreground"
            style={{ fontFamily: araBold }}
          >
            {t("form.xPlatform")}
          </label>
          <input
            id={`${baseId}-x`}
            value={values.X_platform}
            onChange={(e) => setField("X_platform", e.target.value)}
            className={FIELD_INPUT}
            style={{ fontFamily: ibm }}
            dir="ltr"
          />
        </div>

        <div className={FIELD_GROUP}>
          <label
            htmlFor={`${baseId}-tiktok`}
            className="text-base font-bold text-foreground"
            style={{ fontFamily: araBold }}
          >
            {t("form.tiktok")}
          </label>
          <input
            id={`${baseId}-tiktok`}
            value={values.TikTok}
            onChange={(e) => setField("TikTok", e.target.value)}
            className={FIELD_INPUT}
            style={{ fontFamily: ibm }}
            dir="ltr"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-3 text-start">
          <p
            className="text-base font-bold text-foreground"
            style={{ fontFamily: araBold }}
          >
            {t("form.commitmentsTitle")} <span className="text-red-600">*</span>
          </p>
          <label className={CHECK_LABEL}>
            <input
              type="checkbox"
              className="mt-1 shrink-0"
              checked={values.commitment1}
              onChange={(e) => setField("commitment1", e.target.checked)}
            />
            <span
              className="flex-1 text-sm text-start"
              style={{ fontFamily: ibm }}
            >
              {t("form.commitment1")} <span className="text-red-600">*</span>
            </span>
          </label>
          <label className={CHECK_LABEL}>
            <input
              type="checkbox"
              className="mt-1 shrink-0"
              checked={values.commitment2}
              onChange={(e) => setField("commitment2", e.target.checked)}
            />
            <span
              className="flex-1 text-sm text-start"
              style={{ fontFamily: ibm }}
            >
              {t("form.commitment2")} <span className="text-red-600">*</span>
            </span>
          </label>
          <label className={CHECK_LABEL}>
            <input
              type="checkbox"
              className="mt-1 shrink-0"
              checked={values.commitment3}
              onChange={(e) => setField("commitment3", e.target.checked)}
            />
            <span
              className="flex-1 text-sm text-start"
              style={{ fontFamily: ibm }}
            >
              {t("form.commitment3")} <span className="text-red-600">*</span>
            </span>
          </label>
          <label className={CHECK_LABEL}>
            <input
              type="checkbox"
              className="mt-1 shrink-0"
              checked={values.commitment4}
              onChange={(e) => setField("commitment4", e.target.checked)}
            />
            <span
              className="flex-1 text-sm text-start"
              style={{ fontFamily: ibm }}
            >
              <Link
                href="/privacy"
                className="underline hover:opacity-80"
                onClick={(e) => e.stopPropagation()}
              >
                {t("form.commitment4")}
              </Link>{" "}
              <span className="text-red-600">*</span>
            </span>
          </label>
        </div>
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
        <button
          type="submit"
          disabled={!canSubmit || submitState === "submitting"}
          className="flex h-[62px] w-full items-center justify-center gap-[10px] rounded-[100px] bg-primary px-[22px] py-[14px] text-lg font-bold text-primary-foreground transition-opacity hover:enabled:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-45"
          style={{ fontFamily: araBold }}
        >
          {submitState === "submitting"
            ? t("form.submitting")
            : t("form.submit")}
        </button>
      </section>
    </form>
  );
};

export default TourGuideRegisterStepOneForm;
