import TourGuidesBanner from "@/components/tour-guides/TourGuidesBanner/TourGuidesBanner";
import TourGuidesPageContent from "@/components/tour-guides/TourGuidesPageContent/TourGuidesPageContent";
import { TourGuideData } from "@/components/tour-guides/TourGuideCard/TourGuideCard";

interface ApiTourGuide {
  id: string;
  status: string;
  name: string;
  city: string;
  languages: string[];
  phone: string;
  profile_picture: string;
  description: string;
  price_per_hour?: string;
  maximum_number_of_people?: number;
  method_of_transportation?: string;
  appointments?: string;
  specialties?: string[];
}

interface ApiResponse {
  data: ApiTourGuide[];
}

const languageMap: Record<
  string,
  { code: string; name: string; flag: string }
> = {
  english: { code: "en", name: "English", flag: "🇬🇧" },
  arabic: { code: "ar", name: "العربية", flag: "🇸🇦" },
  french: { code: "fr", name: "French", flag: "🇫🇷" },
  spanish: { code: "es", name: "Spanish", flag: "🇪🇸" },
  german: { code: "de", name: "German", flag: "🇩🇪" },
};

const transformTourGuide = (apiGuide: ApiTourGuide): TourGuideData => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL || "";
  const profileImageUrl = apiGuide.profile_picture
    ? `${directusUrl}/assets/${apiGuide.profile_picture}`
    : "/assets/experiences/experiences.png";

  // Build WhatsApp URL from phone number
  const phoneNumber = apiGuide.phone.replace(/\D/g, ""); // Remove non-digits
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  // Map languages
  const languages = apiGuide.languages
    .map((lang) => languageMap[lang.toLowerCase()])
    .filter(Boolean) as Array<{ code: string; name: string; flag: string }>;

  // Map transportation method
  const transportationMap: Record<string, string> = {
    car: "سيارة",
    bus: "حافلة",
    walking: "مشي",
  };

  // Map appointments
  const availabilityMap: Record<string, string> = {
    flexible: "مرنة",
    fixed: "ثابتة",
  };

  return {
    id: apiGuide.id,
    name: apiGuide.name,
    location: apiGuide.city,
    profileImage: profileImageUrl,
    languages:
      languages.length > 0
        ? languages
        : [{ code: "ar", name: "العربية", flag: "🇸🇦" }],
    whatsappUrl,
    description: apiGuide.description,
    pricePerHour: apiGuide.price_per_hour
      ? parseInt(apiGuide.price_per_hour)
      : undefined,
    maxPersons: apiGuide.maximum_number_of_people,
    transportation: apiGuide.method_of_transportation
      ? transportationMap[apiGuide.method_of_transportation.toLowerCase()] ||
        apiGuide.method_of_transportation
      : undefined,
    availability: apiGuide.appointments
      ? availabilityMap[apiGuide.appointments.toLowerCase()] ||
        apiGuide.appointments
      : undefined,
    specialties:
      apiGuide.specialties && apiGuide.specialties.length > 0
        ? apiGuide.specialties
        : undefined,
  };
};

const TourGuidesPage = async () => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return (
      <div className="flex flex-col w-full">
        <TourGuidesBanner />
        <div className="container mx-auto py-12 text-center">
          <p className="text-red-600">Error: API URL not configured</p>
        </div>
      </div>
    );
  }

  let guides: TourGuideData[] = [];

  try {
    const response = await fetch(`${directusUrl}/items/tour_guides`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tour guides: ${response.statusText}`);
    }

    const apiData: ApiResponse = await response.json();
    guides = apiData.data
      .filter((guide) => guide.status === "published")
      .map(transformTourGuide);
  } catch (error) {
    console.error("Error fetching tour guides:", error);
    // Return empty array on error - you might want to show an error message instead
  }

  return (
    <div className="flex flex-col w-full">
      <TourGuidesBanner />
      <TourGuidesPageContent guides={guides} />
    </div>
  );
};

export default TourGuidesPage;
