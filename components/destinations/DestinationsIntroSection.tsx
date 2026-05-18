"use client";

import SafeHtml from "@/components/common/SafeHtml";
import { IntroPageShareRow } from "@/components/social/IntroPageShareRow";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

export interface DestinationsIntroSectionProps {
  title: string;
  imageUrl: string;
  imageAlt: string;
  paragraphs: string[];
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
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 md:px-[62px]">
      <div className="mx-auto flex w-full max-w-[1316px] flex-col-reverse justify-between gap-8 lg:flex-row lg:items-start">
        <div
          className={`flex w-full flex-col gap-6 ${hideImage ? "max-w-[900px]" : "max-w-[704px]"} ${centerContent ? "mx-auto items-center text-center" : "text-start"}`}
        >
          <h2
            className={`w-full text-[44px] font-bold leading-[180%] text-foreground ${centerContent ? "text-center" : "text-start"}`}
            style={{ fontFamily: ara }}
          >
            {title}
          </h2>

          <IntroPageShareRow title={title} />

          <div
            className={`w-full text-[15px] font-light leading-[130%] text-muted-foreground ${centerContent ? "text-center" : "text-start"}`}
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
