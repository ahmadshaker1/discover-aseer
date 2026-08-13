"use client";

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
  languages,
  whatsappUrl,
  description,
  onCardClick,
  gender,
}: TourGuideCardProps) => {
  const t = useTranslations("tourGuides");
  const tCommon = useTranslations("common");
  const avatarSrc = tourGuidePlaceholderAvatar(gender);

  return (
    <div
      className="min-h-[420px] cursor-pointer overflow-hidden rounded-lg bg-surface text-foreground shadow-sm transition-shadow hover:shadow-md"
      onClick={onCardClick}
    >
      <div className="flex h-full flex-col items-center p-6 sm:p-8">
        {/* Profile Picture */}
        <div className="relative mb-5 h-28 w-28 shrink-0 overflow-hidden rounded-full">
          <div className="absolute inset-0 overflow-hidden rounded-full bg-linear-to-br from-purple-400 to-purple-600 p-[2px]">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-surface">
              <Image
                src={avatarSrc}
                alt={name}
                fill
                className="rounded-full object-cover"
                sizes="112px"
                style={{ borderRadius: "50%" }}
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <h3 className="mb-2 text-base font-bold text-foreground">{name}</h3>

        {/* Languages */}
        <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
          {languages.map((lang) => (
            <div key={lang.code} className="flex items-center gap-1.5">
              <LanguageFlag code={lang.code} />
              <span className="text-xs text-foreground">{lang.name}</span>
            </div>
          ))}
        </div>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          onClick={(e) => e.stopPropagation()}
          className="mb-4 flex w-full max-w-[260px] items-center justify-center gap-2 rounded-full border-2 border-border bg-surface px-4 py-2.5 text-center transition-colors hover:bg-muted"
        >
          <span className="shrink-0 text-green-600 dark:text-white">
            <WhatsAppIcon />
          </span>
          <span className="text-xs font-bold leading-tight whitespace-normal">
            {t("contactWhatsApp")}
          </span>
        </a>

        {/* Description */}
        <p className="mb-4 line-clamp-3 text-center text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* More Link */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onCardClick();
          }}
          className="mt-auto cursor-pointer text-xs font-medium text-foreground hover:underline"
        >
          {tCommon("more")}
        </Button>
      </div>
    </div>
  );
};

export default TourGuideCard;
