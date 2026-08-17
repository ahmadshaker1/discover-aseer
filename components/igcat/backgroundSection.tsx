import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function IGCatBackgroundSection() {
  const t = await getTranslations("igcat.background");

  return (
    <>
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div className="flex flex-col items-start text-start">
              <h2 className="mb-6 font-bold text-foreground leading-15">
                {t("section1Title")}
              </h2>

              <p className="mb-8 text-justify text-[18px] leading-7 ">
                {t("section1Body")}
              </p>

              <div className="mt-2 flex flex-col items-center self-end sm:self-start">
                <Image
                  width={150}
                  height={150}
                  src="/assets/igcat/moc.svg fill.png"
                  alt={t("mocAlt")}
                  className="object-contain bg-white p-2 rounded-lg dark:hidden"
                />
                <Image
                  width={150}
                  height={150}
                  src="/assets/igcat/dark-theme/culinary-dark.svg"
                  alt={t("mocAlt")}
                  className="object-contain hidden dark:block"
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

      <section className="bg-surface py-10 md:py-10">
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
              <h2 className="mb-6 font-bold text-foreground leading-15">
                {t("section2Title")}
              </h2>

              <p className="mb-8 text-justify text-[18px] leading-7">
                {t("section2Body")}
              </p>

              <div className="mb-8 flex w-full flex-wrap items-center justify-start gap-6">
                <img
                  src="/assets/igcat/9e1b9b83056d640d601d3203a4c278eff8285e6b.png"
                  alt="IGCAT"
                  className="h-16 object-contain bg-[#F8F8F8] p-2 rounded-lg"
                />
                <img
                  src="/assets/igcat/award.svg.png"
                  alt="World Region of Gastronomy"
                  className="h-16 object-contain bg-[#F8F8F8] p-2 rounded-lg dark:hidden"
                />
                <img
                  src="/assets/igcat/award.png"
                  alt="World Region of Gastronomy"
                  className="h-16 object-contain hidden dark:block"
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
