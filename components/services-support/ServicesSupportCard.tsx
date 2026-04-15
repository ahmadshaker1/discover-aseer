import type { SupportService } from "./types";

interface ServicesSupportCardProps {
  service: SupportService;
}

const ServicesSupportCard = ({ service }: ServicesSupportCardProps) => {
  return (
    <article
      className="flex min-h-[152px] w-full flex-col justify-between rounded-xl border border-gray-200 bg-[#FBFBFB] p-4 text-right"
      dir="rtl"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full bg-[#9D7AE2]/30 px-3 py-1 text-xs font-semibold text-[#5A2BB9]">
          {service.category}
        </span>
      </div>

      <h3 className="mb-2 line-clamp-2 text-base font-bold text-black sm:text-[17px]">
        {service.title}
      </h3>

      <p className="mb-3 text-sm text-gray-600">{service.city}</p>

      <div className="mt-auto flex items-center justify-between gap-2 text-sm">
        <span className="font-semibold text-[#3A3A3A]">
          {service.supportNumber}
        </span>
        <a
          href={service.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#5A2BB9] underline-offset-2 transition hover:underline"
        >
          افتح الخريطة
        </a>
      </div>
    </article>
  );
};

export default ServicesSupportCard;
