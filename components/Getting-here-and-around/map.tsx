import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapPinOutlineIcon } from "./Icons";

export default function MapSection() {
  const t = useTranslations("gettingHere.map");

  return (
    <section className="py-12 text-start text-foreground">
      <div className="container mx-auto px-6">
        <div
          className="overflow-hidden rounded-[32px] px-6 py-10 shadow-[0_20px_60px_rgba(96,39,210,0.22)] sm:px-10 sm:py-12 lg:px-12"
          style={{ backgroundColor: "#6027D2" }}
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:items-center">
            <div className="max-w-xl text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
                {t("eyebrow")}
              </p>
              <h2 className="mt-3 text-[32px] font-bold leading-tight sm:text-[42px]">
                {t("title")}
              </h2>
              <p className="mt-4 text-[16px] leading-7 text-white/80 sm:text-[18px]">
                {t("description")}
              </p>

              <div className="mt-8">
                <Link
                  href="/interactive-map"
                  className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-white/95 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_rgba(255,255,255,0.2)] md:text-base"
                >
                  <MapPinOutlineIcon />
                  <span>{t("viewInteractiveMap")}</span>
                </Link>
              </div>
            </div>

            <Link
              href="/interactive-map"
              className="relative mx-auto aspect-[4/3] w-full max-w-[560px] cursor-pointer group block"
            >
              <Image
                src="/assets/Getting-here-and-around/map1.png"
                alt={t("alt")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
