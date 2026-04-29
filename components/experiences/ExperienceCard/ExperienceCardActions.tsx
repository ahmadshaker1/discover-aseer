"use client";

import Link from "next/link";
import { ArrowLeftIcon, ExternalLinkIcon } from "./Icons";

interface ExperienceCardActionsProps {
  experienceId: string | number;
  bookUrl: string;
}

const ExperienceCardActions = ({
  experienceId,
  bookUrl,
}: ExperienceCardActionsProps) => {
  return (
    <div className="flex items-center justify-between gap-4" dir="rtl">
      <Link
        href={`/experiences/${experienceId}`}
        className="flex items-center gap-1 text-sm text-black transition-colors hover:text-gray-700"
      >
        <span>المزيد</span>
        <ArrowLeftIcon />
      </Link>
      <a
        href={bookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center overflow-hidden hover:bg-[#7300CD] w-40 px-8 py-3 bg-[#CD8CFF3D] text-[#7300CD] hover:text-white rounded-full font-medium transition-[background-color,color] duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        <div className="flex items-center gap-2 transition-transform duration-300 ease-in-out translate-x-[1rem]  group-hover:translate-x-0">
          <span className="whitespace-nowrap">احجز الآن</span>
          <div className="opacity-100 group-hover:opacity-0 group-hover:w-0 group-hover:overflow-hidden transition-all duration-300 ease-in-out">
            <ExternalLinkIcon />
          </div>
        </div>
      </a>
    </div>
  );
};

export default ExperienceCardActions;
