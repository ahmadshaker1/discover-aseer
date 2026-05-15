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
    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-[500px] flex flex-col bg-surface border border-border w-full">
      {/* Date Range Label - Top Right (RTL) */}
      <div className="absolute top-3 right-3 z-10 rounded-lg bg-primary px-3 py-1.5">
        <span className="text-sm font-medium text-primary-foreground">{dateRange}</span>
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
      <div className="p-6 bg-surface flex flex-col grow">
        {/* Title */}
        <h3 className="mb-2 text-right text-2xl font-bold text-foreground md:text-3xl">
          {title}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className="mb-2 text-right text-base text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        )}

        {/* Event Year */}
        {eventYear && (
          <p className="mb-4 text-right text-sm text-muted-foreground">{eventYear}</p>
        )}

        {/* Details Button */}
        <Link href={detailsUrl} className="mt-auto">
          <Button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <span>التفاصيل</span>
            <span className="text-primary-foreground">»</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventsCarouselCard;
