export interface ApiSupportService {
  id: number | string;
  title_ar?: string | null;
  title_en?: string | null;
  tags?: string | null;
  city?: string | null;
  type?: string | null;
  location?: string | null;
  support_services_number?: number | string | null;
  status?: string | null;
}

export interface SupportService {
  id: string;
  title: string;
  category: string;
  city: string;
  type: string;
  supportNumber: string;
  mapsUrl: string;
}

export interface SupportServicesApiResponse {
  data?: ApiSupportService[];
}
