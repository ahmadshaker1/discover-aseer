"use client";

import { useEffect, useId, useMemo, useState, type FormEvent } from "react";

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
        fill="#7300CD"
      />
      <path
        d="M8.50014 8.5L7.99935 7.9992L8.50014 7.49841L9.00093 7.9992L8.50014 8.5ZM9.20847 14.875C9.20847 15.0629 9.13385 15.243 9.00101 15.3759C8.86817 15.5087 8.688 15.5833 8.50014 15.5833C8.31228 15.5833 8.13211 15.5087 7.99927 15.3759C7.86644 15.243 7.79181 15.0629 7.79181 14.875H9.20847ZM5.16602 10.8325L7.99935 7.9992L9.00093 9.00079L6.1676 11.8341L5.16602 10.8325ZM9.00093 7.9992L11.8343 10.8325L10.8327 11.8341L7.99935 9.00079L9.00093 7.9992ZM9.20847 8.5V14.875H7.79181V8.5H9.20847Z"
        fill="#7300CD"
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

const TourGuideRegisterStepOneForm = ({
  onCompletionChange,
}: TourGuideRegisterStepOneFormProps) => {
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
      setSubmitMessage("تاريخ انتهاء الترخيص منتهي أو غير صالح.");
      return;
    }

    if (!profileImageFile || !licenseAttachmentFile) {
      setSubmitState("error");
      setSubmitMessage("يرجى إرفاق الصورة الشخصية ورخصة الإرشاد السياحي.");
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
        throw new Error(json?.error || "تعذر إرسال النموذج.");
      }

      setSubmitState("success");
      setSubmitMessage("تم إرسال طلب التسجيل بنجاح.");
      setValues(EMPTY_VALUES);
      setProfileImageFile(null);
      setLicenseAttachmentFile(null);
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "حدث خطأ غير متوقع أثناء الإرسال.",
      );
    }
  };

  return (
    <form className="mx-auto w-full max-w-[1026px]" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-name-ar`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            الاسم بالعربي *
          </label>
          <input
            id={`${baseId}-name-ar`}
            value={values.nameAr}
            onChange={(e) => setField("nameAr", e.target.value)}
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-right"
            style={{ fontFamily: ibm }}
          />
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-name-en`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            الاسم بالإنجليزي *
          </label>
          <input
            id={`${baseId}-name-en`}
            value={values.nameEn}
            onChange={(e) => setField("nameEn", e.target.value)}
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-left"
            style={{ fontFamily: ibm }}
            dir="ltr"
          />
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-gender`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            الجنس *
          </label>
          <select
            id={`${baseId}-gender`}
            value={values.gender}
            onChange={(e) =>
              setField("gender", e.target.value as FormValues["gender"])
            }
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-right"
            style={{ fontFamily: ibm }}
          >
            <option value="">اختر</option>
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-nid`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            رقم الهوية الوطنية *
          </label>
          <input
            id={`${baseId}-nid`}
            value={values.nationalId}
            onChange={(e) => setField("nationalId", e.target.value)}
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-right"
            style={{ fontFamily: ibm }}
            inputMode="numeric"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-bio`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            نبذة عني (المرشد السياحي) *
          </label>
          <textarea
            id={`${baseId}-bio`}
            value={values.bio}
            onChange={(e) => setField("bio", e.target.value)}
            className="min-h-[110px] w-full rounded-lg border border-[#E5E7EB] p-4 text-right"
            style={{ fontFamily: ibm }}
          />
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-license-number`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            رقم الترخيص *
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
            تاريخ انتهاء الترخيص *
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
            اللغة العربية *
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
            <option value="">اختر</option>
            {LANGUAGE_LEVEL_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
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
            اللغة الإنجليزية *
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
            <option value="">اختر</option>
            {LANGUAGE_LEVEL_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
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
            لغات أخرى
          </label>
          <input
            id={`${baseId}-other-languages`}
            value={values.otherLanguages}
            onChange={(e) => setField("otherLanguages", e.target.value)}
            className="h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-right"
            style={{ fontFamily: ibm }}
            placeholder="مثال: الفرنسية، الإسبانية"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-3 text-right" dir="rtl">
          <p
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            التخصص *
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
                  {item}
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
              placeholder="اذكر التخصص الآخر"
            />
          ) : null}
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-transportation`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            هل تتوفر لديك وسيلة مواصلات؟ *
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
            <option value="">اختر</option>
            <option value="yes">نعم</option>
            <option value="no">لا</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 text-right" dir="rtl">
          <label
            htmlFor={`${baseId}-email`}
            className="text-base font-bold text-[#1D1F1F]"
            style={{ fontFamily: araBold }}
          >
            البريد الإلكتروني *
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
            رقم الجوال *
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
            رقم الواتس اب *
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
            الموقع الإلكتروني
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
            انستقرام
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
            منصة X
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
            تيك توك
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
            التعهدات *
          </p>
          <label className="flex items-start justify-end gap-2">
            <span className="text-sm" style={{ fontFamily: ibm }}>
              أقر أن جميع المعلومات المذكورة أعلاه والمستندات المرفقة صحيحة
              ومتطابقة تماماً مع معلوماتي الشخصية وخبرتي في الإرشاد السياحي.
            </span>
            <input
              type="checkbox"
              checked={values.commitment1}
              onChange={(e) => setField("commitment1", e.target.checked)}
            />
          </label>
          <label className="flex items-start justify-end gap-2">
            <span className="text-sm" style={{ fontFamily: ibm }}>
              أوافق على استخدام المعلومات المذكورة أعلاه من قبل القنوات
              الإلكترونية لتسويق عسير، وهيئة تطوير منطقة عسير.
            </span>
            <input
              type="checkbox"
              checked={values.commitment2}
              onChange={(e) => setField("commitment2", e.target.checked)}
            />
          </label>
          <label className="flex items-start justify-end gap-2">
            <span className="text-sm" style={{ fontFamily: ibm }}>
              أتعهد بالالتزام التام بتقديم خدمات الإرشاد السياحي والرد
              والاستجابة السريعة.
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
              صورة شخصية *
            </p>
            <label
              htmlFor={`${baseId}-profile-image`}
              className="flex min-h-[130px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#D1D5DB] bg-[#FAFAFA] px-6 py-8 text-center transition-colors hover:border-[#7300CD]/50 hover:bg-[#F5F3FF]/30"
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
                تصفح الصورة
              </span>
              <span
                className="text-xs text-[#6B7280]"
                style={{ fontFamily: ibm }}
              >
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
              رخصة الإرشاد السياحي *
            </p>
            <label
              htmlFor={`${baseId}-license-attachment`}
              className="flex min-h-[130px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#D1D5DB] bg-[#FAFAFA] px-6 py-8 text-center transition-colors hover:border-[#7300CD]/50 hover:bg-[#F5F3FF]/30"
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
                تصفح المرفق
              </span>
              <span
                className="text-xs text-[#6B7280]"
                style={{ fontFamily: ibm }}
              >
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
          {submitState === "submitting" ? "جاري الإرسال..." : "إرسال الطلب"}
        </button>
      </section>
    </form>
  );
};

export default TourGuideRegisterStepOneForm;
