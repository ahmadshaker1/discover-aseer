import PageBanner from "@/components/PageBanner/PageBanner";

const ExperiencesBanner = () => {
  return (
    <PageBanner
      breadcrumbs={[
        { label: "التجارب" },
        { label: "الصفحة الرئيسية", href: "/" },
      ]}
      title="تجارب تنتظرك في عسير"
      subtitle="زيارة واحدة لا تكفي مع وفرة الخيارات من الأنشطة والتجارب."
      backgroundImage="/assets/experiences/experiences.png"
    />
  );
};

export default ExperiencesBanner;
