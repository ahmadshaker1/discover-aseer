"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

export interface AseerCuisineChefsVideoSectionData {
  // Backend (Directus): section title text.
  title: string;
  // Backend (Directus): section subtitle text.
  subtitle: string;
  // Backend (Directus): hosted video URL for this section.
  videoUrl: string;
  // Backend (Directus): poster/fallback image URL.
  posterImage: string;
}

interface AseerCuisineChefsVideoSectionProps {
  data: AseerCuisineChefsVideoSectionData;
}

const AseerCuisineChefsVideoSection = ({ data }: AseerCuisineChefsVideoSectionProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  return (
    <section className="mx-auto w-full max-w-[1440px] bg-white py-8" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex w-full flex-col gap-8">
        <div className="px-4 sm:px-8 xl:px-[120px]">
          <div className="mx-auto flex w-full max-w-[704px] flex-col items-center gap-3 text-center">
            <h2
              className="w-full text-center text-[64px] font-bold leading-[119%] text-black"
              style={{ fontFamily: ara }}
            >
              {data.title}
            </h2>
            <p
              className="w-full text-center text-[15px] font-light leading-[119%] text-[#252525]/80"
              style={{ fontFamily: ibm }}
            >
              {data.subtitle}
            </p>
          </div>
        </div>

        {/* Placeholder mode: showing poster image now. Keep `videoUrl` in data for future switch back to video. */}
        <div className="h-[811px] w-full overflow-hidden">
          <Image src={data.posterImage} alt={data.title} width={1440} height={811} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default AseerCuisineChefsVideoSection;
