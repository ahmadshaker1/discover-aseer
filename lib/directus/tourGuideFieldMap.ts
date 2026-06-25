import type { ApiTouristGuide } from "@/components/tour-guides/types";

/** Portal form shape (aligned with the public registration form field names). */
export interface TourGuidePortalFormValues {
  name_ar: string;
  name_en: string;
  gender: "" | "ذكر" | "أنثى";
  National_ID_number: string;
  About_me: string;
  License_number: string;
  License_expiry_date: string;
  english_language: "" | "beginner" | "intermediate" | "advanced";
  Arabic_language: "" | "beginner" | "intermediate" | "advanced";
  Other_languages: string;
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
}

export const EMPTY_PORTAL_FORM: TourGuidePortalFormValues = {
  name_ar: "",
  name_en: "",
  gender: "",
  National_ID_number: "",
  About_me: "",
  License_number: "",
  License_expiry_date: "",
  english_language: "",
  Arabic_language: "",
  Other_languages: "",
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
};

export function apiProfileToPortalForm(
  api: ApiTouristGuide,
): TourGuidePortalFormValues {
  return {
    name_ar: api.name ?? "",
    name_en: api.name_en ?? "",
    gender: (api.gender as TourGuidePortalFormValues["gender"]) ?? "",
    National_ID_number: api.national_id ?? "",
    About_me: api.description ?? api.content ?? "",
    License_number: api.license_number ?? "",
    License_expiry_date: api.date ? String(api.date).slice(0, 10) : "",
    english_language:
      (api.english_language_level as TourGuidePortalFormValues["english_language"]) ??
      "",
    Arabic_language:
      (api.arabic_language_level as TourGuidePortalFormValues["Arabic_language"]) ??
      "",
    Other_languages: api.other_languages ?? "",
    Specialization: api.specializations ?? "",
    Email: "",
    transportation: api.transportation === true ? "yes" : api.transportation === false ? "no" : "",
    WhatsApp_number: api.whatsapp ?? "",
    Mobile_number: api.phone_number ?? "",
    Instagram: api.instagram ?? "",
    Website: api.website ?? "",
    TikTok: api.tiktok ?? "",
    X_platform: api.x_platform ?? "",
    commitment1: api.commitment_1 === true,
    commitment2: api.commitment_2 === true,
    commitment3: api.commitment_3 === true,
  };
}

/** Map portal form values to `tourist_guides` collection fields. */
export function portalFormToApiPayload(
  values: TourGuidePortalFormValues,
  fileIds: { imageId?: string | null; licenseId?: string | null },
): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    name: values.name_ar.trim(),
    name_en: values.name_en.trim(),
    gender: values.gender,
    national_id: values.National_ID_number.trim(),
    description: values.About_me.trim(),
    description_en: values.About_me.trim(),
    license_number: values.License_number.trim(),
    date: values.License_expiry_date,
    arabic_language_level: values.Arabic_language,
    english_language_level: values.english_language,
    other_languages: values.Other_languages.trim() || null,
    specializations: values.Specialization.trim(),
    transportation: values.transportation === "yes",
    whatsapp: values.WhatsApp_number.trim(),
    phone_number: values.Mobile_number.trim(),
    instagram: values.Instagram.trim() || null,
    website: values.Website.trim() || null,
    tiktok: values.TikTok.trim() || null,
    x_platform: values.X_platform.trim() || null,
    commitment_1: values.commitment1,
    commitment_2: values.commitment2,
    commitment_3: values.commitment3,
  };

  if (fileIds.imageId) payload.image = fileIds.imageId;
  if (fileIds.licenseId) payload.license_attachment = fileIds.licenseId;

  return payload;
}
