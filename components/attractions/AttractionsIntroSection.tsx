"use client";

import { IntroPageShareRow } from "@/components/social/IntroPageShareRow";
import SafeHtml from "@/components/common/SafeHtml";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

interface AttractionsIntroSectionProps {
  title: string;
  imageUrl: string;
  imageAlt: string;
  descriptionHtml: string;
}

const AttractionsIntroSection = ({
  title,
  imageUrl,
  imageAlt,
  descriptionHtml,
}: AttractionsIntroSectionProps) => {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 md:px-[62px]">
      <div className="mx-auto flex w-full max-w-[1316px] flex-col-reverse justify-between gap-8 lg:h-[441px] lg:flex-row-reverse lg:items-start">
        <div className="flex h-full w-full max-w-[704px] flex-col gap-6 text-start">
          <h2
            className="w-full text-start text-[44px] font-bold leading-[180%] text-foreground"
            style={{ fontFamily: ara }}
          >
            {title}
          </h2>

          <IntroPageShareRow title={title} />

          <div className="relative w-full flex-1 overflow-hidden">
            <div
              className="h-full w-full overflow-y-auto hide-scrollbar text-start text-[18px] font-light leading-10 text-muted-foreground"
              style={{ fontFamily: ibm }}
            >
              {descriptionHtml ? (
                <SafeHtml html={descriptionHtml} className="space-y-4 pb-8" />
              ) : null}
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>

        <div className="h-[395px] w-full max-w-[559px] overflow-hidden rounded-[10px]">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AttractionsIntroSection;
