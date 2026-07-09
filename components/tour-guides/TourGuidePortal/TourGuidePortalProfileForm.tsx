"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ApiTouristGuide } from "@/components/tour-guides/types";
import {
  FormCheckboxField,
  FormFileUpload,
  FormSectionTitle,
  FormSelectField,
  FormSubmitButton,
  FormTextInput,
  FormTextarea,
} from "@/components/tour-guides/TourGuidePortal/TourGuidePortalFormFields";
import { ibm, araBold } from "@/components/experiences/submit/experienceFormStyles";
import {
  apiProfileToPortalForm,
  buildSpecializationValue,
  EMPTY_PORTAL_FORM,
  parseSpecializationValue,
  portalFormToApiPayload,
  SPECIALIZATION_IDS,
  type SpecializationId,
  type TourGuidePortalFormValues,
} from "@/lib/directus/tourGuideFieldMap";
import { getTourGuideSession } from "@/lib/directus/tourGuideAuth";
import {
  getStoredTourGuideProfileId,
  saveTourGuideProfile,
  uploadTourGuideFile,
} from "@/lib/directus/tourGuideProfile";
import {
  TOUR_GUIDE_DRAFT_STATUS,
  TOUR_GUIDE_PUBLISHED_STATUS,
  TOUR_GUIDE_REJECTED_STATUS,
  TOUR_GUIDE_UNDER_REVIEW_STATUS,
} from "@/lib/directus/config";
import { resolveTourGuideFileUrl } from "@/lib/directus/resolveTourGuideFileUrl";

const LANGUAGE_LEVELS = ["beginner", "intermediate", "advanced"] as const;

interface TourGuidePortalProfileFormProps {
  profile: ApiTouristGuide | null;
  accountEmail?: string;
  onSaved: (profile: ApiTouristGuide) => void;
}

const TourGuidePortalProfileForm = ({
  profile,
  accountEmail = "",
  onSaved,
}: TourGuidePortalProfileFormProps) => {
  const t = useTranslations("tourGuidePortal");
  const tForm = useTranslations("tourGuidesRegister.form");
  const tFiles = useTranslations("experienceSubmit.form");
  const baseId = useId();

  const [values, setValues] = useState<TourGuidePortalFormValues>(EMPTY_PORTAL_FORM);
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    SpecializationId[]
  >([]);
  const [otherSpecialization, setOtherSpecialization] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const savedProfileIdRef = useRef<number | null>(profile?.id ?? null);

  useEffect(() => {
    if (profile?.id) {
      savedProfileIdRef.current = profile.id;
    }
  }, [profile?.id]);

  useEffect(() => {
    const session = getTourGuideSession();
    if (!session?.user.id || savedProfileIdRef.current) return;
    const stored = getStoredTourGuideProfileId(
      session.user.id,
      session.user.email,
    );
    if (stored) {
      savedProfileIdRef.current = stored;
    }
  }, [profile]);

  useEffect(() => {
    if (profile) {
      const next = {
        ...apiProfileToPortalForm(profile),
        Email: profile.email?.trim() || accountEmail,
      };
      setValues(next);
      const parsed = parseSpecializationValue(next.Specialization);
      setSelectedSpecializations(parsed.selected);
      setOtherSpecialization(parsed.other);
      return;
    }
    if (accountEmail) {
      setValues((prev) => ({
        ...prev,
        Email: accountEmail,
      }));
    }
  }, [profile, accountEmail]);

  const existingPhotoUrl = resolveTourGuideFileUrl(profile?.image);
  const existingLicenseUrl = resolveTourGuideFileUrl(profile?.license_attachment);

  /** Existing profile → lock identity fields set on first create. */
  const lockIdentityFields = Boolean(profile?.id);
  const profileStatus = profile?.status ?? null;

  const statusBanner = (() => {
    switch (profileStatus) {
      case TOUR_GUIDE_PUBLISHED_STATUS:
        return {
          className: "border-green-300 bg-green-50 text-green-900",
          message: t("profile.statusPublished"),
        };
      case TOUR_GUIDE_UNDER_REVIEW_STATUS:
        return {
          className: "border-blue-300 bg-blue-50 text-blue-900",
          message: t("profile.statusUnderReview"),
        };
      case TOUR_GUIDE_REJECTED_STATUS:
        return {
          className: "border-red-300 bg-red-50 text-red-900",
          message: t("profile.statusRejected"),
        };
      case TOUR_GUIDE_DRAFT_STATUS:
      default:
        return {
          className: "border-amber-300 bg-amber-50 text-amber-900",
          message: t("profile.statusDraft"),
        };
    }
  })();

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

  const clearSubmitFeedback = () => {
    if (submitState !== "idle") {
      setSubmitState("idle");
      setMessage("");
    }
  };

  const setField = <K extends keyof TourGuidePortalFormValues>(
    key: K,
    value: TourGuidePortalFormValues[K],
  ) => {
    clearSubmitFeedback();
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const syncSpecialization = (
    nextSelected: SpecializationId[],
    nextOther: string,
  ) => {
    clearSubmitFeedback();
    setSelectedSpecializations(nextSelected);
    setOtherSpecialization(nextOther);
    setValues((prev) => ({
      ...prev,
      Specialization: buildSpecializationValue(nextSelected, nextOther),
    }));
  };

  const toggleSpecialization = (id: SpecializationId) => {
    const exists = selectedSpecializations.includes(id);
    if (exists) {
      const next = selectedSpecializations.filter((item) => item !== id);
      syncSpecialization(next, id === "other" ? "" : otherSpecialization);
      return;
    }
    syncSpecialization([...selectedSpecializations, id], otherSpecialization);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitState === "submitting") return;

    if (
      !values.commitment1 ||
      !values.commitment2 ||
      !values.commitment3 ||
      !values.commitment4
    ) {
      setSubmitState("error");
      setMessage(t("profile.commitmentsRequired"));
      return;
    }

    if (!values.Specialization.trim()) {
      setSubmitState("error");
      setMessage(t("profile.specializationRequired"));
      return;
    }

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

      const payload = portalFormToApiPayload(
        values,
        {
          imageId,
          licenseId,
        },
        { lockIdentityFields },
      );

      const profileId =
        profile?.id ??
        savedProfileIdRef.current ??
        (() => {
          const session = getTourGuideSession();
          return session
            ? getStoredTourGuideProfileId(session.user.id, session.user.email)
            : null;
        })();

      const saved = await saveTourGuideProfile(payload, profileId);
      if (saved.id) {
        savedProfileIdRef.current = saved.id;
      }

      setSubmitState("success");
      setMessage(t("profile.savedUnderReview"));
      onSaved(saved);
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error ? error.message : t("profile.errorGeneric"),
      );
    }
  };

  const photoHint =
    existingPhotoUrl && !profileImageFile
      ? t("profile.currentFileKept")
      : tForm("fileTypesImage");
  const licenseHint =
    existingLicenseUrl && !licenseFile
      ? t("profile.currentFileKept")
      : tForm("fileTypesLicense");

  return (
    <form className="mx-auto w-full max-w-[1026px]" onSubmit={onSubmit}>
      {profile && (
        <div
          className={`mb-8 rounded-xl border px-4 py-3 text-start text-sm ${statusBanner.className}`}
          style={{ fontFamily: ibm }}
        >
          {statusBanner.message}
        </div>
      )}

      {!profile && (
        <p className="mb-8 text-start text-muted-foreground" style={{ fontFamily: ibm }}>
          {t("profile.createHint")}
        </p>
      )}

      {lockIdentityFields && (
        <p className="mb-8 text-start text-sm text-muted-foreground" style={{ fontFamily: ibm }}>
          {t("profile.lockedFieldsHint")}
        </p>
      )}

      <div className="mb-10">
        <FormSectionTitle>{tForm("personalInfo")}</FormSectionTitle>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <FormTextInput
            id={`${baseId}-name-ar`}
            label={tForm("nameAr")}
            required
            readOnly={lockIdentityFields}
            value={values.name_ar}
            onChange={(e) => setField("name_ar", e.target.value)}
          />
          <FormTextInput
            id={`${baseId}-name-en`}
            label={tForm("nameEn")}
            required
            readOnly={lockIdentityFields}
            value={values.name_en}
            onChange={(e) => setField("name_en", e.target.value)}
          />
          <FormSelectField
            id={`${baseId}-gender`}
            label={tForm("gender")}
            required
            disabled={lockIdentityFields}
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
            readOnly={lockIdentityFields}
            value={values.National_ID_number}
            onChange={(e) => setField("National_ID_number", e.target.value)}
          />
          <FormSelectField
            id={`${baseId}-residence`}
            label={tForm("residence")}
            placeholder={tForm("select")}
            value={values.residence}
            onChange={(value) =>
              setField(
                "residence",
                value as TourGuidePortalFormValues["residence"],
              )
            }
            options={[
              { value: "aseer", label: tForm("residenceAseer") },
              { value: "other", label: tForm("residenceOther") },
            ]}
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
            required={!existingPhotoUrl}
            accept="image/jpeg,image/png,image/webp,image/jpg"
            hint={photoHint}
            file={profileImageFile}
            existingFileUrl={existingPhotoUrl}
            existingFileLabel={t("profile.viewCurrentPhoto")}
            previewAsImage
            chooseFileLabel={tFiles("chooseFile")}
            noFileLabel={tFiles("noFileChosen")}
            onChange={(files) => {
              clearSubmitFeedback();
              setProfileImageFile(files?.[0] ?? null);
            }}
          />
          <FormFileUpload
            id={`${baseId}-license-file`}
            label={tForm("licenseAttachment")}
            required={!existingLicenseUrl}
            accept="image/jpeg,image/png,image/jpg,application/pdf"
            hint={licenseHint}
            file={licenseFile}
            existingFileUrl={existingLicenseUrl}
            existingFileLabel={t("profile.viewCurrentLicense")}
            chooseFileLabel={tFiles("chooseFile")}
            noFileLabel={tFiles("noFileChosen")}
            viewFileLabel={t("profile.viewCurrentLicense")}
            onChange={(files) => {
              clearSubmitFeedback();
              setLicenseFile(files?.[0] ?? null);
            }}
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
            readOnly={lockIdentityFields}
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
          <FormSelectField
            id={`${baseId}-other-lang-level`}
            label={tForm("otherLanguagesLevel")}
            placeholder={tForm("select")}
            value={values.Other_languages_level}
            onChange={(value) =>
              setField(
                "Other_languages_level",
                value as TourGuidePortalFormValues["Other_languages_level"],
              )
            }
            options={languageLevelOptions}
          />
          <div className="md:col-span-2 flex flex-col gap-3 text-start">
            <p
              className="text-base font-bold text-foreground"
              style={{ fontFamily: araBold }}
            >
              {tForm("specialization")}{" "}
              <span className="text-red-600">*</span>
            </p>
            <div className="grid grid-cols-1 gap-2">
              {SPECIALIZATION_IDS.map((item) => (
                <FormCheckboxField
                  key={item}
                  checked={selectedSpecializations.includes(item)}
                  onChange={() => toggleSpecialization(item)}
                >
                  {tForm(`specializations.${item}`)}
                </FormCheckboxField>
              ))}
            </div>
            {selectedSpecializations.includes("other") ? (
              <FormTextInput
                id={`${baseId}-other-spec`}
                label={tForm("otherSpecializationPlaceholder")}
                value={otherSpecialization}
                onChange={(e) =>
                  syncSpecialization(selectedSpecializations, e.target.value)
                }
                placeholder={tForm("otherSpecializationPlaceholder")}
              />
            ) : null}
          </div>
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
        <FormSectionTitle>{tForm("socialAccounts")}</FormSectionTitle>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <FormTextInput
            id={`${baseId}-website`}
            label={tForm("website")}
            value={values.Website}
            onChange={(e) => setField("Website", e.target.value)}
            dir="ltr"
          />
          <FormTextInput
            id={`${baseId}-instagram`}
            label={tForm("instagram")}
            value={values.Instagram}
            onChange={(e) => setField("Instagram", e.target.value)}
            dir="ltr"
          />
          <FormTextInput
            id={`${baseId}-tiktok`}
            label={tForm("tiktok")}
            value={values.TikTok}
            onChange={(e) => setField("TikTok", e.target.value)}
            dir="ltr"
          />
          <FormTextInput
            id={`${baseId}-x-platform`}
            label={tForm("xPlatform")}
            value={values.X_platform}
            onChange={(e) => setField("X_platform", e.target.value)}
            dir="ltr"
          />
        </div>
      </div>

      <div className="mb-10">
        <FormSectionTitle>
          {tForm("commitmentsTitle")} <span className="text-red-600">*</span>
        </FormSectionTitle>
        <div className="flex flex-col gap-3">
          <FormCheckboxField
            checked={values.commitment1}
            onChange={(checked) => setField("commitment1", checked)}
          >
            {tForm("commitment1")} <span className="text-red-600">*</span>
          </FormCheckboxField>
          <FormCheckboxField
            checked={values.commitment2}
            onChange={(checked) => setField("commitment2", checked)}
          >
            {tForm("commitment2")} <span className="text-red-600">*</span>
          </FormCheckboxField>
          <FormCheckboxField
            checked={values.commitment3}
            onChange={(checked) => setField("commitment3", checked)}
          >
            {tForm("commitment3")} <span className="text-red-600">*</span>
          </FormCheckboxField>
          <FormCheckboxField
            checked={values.commitment4}
            onChange={(checked) => setField("commitment4", checked)}
          >
            <Link
              href="/privacy"
              className="underline hover:opacity-80"
              onClick={(e) => e.stopPropagation()}
            >
              {tForm("commitment4")}
            </Link>{" "}
            <span className="text-red-600">*</span>
          </FormCheckboxField>
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

      <FormSubmitButton disabled={submitState === "submitting"}>
        {submitState === "submitting" ? t("profile.saving") : t("profile.saveDraft")}
      </FormSubmitButton>
    </form>
  );
};

export default TourGuidePortalProfileForm;
