import FilmLandscapeSwiper from "@/components/film/FilmLandscapeSwiper";
import FilmShowcaseSection from "@/components/film/FilmShowcaseSection";
import FilmWhyAseerSection from "@/components/film/FilmWhyAseerSection";
import FilmServicesSection from "@/components/film/FilmServicesSection";
import EventsInfo from "@/components/EventsInfo/EventsInfo";
import { getLocale, getTranslations } from "next-intl/server";
import {
  fetchFilmsForFilmPage,
  fetchFilmServiceCards,
  fetchFilmWhyAseerSlides,
} from "@/components/film/data";
import FilmHero from "@/components/film/FilmHero";
import FilmLandscapesSection from "@/components/film/FilmLandscapesSection";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { fetchGlobalAssets } from "@/lib/directus/globalAssets";

const FilmPage = async () => {
  const t = await getTranslations("film");
  const locale = await getLocale();
  const [
    { landscapes, showcaseCards },
    whyAseerSlides,
    serviceCards,
    globalAssets,
  ] = await Promise.all([
    fetchFilmsForFilmPage(locale),
    fetchFilmWhyAseerSlides(),
    fetchFilmServiceCards(),
    fetchGlobalAssets(),
  ]);

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <FilmHero videoUrl={globalAssets?.film_hero_video} />

      <FilmLandscapesSection
        landscapes={landscapes}
        introTitle={t("introTitle")}
        introBody={t("introBody")}
      />

      <section className="relative w-full overflow-hidden">
        <div className="relative h-[343px] w-full">
          <Image
            src="/assets/film/WhyAseer.jpeg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 z-10 flex items-center px-4 sm:px-8 md:px-[62px]">
            <div className="mx-auto flex h-full w-full max-w-[1442px] items-center justify-start">
              <div className="flex min-h-[165.5px] w-full max-w-full shrink-0 flex-col items-start justify-center gap-[15.5px] py-[41px] text-start">
                <h3 className="w-full text-start text-[50px] font-bold leading-[33.92px] text-white">
                  {t("bannerTitle")}
                </h3>
                <p className="w-full text-start text-[32px] sm:text-[48px] font-bold leading-[1.2] text-white">
                  {t("bannerSubtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FilmWhyAseerSection slides={whyAseerSlides} />
      <FilmServicesSection cards={serviceCards} />
      <FilmShowcaseSection cards={showcaseCards} />

      <section className="relative min-h-[850px] w-full overflow-hidden">
        <Image
          src="/assets/activities/seasonal-activities.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 z-1 bg-black/35" aria-hidden />

        <div className="relative z-10 mx-auto flex min-h-[850px] w-full max-w-[1440px] flex-col items-center justify-center px-4 py-[242px] sm:px-8 md:px-[68px]">
          <div className="flex w-full max-w-[1241px] flex-col items-center text-center">
            <div className="mb-[30px]">
              <p className="text-center text-[24px] font-medium leading-[119%] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">
                {t("ctaFormPrompt")}
              </p>
            </div>

            <Link
              href="/filmmaker-form"
              className="inline-flex h-[52px] w-[185px] cursor-pointer items-center justify-center rounded-[100px] bg-[#7300CD] px-3 text-center text-[18px] font-bold leading-6 text-white hover:opacity-90"
              style={{
                paddingTop: 13.5,
                paddingBottom: 14.5,
              }}
            >
              {t("ctaFormButton")}
            </Link>

            <div className="h-[61px] w-full max-w-[1241px] py-[30px]" />

            <div className="mb-4 pb-4">
              <p className="whitespace-nowrap text-center text-[18px] font-bold leading-[119%] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">
                {t("orEmailUs")}
              </p>
            </div>

            <a
              href="mailto:marketing@discoveraseer.com"
              className="cursor-pointer text-center text-[24px] font-bold leading-[27px] text-[#D3A6F6] underline underline-offset-4 transition-colors hover:text-[#e4c2ff]"
              dir="ltr"
            >
              marketing@discoveraseer.com
            </a>
          </div>
        </div>
      </section>
      <EventsInfo />
    </div>
  );
};

export default FilmPage;
