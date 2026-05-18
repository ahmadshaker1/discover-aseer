"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AseerLogo from "../Logo/AseerLogo";
import { AseerSocialIcon } from "@/components/social/AseerSocialIcon";
import { discoverAseerLinks } from "@/lib/discoverAseerLinks";
import { BookletSmallArrowIcon } from "./Icons";

const ara = "var(--font-ara-hamah-1964), sans-serif";

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="w-full bg-[linear-gradient(359.31deg,#280048_43.01%,#3B016B_99.52%)] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-8 md:px-16 lg:h-[647px] lg:px-[130px]">
        <div className="flex h-full w-full flex-col gap-8 lg:h-[562px]">
          {/* Section 1 */}
          <div className="h-auto border-b border-white/20 lg:h-[122px]">
            <div className="flex h-full w-full items-center justify-between py-5">
              <div className="flex h-[82px] w-[295px] items-start gap-3">
                <div className="flex h-[82px] w-[100px] flex-col items-start gap-4">
                  <p className="text-start text-[16px] font-bold leading-[110%]">
                    {t("footer.poweredBy")}
                  </p>
                  <Image
                    src="/assets/footer/powerd-by.png"
                    alt={t("footer.poweredBy")}
                    width={100}
                    height={48}
                    className="h-[48px] w-[100px] object-contain"
                  />
                </div>
              </div>

              <div className="h-[60.92px] w-[151.62px]">
                <AseerLogo />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="h-auto pb-6 lg:h-[344px] lg:pb-0">
            <div className="grid h-full grid-cols-1 gap-8 text-start sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {" "}
              {/* اكتشف عسير */}
              <div className="flex w-full justify-self-start flex-col items-start text-start">
                <h3
                  className="w-full text-start text-[14px] font-bold leading-[110%] text-white/80"
                  style={{ fontFamily: ara }}
                >
                  {t("footer.discoverAseerTitle")}
                </h3>

                <div
                  className="flex w-full flex-col items-start text-[18px] font-bold leading-[197%]"
                  style={{ fontFamily: ara }}
                >
                  <Link
                    href="/destinations"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.linkMainDestinations")}
                  </Link>
                  <Link
                    href="/attractions"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.linkAttractions")}
                  </Link>
                  <Link
                    href="/experiences"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.linkExperiences")}
                  </Link>
                  <Link
                    href="/aseer-cuisine"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.linkCuisine")}
                  </Link>
                  <Link
                    href="/aseer-community"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.linkCommunity")}
                  </Link>
                  <Link
                    href="/igcat"
                    className="block w-full text-start hover:opacity-80"
                  >
                    IGCAT
                  </Link>
                  <Link
                    href="/event-seasons"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.linkEventsSeasons")}
                  </Link>
                </div>
              </div>
              {/* خطط لرحلتك */}
              <div className="flex w-full justify-self-start flex-col items-start text-start">
                <h3
                  className="w-full text-start text-[14px] font-bold leading-[110%] text-white/80"
                  style={{ fontFamily: ara }}
                >
                  {t("footer.planYourTripTitle")}
                </h3>

                <div
                  className="flex w-full flex-col items-start text-[18px] font-bold leading-[197%]"
                  style={{ fontFamily: ara }}
                >
                  <Link
                    href="/planner"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.linkPlanner")}
                  </Link>
                  <Link
                    href="/accommodation"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.linkAccommodation")}
                  </Link>
                  <Link
                    href="/restaurants"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.linkRestaurants")}
                  </Link>
                  <Link
                    href="/tour-guides"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.linkTourGuides")}
                  </Link>
                  <Link
                    href="/travel-tips"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.linkTravelTips")}
                  </Link>
                </div>
              </div>
              {/* كتيبات */}
              <div className="flex w-full justify-self-start flex-col items-start text-start">
                <h3
                  className="w-full text-start text-[14px] font-bold leading-[110%] text-white/80"
                  style={{ fontFamily: ara }}
                >
                  {t("footer.bookletsTitle")}
                </h3>

                <div
                  className="flex w-full flex-col items-start text-[18px] font-bold leading-[197%]"
                  style={{ fontFamily: ara }}
                >
                  <Link
                    href="/about-aseer"
                    className="block w-full text-start hover:opacity-80"
                  >
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">
                      <span
                        className="text-start text-[18px] font-bold leading-[197%]"
                        style={{ fontFamily: ara }}
                      >
                        {t("footer.linkDiscoverBooklet")}
                      </span>
                      <BookletSmallArrowIcon />
                    </span>
                  </Link>

                  <Link
                    href="/activities"
                    className="block w-full text-start hover:opacity-80"
                  >
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">
                      <span
                        className="text-start text-[18px] font-bold leading-[197%]"
                        style={{ fontFamily: ara }}
                      >
                        {t("footer.linkOutdoorGuide")}
                      </span>
                      <BookletSmallArrowIcon />
                    </span>
                  </Link>
                </div>
              </div>
              {/* التواصل */}
              <div className="flex w-full justify-self-start flex-col items-start gap-4 text-start">
                <h3
                  className="w-full text-start text-[14px] font-bold leading-[110%] text-white/80"
                  style={{ fontFamily: ara }}
                >
                  {t("footer.contactTitle")}
                </h3>

                <Link
                  href="/services-support"
                  className="block w-full text-start text-[18px] font-bold leading-[197%] hover:opacity-80"
                  style={{ fontFamily: ara }}
                >
                  {t("footer.contactUs")}
                </Link>

                <div
                  className="w-full text-start text-sm text-white/80"
                  style={{ fontFamily: ara }}
                >
                  {t("footer.internationalCallCenter")}
                </div>

                <a
                  href="tel:+9669200000890"
                  dir="ltr"
                  className="block w-full text-start text-lg hover:opacity-80"
                >
                  +966 9200000890
                </a>

                <div
                  className="w-full text-start text-xs text-white/70"
                  style={{ fontFamily: ara }}
                >
                  {t("footer.followUs")}
                </div>

                <div
                  className="flex w-full flex-row items-center justify-start gap-3"
                  dir="ltr"
                >
                  {discoverAseerLinks.map(
                    ({ href, label, ariaLabel, platform }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white transition-opacity hover:opacity-80 [&_path]:fill-white"
                        aria-label={ariaLabel}
                      >
                        <AseerSocialIcon platform={platform} />
                      </a>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Section 3 */}
          <div className="mx-auto w-full max-w-[1180px]">
            <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
              {/* Left block */}
              <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center sm:justify-between lg:max-w-[589px] lg:gap-4">
                {/* Input + button */}
                <div className="flex w-full flex-col gap-3 sm:max-w-[397px] sm:flex-row sm:items-center">
                  <button
                    type="button"
                    className="flex h-[51px] w-full sm:w-[102px] items-center justify-center rounded-[100px] bg-white px-8 py-[21px] text-[19px] font-bold leading-[119%] text-[#280048]"
                    style={{ fontFamily: ara }}
                  >
                    {t("footer.subscribe")}
                  </button>
                  <input
                    type="email"
                    placeholder={t("common.emailPlaceholder")}
                    className="h-[52px] w-full sm:w-[283px] rounded-[100px] bg-[#7300CD29] px-6 py-[22px] text-[12px] font-medium leading-[119%] text-white placeholder:text-white/45 focus:outline-none"
                    style={{ fontFamily: "KoningDisplay Trial, sans-serif" }}
                  />
                </div>

                {/* Newsletter text */}
                <div className="flex w-full flex-col items-start gap-4 text-start sm:w-[138px]">
                  <p
                    className="text-start text-[16px] font-bold leading-[110%]"
                    style={{ fontFamily: ara }}
                  >
                    {t("footer.newsletterTitle")}
                  </p>
                  <p className="text-start text-[10px] font-normal leading-[100%] text-white">
                    {t("common.newsletterDescription")}
                  </p>
                </div>
              </div>

              {/* Middle block */}
              <div className="flex w-full flex-col items-start gap-3 text-start sm:w-[231px]">
                <p
                  className="text-start text-[16px] font-bold leading-[110%] text-white"
                  style={{ fontFamily: ara }}
                >
                  {t("common.memberOf")}
                </p>
                <div
                  className="flex w-full items-center justify-between gap-4 sm:w-[231px]"
                  dir="ltr"
                >
                  <Image
                    src="/assets/footer/UN-tourism.png"
                    alt={t("footer.altUnTourism")}
                    width={36}
                    height={34}
                    className="h-[34px] w-[36px] object-contain brightness-0 invert"
                  />
                  <Image
                    src="/assets/footer/PATA.png"
                    alt={t("footer.altPata")}
                    width={63}
                    height={34}
                    className="h-[34px] w-[63px] object-contain"
                  />
                  <Image
                    src="/assets/footer/GSTC.png"
                    alt={t("footer.altGstc")}
                    width={100}
                    height={34}
                    className="h-[34px] w-[100px] object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Copyright row below single divider */}
            <div className="mt-4 border-t border-white/20 pt-4">
              <div className="flex w-full justify-start">
                <div
                  className="flex h-[20px] w-[237px] items-center gap-6 text-[13px] font-bold leading-[150%]"
                  style={{ fontFamily: ara }}
                >
                  <span className="whitespace-nowrap">
                    {t("footer.copyright")}
                  </span>
                  <Link href="#" className="whitespace-nowrap hover:opacity-80">
                    {t("footer.privacy")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
