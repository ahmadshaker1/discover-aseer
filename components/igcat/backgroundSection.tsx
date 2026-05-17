import { getTranslations } from "next-intl/server";

export default async function IGCatBackgroundSection() {
  const t = await getTranslations("igcat.background");

  return (
    <>
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col items-start text-start">
              <span className=" inline-block rounded-full border border-primary bg-primary/10 px-5 py-1 text-[14px] font-bold text-primary">
                {t("badge")}
              </span>

              <h2 className="mb-6 text-[38px] font-bold text-foreground md:text-[42px]">
                {t("section1Title")}
              </h2>

              <p className="mb-8 text-justify text-[18px] ">
                {t("section1Body")}
              </p>

              <div className="mt-2 flex flex-col items-center self-end sm:self-start">
                <img
                  src="/assets/igcat/moc.svg fill.png"
                  alt={t("mocAlt")}
                  className="h-16 object-contain"
                />
                <p className="mb-2 mt-2 text-[16px] font-bold text-foreground">
                  {t("mocCaption")}
                </p>
              </div>
            </div>

            <div className="w-full overflow-hidden rounded-3xl shadow-lg">
              <img
                src="/assets/igcat/image1.jpg"
                alt={t("section1ImageAlt")}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3F4F6] py-10 md:py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="order-2 w-full overflow-hidden rounded-3xl shadow-lg lg:order-1">
              <img
                src="/assets/igcat/foodimage.png"
                alt={t("section2ImageAlt")}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="order-1 flex flex-col items-start text-start lg:order-2">
              <h2 className="mb-6 text-[28px] font-bold text-foreground md:text-[36px]">
                {t("section2Title")}
              </h2>

              <p className="mb-8 text-justify text-[18px]">
                {t("section2Body")}
              </p>

              <div className="mb-8 flex w-full flex-wrap items-center justify-start gap-6">
                <img
                  src="/assets/igcat/9e1b9b83056d640d601d3203a4c278eff8285e6b.png"
                  alt="IGCAT"
                  className="h-16 object-contain"
                />
                <img
                  src="/assets/igcat/award.svg.png"
                  alt="World Region of Gastronomy"
                  className="h-16 object-contain"
                />
              </div>

              {/* <button
                type="button"
                className="rounded-full bg-primary px-12 py-3 text-[16px] font-bold text-primary-foreground shadow-md transition-opacity hover:opacity-90"
              >
                {t("brochure")}
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
