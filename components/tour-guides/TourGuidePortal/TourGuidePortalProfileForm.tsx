"use client";

import { useEffect, useId, useMemo, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import type { ApiTouristGuide } from "@/components/tour-guides/types";
import {
  apiProfileToPortalForm,
  EMPTY_PORTAL_FORM,
  portalFormToApiPayload,
  type TourGuidePortalFormValues,
} from "@/lib/directus/tourGuideFieldMap";
import {
  createTourGuideProfile,
  updateTourGuideProfile,
  uploadTourGuideFile,
} from "@/lib/directus/tourGuideProfile";
import { TOUR_GUIDE_PUBLISHED_STATUS } from "@/lib/directus/config";

const araBold = "var(--font-ara-hamah-1964), sans-serif";
const FIELD_GROUP = "flex flex-col gap-2 text-start";
const FIELD_INPUT =
  "h-12 w-full rounded-lg border border-border bg-background text-foreground px-4 text-start";
const CHECK_ROW =
  "flex cursor-pointer items-start justify-start gap-3 rounded-lg border border-border bg-background px-3 py-2";
const FIELD_SELECT =
  `${FIELD_INPUT} cursor-pointer`;
const FIELD_FILE = `${FIELD_INPUT} cursor-pointer`;

const LANGUAGE_LEVELS = ["beginner", "intermediate", "advanced"] as const;

interface TourGuidePortalProfileFormProps {
  profile: ApiTouristGuide | null;
  onSaved: (profile: ApiTouristGuide) => void;
}

function isLicenseDateValid(dateText: string): boolean {
  if (!dateText) return false;
  const picked = new Date(`${dateText}T00:00:00`);
  if (Number.isNaN(picked.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return picked.getTime() >= today.getTime();
}

const TourGuidePortalProfileForm = ({
  profile,
  onSaved,
}: TourGuidePortalProfileFormProps) => {
  const t = useTranslations("tourGuidePortal");
  const tForm = useTranslations("tourGuidesRegister.form");
  const baseId = useId();

  const [values, setValues] = useState<TourGuidePortalFormValues>(EMPTY_PORTAL_FORM);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setValues(apiProfileToPortalForm(profile));
    }
  }, [profile]);

  const isPublished = profile?.status === TOUR_GUIDE_PUBLISHED_STATUS;

  const canSubmit = useMemo(() => {
    const hasImage = profileImageFile != null || Boolean(profile?.image);
    const hasLicense =
      licenseFile != null || Boolean(profile?.license_attachment);
    return (
      values.name_ar.trim() !== "" &&
      values.name_en.trim() !== "" &&
      values.gender !== "" &&
      values.National_ID_number.trim() !== "" &&
      hasImage &&
      values.License_number.trim() !== "" &&
      isLicenseDateValid(values.License_expiry_date) &&
      hasLicense &&
      values.Arabic_language !== "" &&
      values.english_language !== "" &&
      values.transportation !== "" &&
      values.Specialization.trim() !== "" &&
      values.Email.trim() !== "" &&
      values.Mobile_number.trim() !== "" &&
      values.commitment1 &&
      values.commitment2 &&
      values.commitment3
    );
  }, [values, profileImageFile, licenseFile, profile]);

  const setField = <K extends keyof TourGuidePortalFormValues>(
    key: K,
    value: TourGuidePortalFormValues[K],
  ) => {
    if (submitState !== "idle") {
      setSubmitState("idle");
      setMessage("");
    }
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit || submitState === "submitting") return;

    setSubmitState("submitting");
    setMessage("");

    try {
      let imageId: string | null = null;
      let licenseId: string | null = null;

      if (profileImageFile) {
        imageId = await uploadTourGuideFile(profileImageFile);
      }
      if (licenseFile) {
        licenseId = await uploadTourGuideFile(licenseFile);
      }

      const payload = portalFormToApiPayload(values, {
        imageId,
        licenseId,
      });

      const saved = profile?.id
        ? await updateTourGuideProfile(profile.id, payload)
        : await createTourGuideProfile(payload);

      setSubmitState("success");
      setMessage(t("profile.savedDraft"));
      onSaved(saved);
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error ? error.message : t("profile.errorGeneric"),
      );
    }
  };

  return (
    <form className="mx-auto w-full max-w-[1026px]" onSubmit={onSubmit}>
      {profile && (
        <div
          className={`mb-8 rounded-xl border px-4 py-3 text-start text-sm ${
            isPublished
              ? "border-green-300 bg-green-50 text-green-900"
              : "border-amber-300 bg-amber-50 text-amber-900"
          }`}
        >
          {isPublished ? t("profile.statusPublished") : t("profile.statusDraft")}
        </div>
      )}

      {!profile && (
        <p className="mb-8 text-start text-muted-foreground">{t("profile.createHint")}</p>
      )}

      <div className="mb-10">
        <h2
          className="mb-6 text-2xl font-bold text-foreground text-start"
          style={{ fontFamily: araBold }}
        >
          {tForm("personalInfo")}
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-name-ar`} className="text-base font-bold">
              {tForm("nameAr")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-name-ar`}
              required
              value={values.name_ar}
              onChange={(e) => setField("name_ar", e.target.value)}
              className={FIELD_INPUT}
            />
          </div>
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-name-en`} className="text-base font-bold">
              {tForm("nameEn")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-name-en`}
              required
              value={values.name_en}
              onChange={(e) => setField("name_en", e.target.value)}
              className={FIELD_INPUT}
            />
          </div>
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-gender`} className="text-base font-bold">
              {tForm("gender")} <span className="text-red-600">*</span>
            </label>
            <select
              id={`${baseId}-gender`}
              required
              value={values.gender}
              onChange={(e) =>
                setField("gender", e.target.value as TourGuidePortalFormValues["gender"])
              }
              className={FIELD_SELECT}
            >
              <option value="">{tForm("select")}</option>
              <option value="ذكر">{tForm("genderMale")}</option>
              <option value="أنثى">{tForm("genderFemale")}</option>
            </select>
          </div>
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-national-id`} className="text-base font-bold">
              {tForm("nationalId")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-national-id`}
              required
              value={values.National_ID_number}
              onChange={(e) => setField("National_ID_number", e.target.value)}
              className={FIELD_INPUT}
            />
          </div>
          <div className={`${FIELD_GROUP} md:col-span-2`}>
            <label htmlFor={`${baseId}-about`} className="text-base font-bold">
              {tForm("aboutMe")}
            </label>
            <textarea
              id={`${baseId}-about`}
              rows={4}
              value={values.About_me}
              onChange={(e) => setField("About_me", e.target.value)}
              className={`${FIELD_INPUT} h-auto min-h-[120px] py-3`}
            />
          </div>
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-photo`} className="text-base font-bold">
              {tForm("profilePhoto")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-photo`}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={(e) => setProfileImageFile(e.target.files?.[0] ?? null)}
              className={FIELD_FILE}
            />
            {profile?.image && !profileImageFile && (
              <p className="text-xs text-muted-foreground">{t("profile.currentFileKept")}</p>
            )}
          </div>
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-license-file`} className="text-base font-bold">
              {tForm("licenseAttachment")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-license-file`}
              type="file"
              accept="image/jpeg,image/png,image/jpg,application/pdf"
              onChange={(e) => setLicenseFile(e.target.files?.[0] ?? null)}
              className={FIELD_FILE}
            />
            {profile?.license_attachment && !licenseFile && (
              <p className="text-xs text-muted-foreground">{t("profile.currentFileKept")}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2
          className="mb-6 text-2xl font-bold text-foreground text-start"
          style={{ fontFamily: araBold }}
        >
          {tForm("generalInfo")}
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-license`} className="text-base font-bold">
              {tForm("licenseNumber")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-license`}
              required
              value={values.License_number}
              onChange={(e) => setField("License_number", e.target.value)}
              className={FIELD_INPUT}
            />
          </div>
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-license-date`} className="text-base font-bold">
              {tForm("licenseExpiry")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-license-date`}
              type="date"
              required
              value={values.License_expiry_date}
              onChange={(e) => setField("License_expiry_date", e.target.value)}
              className={FIELD_INPUT}
            />
          </div>
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-ar-level`} className="text-base font-bold">
              {tForm("arabicLanguage")} <span className="text-red-600">*</span>
            </label>
            <select
              id={`${baseId}-ar-level`}
              required
              value={values.Arabic_language}
              onChange={(e) =>
                setField(
                  "Arabic_language",
                  e.target.value as TourGuidePortalFormValues["Arabic_language"],
                )
              }
              className={FIELD_SELECT}
            >
              <option value="">{tForm("select")}</option>
              {LANGUAGE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level === "beginner"
                    ? tForm("levelBeginner")
                    : level === "intermediate"
                      ? tForm("levelIntermediate")
                      : tForm("levelAdvanced")}
                </option>
              ))}
            </select>
          </div>
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-en-level`} className="text-base font-bold">
              {tForm("englishLanguage")} <span className="text-red-600">*</span>
            </label>
            <select
              id={`${baseId}-en-level`}
              required
              value={values.english_language}
              onChange={(e) =>
                setField(
                  "english_language",
                  e.target.value as TourGuidePortalFormValues["english_language"],
                )
              }
              className={FIELD_SELECT}
            >
              <option value="">{tForm("select")}</option>
              {LANGUAGE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level === "beginner"
                    ? tForm("levelBeginner")
                    : level === "intermediate"
                      ? tForm("levelIntermediate")
                      : tForm("levelAdvanced")}
                </option>
              ))}
            </select>
          </div>
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-other-lang`} className="text-base font-bold">
              {tForm("otherLanguages")}
            </label>
            <input
              id={`${baseId}-other-lang`}
              value={values.Other_languages}
              onChange={(e) => setField("Other_languages", e.target.value)}
              placeholder={tForm("otherLanguagesPlaceholder")}
              className={FIELD_INPUT}
            />
          </div>
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-spec`} className="text-base font-bold">
              {tForm("specialization")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-spec`}
              required
              value={values.Specialization}
              onChange={(e) => setField("Specialization", e.target.value)}
              className={FIELD_INPUT}
            />
          </div>
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-transport`} className="text-base font-bold">
              {tForm("transportation")} <span className="text-red-600">*</span>
            </label>
            <select
              id={`${baseId}-transport`}
              required
              value={values.transportation}
              onChange={(e) =>
                setField(
                  "transportation",
                  e.target.value as TourGuidePortalFormValues["transportation"],
                )
              }
              className={FIELD_SELECT}
            >
              <option value="">{tForm("select")}</option>
              <option value="yes">{tForm("yes")}</option>
              <option value="no">{tForm("no")}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2
          className="mb-6 text-2xl font-bold text-foreground text-start"
          style={{ fontFamily: araBold }}
        >
          {tForm("contactInfo")}
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-email`} className="text-base font-bold">
              {tForm("email")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-email`}
              type="email"
              required
              value={values.Email}
              onChange={(e) => setField("Email", e.target.value)}
              className={FIELD_INPUT}
            />
          </div>
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-mobile`} className="text-base font-bold">
              {tForm("mobile")} <span className="text-red-600">*</span>
            </label>
            <input
              id={`${baseId}-mobile`}
              required
              value={values.Mobile_number}
              onChange={(e) => setField("Mobile_number", e.target.value)}
              className={FIELD_INPUT}
            />
          </div>
          <div className={FIELD_GROUP}>
            <label htmlFor={`${baseId}-whatsapp`} className="text-base font-bold">
              {tForm("whatsapp")}
            </label>
            <input
              id={`${baseId}-whatsapp`}
              value={values.WhatsApp_number}
              onChange={(e) => setField("WhatsApp_number", e.target.value)}
              className={FIELD_INPUT}
            />
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2
          className="mb-4 text-2xl font-bold text-foreground text-start"
          style={{ fontFamily: araBold }}
        >
          {tForm("commitmentsTitle")}
        </h2>
        <div className="flex flex-col gap-3">
          {(["commitment1", "commitment2", "commitment3"] as const).map((key) => (
            <label key={key} className={CHECK_ROW}>
              <input
                type="checkbox"
                checked={values[key]}
                onChange={(e) => setField(key, e.target.checked)}
                className="mt-1 cursor-pointer"
              />
              <span className="text-sm text-foreground">{tForm(key)}</span>
            </label>
          ))}
        </div>
      </div>

      {message && (
        <p
          className={`mb-4 text-start text-sm ${
            submitState === "success" ? "text-green-700" : "text-red-600"
          }`}
          role="status"
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit || submitState === "submitting"}
        className="h-12 cursor-pointer rounded-full bg-[#280048] px-8 text-base font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ fontFamily: araBold }}
      >
        {submitState === "submitting" ? t("profile.saving") : t("profile.saveDraft")}
      </button>
    </form>
  );
};

export default TourGuidePortalProfileForm;
