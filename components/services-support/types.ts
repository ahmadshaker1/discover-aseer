export interface ApiSupportService {
  id: number | string;
  title_ar?: string | null;
  title_en?: string | null;
  city?: string | null;
  city_en?: string | null;
  type?: string | null;
  location?: string | null;
  support_services_number?: number | string | null;
  status?: string | null;
  [key: string]: unknown;
}

export interface SupportService {
  id: string;
  title: string;
  category: string;
  city: string;
  type: string;
  supportNumber: string;
  mapsUrl: string;
  /** Raw CMS values used for filter matching (Arabic from API). */
  filterCity: string;
  filterType: string;
}

export interface SupportServicesApiResponse {
  data?: ApiSupportService[];
}
