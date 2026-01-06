import TourGuidesBanner from "@/components/tour-guides/TourGuidesBanner/TourGuidesBanner";
import TourGuidesPageContent from "@/components/tour-guides/TourGuidesPageContent/TourGuidesPageContent";
import { TourGuideData } from "@/components/tour-guides/TourGuideCard/TourGuideCard";

const TourGuidesPage = () => {
  // Sample tour guides data - replace with actual data from API
  const guides: TourGuideData[] = [
    {
      id: 1,
      name: "أحمد عبدالله",
      location: "ابها",
      profileImage: "/assets/experiences/experiences.png", // Replace with actual profile images
      languages: [
        { code: "fr", name: "French", flag: "🇫🇷" },
        { code: "en", name: "English", flag: "🇬🇧" },
        { code: "ar", name: "العربية", flag: "🇸🇦" },
      ],
      whatsappUrl: "https://wa.me/966500000000",
      description:
        "مرشد سياحي معتمد من الهيئة السعودية للسياحة مع خبرة 7 سنوات في مجال الإرشاد السياحي متخصص في الجولات الت....",
    },
    ...Array.from({ length: 5 }, (_, i) => ({
      id: i + 2,
      name: "أحمد عبدالله",
      location: "ابها",
      profileImage: "/assets/experiences/experiences.png",
      languages: [
        { code: "fr", name: "French", flag: "🇫🇷" },
        { code: "en", name: "English", flag: "🇬🇧" },
        { code: "ar", name: "العربية", flag: "🇸🇦" },
      ],
      whatsappUrl: "https://wa.me/966500000000",
      description:
        "مرشد سياحي معتمد من الهيئة السعودية للسياحة مع خبرة 7 سنوات في مجال الإرشاد السياحي متخصص في الجولات الت....",
    })),
  ];

  return (
    <div className="flex flex-col w-full">
      <TourGuidesBanner />
      <TourGuidesPageContent guides={guides} />
    </div>
  );
};

export default TourGuidesPage;
