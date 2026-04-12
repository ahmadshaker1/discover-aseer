import type { TourGuideData } from "./TourGuideCard/TourGuideCard";

/** Directus (or compatible REST) item shape for the tourist guides collection. */
export interface ApiTouristGuide {
  id: number;
  name: string | null;
  name_en: string | null;
  image: string | null;
  phone_number: string | null;
  whatsapp: string | null;
  content: string | null;
  content_en: string | null;
  description: string | null;
  description_en: string | null;
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
  transportation: boolean | null;
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
}

export interface FetchTourGuidesResult {
  guides: TourGuideWithFilterMeta[];
  filterOptions: TourGuidesFilterOptions;
}
