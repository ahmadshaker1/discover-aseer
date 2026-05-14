"use client";

import { useTranslations } from "next-intl";
import {
  InstagramIcon,
  SnapchatIcon,
  TiktokIcon,
  WhatsAppIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/Footer/Icons";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

const heroSocialLinks = [
  { href: "#", label: "X", Icon: XIcon },
  { href: "#", label: "Snapchat", Icon: SnapchatIcon },
  { href: "#", label: "WhatsApp", Icon: WhatsAppIcon },
  { href: "#", label: "TikTok", Icon: TiktokIcon },
  { href: "#", label: "YouTube", Icon: YouTubeIcon },
  { href: "#", label: "Instagram", Icon: InstagramIcon },
] as const;

const heroSocialLinkClassDesktop =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 md:h-[52px] md:w-[52px] [&_svg]:origin-center [&_svg]:shrink-0 [&_svg]:scale-[1.18] md:[&_svg]:scale-[1.28]";

const heroSocialLinkClassMobile =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors active:bg-white/10 [&_svg]:origin-center [&_svg]:shrink-0 [&_svg]:scale-[1.12]";

function HeroSocialLinks({ linkClassName }: { linkClassName: string }) {
  return (
    <>
      {heroSocialLinks.map(({ href, label, Icon }) => (
        <a key={label} href={href} className={linkClassName} aria-label={label}>
          <Icon />
        </a>
      ))}
    </>
  );
}

const Hero = ({ title, subtitle }: HeroProps) => {
  const t = useTranslations("home");
  const displayTitle = title ?? t("heroTitle");
  const displaySubtitle = subtitle ?? t("heroSubtitle");
  return (
    <section className="w-full bg-[#070707]">
      {/* Hero banner */}
      <div
        className="relative h-[756px] w-full overflow-hidden"
        style={{
          background:
            "url('/assets/landing/discover-aseer-hero.jpg') center / cover no-repeat",
        }}
      >
        {/* Light dark scrim so hero text stays readable on any photo */}
        <div
          className="pointer-events-none absolute inset-0 z-1 bg-black/35"
          aria-hidden
        />

        <img
          src="/hero-pattern/ribbon_column.png"
          alt=""
          aria-hidden
          className="absolute top-0 right-0 z-20 h-full w-[15px] object-cover"
        />

        <div className="relative z-10 mx-auto h-full w-full max-w-[1440px] px-6 md:px-[130px]">
          {/* Small screens: horizontal strip + horizontal rules at bottom of hero */}
          <div
            className="absolute inset-x-0 bottom-5 z-30 flex flex-row items-center justify-center gap-2 px-3 text-white md:hidden"
            dir="ltr"
          >
            <div
              className="h-px min-w-[20px] max-w-[56px] flex-1 bg-white"
              aria-hidden
            />
            <div className="flex max-w-full flex-row flex-wrap items-center justify-center gap-1.5">
              <HeroSocialLinks linkClassName={heroSocialLinkClassMobile} />
            </div>
            <div
              className="h-px min-w-[20px] max-w-[56px] flex-1 bg-white"
              aria-hidden
            />
          </div>

          {/* md+: vertical column on the start side */}
          <div
            className="absolute top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center md:flex start-4 md:start-10"
            dir="ltr"
          >
            <div
              className="mb-3 h-14 w-px shrink-0 bg-white md:mb-[15px] md:h-20"
              aria-hidden
            />
            <div className="flex flex-col items-center gap-3 text-white md:gap-[15px]">
              <HeroSocialLinks linkClassName={heroSocialLinkClassDesktop} />
            </div>
            <div
              className="mt-3 h-14 w-px shrink-0 bg-white md:mt-[15px] md:h-20"
              aria-hidden
            />
          </div>

          <div className="ml-auto flex h-full w-full flex-col justify-center text-right md:w-[616px]">
            <div className="flex w-full flex-col gap-[50px] md:h-[134px]">
              <h1
                className="text-white"
                style={{
                  fontFamily: "var(--font-ara-hamah-1964), sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(44px, 5vw, 88px)",
                  lineHeight: "119%",
                }}
              >
                {displayTitle}
              </h1>

              <p
                className="text-white"
                style={{
                  fontFamily: "var(--font-ara-hamah-1964), sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(18px, 1.9vw, 24px)",
                  lineHeight: "133%",
                }}
              >
                {displaySubtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
