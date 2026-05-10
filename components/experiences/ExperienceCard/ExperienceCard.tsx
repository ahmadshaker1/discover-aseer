"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import ExperienceCardShareButton from "./ExperienceCardShareButton";
import ExperienceCardActions from "./ExperienceCardActions";
import { BuildingIcon, PersonIcon, SaudiRiyalIcon } from "./Icons";

export interface ExperienceCardProps {
  id: string | number;
  imageUrl: string;
  category: string;
  title: string;
  duration: string;
  description: string;
  provider: string;
  price: number;
  currency?: string;
  groupSize: number;
  bookUrl: string;
}

const ExperienceCard = ({
  id,
  imageUrl,
  category,
  title,
  duration,
  description,
  provider,
  price,
  currency,
  groupSize,
  bookUrl,
}: ExperienceCardProps) => {
  const t = useTranslations("common");
  const currencyLabel = currency ?? t("currencySar");
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Banner Section */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Share Button - Top Left */}
        <ExperienceCardShareButton experienceId={id} title={title} />
        {/* Category Badge - Top Right */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="text-white text-xs font-medium">{category}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 text-right" dir="rtl">
        {/* Title */}
        <h3 className="mb-1 text-xl font-bold text-black">{title}</h3>

        {/* Duration */}
        <p className="mb-3 text-base font-bold text-black">{duration}</p>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">
          {description}
        </p>

        {/* Provider */}
        <div className="mb-4 flex items-center justify-end gap-2">
          <BuildingIcon />
          <span className="text-sm text-black">{provider}</span>
        </div>

        {/* Price and Group Size */}
        <div className="mb-4 flex items-center justify-end gap-2 pb-4">
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold text-black">{price}</span>
            <SaudiRiyalIcon />
            <span className="text-xs text-gray-500">{currencyLabel}</span>
          </div>
          <span>/</span>
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-black">{t("group")}</span>
            <span className="text-sm font-medium text-black">x{groupSize}</span>
            <PersonIcon />
          </div>
        </div>

        {/* Action Buttons */}
        <ExperienceCardActions experienceId={id} bookUrl={bookUrl} />
      </div>
    </div>
  );
};

export default ExperienceCard;
