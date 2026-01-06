"use client";

import Image from "next/image";
import { LocationIcon, WhatsAppIcon } from "./Icons";

export interface TourGuideData {
  id: string | number;
  name: string;
  location: string;
  profileImage: string;
  languages: Array<{ code: string; name: string; flag: string }>;
  whatsappUrl: string;
  description: string;
}

export interface TourGuideCardProps extends TourGuideData {
  onCardClick: () => void;
}

const TourGuideCard = ({
  id,
  name,
  location,
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
      <div className="p-6 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="relative w-24 h-24 mb-4">
          <Image
            src={profileImage}
            alt={name}
            fill
            className="object-cover rounded-full"
            sizes="96px"
          />
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mb-2">
          <LocationIcon />
          <span className="text-sm text-purple-600">{location}</span>
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-black mb-3">{name}</h3>

        {/* Languages */}
        <div className="flex items-center gap-3 mb-4">
          {languages.map((lang) => (
            <div key={lang.code} className="flex items-center gap-1">
              <span className="text-xs">{lang.flag}</span>
              <span className="text-sm text-black">{lang.name}</span>
            </div>
          ))}
        </div>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          onClick={(e) => e.stopPropagation()}
          className="w-full bg-green-100 hover:bg-green-200 text-green-700 rounded-lg px-4 py-2 flex items-center justify-center gap-2 transition-colors mb-4"
        >
          <WhatsAppIcon />
          <span className="text-sm font-medium">تواصل عبر الواتساب</span>
        </a>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* More Link */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCardClick();
          }}
          className="text-sm text-black font-medium hover:underline"
        >
          المزيد
        </button>
      </div>
    </div>
  );
};

export default TourGuideCard;

