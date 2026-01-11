import PageBanner from "@/components/PageBanner/PageBanner";
import PlannerPageContent from "@/components/planner/PlannerPageContent";

const PlannerPage = () => {
  return (
    <div className="flex flex-col w-full">
      <PageBanner
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "مخطط الرحلات" },
        ]}
        title="مخطط الرحلات الذكي"
        subtitle="خطط لرحلتك المثالية في عسير باستخدام الذكاء الاصطناعي"
        backgroundImage="/assets/experiences/experiences.png"
      />
      <PlannerPageContent />
    </div>
  );
};

export default PlannerPage;
