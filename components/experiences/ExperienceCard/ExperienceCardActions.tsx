"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeftIcon, ExternalLinkIcon } from "./Icons";

interface ExperienceCardActionsProps {
  experienceId: string | number;
  bookUrl: string;
}

const ExperienceCardActions = ({
  experienceId,
  bookUrl,
}: ExperienceCardActionsProps) => {
  const t = useTranslations("common");
  return (
    <div className="flex items-center justify-between gap-4">
      <a
        href={bookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex w-40 items-center justify-center overflow-hidden rounded-full bg-primary/20 px-8 py-3 font-medium text-primary transition-[background-color,color] duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="flex items-center gap-2 transition-transform duration-300 ease-in-out translate-x-4 group-hover:translate-x-0 rtl:-translate-x-4 rtl:group-hover:translate-x-0">
          <span className="whitespace-nowrap">{t("bookNow")}</span>
          <div className="opacity-100 group-hover:opacity-0 group-hover:w-0 group-hover:overflow-hidden transition-all duration-300 ease-in-out">
            <ExternalLinkIcon />
          </div>
        </div>
      </a>
      <Link
        href={`/experiences/${encodeURIComponent(String(experienceId))}`}
        className="flex items-center gap-1 text-sm text-foreground transition-colors hover:text-muted-foreground"
      >
        <span>{t("more")}</span>
        <span className="inline-flex">
          <ArrowLeftIcon />
        </span>
      </Link>
    </div>
  );
};

export default ExperienceCardActions;
