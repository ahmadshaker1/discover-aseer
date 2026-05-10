"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@headlessui/react";
import { ArrowLeftIcon } from "./Icons";

export interface EventCardProps {
  id: string | number;
  imageUrl: string;
  title: string;
  date: string;
  isHappeningNow?: boolean;
  detailsUrl: string;
}

const EventCard = ({
  id,
  imageUrl,
  title,
  date,
  isHappeningNow = false,
  detailsUrl,
}: EventCardProps) => {
  const t = useTranslations("common");
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Image Section */}
      <div className="relative h-64 w-full shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* "يحدث الان" (Happening Now) Tag - Top Right */}
        {isHappeningNow && (
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <span className="text-white text-sm font-medium">{t("happeningNow")}</span>
          </div>
        )}

        {/* Title and Date Overlay - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 via-black/60 to-transparent p-4">
          <h3 className="text-white text-xl font-bold mb-1">{title}</h3>
          <p className="text-white/90 text-sm">{date}</p>
        </div>
      </div>

      {/* Call-to-Action Button */}
      <div className="p-4 bg-white">
        <Link href={detailsUrl}>
          <Button className="w-full px-6 py-3 bg-[#7300CD] hover:bg-[#6027D2] text-white font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center gap-2">
            <span>{t("viewDetails")}</span>
            <ArrowLeftIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
