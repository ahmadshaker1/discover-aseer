"use client";

import { Button, Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import {
  CloseIcon,
  LocationIcon,
  WhatsAppIcon,
  ClockIcon,
  PeopleIcon,
  CarIcon,
  CalendarIcon,
} from "./Icons";
import { TourGuideData } from "../TourGuideCard/TourGuideCard";

interface TourGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  guide: TourGuideData | null;
  about: string;
  experienceTags: string[];
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
  experienceTags,
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

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto mx-4">
          {/* Close Button */}
          <Button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseIcon />
          </Button>

          <div className="p-8">
            {/* Profile Section */}
            <div className="flex items-start gap-4 mb-6">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={guide.profileImage}
                  alt={guide.name}
                  fill
                  className="object-cover rounded-full border-4 border-purple-200"
                  sizes="80px"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-black mb-2">
                  {guide.name}
                </h2>
                <div className="flex items-center gap-1 mb-3">
                  <LocationIcon />
                  <span className="text-sm text-purple-600">
                    {guide.location}
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  {guide.languages.map((lang) => (
                    <div key={lang.code} className="flex items-center gap-1">
                      <span className="text-xs">{lang.flag}</span>
                      <span className="text-sm text-black">{lang.name}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={guide.whatsappUrl}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-green-600 text-green-600 rounded-full hover:bg-green-50 transition-colors"
                >
                  <span className="text-green-600">
                    <WhatsAppIcon />
                  </span>
                  <span className="text-sm font-medium">
                    تواصل عبر الواتساب
                  </span>
                </a>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-black mb-3">
                عن {guide.name.split(" ")[0]}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {about}
              </p>
              <div className="flex flex-wrap gap-2">
                {experienceTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 border border-purple-200 text-purple-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div>
              <h3 className="text-xl font-bold text-black mb-4">الخدمات</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2 text-purple-600">
                    <ClockIcon />
                    <span className="text-sm font-medium">السعر لكل ساعة</span>
                  </div>
                  <p className="text-lg font-bold text-black">
                    {pricePerHour} ر.س
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2 text-purple-600">
                    <PeopleIcon />
                    <span className="text-sm font-medium">
                      الحد الأعلى للأشخاص
                    </span>
                  </div>
                  <p className="text-lg font-bold text-black">{maxPersons}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2 text-purple-600">
                    <CarIcon />
                    <span className="text-sm font-medium">وسيلة النقل</span>
                  </div>
                  <p className="text-lg font-bold text-black">
                    {transportation}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2 text-purple-600">
                    <CalendarIcon />
                    <span className="text-sm font-medium">المواعيد</span>
                  </div>
                  <p className="text-lg font-bold text-black">{availability}</p>
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
