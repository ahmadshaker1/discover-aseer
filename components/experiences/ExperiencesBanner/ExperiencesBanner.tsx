import PageBanner from "@/components/PageBanner/PageBanner";

const ExperiencesBanner = () => {
  return (
    <PageBanner
      breadcrumbs={[
        { label: "الصفحة الرئيسية", href: "/" },
        { label: "التجارب" },
      ]}
      title="تجارب تنتظرك في عسير"
      subtitle="زيارة واحدة لا تكفى مع وفرة الخيارات من الانشطة والتجارب."
      backgroundImage="/assets/experiences/experiences.png"
    />
  );
};

export default ExperiencesBanner;
