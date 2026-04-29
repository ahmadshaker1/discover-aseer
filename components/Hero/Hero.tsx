import {
  EventsAndSeasonsIcon,
  ActivitiesIcon,
  PointsOfInterestIcon,
  LivingInAseerIcon,
  AseerCuisineIcon,
  TouristicSitesIcon,
} from "./Icons";

const Hero = () => {
  const gridItems = [
    { text: "وجهات رئيسية", icon: <PointsOfInterestIcon /> },
    { text: "التجارب", icon: <ActivitiesIcon /> },
    { text: "الفعاليات و المواسم", icon: <EventsAndSeasonsIcon /> },
    { text: "المعالم السياحية", icon: <TouristicSitesIcon /> },
    { text: "المطبخ العسيري", icon: <AseerCuisineIcon /> },
    { text: "الإقامة في عسير", icon: <LivingInAseerIcon /> },
  ];

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
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(214.49deg, rgba(115, 0, 205, 0) 20.36%, #7300CD 90.97%)",
          }}
        />

        <img
          src="/hero-pattern/ribbon_column.png"
          alt=""
          aria-hidden
          className="absolute top-0 right-0 z-20 h-full w-[15px] object-cover"
        />

        <div className="relative z-10 mx-auto h-full w-full max-w-[1440px] px-6 md:px-[130px]">
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
                ألف مرحبا بكم في عسير
              </h1>

              <p
                className="max-w-[501px] text-white"
                style={{
                  fontFamily: "var(--font-ara-hamah-1964), sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(18px, 1.9vw, 24px)",
                  lineHeight: "133%",
                }}
              >
                حيث تلتقي التقاليد الخالدة بالمناظر الطبيعية الخلابة. جرب مزيجا فريدا
                من الثقافة والمغامرة والجمال الذي لا مثيل له.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Discover section with 6 cards */}
      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1451px] px-6 py-14 md:h-[510px] md:px-[130px] md:py-[86px]">
          <div className="flex h-full w-full flex-col items-start justify-between gap-10 md:h-[276px] md:flex-row md:gap-8">
          <div className="w-full md:w-[364px]">
            <div className="grid grid-cols-3 gap-[11.85px]">
              {gridItems.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className="flex h-[132.0747px] w-[111.1px] min-w-[111.1px] max-w-[111.1px] flex-col items-end justify-end gap-[8.89px] rounded-[23.7px] border border-[#E8E8E8] bg-white px-[11.85px] pt-[17.78px] pb-[17.78px] text-right text-[#252525] transition-colors hover:bg-[#f6f3ff]"
                >
                  <span className="relative block text-[#6027D2] [&_path]:fill-current [&_path]:stroke-current [&_svg]:relative [&_svg]:left-[1.11px] [&_svg]:top-[1.5px] [&_svg]:h-[21.8292px] [&_svg]:w-[24.4419px]">
                    {item.icon}
                  </span>
                  <span
                    className="flex h-[36px] w-[62px] items-start justify-end text-right font-semibold leading-[100%] tracking-[0px]"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14.81px",
                    }}
                  >
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full text-right md:w-[567px] md:self-start">
            <h2
              className="text-black"
              style={{
                fontFamily: "var(--font-ara-hamah-1964), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(44px, 4vw, 64px)",
                lineHeight: "119%",
              }}
            >
              اكتشف عسير
            </h2>
            <p
              className="mt-8 text-[#252525]/80"
              style={{
                fontFamily: "var(--font-ara-hamah-1964), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(18px, 2vw, 24px)",
                lineHeight: "119%",
              }}
            >
              في ثنائيات من البهاء؛ تلتقي قمم الجبال مع لؤلؤ الشطآن الصافية،
              وتصافح الرمال الذهبية الهضاب الخضراء. طبيعة يتماهى فيها المطر مع دفء
              السهول، ويختال فيها الضباب مع شموخ المكان.
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Hero;
