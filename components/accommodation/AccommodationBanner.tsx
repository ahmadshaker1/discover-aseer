import PageBanner from "@/components/PageBanner/PageBanner";

const AccommodationBanner = () => {
  return (
    <PageBanner
      breadcrumbs={[
        { label: "أماكن الإقامة" },
        { label: "الصفحة الرئيسية", href: "/" },
      ]}
      title="أماكن الإقامة"
      subtitle="زيارة واحدة لا تكفي مع وفرة الخيارات من الأنشطة والتجارب."
      backgroundImage="/assets/experiences/experiences.png"
    />
  );
};

export default AccommodationBanner;
