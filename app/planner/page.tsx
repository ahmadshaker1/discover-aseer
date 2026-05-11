import PlannerPageContent from "@/components/planner/PlannerPageContent";
import PlannerBreadcrumb from "@/components/planner/PlannerBreadcrumb";

const PlannerPage = () => {
  return (
    <div className="mt-25 flex w-full flex-col bg-background text-foreground">
      <PlannerBreadcrumb />
      <PlannerPageContent />
    </div>
  );
};

export default PlannerPage;
