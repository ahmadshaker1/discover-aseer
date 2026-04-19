import PageBanner from "@/components/PageBanner/PageBanner";
import DestinationsMainPageContent from "@/components/destinations/DestinationsMainPageContent";
import { fetchDestinationsWithFallback } from "@/components/destinations/data";

const TOUR_GUIDE_REGISTER_HREF = "/tour-guides/register";

const DestinationsBrowsePage = async () => {
  const destinations = await fetchDestinationsWithFallback();

  return (
    <div className="flex w-full flex-col bg-white">
      <PageBanner
        breadcrumbs={[
          { label: "التجارب" },
          { label: "الصفحة الرئيسية", href: "/" },
        ]}
        breadcrumbDir="rtl"
        title="وجهات رئيسية.. تهوّل"
        subtitle="زيارة واحدة لا تكفي مع وفرة الخيارات من الأنشطة والتجارب."
        backgroundImage="/assets/activities/activities.jpg"
        primaryCta={{
          href: TOUR_GUIDE_REGISTER_HREF,
          label: "ساهم في إثراء وجهاتنا",
        }}
      />

      <DestinationsMainPageContent destinations={destinations} filterLayout="browse" />
    </div>
  );
};

export default DestinationsBrowsePage;
