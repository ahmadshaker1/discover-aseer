"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArabicFlagIcon, EnglishFlagIcon, WhatsAppIcon } from "./Icons";
import { Button } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { tourGuidePlaceholderAvatar } from "@/components/tour-guides/tourGuideAvatar";

export interface TourGuideData {
  id: string | number;
  name: string;
  location: string;
  profileImage: string;
  languages: Array<{ code: string; name: string; flag: string }>;
  whatsappUrl: string;
  description: string;
  pricePerHour?: number;
  maxPersons?: number;
  transportation?: string;
  availability?: string;
  specialties?: string[];
  gender?: string;
}

export interface TourGuideCardProps extends TourGuideData {
  onCardClick: () => void;
}

const LanguageFlag = ({ code }: { code: string }) => {
  if (code === "ar") return <ArabicFlagIcon />;
  if (code === "en") return <EnglishFlagIcon />;
  return null;
};

const TourGuideCard = ({
  name,
  profileImage,
  languages,
  whatsappUrl,
  description,
  onCardClick,
  gender,
}: TourGuideCardProps) => {
  const t = useTranslations("tourGuides");
  const tCommon = useTranslations("common");
  const placeholder = tourGuidePlaceholderAvatar(gender);
  const [src, setSrc] = useState(profileImage || placeholder);

  useEffect(() => {
    setSrc(profileImage || placeholder);
  }, [profileImage, placeholder]);

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-surface text-foreground shadow-sm transition-shadow hover:shadow-md h-90"
      onClick={onCardClick}
    >
      <div className="p-4 sm:p-6 flex flex-col items-center h-full">
        {/* Profile Picture */}
        <div className="relative w-24 h-24 mb-4">
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-purple-400 to-purple-600 p-[2px]">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={src}
                alt={name}
                fill
                className="object-cover"
                sizes="96px"
                onError={() => {
                  if (src !== placeholder) setSrc(placeholder);
                }}
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <h3 className="mb-3 text-xl font-bold text-foreground">{name}</h3>

        {/* Languages */}
        <div className="flex items-center gap-3 mb-4 flex-wrap justify-center">
          {languages.map((lang) => (
            <div key={lang.code} className="flex items-center gap-1.5">
              <LanguageFlag code={lang.code} />
              <span className="text-sm text-foreground">{lang.name}</span>
            </div>
          ))}
        </div>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          onClick={(e) => e.stopPropagation()}
          className="mb-4 flex w-full max-w-[240px] items-center justify-center gap-2 rounded-full border-2 border-border bg-surface px-4 py-2 text-center transition-colors hover:bg-muted"
        >
          <span className="shrink-0 text-green-600 dark:text-white">
            <WhatsAppIcon />
          </span>
          <span className="text-sm font-bold leading-tight whitespace-normal">
            {t("contactWhatsApp")}
          </span>
        </a>

        {/* Description */}
        <p className="mb-4 line-clamp-3 text-center text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* More Link */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onCardClick();
          }}
          className="cursor-pointer text-sm font-medium text-foreground hover:underline mt-auto"
        >
          {tCommon("more")}
        </Button>
      </div>
    </div>
  );
};

export default TourGuideCard;
