"use client";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/Footer/Icons";
import { useLocale, useTranslations } from "next-intl";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

interface AttractionsIntroSectionProps {
  imageUrl: string;
}

const AttractionsIntroSection = ({ imageUrl }: AttractionsIntroSectionProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("attractionsPage");
  const tCommon = useTranslations("common");

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 md:px-[62px]" dir={isRtl ? "rtl" : "ltr"}>
      <div className={`mx-auto flex w-full max-w-[1316px] flex-col-reverse justify-between gap-8 lg:h-[441px] lg:items-start ${isRtl ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
        <div className={`flex h-full w-full max-w-[704px] flex-col gap-6 ${isRtl ? "text-right" : "text-left"}`}>
          <h2
            className={`w-full text-[44px] font-bold leading-[180%] text-black ${isRtl ? "text-right" : "text-left"}`}
            style={{ fontFamily: ara }}
          >
            {t("introTitle")}
          </h2>

          <div className={`flex h-8 w-full max-w-[218px] items-center gap-[15px] ${isRtl ? "justify-start flex-row-reverse" : "justify-start flex-row"}`}>
            <div className={`flex items-center gap-2 text-black/70 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
              <a href="#" aria-label="Instagram" className="cursor-pointer hover:opacity-80">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="YouTube" className="cursor-pointer hover:opacity-80">
                <YouTubeIcon />
              </a>
              <a href="#" aria-label="LinkedIn" className="cursor-pointer hover:opacity-80">
                <LinkedInIcon />
              </a>
              <a href="#" aria-label="Facebook" className="cursor-pointer hover:opacity-80">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="X" className="cursor-pointer hover:opacity-80">
                <XIcon />
              </a>
            </div>
            <span
              className={`text-[18px] font-bold leading-[180%] text-black ${isRtl ? "text-right" : "text-left"}`}
              style={{ fontFamily: ara }}
            >
              {tCommon("share")}
            </span>
          </div>

          <div className={`w-full text-[15px] font-light leading-[119%] text-[#252525] ${isRtl ? "text-right" : "text-left"}`} style={{ fontFamily: ibm }}>
            <p>{t("innerIntroP1")}</p>
            <p className="mt-4">{t("innerIntroP2")}</p>
            <p className="mt-4">{t("innerIntroP3")}</p>
          </div>
        </div>

        <div className="h-[395px] w-full max-w-[559px] overflow-hidden rounded-[10px]">
          <img src={imageUrl} alt={t("introTitle")} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default AttractionsIntroSection;
