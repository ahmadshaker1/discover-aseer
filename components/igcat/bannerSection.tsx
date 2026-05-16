import { getTranslations } from "next-intl/server";

export default async function IGCatBannerSection() {
  const t = await getTranslations("igcat.banner");

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden md:h-[600px]">
      <img
        src="/assets/igcat/banner.png"
        alt={t("imageAlt")}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <h1 className="mb-6 text-[40px] font-bold leading-[1.2] text-white md:text-[56px]">
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </h1>
        <div>
          <button
            type="button"
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-start text-[20px] leading-[36px] tracking-[0] text-primary-foreground transition-opacity hover:opacity-90"
            style={{ fontFamily: "Ara Hamah 1964 B" }}
          >
            {t("cta")}
            <span>
              <img
                src="/assets/igcat/Vector (2).png"
                alt=""
                aria-hidden="true"
                className="inline-block h-4 w-4"
              />
            </span>
          </button>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <img
            src="/assets/igcat/culinary.png"
            className="h-20"
            alt="Culinary icon"
          />
          <img
            src="/assets/igcat/award.png"
            className="h-20"
            alt="IGCAT award"
          />
        </div>
      </div>
    </div>
  );
}
