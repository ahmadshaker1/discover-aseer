import FilmShowcaseSection from "@/components/film/FilmShowcaseSection";
import FilmWhyAseerSection from "@/components/film/FilmWhyAseerSection";
import FilmServicesSection from "@/components/film/FilmServicesSection";
import EventsInfo from "@/components/events/EventsInfo/EventsInfo";
import { getTranslations } from "next-intl/server";
import {
  fetchFilmShowcaseCardsWithFallback,
  fetchFilmServiceCardsWithFallback,
  fetchFilmLandscapesWithFallback,
  fetchFilmWhyAseerSlidesWithFallback,
} from "@/components/film/data";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

const FilmPage = async () => {
  const t = await getTranslations("film");
  const [landscapes, whyAseerSlides, serviceCards, showcaseCards] =
    await Promise.all([
      fetchFilmLandscapesWithFallback(),
      fetchFilmWhyAseerSlidesWithFallback(),
      fetchFilmServiceCardsWithFallback(),
      fetchFilmShowcaseCardsWithFallback(),
    ]);

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <section className="relative h-[420px] w-full overflow-hidden sm:h-[560px] md:h-[809px]">
        <Image
          src="/assets/film/film-hero.png"
          alt="Film hero"
          fill
          priority
          className="object-fill object-center"
          sizes="100vw"
        />
      </section>

      <section className="mx-auto h-auto w-full max-w-[1442px] bg-background px-4 py-[60px] sm:px-8 md:px-[62px]">
        <div className="mx-auto flex w-full flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
          <div
            className="hide-scrollbar w-full flex-1 overflow-x-auto overflow-y-hidden"
            dir="ltr"
          >
            <div className="flex min-w-max items-start gap-6 pb-2">
              {landscapes.slice(0, 4).map((item) => (
                <article
                  key={item.id}
                  className="relative h-[305px] w-[282px] shrink-0 overflow-hidden rounded-[10px] shadow-[0px_4.28px_3.37px_0px_rgba(41,72,152,0.01),0px_8.72px_6.97px_0px_rgba(41,72,152,0.02),0px_21.4px_13.91px_0px_rgba(41,72,152,0.02)]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-[91px] rounded-b-[10px] bg-linear-to-b from-transparent to-black p-5">
                    <h3
                      className="text-start text-[24px] font-bold leading-[119%] text-white"
                      style={{ fontFamily: ara }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="flex h-auto w-full max-w-[350px] flex-col gap-8 text-start lg:h-[265px]">
            <h2
              className="text-[44px] font-bold leading-[38px] text-foreground"
              style={{ fontFamily: ara }}
            >
              {t("introTitle")}
            </h2>
            <p
              className="text-[15px] font-light leading-[119%] text-muted-foreground"
              style={{ fontFamily: ibm }}
            >
              {t("introBody")}
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden">
        <div className="relative h-[343px] w-full">
          <Image
            src="/assets/film/imghorizontal.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 z-10 flex items-center px-4 sm:px-8 md:px-[62px]">
            <div className="mx-auto flex h-full w-full max-w-[1442px] items-center justify-end">
              <div className="flex h-[165.5px] w-full max-w-[383px] shrink-0 flex-col items-end justify-center gap-[15.5px] p-[41px] text-start sm:w-[383px]">
                <h3
                  className="w-full max-w-[301px] text-start text-[32px] font-bold leading-[33.92px] text-white"
                  style={{ fontFamily: ara }}
                >
                  {t("bannerTitle")}
                </h3>
                <p
                  className="w-full max-w-[301px] text-start text-[48px] font-bold leading-[33.92px] text-white"
                  style={{ fontFamily: ara }}
                >
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
            <div className="mb-[30px] h-[47px] w-[251px]">
              <p
                className="text-start text-[24px] font-medium leading-[119%] text-white"
                style={{ fontFamily: ibm }}
              >
                {t("ctaFormPrompt")}
              </p>
            </div>

            <Link
              href="/tour-guides/register"
              className="inline-flex h-[52px] w-[185px] items-center justify-center rounded-[100px] bg-[#7300CD] px-3 text-center text-[16px] font-normal leading-6 text-white hover:opacity-90"
              style={{
                fontFamily: "Inter, sans-serif",
                paddingTop: 13.5,
                paddingBottom: 14.5,
              }}
            >
              {t("registerNow")}
            </Link>

            <div className="h-[61px] w-full max-w-[1241px] py-[30px]" />

            <div className="mb-4 h-[29px] w-[205px] pb-4">
              <p
                className="whitespace-nowrap text-start text-[18px] font-light leading-[119%] text-white"
                style={{ fontFamily: ibm }}
              >
                {t("orEmailUs")}
              </p>
            </div>

            <a
              href="mailto:marketing@discoveraseer.com"
              className="text-start text-[24px] font-normal leading-[27px] text-[#D3A6F6] underline underline-offset-4"
              style={{ fontFamily: "Inter, sans-serif" }}
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
