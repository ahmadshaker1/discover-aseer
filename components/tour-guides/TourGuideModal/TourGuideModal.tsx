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
        <DialogPanel className="relative mx-2 w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-2xl bg-surface text-foreground shadow-xl sm:mx-4 sm:max-h-[90vh] sm:rounded-3xl modal-enter">
          <Button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 rounded-full p-2 transition-colors hover:bg-muted sm:top-4 sm:right-4"
          >
            <CloseIcon />
          </Button>

          <div className="p-4 sm:p-6">
            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-4 sm:mb-6">
              {/* Profile Picture */}
              <div className="relative w-24 h-24 shrink-0">
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-purple-400 to-purple-600 p-[2px]">
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-surface">
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
                <h2 className="mb-2 text-xl font-bold text-foreground sm:mb-3 sm:text-2xl">
                  {guide.name}
                </h2>

                {/* Languages */}
                <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-2 sm:mb-3">
                  {guide.languages.map((lang) => (
                    <div key={lang.code} className="flex items-center gap-1.5">
                      <LanguageFlag code={lang.code} />
                      <span className="text-sm text-foreground">{lang.name}</span>
                    </div>
                  ))}
                </div>

                {/* WhatsApp Button */}
                <a
                  href={guide.whatsappUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium transition-colors hover:bg-muted sm:px-4 sm:text-sm"
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
              <h3 className="mb-2 text-lg font-bold text-foreground sm:mb-3 sm:text-xl">
                عن {guide.name.split(" ")[0]}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {about}
              </p>

              {/* Specialties Tags - Only render if array exists and is not empty */}
              {guide.specialties && guide.specialties.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {guide.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-primary/30 bg-surface px-3 py-1.5 text-sm text-primary"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Services Section */}
            <div>
              <h3 className="mb-3 text-lg font-bold text-foreground sm:mb-4 sm:text-xl">
                الخدمات
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="rounded-xl bg-muted p-3 sm:rounded-2xl sm:p-4">
                  <div className="flex items-center gap-2 mb-2 text-purple-600">
                    <ClockIcon />
                    <span className="text-xs sm:text-sm font-medium">
                      السعر لكل ساعة
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-base font-bold text-foreground sm:text-lg">
                      {pricePerHour}
                    </p>
                    <span className="text-purple-600">
                      <SaudiRiyalIcon />
                    </span>
                  </div>
                </div>
                <div className="rounded-xl bg-muted p-3 sm:rounded-2xl sm:p-4">
                  <div className="flex items-center gap-2 mb-2 text-purple-600">
                    <PeopleIcon />
                    <span className="text-xs sm:text-sm font-medium">
                      الحد الأعلى للأشخاص
                    </span>
                  </div>
                  <p className="text-base font-bold text-foreground sm:text-lg">
                    {maxPersons}
                  </p>
                </div>
                <div className="rounded-xl bg-muted p-3 sm:rounded-2xl sm:p-4">
                  <div className="flex items-center gap-2 mb-2 text-purple-600">
                    <CarIcon />
                    <span className="text-xs sm:text-sm font-medium">
                      وسيلة النقل
                    </span>
                  </div>
                  <p className="text-base font-bold text-foreground sm:text-lg">
                    {transportation}
                  </p>
                </div>
                <div className="rounded-xl bg-muted p-3 sm:rounded-2xl sm:p-4">
                  <div className="flex items-center gap-2 mb-2 text-purple-600">
                    <CalendarIcon />
                    <span className="text-xs sm:text-sm font-medium">
                      المواعيد
                    </span>
                  </div>
                  <p className="text-base font-bold text-foreground sm:text-lg">
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
