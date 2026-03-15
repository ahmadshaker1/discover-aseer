import PageBanner from "@/components/PageBanner/PageBanner";

const AccommodationBanner = () => {
  return (
    <PageBanner
      breadcrumbs={[
        { label: "الصفحة الرئيسية", href: "/" },
        { label: "الإقامة" },
      ]}
      title="الإقامة"
      subtitle="اكتشف أماكن الإقامة المميزة في عسير"
      backgroundImage="/assets/experiences/experiences.png"
    />
  );
};

export default AccommodationBanner;
