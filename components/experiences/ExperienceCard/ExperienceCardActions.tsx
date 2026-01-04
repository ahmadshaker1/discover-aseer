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
    <div className="flex items-center justify-start space-x-4">
      <a
        href={bookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 bg-[#CD8CFF3D] text-[#7300CD] rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        <ExternalLinkIcon />
        <span>احجز الآن</span>
      </a>
      <Link
        href={`/experiences/${experienceId}`}
        className="flex items-center gap-1 text-sm text-black hover:text-gray-700 transition-colors"
      >
        <span>المزيد</span>
        <ArrowLeftIcon />
      </Link>
    </div>
  );
};

export default ExperienceCardActions;
