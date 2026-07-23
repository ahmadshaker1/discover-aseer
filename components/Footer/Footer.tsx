"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@headlessui/react";
import { Link } from "@/i18n/navigation";

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
              <div className="flex h-[82px] w-[295px] items-center gap-3">
                <Image
                  src="https://dmmo-website-asda.oss-me-central-1.aliyuncs.com/assets/global/aseer_logo.svg"
                  alt="footer:aseer_logo673"
                  width={120}
                  height={55}
                />
              </div>
              <div className="flex h-[82px] w-[100px] flex-col items-center gap-4">
                <p className="text-center text-[16px] font-bold leading-[110%]">
                  {t("footer.poweredBy")}
                </p>
                <Link href="https://www.asda.gov.sa" target="_blank">
                  <Image
                    src="/assets/footer/powerd-by.png"
                    alt={t("footer.poweredBy")}
                    width={100}
                    height={48}
                    className=" h-12 w-[100px] object-contain"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="h-auto pb-6 lg:h-auto lg:pb-0">
            <div className="grid h-full grid-cols-1 gap-8 text-start sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
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
                    href="/experiences/submit"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.linkSubmitExperience")}
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
                  {/* 
                  //aseer dont need these links to be in the website.
                  <Link
                    href="/media-kit"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.media-kit")}
                  </Link>
                  <Link
                    href="/identityfiles"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.identityfiles")}
                  </Link> */}
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
                    href="/tourism-companies"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.tourism-companies")}
                  </Link>
                  <Link
                    href="/tour-guides"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.linkTourGuides")}
                  </Link>
                  <Link
                    href="/getting-here-and-around"
                    className="block w-full text-start hover:opacity-80"
                  >
                    {t("footer.linkGettingHereAndAround")}
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
              <div className="flex w-full justify-self-start flex-col items-start text-start lg:h-full">
                <h3
                  className="w-full text-start text-[14px] font-bold leading-[110%] text-white/80"
                  style={{ fontFamily: ara }}
                >
                  {t("footer.bookletsTitle")}
                </h3>
                <div
                  className="flex w-full flex-1 flex-col items-start text-[18px] font-bold leading-[197%]"
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
                  <Button
                    as={Link}
                    href="/tour-guides/portal"
                    className="mt-6 lg:mt-auto flex w-[200px] h-[44px] cursor-pointer items-center justify-center rounded-full border border-white bg-transparent px-5 text-center text-[14px] font-bold leading-[119%] text-white transition-colors duration-200 hover:bg-white hover:text-[#280048] data-hover:bg-white data-hover:text-[#280048]"
                    style={{ fontFamily: ara }}
                  >
                    {t("footer.tourGuideLogin")}
                  </Button>
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
                  href="/contact-us"
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
                  className="block w-full text-start text-lg hover:opacity-80"
                >
                  <span dir="ltr">+966 9200000890</span>
                </a>
                <div
                  className="w-full text-start text-xs text-white/70"
                  style={{ fontFamily: ara }}
                >
                  {t("footer.followUs")}
                </div>
                <div className="flex w-full flex-row items-center justify-start gap-3">
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
                {/* Middle block */}
                <div className="flex w-full flex-col items-start gap-3 text-start">
                  <p
                    className="text-start text-[16px] font-bold leading-[110%] text-white"
                    style={{ fontFamily: ara }}
                  >
                    {t("common.memberOf")}
                  </p>
                  <div className="flex w-full flex-row items-center justify-between gap-2">
                    <Image
                      src="/assets/footer/un-tourism1.1.png"
                      alt={t("footer.altUnTourism")}
                      width={100}
                      height={34}
                      className="h-auto w-[30%] max-w-[100px] object-contain"
                    />
                    <Image
                      src="/assets/footer/GSTC2.png"
                      alt={t("footer.altGstc")}
                      width={100}
                      height={34}
                      className="h-auto w-[30%] max-w-[100px] object-contain"
                    />
                    <Image
                      src="/assets/footer/PATA3.png"
                      alt={t("footer.altPata")}
                      width={60}
                      height={34}
                      className="h-auto w-[30%] max-w-[60px] object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Section 3 */}
          <div className="mx-auto w-full max-w-[1180px]">
            {/* Newsletter */}
            {/* <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
              <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center sm:justify-between lg:max-w-[589px] lg:gap-4">
                <div className="flex w-full flex-col items-start gap-4 text-start sm:w-[138px]">
                  <p
                    className="text-start text-[18px] font-bold leading-[110%]"
                    style={{ fontFamily: ara }}
                  >
                    {t("footer.newsletterTitle")}
                  </p>
                  <p className="text-start text-[14px] font-normal leading-[100%] text-white">
                    {t("common.newsletterDescription")}
                  </p>
                </div>
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
              </div>
            </div> */}

            {/* Copyright row below single divider */}
            <div className="mt-4 border-t border-white/20 pt-4">
              <div
                className="flex w-full flex-col gap-4 sm:flex-row sm:justify-between items-center text-[13px] font-bold leading-[150%]"
                style={{ fontFamily: ara }}
              >
                <Link
                  href="/privacy"
                  className="whitespace-nowrap  text-[16px] hover:opacity-80"
                >
                  {t("footer.privacy")}
                </Link>
                <span className="whitespace-nowrap text-[16px]" dir="ltr">
                  {t("footer.copyright")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
