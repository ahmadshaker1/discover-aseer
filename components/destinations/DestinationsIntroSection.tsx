"use client";

import { FacebookIcon, LinkedInIcon, WhatsAppIcon, XIcon, MailIcon } from "@/components/shared/icons";
import SafeHtml from "@/components/common/SafeHtml";
import { useTranslations } from "next-intl";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

export interface DestinationsIntroSectionProps {
  title: string;
  imageUrl: string;
  imageAlt: string;
  /** One or more paragraphs (RTL). Backend: map from rich text or joined blocks. */
  paragraphs: string[];
  /** Optional rich text body for destination slug pages. */
  descriptionHtml?: string;
  hideImage?: boolean;
  centerContent?: boolean;
}

const DestinationsIntroSection = ({
  title,
  imageUrl,
  imageAlt,
  paragraphs,
  descriptionHtml,
  hideImage = false,
  centerContent = false,
}: DestinationsIntroSectionProps) => {
  const t = useTranslations("common");
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 md:px-[62px]">
      <div className="mx-auto flex w-full max-w-[1316px] flex-col-reverse justify-between gap-8 lg:flex-row lg:items-start">
        <div
          className={`flex w-full flex-col gap-6 ${hideImage ? "max-w-[900px]" : "max-w-[704px]"
            } ${centerContent ? "mx-auto items-center text-center" : "text-start"}`}
        >
          <h2
            className={`w-full text-[44px] font-bold leading-[180%] text-foreground ${centerContent ? "text-center" : "text-start"
              }`}
            style={{ fontFamily: ara }}
          >
            {title}
          </h2>

          <div className="flex h-8 w-full max-w-[360px] items-center gap-[15px]">
            <span
              className="shrink-0 text-[18px] font-bold leading-[180%] text-foreground"
              style={{ fontFamily: ara }}
            >
              {t("share")}
            </span>
            <div className="flex items-center gap-2">
              <a href="#" aria-label="WhatsApp" className="text-[#535353] hover:opacity-80 dark:text-white">
                <WhatsAppIcon />
              </a>
              <a href="mailto:info@discoveraseer.com" aria-label="Mail" className="text-[#535353] hover:opacity-80 dark:text-white">
                <MailIcon />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-[#535353] hover:opacity-80 dark:text-white">
                <LinkedInIcon />
              </a>
              <a href="#" aria-label="Facebook" className="text-[#535353] hover:opacity-80 dark:text-white">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="X" className="text-[#535353] hover:opacity-80 dark:text-white">
                <XIcon />
              </a>
            </div>
          </div>

          <div
            className={`w-full text-[15px] font-light leading-[130%] text-muted-foreground ${centerContent ? "text-center" : "text-start"
              }`}
            style={{ fontFamily: ibm }}
          >
            {descriptionHtml ? (
              <SafeHtml html={descriptionHtml} className="space-y-4" />
            ) : (
              paragraphs.map((p, i) => (
                <p key={i} className={i > 0 ? "mt-4" : ""}>
                  {p}
                </p>
              ))
            )}
          </div>
        </div>

        {!hideImage ? (
          <div className="h-[395px] w-full max-w-[559px] overflow-hidden rounded-[10px]">
            <div className="relative h-full w-full">
              <img src={imageUrl} alt={imageAlt} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-black/15" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default DestinationsIntroSection;
