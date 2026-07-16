"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
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
  type?: string | string[] | null;
  type_en?: string | string[] | null;
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
  groupSize,
  bookUrl,
  type,
  type_en,
}: ExperienceCardProps) => {
  const t = useTranslations("common");
  const locale = useLocale();

  const getDisplayCategory = () => {
    const rawCategory = locale === "en" && type_en ? type_en : type;
    if (Array.isArray(rawCategory)) {
      return rawCategory.join(", ");
    }
    if (typeof rawCategory === "string" && rawCategory.trim() !== "") {
      // Sometimes it might be a JSON string array
      if (rawCategory.trim().startsWith("[")) {
        try {
          const parsed = JSON.parse(rawCategory);
          if (Array.isArray(parsed)) return parsed.join(", ");
        } catch {}
      }
      return rawCategory;
    }
    return category;
  };

  const displayCategory = getDisplayCategory();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-surface text-foreground shadow-sm transition-shadow hover:shadow-md">
      {/* Image Banner Section */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <ExperienceCardShareButton experienceId={id} title={title} />
        <div className="absolute start-3 top-3 rounded-full bg-black/70 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-white text-16">{displayCategory}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-grow flex-col p-5 text-start">
        {/* Title */}
        <h3 className="mb-1 text-xl font-bold text-foreground">{title}</h3>

        {/* Duration */}
        <p className="mb-3 text-base font-bold text-foreground">{duration}</p>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Provider */}
        <div className="mb-4 flex items-center justify-start gap-2">
          <BuildingIcon />
          <span className="text-sm text-foreground capitalize">{provider}</span>
        </div>

        {/* Price and Group Size */}
        <div className="mb-4 flex flex-wrap items-center justify-start gap-2 pb-4">
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold text-foreground">{price}</span>
            <SaudiRiyalIcon />
          </div>
          <span>/</span>
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-foreground">{t("group")}</span>
            <span className="text-sm font-medium text-foreground">
              x{groupSize}
            </span>
            <PersonIcon />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto">
          <ExperienceCardActions experienceId={id} bookUrl={bookUrl} />
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
