interface HeroProps {
  title?: string;
  subtitle?: string;
}

const Hero = ({
  title = "ألف مرحبا بكم في عسير",
  subtitle = "حيث تلتقي التقاليد الخالدة بالمناظر الطبيعية الخلابة. جرب مزيجا فريدا من الثقافة والمغامرة والجمال الذي لا مثيل له.",
}: HeroProps) => {
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
                {title}
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
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
