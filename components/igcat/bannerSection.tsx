import { getTranslations } from "next-intl/server";
import Link from "next/link";

const brando = "var(--font-brando), sans-serif";
const ara = "var(--font-ara-hamah-1964), sans-serif";

export default async function IGCatBannerSection() {
  const t = await getTranslations("igcat.banner");

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden ">
      <img
        src="/assets/igcat/banner.png"
        alt={t("imageAlt")}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <h1
          className="text-[40px] font-bold leading-[1.2] text-white md:text-[56px]"
          style={{ fontFamily: brando }}
        >
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
          <br />
        </h1>
        <p
          className="text-[20px] font-light text-white md:text-[28px] mb-6"
          style={{ fontFamily: brando }}
        >
          {t("titleLine3")}
        </p>
        <div>
          <Link
            href="https://drive.google.com/file/d/1zWgdBr_sda9DK0mJYmy73-7bu4EBBSGU/view"
            target="_blank"
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-start text-[20px] leading-[36px] tracking-[0] text-primary-foreground transition-opacity hover:opacity-90"
            style={{ fontFamily: ara }}
          >
            {t("cta")}
          </Link>
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
