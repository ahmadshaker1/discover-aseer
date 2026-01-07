"use client";

import Image from "next/image";
import { LocationIcon, WhatsAppIcon } from "./Icons";
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
        {/* Profile Picture with Location Overlay */}
        <div className="relative w-24 h-24 mb-4">
          {/* Purple gradient border wrapper */}
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
          {/* Location Overlay at bottom */}
          <div className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 z-20 bg-white rounded-full px-2 py-1 shadow-md border border-gray-100">
            <div className="flex items-center gap-1.5 justify-end">
              <span className="text-purple-600">
                <LocationIcon />
              </span>
              <span className="text-sm font-bold text-purple-600 capitalize">
                {location}
              </span>
            </div>
          </div>
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
          className="w-full bg-white border rounded-full px-4 py-2 flex items-center justify-center gap-2 transition-colors mb-4 hover:bg-gray-50"
        >
          <span className="text-green-600">
            <WhatsAppIcon />
          </span>
          <span className="text-sm font-medium">تواصل عبر الواتساب</span>
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
          className="text-sm text-black font-medium hover:underline"
        >
          المزيد
        </Button>
      </div>
    </div>
  );
};

export default TourGuideCard;
