import { getTranslations } from "next-intl/server";
import AseerMap from "./AseerMap";
import LogoCarousel from "./LogoCarousel";
import { fetchSiteAssets, getAssetUrl } from "@/lib/siteAssets";

export default async function TravelLandSection() {
  const t = await getTranslations("gettingHere.land");
  const assets = await fetchSiteAssets("getting-here-and-around");

  const carRentals = [
    {
      nameKey: "theebTitle" as const,
      link: t("theebLink"),
      image: "/assets/Getting-here-and-around/Theeb.webp",
    },
    {
      nameKey: "yeloTitle" as const,
      link: "https://www.iyelo.com/en",
      image: "/assets/Getting-here-and-around/car-rental/yelo.png",
    },
    {
      nameKey: "ajarTitle" as const,
      link: "https://www.enterprise.com.sa/en/home",
      image: "/assets/Getting-here-and-around/car-rental/ajar.jpg",
    },
    {
      nameKey: "keyCarRentalTitle" as const,
      link: "https://www.key.sa/en",
      image: "/assets/Getting-here-and-around/car-rental/key.png",
    },
    {
      nameKey: "abuDiyabTitle" as const,
      link: "https://www.rent.abudiyab.com.sa/",
      image: "/assets/Getting-here-and-around/car-rental/abudiyab.png",
    },
    {
      nameKey: "alRehailiTitle" as const,
      link: "https://www.alrehaili.sa/",
      image: "/assets/Getting-here-and-around/car-rental/alrehaili.png",
    },
    {
      nameKey: "alFarisTitle" as const,
      link: "https://alfaris.sa/ar/",
      image: "/assets/Getting-here-and-around/car-rental/alfaris.png",
    },
    {
      nameKey: "binHadiTitle" as const,
      link: "https://www.ebinhadi.com/ar",
      image: "/assets/Getting-here-and-around/car-rental/bin-hadi.png",
    },
    {
      nameKey: "alRehilyEastTitle" as const,
      link: "https://alrehilyest.com/ar/index.html",
      image: "/assets/Getting-here-and-around/car-rental/alrehily2(blue).png",
    },
  ];

  return (
    <section className={`py-12 text-foreground text-start`}>
      <div
        className="mt-12 h-[300px] w-full"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.25) 0%, rgba(102, 102, 102, 0.25) 100%), url('${getAssetUrl(assets, "Driving in Banner Section", "/assets/Getting-here-and-around/landSectionImage.jpeg")}')`,
          backgroundSize: "cover",
          backgroundPosition: "70% 65%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="container mx-auto px-6 mb-12">
        {/* العنوان */}
        <div className="mb-6 border-b border-border pb-4 pt-6">
          <h2
            className={`text-[48px] font-bold text-foreground sm:text-[54px] text-start`}
          >
            {t("travelByRoad")}
          </h2>
        </div>

        {/* الوصف (محدد العرض عشان يجي على اليمين زي الصورة) */}
        <div className="mb-8 flex justify-start">
          <p
            className={`max-w-2xl text-[16px] leading-[1.6] text-muted-foreground sm:text-[18px] text-start`}
          >
            {t("roadLead")}
          </p>
        </div>
        {/* القسم السفلي: شبكة من عمودين */}
        <div className="flex flex-col gap-8">
          {/* الخريطة التفاعلية */}
          <AseerMap />

          {/* العمود الأيسر (بطاقة سابتكو) */}
          <div
            className="relative flex flex-col justify-between w-full h-[350px] sm:h-[360px] md:h-[450px] rounded-3xl md:rounded-4xl border border-border p-6 md:p-8 shadow-lg text-white overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${getAssetUrl(assets, "Public Transport Buses", "/assets/Getting-here-and-around/SAPTCO.png")}')`,
            }}
          >
            <div>
              <div className="mb-4 md:mb-6 flex items-center justify-start gap-3">
                <h3 className="text-2xl md:text-[28px] font-bold text-white">
                  {t("saptcoTitle")}
                </h3>
              </div>
              <p
                className={`mb-6 md:mb-8 text-sm md:text-[16px] leading-[1.6] md:leading-[1.8] text-white/90 text-start`}
              >
                {t("saptcoBody")}
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-start gap-4 mt-auto">
              <a
                href={t("saptcoLink")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm md:text-[16px] font-bold text-primary-foreground transition hover:opacity-90"
              >
                {t("bookOnWebsite")}
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* قسم التنقل في عسير */}
      <div className="container mx-auto px-6 mb-12">
        {/* العنوان الرئيسي */}
        <div className="mb-8 border-b border-border pb-4 pt-6">
          <h2
            className={`text-[32px] font-bold text-foreground sm:text-[40px] text-start`}
          >
            {t("gettingAroundTitle")}
          </h2>
        </div>

        {/* محتوى القسم (شبكة من عمودين) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* العمود الأيمن: تاكسي المطار */}
          <div className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-4xl shadow-md">
            {/* الصورة الخلفية */}
            <img
              src={getAssetUrl(
                assets,
                "Taxis",
                "/assets/Getting-here-and-around/Taxis.png",
              )}
              alt={t("airportTaxiAlt")}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* تدرج لوني عشان النص يكون واضح */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* المحتوى النصي */}
            <div className={`relative z-10 p-8 text-start`}>
              <div className={`mb-3 flex justify-start`}>
                {/* أيقونة سيارة أجرة */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <path d="M9 17h6" />
                  <circle cx="17" cy="17" r="2" />
                  <rect x="10" y="6" width="4" height="3" rx="1" />
                </svg>
              </div>
              <h3 className="mb-3 text-[24px] font-bold text-white">
                {t("airportTaxiTitle")}
              </h3>
              <p className="text-[16px] leading-[1.8] text-white/80">
                {t("airportTaxiBody")}
              </p>
            </div>
          </div>

          {/* العمود الأيسر: تطبيقات التوصيل */}
          <div className="flex flex-col justify-center rounded-4xl border border-border bg-surface p-8 shadow-sm">
            <h3
              className={`mb-6 text-[20px] font-bold text-foreground text-start`}
            >
              {t("rideAppsTitle")}
            </h3>

            {/* شبكة كروت التطبيقات */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
              {/* كرت أوبر */}
              <a
                href={t("uberLink")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center w-full max-w-[156px] transition-all hover:-translate-y-1"
                style={{ gap: "16px" }}
              >
                <div
                  className="w-full aspect-[156/150] flex items-center justify-center rounded-2xl bg-cover bg-center shadow-sm group-hover:shadow-md"
                  style={{
                    backgroundImage:
                      "url('/assets/Getting-here-and-around/appDrive/Uber.png')",
                  }}
                ></div>
                <div className="text-center">
                  <p className="text-lg md:text-[20px] font-bold text-foreground leading-tight">
                    {t("uber")}
                  </p>
                </div>
              </a>

              {/* كرت كريم */}
              <a
                href={t("careemLink")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center w-full max-w-[156px] transition-all hover:-translate-y-1"
                style={{ gap: "16px" }}
              >
                <div
                  className="w-full aspect-[156/150] flex items-center justify-center rounded-2xl bg-cover bg-center shadow-sm group-hover:shadow-md"
                  style={{
                    backgroundImage:
                      "url('/assets/Getting-here-and-around/appDrive/careem.jpg')",
                  }}
                ></div>
                <div className="text-center">
                  <p className="text-lg md:text-[20px] font-bold text-foreground leading-tight">
                    {t("careem")}
                  </p>
                </div>
              </a>

              {/* كرت بولت */}
              <a
                href={t("boltLink")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center w-full max-w-[156px] transition-all hover:-translate-y-1"
                style={{ gap: "16px" }}
              >
                <div
                  className="w-full aspect-[156/150] flex items-center justify-center rounded-2xl bg-cover bg-center shadow-sm group-hover:shadow-md"
                  style={{
                    backgroundImage:
                      "url('/assets/Getting-here-and-around/appDrive/bolt.png')",
                  }}
                ></div>
                <div className="text-center">
                  <p className="text-lg md:text-[20px] font-bold text-foreground leading-tight">
                    {t("bolt")}
                  </p>
                </div>
              </a>

              {/* كرت جيني */}
              <a
                href={t("jeenyLink")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center w-full max-w-[156px] transition-all hover:-translate-y-1"
                style={{ gap: "16px" }}
              >
                <div
                  className="w-full aspect-[156/150] flex items-center justify-center rounded-2xl bg-cover bg-center shadow-sm group-hover:shadow-md"
                  style={{
                    backgroundImage:
                      "url('/assets/Getting-here-and-around/appDrive/jeeny.png')",
                  }}
                ></div>
                <div className="text-center">
                  <p className="text-lg md:text-[20px] font-bold text-foreground leading-tight">
                    {t("jeeny")}
                  </p>
                </div>
              </a>

              {/* كرت رحلة */}
              <a
                href={t("rehlaLink")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center w-full max-w-[156px] transition-all hover:-translate-y-1"
                style={{ gap: "16px" }}
              >
                <div
                  className="w-full aspect-[156/150] flex items-center justify-center rounded-2xl bg-cover bg-center shadow-sm group-hover:shadow-md"
                  style={{
                    backgroundImage:
                      "url('/assets/Getting-here-and-around/appDrive/rehla.jpg')",
                  }}
                ></div>
                <div className="text-center">
                  <p className="text-lg md:text-[20px] font-bold text-foreground leading-tight">
                    {t("rehla")}
                  </p>
                </div>
              </a>

              {/* كرت مواصلات العاصمة */}
              <a
                href={t("ctcLink")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center w-full max-w-[156px] transition-all hover:-translate-y-1"
                style={{ gap: "16px" }}
              >
                <div
                  className="w-full aspect-[156/150] flex items-center justify-center rounded-2xl bg-cover bg-center shadow-sm group-hover:shadow-md"
                  style={{
                    backgroundImage:
                      "url('/assets/Getting-here-and-around/appDrive/CTC.png')",
                  }}
                ></div>
                <div className="text-center">
                  <p className="text-lg md:text-[20px] font-bold text-foreground leading-tight">
                    {t("ctc")}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mb-12">
        {/* ================= قسم تأجير السيارات ================= */}
        <div className="mb-6 border-b border-border pb-4 pt-6">
          <h2
            className={`text-[32px] font-bold text-foreground sm:text-[40px] text-start`}
          >
            {t("carRentalTitle")}
          </h2>
        </div>

        <div className="mb-8 flex justify-start">
          <p
            className={`max-w-3xl text-[16px] leading-[1.6] text-muted-foreground sm:text-[18px] text-start`}
          >
            {t("carRentalLead")}
          </p>
        </div>

        {/* كروت تأجير السيارات */}
        <div className="mb-16">
          <LogoCarousel
            slideClassName="w-[156px]! max-w-[156px] shrink-0"
            slides={carRentals.map((rental) => {
              const name = t(rental.nameKey);
              return {
                key: rental.nameKey,
                content: (
                  <a
                    href={rental.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="group flex w-full flex-col items-center transition-all hover:-translate-y-1"
                    style={{ gap: "16px" }}
                  >
                    <div
                      className="aspect-[156/150] w-full rounded-2xl bg-cover bg-center shadow-sm group-hover:shadow-md"
                      style={{
                        backgroundImage: `url('${rental.image}')`,
                      }}
                    />
                    <div className="text-center">
                      <p className="text-lg font-bold leading-tight text-foreground md:text-[20px]">
                        {name}
                      </p>
                    </div>
                  </a>
                ),
              };
            })}
          />
        </div>
      </div>
    </section>
  );
}
