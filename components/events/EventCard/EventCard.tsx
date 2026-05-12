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
    <div className="relative flex h-full flex-col overflow-hidden rounded-lg bg-surface text-foreground shadow-md transition-shadow hover:shadow-lg">
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
      <div className="bg-surface p-4">
        <Link href={detailsUrl}>
          <Button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <span>{t("viewDetails")}</span>
            <ArrowLeftIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
