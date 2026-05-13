import ServicesSupportCard from "./ServicesSupportCard";
import type { SupportService } from "./types";
import { useTranslations } from "next-intl";

interface ServicesSupportGridProps {
  services: SupportService[];
}

const ServicesSupportGrid = ({ services }: ServicesSupportGridProps) => {
  const t = useTranslations("servicesSupport");
  if (services.length === 0) {
    return (
      <div
        className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-border bg-surface p-6 text-center text-muted-foreground"
       
      >
        {t("noServicesFilter")}
      </div>
    );
  }

  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3 xl:gap-5">
      {services.map((service) => (
        <ServicesSupportCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServicesSupportGrid;
