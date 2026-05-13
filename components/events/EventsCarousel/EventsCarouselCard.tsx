import Image from "next/image";
import Link from "next/link";
import { Button } from "@headlessui/react";

export interface EventsCarouselCardProps {
  id: string | number;
  imageUrl: string;
  dateRange: string;
  title: string;
  subtitle?: string;
  eventYear?: string;
  detailsUrl: string;
}

const EventsCarouselCard = ({
  imageUrl,
  dateRange,
  title,
  subtitle,
  eventYear,
  detailsUrl,
}: EventsCarouselCardProps) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-[500px] flex flex-col bg-white w-full">
      {/* Date Range Label - Top Right (RTL) */}
      <div className="absolute top-3 right-3 z-10 bg-[#7300CD] rounded-lg px-3 py-1.5">
        <span className="text-white text-sm font-medium">{dateRange}</span>
      </div>

      {/* Image Section */}
      <div className="relative h-64 w-full shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="320px"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 bg-white flex flex-col grow">
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-[#1E3A8A] mb-2 text-right">
          {title}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-base md:text-lg text-[#1E3A8A] mb-2 text-right">
            {subtitle}
          </p>
        )}

        {/* Event Year */}
        {eventYear && (
          <p className="text-sm text-[#1E3A8A] mb-4 text-right">{eventYear}</p>
        )}

        {/* Details Button */}
        <Link href={detailsUrl} className="mt-auto">
          <Button className="w-full px-6 py-3 bg-[#7300CD] hover:bg-[#6027D2] text-white font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center gap-2">
            <span>التفاصيل</span>
            <span className="text-white">»</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventsCarouselCard;
