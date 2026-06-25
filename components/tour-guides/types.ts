import type { TourGuideData } from "./TourGuideCard/TourGuideCard";

/** Directus (or compatiable REST) item shpe for the tourist guides collection. */
export interface ApiTouristGuide {
  id: number;
  name: string | null;
  name_en: string | null;
  image: string | null;
  license_attachment?: string | null;
  phone_number: string | null;
  whatsapp: string | null;
  email?: string | null;
  content: string | null;
  content_en: string | null;
  description: string | null;
  description_en: string | null;
  other_languages?: string | null;
  website: string | null;
  instagram: string | null;
  x_platform: string | null;
  tiktok: string | null;
  gender: string | null;
  arabic_language_level: string | null;
  english_language_level: string | null;
  specializations: string | null;
  specializations_en: string | null;
  date: string | null;
  national_id?: string | null;
  license_number?: string | null;
  /** Directus: home city or service area (id like `abha` or Arabic label). */
  city?: string | null;
  city_id?: string | null;
  transportation: boolean | null;
  commitment_1?: boolean | null;
  commitment_2?: boolean | null;
  commitment_3?: boolean | null;
  /** `draft` until an admin publishes; `published` items appear on the public listing. */
  status?: string | null;
  user_created?: string | null;
  [key: string]: unknown;
}

export interface TouristGuidesApiResponse {
  data: ApiTouristGuide[];
}

export interface FilterOptionWithCount {
  id: string;
  label: string;
  count: number;
}

export interface TourGuidesFilterOptions {
  specializations: FilterOptionWithCount[];
  gender: FilterOptionWithCount[];
  transportation: FilterOptionWithCount[];
}

export interface TourGuideWithFilterMeta extends TourGuideData {
  filterSpecializations: string[];
  gender: string;
  hasTransportation: boolean;
  /** Inferred or from CMS; used to scope guides by city (e.g. attraction detail page). */
  cityId?: string;
}

export interface FetchTourGuidesResult {
  guides: TourGuideWithFilterMeta[];
  filterOptions: TourGuidesFilterOptions;
}
