import PlannerPageContent from "@/components/planner/PlannerPageContent";
import PlannerBreadcrumb from "@/components/planner/PlannerBreadcrumb";

const PlannerPage = () => {
  return (
    <div className="flex flex-col w-full bg-white mt-25">
      <PlannerBreadcrumb />
      <PlannerPageContent />
    </div>
  );
};

export default PlannerPage;
