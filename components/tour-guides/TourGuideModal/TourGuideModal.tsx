"use client";

import { Button, Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import {
  CloseIcon,
  WhatsAppIcon,
  ClockIcon,
  PeopleIcon,
  CarIcon,
  CalendarIcon,
} from "./Icons";
import { ArabicFlagIcon, EnglishFlagIcon } from "../TourGuideCard/Icons";
import { SaudiRiyalIcon } from "@/components/restaurants/Icons";
import { TourGuideData } from "../TourGuideCard/TourGuideCard";

const LanguageFlag = ({ code }: { code: string }) => {
  if (code === "ar") return <ArabicFlagIcon />;
  if (code === "en") return <EnglishFlagIcon />;
  return null;
};

interface TourGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  guide: TourGuideData | null;
  about: string;
  pricePerHour: number;
  maxPersons: number;
  transportation: string;
  availability: string;
}

const TourGuideModal = ({
  isOpen,
  onClose,
  guide,
  about,
  pricePerHour,
  maxPersons,
  transportation,
  availability,
}: TourGuideModalProps) => {
  if (!guide) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-neutral-900/80" aria-hidden="true" />

      {/* Modal Container with Animation */}
      <div className="fixed inset-0 flex items-end sm:items-center justify-center p-2 sm:p-4">
        <DialogPanel
          dir="rtl"
          className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-4 modal-enter"
        >
          {/* Close Button - on the left side for RTL */}
          <Button
            onClick={onClose}
            className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseIcon />
          </Button>

          <div className="p-4 sm:p-6">
            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-4 sm:mb-6">
              {/* Profile Picture */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 p-[2px]">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                    <Image
                      src={guide.profileImage}
                      alt={guide.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                </div>
              </div>

              {/* Details Container */}
              <div className="flex-1 w-full sm:w-auto">
                {/* Name */}
                <h2 className="text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-3">
                  {guide.name}
                </h2>

                {/* Languages */}
                <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-2 sm:mb-3">
                  {guide.languages.map((lang) => (
                    <div key={lang.code} className="flex items-center gap-1.5">
                      <LanguageFlag code={lang.code} />
                      <span className="text-sm text-black">{lang.name}</span>
                    </div>
                  ))}
                </div>

                {/* WhatsApp Button */}
                <a
                  href={guide.whatsappUrl}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border rounded-full hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium"
                >
                  <span className="text-green-600">
                    <WhatsAppIcon />
                  </span>
                  <span>تواصل عبر الواتساب</span>
                </a>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3">
                عن {guide.name.split(" ")[0]}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {about}
              </p>

              {/* Specialties Tags - Only render if array exists and is not empty */}
              {guide.specialties && guide.specialties.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {guide.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 border border-purple-200 text-purple-600 rounded-full text-sm bg-white"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Services Section */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">
                الخدمات
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                  <div className="flex items-center gap-2 mb-2 text-purple-600">
                    <ClockIcon />
                    <span className="text-xs sm:text-sm font-medium">
                      السعر لكل ساعة
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-base sm:text-lg font-bold text-black">
                      {pricePerHour}
                    </p>
                    <span className="text-purple-600">
                      <SaudiRiyalIcon />
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                  <div className="flex items-center gap-2 mb-2 text-purple-600">
                    <PeopleIcon />
                    <span className="text-xs sm:text-sm font-medium">
                      الحد الأعلى للأشخاص
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-black">
                    {maxPersons}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                  <div className="flex items-center gap-2 mb-2 text-purple-600">
                    <CarIcon />
                    <span className="text-xs sm:text-sm font-medium">
                      وسيلة النقل
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-black">
                    {transportation}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                  <div className="flex items-center gap-2 mb-2 text-purple-600">
                    <CalendarIcon />
                    <span className="text-xs sm:text-sm font-medium">
                      المواعيد
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-black">
                    {availability}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default TourGuideModal;
