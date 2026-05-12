"use client";

import { useEffect, useId, useMemo, useState, type FormEvent } from "react";
import { useLocale } from "next-intl";
import { UploadAreaIcon } from "./Icons";

export const TOUR_GUIDE_REQUIRED_FIELDS_COUNT = 18;

const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";
const araBold = "var(--font-ara-hamah-1964), sans-serif";

const SPECIALIZATION_OPTIONS = [
  "متخصص في التجارب والأنشطة البرية",
  "متخصص في التجارب والأنشطة البحرية",
  "متخصص في التجارب والأنشطة الهوائية",
  "متخصص في التجارب والأنشطة التراثية والثقافية",
  "متخصص في سياحة الاستجمام",
  "أخرى",
] as const;

const LANGUAGE_LEVEL_OPTIONS = [
  { value: "beginner", label: "مبتدئ" },
  { value: "intermediate", label: "متوسط" },
  { value: "advanced", label: "متقدم" },
] as const;

const EN_SPECIALIZATION_LABELS: Record<string, string> = {
  "متخصص في التجارب والأنشطة البرية": "Specialist in land activities and experiences",
  "متخصص في التجارب والأنشطة البحرية": "Specialist in marine activities and experiences",
  "متخصص في التجارب والأنشطة الهوائية": "Specialist in air activities and experiences",
  "متخصص في التجارب والأنشطة التراثية والثقافية":
    "Specialist in heritage and cultural experiences",
  "متخصص في سياحة الاستجمام": "Specialist in leisure tourism",
  أخرى: "Other",
};

const levelLabel = (value: "beginner" | "intermediate" | "advanced", isRtl: boolean) => {
  if (isRtl) return LANGUAGE_LEVEL_OPTIONS.find((o) => o.value === value)?.label ?? value;
  if (value === "beginner") return "Beginner";
  if (value === "intermediate") return "Intermediate";
  return "Advanced";
};

type FormValues = {
  nameAr: string;
  nameEn: string;
  gender: "" | "ذكر" | "أنثى";
  nationalId: string;
  bio: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  arabicLevel: "" | "beginner" | "intermediate" | "advanced";
  englishLevel: "" | "beginner" | "intermediate" | "advanced";
  otherLanguages: string;
  hasTransportation: "" | "yes" | "no";
  specializations: string[];
  otherSpecialization: string;
  email: string;
  mobile: string;
  whatsapp: string;
  website: string;
  instagram: string;
  xPlatform: string;
  tiktok: string;
  commitment1: boolean;
  commitment2: boolean;
  commitment3: boolean;
};

const EMPTY_VALUES: FormValues = {
  nameAr: "",
  nameEn: "",
  gender: "",
  nationalId: "",
  bio: "",
  licenseNumber: "",
  licenseExpiryDate: "",
  arabicLevel: "",
  englishLevel: "",
  otherLanguages: "",
  hasTransportation: "",
  specializations: [],
  otherSpecialization: "",
  email: "",
  mobile: "",
  whatsapp: "",
  website: "",
  instagram: "",
  xPlatform: "",
  tiktok: "",
  commitment1: false,
  commitment2: false,
  commitment3: false,
};

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

const TourGuideRegisterStepOneForm = ({
  onCompletionChange,
}: TourGuideRegisterStepOneFormProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const baseId = useId();
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [licenseAttachmentFile, setLicenseAttachmentFile] =
    useState<File | null>(null);
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const completed = [
      values.nameAr.trim() !== "",
      values.nameEn.trim() !== "",
      values.gender !== "",
      values.nationalId.trim() !== "",
      profileImageFile != null,
      values.bio.trim() !== "",
      values.licenseNumber.trim() !== "",
      isLicenseDateValid(values.licenseExpiryDate),
      licenseAttachmentFile != null,
      values.arabicLevel !== "",
      values.englishLevel !== "",
      values.hasTransportation !== "",
      values.specializations.length > 0,
      values.email.trim() !== "",
      values.mobile.trim() !== "",
      values.whatsapp.trim() !== "",
      values.commitment1,
      values.commitment2,
      values.commitment3,
    ].filter(Boolean).length;

    onCompletionChange(completed);
  }, [values, profileImageFile, licenseAttachmentFile, onCompletionChange]);

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

  const completedCount = useMemo(() => {
    return [
      values.nameAr.trim() !== "",
      values.nameEn.trim() !== "",
      values.gender !== "",
      values.nationalId.trim() !== "",
      profileImageFile != null,
      values.bio.trim() !== "",
      values.licenseNumber.trim() !== "",
      isLicenseDateValid(values.licenseExpiryDate),
      licenseAttachmentFile != null,
      values.arabicLevel !== "",
      values.englishLevel !== "",
      values.hasTransportation !== "",
      values.specializations.length > 0,
      values.email.trim() !== "",
      values.mobile.trim() !== "",
      values.whatsapp.trim() !== "",
      values.commitment1,
      values.commitment2,
      values.commitment3,
    ].filter(Boolean).length;
  }, [values, profileImageFile, licenseAttachmentFile]);

  const canSubmit = completedCount >= TOUR_GUIDE_REQUIRED_FIELDS_COUNT;

  const specializationValue = useMemo(() => {
    const list = values.specializations.filter((s) => s !== "أخرى");
    if (
      values.specializations.includes("أخرى") &&
      values.otherSpecialization.trim()
    ) {
      list.push(values.otherSpecialization.trim());
    }
    return list.join(", ");
  }, [values.specializations, values.otherSpecialization]);

  const toggleSpecialization = (value: string) => {
    const exists = values.specializations.includes(value);
    if (exists) {
      const next = values.specializations.filter((x) => x !== value);
      setField("specializations", next);
      if (value === "أخرى") setField("otherSpecialization", "");
      return;
    }
    setField("specializations", [...values.specializations, value]);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || submitState === "submitting") return;

    if (!isLicenseDateValid(values.licenseExpiryDate)) {
      setSubmitState("error");
      setSubmitMessage(
        isRtl ? "تاريخ انتهاء الترخيص منتهي أو غير صالح." : "License expiry date is invalid or has passed.",
      );
      return;
    }

    if (!profileImageFile || !licenseAttachmentFile) {
      setSubmitState("error");
      setSubmitMessage(
        isRtl
          ? "يرجى إرفاق الصورة الشخصية ورخصة الإرشاد السياحي."
          : "Please attach a profile image and tour guide license document.",
      );
      return;
    }

    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const body = new FormData();

      body.append("name", values.nameAr.trim());
      body.append("name_en", values.nameEn.trim());
      body.append("gender", values.gender);
      body.append("national_id", values.nationalId.trim());
      body.append("description", values.bio.trim());
      body.append("license_number", values.licenseNumber.trim());
      body.append("date", values.licenseExpiryDate);
      body.append("arabic_language_level", values.arabicLevel);
      body.append("english_language_level", values.englishLevel);
      body.append("other_languages", values.otherLanguages.trim());
      body.append(
        "transportation",
        values.hasTransportation === "yes" ? "true" : "false",
      );
      body.append("specializations", specializationValue);
      body.append("email", values.email.trim());
      body.append("phone_number", values.mobile.trim());
      body.append("whatsapp", values.whatsapp.trim());
      body.append("website", values.website.trim());
      body.append("instagram", values.instagram.trim());
      body.append("x_platform", values.xPlatform.trim());
      body.append("tiktok", values.tiktok.trim());
      body.append("commitment_1", values.commitment1 ? "true" : "false");
      body.append("commitment_2", values.commitment2 ? "true" : "false");
      body.append("commitment_3", values.commitment3 ? "true" : "false");

      body.append("profile_image", profileImageFile);
      body.append("license_attachment", licenseAttachmentFile);

      const response = await fetch("/api/tour-guides/register", {
        method: "POST",
        body,
      });

      const json = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!response.ok) {
        throw new Error(json?.error || (isRtl ? "تعذر إرسال النموذج." : "Failed to submit the form."));
      }

      setSubmitState("success");
      setSubmitMessage(
        isRtl ? "تم إرسال طلب التسجيل بنجاح." : "Your registration request was submitted successfully.",
      );
      setValues(EMPTY_VALUES);
      setProfileImageFile(null);
      setLicenseAttachmentFile(null);
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : isRtl
            ? "حدث خطأ غير متوقع أثناء الإرسال."
            : "An unexpected error occurred during submission.",
      );
    }
  };

  return (
    <form
      className="mx-auto w-full max-w-[1026px] [&_label]:text-white [&_p]:text-white [&_input]:border-border [&_input]:bg-surface [&_input]:text-foreground [&_select]:border-border [&_select]:bg-surface [&_select]:text-foreground [&_textarea]:border-border [&_textarea]:bg-surface [&_textarea]:text-foreground"
      onSubmit={onSubmit}
      dir={isRtl ? "rtl" : "ltr"}
      lang={locale}
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
        <div className={`flex flex-col gap-2 ${isRtl ? "text-right" : "text-left"}`} dir={isRtl ? "rtl" : "ltr"}>
          <label
            htmlFor={`${baseId}-name-ar`}
            className="text-base font-bold text-white"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "الاسم بالعربي *" : "Name in Arabic *"}
          </label>
          <input
            id={`${baseId}-name-ar`}
            value={values.nameAr}
            onChange={(e) => setField("nameAr", e.target.value)}
            className="h-12 w-full rounded-lg border border-border bg-surface px-4 text-right text-foreground"
            style={{ fontFamily: ibm }}
          />
        </div>

        <div className={`flex flex-col gap-2 ${isRtl ? "text-right" : "text-left"}`} dir={isRtl ? "rtl" : "ltr"}>
          <label
            htmlFor={`${baseId}-name-en`}
            className="text-base font-bold text-white"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "الاسم بالإنجليزي *" : "Name in English *"}
          </label>
          <input
            id={`${baseId}-name-en`}
            value={values.nameEn}
            onChange={(e) => setField("nameEn", e.target.value)}
            className="h-12 w-full rounded-lg border border-border bg-surface px-4 text-left text-foreground"
            style={{ fontFamily: ibm }}
            dir="ltr"
          />
        </div>

        <div className={`flex flex-col gap-2 ${isRtl ? "text-right" : "text-left"}`} dir={isRtl ? "rtl" : "ltr"}>
          <label
            htmlFor={`${baseId}-gender`}
            className="text-base font-bold text-white"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "الجنس *" : "Gender *"}
          </label>
          <select
            id={`${baseId}-gender`}
            value={values.gender}
            onChange={(e) =>
              setField("gender", e.target.value as FormValues["gender"])
            }
            className="h-12 w-full rounded-lg border border-border bg-surface px-4 text-right text-foreground"
            style={{ fontFamily: ibm }}
          >
            <option value="">{isRtl ? "اختر" : "Select"}</option>
            <option value="ذكر">{isRtl ? "ذكر" : "Male"}</option>
            <option value="أنثى">{isRtl ? "أنثى" : "Female"}</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-nid`}
            className="text-base font-bold text-white"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "رقم الهوية الوطنية *" : "National ID number *"}
          </label>
          <input
            id={`${baseId}-nid`}
            value={values.nationalId}
            onChange={(e) => setField("nationalId", e.target.value)}
            className="h-12 w-full rounded-lg border border-border bg-surface px-4 text-right text-foreground"
            style={{ fontFamily: ibm }}
            inputMode="numeric"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-bio`}
            className="text-base font-bold text-white"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "نبذة عني (المرشد السياحي) *" : "About me (tour guide) *"}
          </label>
          <textarea
            id={`${baseId}-bio`}
            value={values.bio}
            onChange={(e) => setField("bio", e.target.value)}
            className="min-h-[110px] w-full rounded-lg border border-border bg-surface p-4 text-right text-foreground"
            style={{ fontFamily: ibm }}
          />
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-license-number`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "رقم الترخيص *" : "License number *"}
          </label>
          <input
            id={`${baseId}-license-number`}
            value={values.licenseNumber}
            onChange={(e) => setField("licenseNumber", e.target.value)}
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-right"
            style={{ fontFamily: ibm }}
          />
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-license-date`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "تاريخ انتهاء الترخيص *" : "License expiry date *"}
          </label>
          <input
            id={`${baseId}-license-date`}
            type="date"
            value={values.licenseExpiryDate}
            onChange={(e) => setField("licenseExpiryDate", e.target.value)}
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4"
            style={{ fontFamily: ibm }}
          />
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-arabic-level`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "اللغة العربية *" : "Arabic language level *"}
          </label>
          <select
            id={`${baseId}-arabic-level`}
            value={values.arabicLevel}
            onChange={(e) =>
              setField(
                "arabicLevel",
                e.target.value as FormValues["arabicLevel"],
              )
            }
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-right"
            style={{ fontFamily: ibm }}
          >
            <option value="">{isRtl ? "اختر" : "Select"}</option>
            {LANGUAGE_LEVEL_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {levelLabel(o.value, isRtl)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-english-level`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "اللغة الإنجليزية *" : "English language level *"}
          </label>
          <select
            id={`${baseId}-english-level`}
            value={values.englishLevel}
            onChange={(e) =>
              setField(
                "englishLevel",
                e.target.value as FormValues["englishLevel"],
              )
            }
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-right"
            style={{ fontFamily: ibm }}
          >
            <option value="">{isRtl ? "اختر" : "Select"}</option>
            {LANGUAGE_LEVEL_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {levelLabel(o.value, isRtl)}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-other-languages`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "لغات أخرى" : "Other languages"}
          </label>
          <input
            id={`${baseId}-other-languages`}
            value={values.otherLanguages}
            onChange={(e) => setField("otherLanguages", e.target.value)}
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-right"
            style={{ fontFamily: ibm }}
            placeholder={isRtl ? "مثال: الفرنسية، الإسبانية" : "Example: French, Spanish"}
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-3 text-right" dir="rtl">
          <p
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "التخصص *" : "Specialization *"}
          </p>
          <div className="grid grid-cols-1 gap-2">
            {SPECIALIZATION_OPTIONS.map((item) => (
              <label
                key={item}
                className="flex items-center justify-end gap-2 rounded-lg border border-[#E5E7EB] px-3 py-2"
              >
                <span
                  className="text-sm text-right text-[#1D1F1F]"
                  style={{ fontFamily: ibm }}
                >
                  {isRtl ? item : EN_SPECIALIZATION_LABELS[item] ?? item}
                </span>
                <input
                  type="checkbox"
                  checked={values.specializations.includes(item)}
                  onChange={() => toggleSpecialization(item)}
                />
              </label>
            ))}
          </div>
          {values.specializations.includes("أخرى") ? (
            <input
              value={values.otherSpecialization}
              onChange={(e) => setField("otherSpecialization", e.target.value)}
              className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-right"
              style={{ fontFamily: ibm }}
              placeholder={isRtl ? "اذكر التخصص الآخر" : "Specify the other specialization"}
            />
          ) : null}
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-transportation`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "هل تتوفر لديك وسيلة مواصلات؟ *" : "Do you have transportation? *"}
          </label>
          <select
            id={`${baseId}-transportation`}
            value={values.hasTransportation}
            onChange={(e) =>
              setField(
                "hasTransportation",
                e.target.value as FormValues["hasTransportation"],
              )
            }
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-right"
            style={{ fontFamily: ibm }}
          >
            <option value="">{isRtl ? "اختر" : "Select"}</option>
            <option value="yes">{isRtl ? "نعم" : "Yes"}</option>
            <option value="no">{isRtl ? "لا" : "No"}</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-email`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "البريد الإلكتروني *" : "Email *"}
          </label>
          <input
            id={`${baseId}-email`}
            type="email"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-left"
            style={{ fontFamily: ibm }}
            dir="ltr"
          />
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-mobile`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "رقم الجوال *" : "Mobile number *"}
          </label>
          <input
            id={`${baseId}-mobile`}
            value={values.mobile}
            onChange={(e) => setField("mobile", e.target.value)}
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-right"
            style={{ fontFamily: ibm }}
            inputMode="tel"
          />
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-whatsapp`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "رقم الواتس اب *" : "WhatsApp number *"}
          </label>
          <input
            id={`${baseId}-whatsapp`}
            value={values.whatsapp}
            onChange={(e) => setField("whatsapp", e.target.value)}
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-right"
            style={{ fontFamily: ibm }}
            inputMode="tel"
          />
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-website`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "الموقع الإلكتروني" : "Website"}
          </label>
          <input
            id={`${baseId}-website`}
            value={values.website}
            onChange={(e) => setField("website", e.target.value)}
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-left"
            style={{ fontFamily: ibm }}
            dir="ltr"
          />
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-instagram`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "انستقرام" : "Instagram"}
          </label>
          <input
            id={`${baseId}-instagram`}
            value={values.instagram}
            onChange={(e) => setField("instagram", e.target.value)}
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-left"
            style={{ fontFamily: ibm }}
            dir="ltr"
          />
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-x`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "منصة X" : "X platform"}
          </label>
          <input
            id={`${baseId}-x`}
            value={values.xPlatform}
            onChange={(e) => setField("xPlatform", e.target.value)}
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-left"
            style={{ fontFamily: ibm }}
            dir="ltr"
          />
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-tiktok`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "تيك توك" : "TikTok"}
          </label>
          <input
            id={`${baseId}-tiktok`}
            value={values.tiktok}
            onChange={(e) => setField("tiktok", e.target.value)}
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-left"
            style={{ fontFamily: ibm }}
            dir="ltr"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-3 text-right" dir="rtl">
          <p
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            {isRtl ? "التعهدات *" : "Commitments *"}
          </p>
          <label className="flex items-start justify-end gap-2">
            <span className="text-sm" style={{ fontFamily: ibm }}>
              {isRtl
                ? "أقر أن جميع المعلومات المذكورة أعلاه والمستندات المرفقة صحيحة ومتطابقة تماماً مع معلوماتي الشخصية وخبرتي في الإرشاد السياحي."
                : "I confirm that all information and attachments above are accurate and match my personal profile and guiding experience."}
            </span>
            <input
              type="checkbox"
              checked={values.commitment1}
              onChange={(e) => setField("commitment1", e.target.checked)}
            />
          </label>
          <label className="flex items-start justify-end gap-2">
            <span className="text-sm" style={{ fontFamily: ibm }}>
              {isRtl
                ? "أوافق على استخدام المعلومات المذكورة أعلاه من قبل القنوات الإلكترونية لتسويق عسير، وهيئة تطوير منطقة عسير."
                : "I agree that this information may be used by Discover Aseer channels and Aseer Development Authority for destination promotion."}
            </span>
            <input
              type="checkbox"
              checked={values.commitment2}
              onChange={(e) => setField("commitment2", e.target.checked)}
            />
          </label>
          <label className="flex items-start justify-end gap-2">
            <span className="text-sm" style={{ fontFamily: ibm }}>
              {isRtl
                ? "أتعهد بالالتزام التام بتقديم خدمات الإرشاد السياحي والرد والاستجابة السريعة."
                : "I commit to providing professional guiding services and timely responses."}
            </span>
            <input
              type="checkbox"
              checked={values.commitment3}
              onChange={(e) => setField("commitment3", e.target.checked)}
            />
          </label>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2 text-right" dir="rtl">
            <p
              className="mb-1 text-right text-base font-bold text-[#1D1F1F]"
              style={{ fontFamily: araBold }}
            >
              {isRtl ? "صورة شخصية *" : "Profile image *"}
            </p>
            <label
              htmlFor={`${baseId}-profile-image`}
              className="flex min-h-[130px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-surface px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-muted"
            >
              <input
                id={`${baseId}-profile-image`}
                type="file"
                className="sr-only"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) => onProfileImageChange(e.target.files)}
              />
              <span
                className="flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-[49px] bg-[#F6EBFF]"
                aria-hidden
              >
                <UploadAreaIcon />
              </span>
              <span
                className="text-center text-[14px] font-bold leading-[120%] text-[#7300CD]"
                style={{ fontFamily: araBold }}
              >
                {isRtl ? "تصفح الصورة" : "Browse image"}
              </span>
              <span className="text-xs text-muted-foreground" style={{ fontFamily: ibm }}>
                JPG, JPEG, PNG, WEBP
              </span>
              {profileImageFile ? (
                <span
                  className="mt-2 text-xs text-[#7300CD]"
                  style={{ fontFamily: ibm }}
                >
                  {profileImageFile.name}
                </span>
              ) : null}
            </label>
          </div>

          <div className="flex flex-col gap-2 text-right" dir="rtl">
            <p
              className="mb-1 text-right text-base font-bold text-[#1D1F1F]"
              style={{ fontFamily: araBold }}
            >
              {isRtl ? "رخصة الإرشاد السياحي *" : "Tour guide license *"}
            </p>
            <label
              htmlFor={`${baseId}-license-attachment`}
              className="flex min-h-[130px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-surface px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-muted"
            >
              <input
                id={`${baseId}-license-attachment`}
                type="file"
                className="sr-only"
                accept=".jpg,.jpeg,.pdf"
                onChange={(e) => onLicenseAttachmentChange(e.target.files)}
              />
              <span
                className="flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-[49px] bg-[#F6EBFF]"
                aria-hidden
              >
                <UploadAreaIcon />
              </span>
              <span
                className="text-center text-[14px] font-bold leading-[120%] text-[#7300CD]"
                style={{ fontFamily: araBold }}
              >
                {isRtl ? "تصفح المرفق" : "Browse attachment"}
              </span>
              <span className="text-xs text-muted-foreground" style={{ fontFamily: ibm }}>
                JPG, JPEG, PDF
              </span>
              {licenseAttachmentFile ? (
                <span
                  className="mt-2 text-xs text-[#7300CD]"
                  style={{ fontFamily: ibm }}
                >
                  {licenseAttachmentFile.name}
                </span>
              ) : null}
            </label>
          </div>
        </div>
      </div>

      <section
        className="mx-auto mt-12 w-full max-w-[962px] rounded-[12px] sm:mt-16 lg:mt-20"
        aria-label="إجراءات النموذج"
      >
        {submitMessage ? (
          <p
            className={`mb-3 text-right text-sm ${
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
          className="flex h-[62px] w-full items-center justify-center gap-[10px] rounded-[100px] bg-[#280048] px-[22px] py-[14px] text-lg font-bold text-white transition-colors hover:enabled:bg-[#3a0b5c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#280048] disabled:cursor-not-allowed disabled:opacity-45"
          style={{ fontFamily: araBold }}
        >
          {submitState === "submitting"
            ? isRtl
              ? "جاري الإرسال..."
              : "Submitting..."
            : isRtl
              ? "إرسال الطلب"
              : "Submit request"}
        </button>
      </section>
    </form>
  );
};

export default TourGuideRegisterStepOneForm;
