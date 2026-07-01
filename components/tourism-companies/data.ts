export interface TourismProvider {
  id: number;
  status: string;
  sort: number | null;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  title_en: string;
  title_ar: string;
  content_en: string | null;
  content_ar: string | null;
  logo_url: string;
  email: string | null;
  phone: string | null;
  website: string | null;
}

export async function getTourismProviders(): Promise<TourismProvider[]> {
  try {
    const res = await fetch(
      "https://tool-portal.discoveraseer.com/items/tourism_providers",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch tourism providers");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching tourism providers:", error);
    return [];
  }
}
