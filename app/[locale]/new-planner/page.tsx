import NewPlanner from "@/components/new-planner/NewPlanner";
import { useTranslations } from "next-intl";

export default function NewPlannerPage() {
  const t = useTranslations("Planner");

  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <NewPlanner />
    </div>
  );
}
