"use client";

import { useEffect, useId, useMemo, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import type { ApiTouristGuide } from "@/components/tour-guides/types";
import {
  FormCheckboxField,
  FormFileUpload,
  FormSectionTitle,
  FormSelectField,
  FormSubmitButton,
  FormTextInput,
  FormTextarea,
} from "@/components/experiences/submit/ExperienceFormFields";
import { araBold, ibm } from "@/components/experiences/submit/experienceFormStyles";
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

const LANGUAGE_LEVELS = ["beginner", "intermediate", "advanced"] as const;

interface TourGuidePortalProfileFormProps {
  profile: ApiTouristGuide | null;
  accountEmail?: string;
  onSaved: (profile: ApiTouristGuide) => void;
}

function isLicenseDateFilled(dateText: string): boolean {
  if (!dateText) return false;
  const [y, m, d] = dateText.split("-").map(Number);
  return Boolean(y && m && d);
}

const TourGuidePortalProfileForm = ({
  profile,
  accountEmail = "",
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
      return;
    }
    if (accountEmail) {
      setValues((prev) => ({
        ...prev,
        Email: accountEmail,
      }));
    }
  }, [profile, accountEmail]);

  const resolvedEmail = values.Email.trim() || accountEmail.trim();

  const isPublished = profile?.status === TOUR_GUIDE_PUBLISHED_STATUS;

  const hasImage = profileImageFile != null || Boolean(profile?.image);
  const hasLicense =
    licenseFile != null || Boolean(profile?.license_attachment);
  const licenseDateValid = isLicenseDateFilled(values.License_expiry_date);

  const languageLevelOptions = useMemo(
    () =>
      LANGUAGE_LEVELS.map((level) => ({
        value: level,
        label:
          level === "beginner"
            ? tForm("levelBeginner")
            : level === "intermediate"
              ? tForm("levelIntermediate")
              : tForm("levelAdvanced"),
      })),
    [tForm],
  );

  const missingRequirements = useMemo(() => {
    const missing: string[] = [];
    if (values.name_ar.trim() === "") missing.push("nameAr");
    if (values.name_en.trim() === "") missing.push("nameEn");
    if (values.gender === "") missing.push("gender");
    if (values.National_ID_number.trim() === "") missing.push("nationalId");
    if (!hasImage) missing.push("profilePhoto");
    if (values.License_number.trim() === "") missing.push("licenseNumber");
    if (!licenseDateValid) missing.push("licenseExpiry");
    if (!hasLicense) missing.push("licenseAttachment");
    if (values.Arabic_language === "") missing.push("arabicLanguage");
    if (values.english_language === "") missing.push("englishLanguage");
    if (values.transportation === "") missing.push("transportation");
    if (values.Specialization.trim() === "") missing.push("specialization");
    if (resolvedEmail === "") missing.push("email");
    if (values.Mobile_number.trim() === "") missing.push("mobile");
    if (!values.commitment1) missing.push("commitment1");
    if (!values.commitment2) missing.push("commitment2");
    if (!values.commitment3) missing.push("commitment3");
    return missing;
  }, [values, hasImage, hasLicense, licenseDateValid, resolvedEmail]);

  const canSubmit = missingRequirements.length === 0;

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

  const photoHint =
    profile?.image && !profileImageFile
      ? t("profile.currentFileKept")
      : tForm("fileTypesImage");
  const licenseHint =
    profile?.license_attachment && !licenseFile
      ? t("profile.currentFileKept")
      : tForm("fileTypesLicense");

  return (
    <form className="mx-auto w-full max-w-[1026px]" onSubmit={onSubmit}>
      {profile && (
        <div
          className={`mb-8 rounded-xl border px-4 py-3 text-start text-sm ${
            isPublished
              ? "border-green-300 bg-green-50 text-green-900"
              : "border-amber-300 bg-amber-50 text-amber-900"
          }`}
          style={{ fontFamily: ibm }}
        >
          {isPublished ? t("profile.statusPublished") : t("profile.statusDraft")}
        </div>
      )}

      {!profile && (
        <p className="mb-8 text-start text-muted-foreground" style={{ fontFamily: ibm }}>
          {t("profile.createHint")}
        </p>
      )}

      <div className="mb-10">
        <FormSectionTitle>{tForm("personalInfo")}</FormSectionTitle>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <FormTextInput
            id={`${baseId}-name-ar`}
            label={tForm("nameAr")}
            required
            value={values.name_ar}
            onChange={(e) => setField("name_ar", e.target.value)}
          />
          <FormTextInput
            id={`${baseId}-name-en`}
            label={tForm("nameEn")}
            required
            value={values.name_en}
            onChange={(e) => setField("name_en", e.target.value)}
          />
          <FormSelectField
            id={`${baseId}-gender`}
            label={tForm("gender")}
            required
            placeholder={tForm("select")}
            value={values.gender}
            onChange={(value) =>
              setField("gender", value as TourGuidePortalFormValues["gender"])
            }
            options={[
              { value: "ذكر", label: tForm("genderMale") },
              { value: "أنثى", label: tForm("genderFemale") },
            ]}
          />
          <FormTextInput
            id={`${baseId}-national-id`}
            label={tForm("nationalId")}
            required
            value={values.National_ID_number}
            onChange={(e) => setField("National_ID_number", e.target.value)}
          />
          <FormTextarea
            id={`${baseId}-about`}
            label={tForm("aboutMe")}
            className="md:col-span-2"
            rows={4}
            value={values.About_me}
            onChange={(e) => setField("About_me", e.target.value)}
          />
          <FormFileUpload
            id={`${baseId}-photo`}
            label={tForm("profilePhoto")}
            required
            accept="image/jpeg,image/png,image/webp,image/jpg"
            hint={photoHint}
            file={profileImageFile}
            onChange={(files) => setProfileImageFile(files?.[0] ?? null)}
          />
          <FormFileUpload
            id={`${baseId}-license-file`}
            label={tForm("licenseAttachment")}
            required
            accept="image/jpeg,image/png,image/jpg,application/pdf"
            hint={licenseHint}
            file={licenseFile}
            onChange={(files) => setLicenseFile(files?.[0] ?? null)}
          />
        </div>
      </div>

      <div className="mb-10">
        <FormSectionTitle>{tForm("generalInfo")}</FormSectionTitle>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <FormTextInput
            id={`${baseId}-license`}
            label={tForm("licenseNumber")}
            required
            value={values.License_number}
            onChange={(e) => setField("License_number", e.target.value)}
          />
          <FormTextInput
            id={`${baseId}-license-date`}
            label={tForm("licenseExpiry")}
            required
            type="date"
            value={values.License_expiry_date}
            onChange={(e) => setField("License_expiry_date", e.target.value)}
          />
          <FormSelectField
            id={`${baseId}-ar-level`}
            label={tForm("arabicLanguage")}
            required
            placeholder={tForm("select")}
            value={values.Arabic_language}
            onChange={(value) =>
              setField(
                "Arabic_language",
                value as TourGuidePortalFormValues["Arabic_language"],
              )
            }
            options={languageLevelOptions}
          />
          <FormSelectField
            id={`${baseId}-en-level`}
            label={tForm("englishLanguage")}
            required
            placeholder={tForm("select")}
            value={values.english_language}
            onChange={(value) =>
              setField(
                "english_language",
                value as TourGuidePortalFormValues["english_language"],
              )
            }
            options={languageLevelOptions}
          />
          <FormTextInput
            id={`${baseId}-other-lang`}
            label={tForm("otherLanguages")}
            value={values.Other_languages}
            onChange={(e) => setField("Other_languages", e.target.value)}
            placeholder={tForm("otherLanguagesPlaceholder")}
          />
          <FormTextInput
            id={`${baseId}-spec`}
            label={tForm("specialization")}
            required
            value={values.Specialization}
            onChange={(e) => setField("Specialization", e.target.value)}
          />
          <FormSelectField
            id={`${baseId}-transport`}
            label={tForm("transportation")}
            required
            placeholder={tForm("select")}
            value={values.transportation}
            onChange={(value) =>
              setField(
                "transportation",
                value as TourGuidePortalFormValues["transportation"],
              )
            }
            options={[
              { value: "yes", label: tForm("yes") },
              { value: "no", label: tForm("no") },
            ]}
          />
        </div>
      </div>

      <div className="mb-10">
        <FormSectionTitle>{tForm("contactInfo")}</FormSectionTitle>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <FormTextInput
            id={`${baseId}-email`}
            label={tForm("email")}
            required
            type="email"
            readOnly={Boolean(accountEmail)}
            value={values.Email || accountEmail}
            onChange={(e) => setField("Email", e.target.value)}
            className={accountEmail ? "[&_input]:bg-muted [&_input]:text-muted-foreground" : ""}
            dir="ltr"
          />
          <FormTextInput
            id={`${baseId}-mobile`}
            label={tForm("mobile")}
            required
            value={values.Mobile_number}
            onChange={(e) => setField("Mobile_number", e.target.value)}
          />
          <FormTextInput
            id={`${baseId}-whatsapp`}
            label={tForm("whatsapp")}
            value={values.WhatsApp_number}
            onChange={(e) => setField("WhatsApp_number", e.target.value)}
          />
        </div>
      </div>

      <div className="mb-10">
        <p
          className="mb-4 text-2xl font-bold text-foreground text-start"
          style={{ fontFamily: araBold }}
        >
          {tForm("commitmentsTitle")} <span className="text-red-600">*</span>
        </p>
        <div className="flex flex-col gap-3">
          {(["commitment1", "commitment2", "commitment3"] as const).map((key) => (
            <FormCheckboxField
              key={key}
              checked={values[key]}
              onChange={(checked) => setField(key, checked)}
            >
              {tForm(key)} <span className="text-red-600">*</span>
            </FormCheckboxField>
          ))}
        </div>
      </div>

      {message && (
        <p
          className={`mb-4 text-start text-sm ${
            submitState === "success" ? "text-green-700" : "text-red-600"
          }`}
          style={{ fontFamily: ibm }}
          role="status"
        >
          {message}
        </p>
      )}

      {!canSubmit && missingRequirements.length > 0 && submitState !== "submitting" && (
        <div
          className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-start text-sm text-amber-900"
          role="status"
          style={{ fontFamily: ibm }}
        >
          <p className="font-bold">{t("profile.missingTitle")}</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {missingRequirements.map((key) => (
              <li key={key}>{t(`profile.missing.${key}`)}</li>
            ))}
          </ul>
        </div>
      )}

      <FormSubmitButton disabled={!canSubmit || submitState === "submitting"}>
        {submitState === "submitting" ? t("profile.saving") : t("profile.saveDraft")}
      </FormSubmitButton>
    </form>
  );
};

export default TourGuidePortalProfileForm;
