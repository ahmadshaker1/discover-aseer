import { MapPinOutlineIcon } from "./Icons";
import { useTranslations } from "next-intl";

export default function TravelSection() {
  const t = useTranslations("gettingHere.air");

  return (
    <section className={`py-12 text-foreground text-start`}>
      <div className="container mx-auto px-6 mb-12">
        <h2 className="travel-section-title">{t("flyByAir")}</h2>
        <div className="mb-6 border-b border-border" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-surface p-6">
            <p className="mb-3 text-2xl font-bold text-secondary">
              {t("abhaAirportTitle")}
            </p>
            <p className="mb-5 text-base leading-7 text-muted-foreground">
              {t("abhaAirportBody")}
            </p>
            <a
              href="https://www.google.com/maps/place/Abha+International+Airport/@18.2343646,42.6553277,937m/data=!3m2!1e3!4b1!4m6!3m5!1s0x15fca9c54b96b363:0xfe8a0c2ac4f96600!8m2!3d18.2343646!4d42.6579026!16s%2Fm%2F02882r5?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[36px] w-[170px] items-center gap-3 rounded-[86px] border border-primary px-4 py-[10px] text-primary"
            >
              <span aria-hidden="true" className="inline-flex">
                <MapPinOutlineIcon />
              </span>
              <span className="text-sm font-medium">{t("viewOnMap")}</span>
            </a>
          </article>

          <article className="rounded-2xl border border-border bg-surface p-6">
            <p className="mb-3 text-2xl font-bold text-secondary">
              {t("bishaAirportTitle")}
            </p>
            <p className="mb-5 text-base leading-7 text-muted-foreground">
              {t("bishaAirportBody")}
            </p>
            <a
              href="https://www.google.com/maps/place/Bisha+Domestic+Airport/@19.8797569,43.6564457,23565m/data=!3m1!1e3!4m6!3m5!1s0x15f02937bd44e1c5:0x4c127fec01eb95f!8m2!3d19.9942184!4d42.6185414!16s%2Fm%2F02882_2?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[36px] w-[170px] items-center gap-3 rounded-[86px] border border-primary px-4 py-[10px] text-primary"
            >
              <span aria-hidden="true" className="inline-flex">
                <MapPinOutlineIcon />
              </span>
              <span className="text-sm font-medium">{t("viewOnMap")}</span>
            </a>
          </article>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <p
          className={`text-start align-middle text-[24px] font-bold uppercase leading-[20px] tracking-[0px] text-muted-foreground`}
        >
          {t("domesticFlights")}
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex h-[332px] w-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="mb-6 flex items-start justify-between">
              <img
                src="/assets/Getting-here-and-around/Icon.png"
                alt=""
                aria-hidden="true"
                className="h-8 w-8 object-contain"
              />
              <span className="rounded-full bg-primary/15 px-4 py-1 text-[12px] font-bold leading-none text-primary">
                {t("featured")}
              </span>
            </div>
            <div className={`mt-auto text-start`}>
              <p className="text-[24px] font-bold leading-[1.05] text-secondary">
                {t("saudiLabel")}
              </p>
              <p className="mt-3 text-[16px] leading-[1.2] text-muted-foreground">
                {t("saudiCarrier")}
              </p>
              <a
                href="https://www.saudia.com/?cid=&gad_campaignid=23017945566"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/15 px-2 py-1 text-[16px] font-bold leading-none text-primary transition-colors hover:bg-primary/25"
              >
                {t("bookNow")}
                <span aria-hidden="true" className="text-[24px]">
                  ↗
                </span>
              </a>
            </div>
          </div>
          <div className="flex h-[332px] w-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="mb-10 flex items-start justify-between">
              <img
                src="/assets/Getting-here-and-around/Icon.png"
                alt=""
                aria-hidden="true"
                className="h-8 w-8 object-contain"
              />
              <span className="rounded-full bg-muted px-4 py-1 text-[12px] font-bold leading-none text-muted-foreground">
                {t("budget")}
              </span>
            </div>
            <div className={`mt-auto text-start`}>
              <p className="text-[24px] font-bold leading-[1.05] text-secondary">
                {t("flyNasLabel")}
              </p>
              <p className="mt-3 text-[16px] leading-[1.2] text-muted-foreground">
                {t("flyNasTagline")}
              </p>
              <a
                href="https://www.flynas.com/ar?gclsrc=aw.ds&gad_source=1&gad_campaignid=17793646925"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/15 px-2 py-1 text-[16px] font-bold leading-none text-primary transition-colors hover:bg-primary/25"
              >
                {t("bookNow")}
                <span aria-hidden="true" className="text-[24px]">
                  ↗
                </span>
              </a>
            </div>
          </div>
          <div className="flex h-[332px] w-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="mb-10 flex items-start justify-between">
              <img
                src="/assets/Getting-here-and-around/Icon.png"
                alt=""
                aria-hidden="true"
                className="h-8 w-8 object-contain"
              />
              <span className="rounded-full bg-muted px-4 py-1 text-[12px] font-bold leading-none text-muted-foreground">
                {t("budget")}
              </span>
            </div>
            <div className={`mt-auto text-start`}>
              <p className="text-[24px] font-bold leading-[1.05] text-secondary">
                {t("flyadealLabel")}
              </p>
              <p className="mt-3 text-[16px] leading-[1.2] text-muted-foreground">
                {t("flyadealTagline")}
              </p>
              <a
                href="https://www.flyadeal.com/en/search-flight?gad_source=1&gad_campaignid=13589844465&gclid=Cj0KCQjwkYLPBhC3ARIsAIyHi3TbmImJwiG4yASbL6E_-RQecLzG09amnaOoE7BEKfyyaZmPQ7TYm68aAswdEALw_wcB"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/15 px-2 py-1 text-[16px] font-bold leading-none text-primary transition-colors hover:bg-primary/25"
              >
                {t("bookNow")}
                <span aria-hidden="true" className="text-[24px]">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 px-6">
        <p
          className={`text-start align-middle text-[24px] font-bold uppercase leading-[20px] tracking-[0px] text-muted-foreground`}
        >
          {t("internationalFlights")}
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* الكرت الأول: فلاي دبي */}
          <div className="flex h-[150px] w-full flex-col rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-start">
              <img
                src="/assets/Getting-here-and-around/flayD.png"
                alt=""
                aria-hidden="true"
                className="h-15 w-15  object-contain"
              />
            </div>
            <div className={`mt-auto text-start`}>
              <p className="text-[24px] font-bold leading-[1.05] text-secondary">
                {t("flyDubai")}
              </p>
              <a
                href="https://www.flydubai.com/ar-ae/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-3 rounded-full px-2 py-1 text-[16px] font-bold leading-none text-primary transition-colors hover:bg-primary/15"
              >
                {t("bookingSite")}
                <span aria-hidden="true" className="text-[24px]">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* الكرت الثاني: العربية للطيران */}
          <div className="flex h-[150px] w-full flex-col rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-start">
              <img
                src="/assets/Getting-here-and-around/Air-Arabia-logo.png"
                alt=""
                aria-hidden="true"
                className="h-15 w-15 object-contain"
              />
            </div>
            <div className={`mt-auto text-start`}>
              <p className="text-[24px] font-bold leading-[1.05] text-secondary">
                {t("airArabia")}
              </p>
              <a
                href="https://www.airarabia.com/ar"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-3 rounded-full px-2 py-1 text-[16px] font-bold leading-none text-primary transition-colors hover:bg-primary/15"
              >
                {t("bookingSite")}
                <span aria-hidden="true" className="text-[24px]">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* الكرت الثالث: النيل للطيران */}
          <div className="flex h-[150px] w-full flex-col rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-start">
              <img
                src="/assets/Getting-here-and-around/Nile_air.png"
                alt=""
                aria-hidden="true"
                className="h-15 w-15 object-contain"
              />
            </div>
            <div className={`mt-auto text-start`}>
              <p className="text-[24px] font-bold leading-[1.05] text-secondary">
                {t("nileAir")}
              </p>
              <a
                href="https://www.nileair.com/ar"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-3 rounded-full px-2 py-1 text-[16px] font-bold leading-none text-primary transition-colors hover:bg-primary/15"
              >
                {t("bookingSite")}
                <span aria-hidden="true" className="text-[24px]">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* الكرت الرابع: إير كايرو */}
          <div className="flex h-[150px] w-full flex-col rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-start">
              <img
                src="/assets/Getting-here-and-around/air-cairo.png"
                alt=""
                aria-hidden="true"
                className="h-15 w-15 object-contain"
              />
            </div>
            <div className={`mt-auto text-start`}>
              <p className="text-[24px] font-bold leading-[1.05] text-secondary">
                {t("airCairo")}
              </p>
              <a
                href="https://aircairo.com/ar-sa/homepage"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-3 rounded-full px-2 py-1 text-[16px] font-bold leading-none text-primary transition-colors hover:bg-primary/15"
              >
                {t("bookingSite")}
                <span aria-hidden="true" className="text-[24px]">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
