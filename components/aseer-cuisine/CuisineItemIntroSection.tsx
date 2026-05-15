"use client";

import Image from "next/image";
import SafeHtml from "@/components/common/SafeHtml";
import { FacebookIcon, LinkedInIcon, MailIcon, WhatsAppIcon, XIcon } from "@/components/shared/icons";
import { useTranslations } from "next-intl";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

export interface CuisineItemIntroSectionProps {
  subtitle: string;
  subtitlePurple: string;
  heroContent: string;
  imageUrl: string;
  imageAlt: string;
  contentHtml: string;
  extraContentHtml?: string;
}

const CuisineItemIntroSection = ({
  subtitle,
  subtitlePurple,
  heroContent,
  imageUrl,
  imageAlt,
  contentHtml,
  extraContentHtml,
}: CuisineItemIntroSectionProps) => {
  const t = useTranslations("common");
  const hasExtra = Boolean(extraContentHtml?.trim());

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-14 sm:px-8 md:px-[62px]">
      <div className="mx-auto flex w-full max-w-[1316px] flex-col-reverse justify-between gap-10 lg:flex-row lg:items-start">
        <div className="flex w-full max-w-[704px] flex-col gap-7 text-start">
          <h2
            className="w-full text-[clamp(2rem,4vw,52px)] font-bold leading-[140%] text-foreground"
            style={{ fontFamily: ara }}
          >
            {subtitle}
            {subtitlePurple ? (
              <span className="text-secondary"> {subtitlePurple}</span>
            ) : null}
          </h2>

          <div className="flex h-8 w-full max-w-[360px] items-center gap-[15px]">
            <span
              className="shrink-0 text-[18px] font-bold leading-[180%] text-foreground"
              style={{ fontFamily: ara }}
            >
              {t("share")}
            </span>
            <div className="flex items-center gap-2">
              <a href="#" aria-label="WhatsApp" className="text-muted-foreground hover:opacity-80">
                <WhatsAppIcon />
              </a>
              <a
                href="mailto:info@discoveraseer.com"
                aria-label="Mail"
                className="text-muted-foreground hover:opacity-80"
              >
                <MailIcon />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:opacity-80">
                <LinkedInIcon />
              </a>
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:opacity-80">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="X" className="text-muted-foreground hover:opacity-80">
                <XIcon />
              </a>
            </div>
          </div>

          {heroContent ? (
            <h3
              className="border-s-4 border-secondary ps-4 text-[28px] font-bold leading-[140%] text-secondary"
              style={{ fontFamily: ara }}
            >
              {heroContent}
            </h3>
          ) : null}

          <div
            className="w-full text-[16px] font-light leading-[150%] text-muted-foreground"
            style={{ fontFamily: ibm }}
          >
            {contentHtml ? <SafeHtml html={contentHtml} className="space-y-4" /> : null}
            {hasExtra ? (
              <SafeHtml html={extraContentHtml!} className="mt-6 space-y-4 border-t border-border/60 pt-6" />
            ) : null}
          </div>
        </div>

        {imageUrl ? (
          <div className="h-[420px] w-full max-w-[559px] shrink-0 overflow-hidden rounded-[14px] shadow-[0_24px_60px_rgba(41,72,152,0.18)] ring-1 ring-secondary/20">
            <div className="relative h-full w-full">
              <Image src={imageUrl} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 559px" />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CuisineItemIntroSection;
