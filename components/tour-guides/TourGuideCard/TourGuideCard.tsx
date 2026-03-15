"use client";

import Image from "next/image";
import { ArabicFlagIcon, EnglishFlagIcon, WhatsAppIcon } from "./Icons";
import { Button } from "@headlessui/react";

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
}: TourGuideCardProps) => {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onCardClick}
    >
      <div className="p-4 sm:p-6 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="relative w-24 h-24 mb-4">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 p-[2px]">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={profileImage}
                alt={name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-black mb-3">{name}</h3>

        {/* Languages */}
        <div className="flex items-center gap-3 mb-4 flex-wrap justify-center">
          {languages.map((lang) => (
            <div key={lang.code} className="flex items-center gap-1.5">
              <LanguageFlag code={lang.code} />
              <span className="text-sm text-black">{lang.name}</span>
            </div>
          ))}
        </div>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          onClick={(e) => e.stopPropagation()}
          className="w-2/3 bg-white border-2  rounded-full px-4 py-2 flex items-center justify-center gap-2 transition-colors mb-4 hover:bg-gray-50"
        >
          <span className="text-green-600">
            <WhatsAppIcon />
          </span>
          <span className="text-sm font-bold">تواصل عبر الواتساب</span>
        </a>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* More Link */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onCardClick();
          }}
          className="text-sm text-black font-medium hover:underline cursor-pointer"
        >
          المزيد
        </Button>
      </div>
    </div>
  );
};

export default TourGuideCard;
