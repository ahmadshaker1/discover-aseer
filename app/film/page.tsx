import FilmShowcaseSection from "@/components/film/FilmShowcaseSection";
import FilmWhyAseerSection from "@/components/film/FilmWhyAseerSection";
import FilmServicesSection from "@/components/film/FilmServicesSection";
import EventsInfo from "@/components/events/EventsInfo/EventsInfo";
import { getLocale } from "next-intl/server";
import {
  fetchFilmShowcaseCardsWithFallback,
  fetchFilmServiceCardsWithFallback,
  fetchFilmLandscapesWithFallback,
  fetchFilmWhyAseerSlidesWithFallback,
} from "@/components/film/data";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

const FilmPage = async () => {
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const [landscapes, whyAseerSlides, serviceCards, showcaseCards] = await Promise.all([
    fetchFilmLandscapesWithFallback(),
    fetchFilmWhyAseerSlidesWithFallback(),
    fetchFilmServiceCardsWithFallback(),
    fetchFilmShowcaseCardsWithFallback(),
  ]);

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <section className="mx-auto h-[809px] w-full max-w-[1440px] overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
        <img
          src="/assets/film/film-hero.png"
          alt="Film hero"
          className="h-full w-full object-cover"
        />
      </section>

      <section
        className="mx-auto h-auto w-full max-w-[1442px] bg-background px-4 py-[60px] sm:px-8 md:px-[62px]"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="mx-auto flex w-full flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
          <div className="w-full flex-1 overflow-x-auto">
            <div className="flex min-w-max items-start gap-6 pb-2">
              {landscapes.slice(0, 4).map((item) => (
                <article
                  key={item.id}
                  className="relative h-[305px] w-[282px] shrink-0 overflow-hidden rounded-[10px] shadow-[0px_4.28px_3.37px_0px_rgba(41,72,152,0.01),0px_8.72px_6.97px_0px_rgba(41,72,152,0.02),0px_21.4px_13.91px_0px_rgba(41,72,152,0.02)]"
                >
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-[91px] rounded-b-[10px] bg-linear-to-b from-transparent to-black p-5">
                    <h3
                      className={`${isRtl ? "text-right" : "text-left"} text-[24px] font-bold leading-[119%] text-white`}
                      style={{ fontFamily: ara }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={`flex h-auto w-full max-w-[350px] flex-col gap-8 ${isRtl ? "text-right" : "text-left"} lg:h-[265px]`}>
            <h2
              className="text-[44px] font-bold leading-[38px] text-foreground"
              style={{ fontFamily: ara }}
            >
              {isRtl
                ? "انطلق في رحلة تصوير سينمائي ثرية بالتنوع، فريدة بالجمال."
                : "Start a cinematic journey rich in diversity and unique beauty."}
            </h2>
            <p
              className="text-[15px] font-light leading-[119%] text-muted-foreground"
              style={{ fontFamily: ibm }}
            >
              {isRtl
                ? "تتميز عسير بتنوع تضاريسها الطبيعية، فوق قمم الجبال و بين السهول، وصولاً إلى الصحاري الشاسعة و السواحل الممتدة على البحر الأحمر، وبعدد أكثر من أربعة آلاف قرية تراثية تعكس عراقة ثقافتها وتاريخها، وأصالة انسانها الطموح."
                : "Aseer is distinguished by diverse natural landscapes: mountain peaks, plains, vast deserts, and Red Sea coastlines, with more than four thousand heritage villages that reflect deep culture, history, and authentic local identity."}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1442px]" dir={isRtl ? "rtl" : "ltr"}>
        <div
          className="flex h-[343px] w-full items-center justify-end bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/film/imghorizontal.png')" }}
        >
          <div className="flex h-[165.5px] w-[383px] flex-col items-end justify-center gap-[15.5px] p-[41px] text-right">
            <h3
              className="w-full max-w-[301px] text-right text-[32px] font-bold leading-[33.92px] text-white"
              style={{ fontFamily: ara }}
            >
              {isRtl ? "في عسير!" : "In Aseer!"}
            </h3>
            <p
              className="w-full max-w-[301px] text-right text-[48px] font-bold leading-[33.92px] text-white"
              style={{ fontFamily: ara }}
            >
              {isRtl ? "نفزع لك باللي تحتاجه." : "We are here with what you need."}
            </p>
          </div>
        </div>
      </section>

      <FilmWhyAseerSection slides={whyAseerSlides} />
      <FilmServicesSection cards={serviceCards} />
      <FilmShowcaseSection cards={showcaseCards} />

      <section
        className="relative mx-auto flex min-h-[850px] w-full max-w-[1440px] items-center justify-center overflow-hidden px-4 py-[242px] sm:px-8 md:px-[68px]"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <img
          src="/assets/activities/seasonal-activities.jpg"
          alt="Call to action background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex w-full max-w-[1241px] flex-col items-center text-center" dir={isRtl ? "rtl" : "ltr"}>
          <div className="mb-[30px] h-[47px] w-[251px]">
            <p
              className="text-right text-[24px] font-medium leading-[119%] text-white"
              style={{ fontFamily: ibm }}
            >
              {isRtl ? "الرجاء ملء الاستمارة أدناه." : "Please fill in the form below."}
            </p>
          </div>

          <a
            href="/tour-guides/register"
            className="inline-flex h-[52px] w-[185px] items-center justify-center rounded-[100px] bg-[#7300CD] px-3 text-center text-[16px] font-normal leading-6 text-white hover:opacity-90"
            style={{ fontFamily: "Inter, sans-serif", paddingTop: 13.5, paddingBottom: 14.5 }}
          >
            {isRtl ? "سجل الان" : "Register now"}
          </a>

          <div className="h-[61px] w-full max-w-[1241px] py-[30px]" />

          <div className="mb-4 h-[29px] w-[205px] pb-4">
            <p
              className="whitespace-nowrap text-right text-[18px] font-light leading-[119%] text-white"
              style={{ fontFamily: ibm }}
            >
              {isRtl ? "أو مراسلتنا على البريد الالكتروني:" : "Or email us at:"}
            </p>
          </div>

          <a
            href="mailto:marketing@discoveraseer.com"
            className="text-right text-[24px] font-normal leading-[27px] text-[#D3A6F6] underline underline-offset-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            marketing@discoveraseer.com
          </a>
        </div>
      </section>

      <EventsInfo />
    </div>
  );
};

export default FilmPage;
