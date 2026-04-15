import ServicesSupportCard from "./ServicesSupportCard";
import type { SupportService } from "./types";

interface ServicesSupportGridProps {
  services: SupportService[];
}

const ServicesSupportGrid = ({ services }: ServicesSupportGridProps) => {
  if (services.length === 0) {
    return (
      <div
        className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center text-gray-600"
        dir="rtl"
      >
        لا توجد خدمات مطابقة للفلاتر المحددة.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {services.map((service) => (
        <ServicesSupportCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServicesSupportGrid;
