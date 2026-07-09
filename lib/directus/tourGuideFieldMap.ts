import type { ApiTouristGuide } from "@/components/tour-guides/types";

export type SpecializationId =
  | "land"
  | "marine"
  | "aerial"
  | "heritage"
  | "recreational"
  | "other";

export const SPECIALIZATION_IDS: SpecializationId[] = [
  "land",
  "marine",
  "aerial",
  "heritage",
  "recreational",
  "other",
];

/** Values stored in `specializations` (Arabic labels, matching the former public form). */
export const SPECIALIZATION_AR: Record<SpecializationId, string> = {
  land: "متخصص في التجارب والأنشطة البرية",
  marine: "متخصص في التجارب والأنشطة البحرية",
  aerial: "متخصص في التجارب والأنشطة الهوائية",
  heritage: "متخصص في التجارب والأنشطة التراثية والثقافية",
  recreational: "متخصص في سياحة الاستجمام",
  other: "أخرى",
};

export function buildSpecializationValue(
  selectedSpecializations: SpecializationId[],
  otherSpecialization: string,
): string {
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

export function parseSpecializationValue(value: string): {
  selected: SpecializationId[];
  other: string;
} {
  const trimmed = value.trim();
  if (!trimmed) return { selected: [], other: "" };

  const parts = trimmed
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const selected: SpecializationId[] = [];
  const otherParts: string[] = [];

  for (const part of parts) {
    const known = (
      Object.entries(SPECIALIZATION_AR) as [SpecializationId, string][]
    ).find(([, label]) => label === part);
    if (known) {
      if (known[0] === "other") {
        if (!selected.includes("other")) selected.push("other");
      } else if (!selected.includes(known[0])) {
        selected.push(known[0]);
      }
    } else {
      otherParts.push(part);
    }
  }

  if (otherParts.length > 0) {
    if (!selected.includes("other")) selected.push("other");
    return { selected, other: otherParts.join(", ") };
  }

  return { selected, other: "" };
}

/** Portal form shape (aligned with the former public registration form field names). */
export interface TourGuidePortalFormValues {
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
}

export const EMPTY_PORTAL_FORM: TourGuidePortalFormValues = {
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

function parseOtherLanguages(raw: string | null | undefined): {
  languages: string;
  level: TourGuidePortalFormValues["Other_languages_level"];
} {
  const text = raw?.trim() ?? "";
  if (!text) return { languages: "", level: "" };

  const match = text.match(
    /^(.*?)\s*[—\-–]\s*(beginner|intermediate|advanced)\s*$/i,
  );
  if (!match) return { languages: text, level: "" };

  const level = match[2].toLowerCase() as
    | "beginner"
    | "intermediate"
    | "advanced";
  return { languages: match[1].trim(), level };
}

function formatOtherLanguages(
  languages: string,
  level: TourGuidePortalFormValues["Other_languages_level"],
): string | null {
  const trimmed = languages.trim();
  if (!trimmed) return null;
  if (!level) return trimmed;
  return `${trimmed} — ${level}`;
}

export function apiProfileToPortalForm(
  api: ApiTouristGuide,
): TourGuidePortalFormValues {
  const other = parseOtherLanguages(api.other_languages);
  const residenceRaw =
    typeof api.residence === "string" ? api.residence.trim() : "";
  const residence =
    residenceRaw === "aseer" || residenceRaw === "other"
      ? residenceRaw
      : ("" as const);

  return {
    name_ar: api.name ?? "",
    name_en: api.name_en ?? "",
    gender: (api.gender as TourGuidePortalFormValues["gender"]) ?? "",
    National_ID_number: api.national_id ?? "",
    residence,
    About_me: api.description ?? api.content ?? "",
    License_number: api.license_number ?? "",
    License_expiry_date: api.date ? String(api.date).slice(0, 10) : "",
    english_language:
      (api.english_language_level as TourGuidePortalFormValues["english_language"]) ??
      "",
    Arabic_language:
      (api.arabic_language_level as TourGuidePortalFormValues["Arabic_language"]) ??
      "",
    Other_languages: other.languages,
    Other_languages_level: other.level,
    Specialization: api.specializations ?? "",
    Email: api.email ?? "",
    transportation:
      api.transportation === true
        ? "yes"
        : api.transportation === false
          ? "no"
          : "",
    WhatsApp_number: api.whatsapp ?? "",
    Mobile_number: api.phone_number ?? "",
    Instagram: api.instagram ?? "",
    Website: api.website ?? "",
    TikTok: api.tiktok ?? "",
    X_platform: api.x_platform ?? "",
    commitment1: api.commitment_1 === true,
    commitment2: api.commitment_2 === true,
    commitment3: api.commitment_3 === true,
    // Privacy acceptance is UI-only; pre-check when the stored commitments are already on file.
    commitment4:
      api.commitment_1 === true &&
      api.commitment_2 === true &&
      api.commitment_3 === true,
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
    other_languages: formatOtherLanguages(
      values.Other_languages,
      values.Other_languages_level,
    ),
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

  if (values.residence) {
    payload.residence = values.residence;
  }

  if (fileIds.imageId) payload.image = fileIds.imageId;
  if (fileIds.licenseId) payload.license_attachment = fileIds.licenseId;

  return payload;
}
