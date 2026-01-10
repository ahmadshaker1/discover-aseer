import PageBanner from "@/components/PageBanner/PageBanner";

const RestaurantsBanner = () => {
  return (
    <PageBanner
      breadcrumbs={[
        { label: "الصفحة الرئيسية", href: "/" },
        { label: "المطاعم" },
      ]}
      title="المطاعم"
      subtitle="مطاعم عسير: إمتاع الحواس وإشباع الذائقة"
      backgroundImage="/assets/experiences/experiences.png"
    />
  );
};

export default RestaurantsBanner;
