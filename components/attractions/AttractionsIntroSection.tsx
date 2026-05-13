"use client";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/Footer/Icons";
import { useTranslations } from "next-intl";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

interface AttractionsIntroSectionProps {
  imageUrl: string;
}

const AttractionsIntroSection = ({ imageUrl }: AttractionsIntroSectionProps) => {
  const t = useTranslations("attractionsPage");
  const tCommon = useTranslations("common");

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 md:px-[62px]">
      <div className="mx-auto flex w-full max-w-[1316px] flex-col-reverse justify-between gap-8 lg:h-[441px] lg:flex-row-reverse lg:items-start">
        <div className="flex h-full w-full max-w-[704px] flex-col gap-6 text-start">
          <h2
            className="w-full text-start text-[44px] font-bold leading-[180%] text-foreground"
            style={{ fontFamily: ara }}
          >
            {t("introTitle")}
          </h2>

          <div className="flex h-8 w-full max-w-[360px] items-center gap-[15px]">
            <span
              className="shrink-0 text-[18px] font-bold leading-[180%] text-foreground"
              style={{ fontFamily: ara }}
            >
              {tCommon("share")}
            </span>
            <div className="flex items-center gap-2 text-foreground/70">
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
          </div>

          <div className="w-full text-start text-[15px] font-light leading-[119%] text-muted-foreground" style={{ fontFamily: ibm }}>
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
