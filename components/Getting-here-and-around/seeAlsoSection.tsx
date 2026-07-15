import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SeeAlsoSection() {
  const t = useTranslations("gettingHere.land");

  return (
    <div className="container mx-auto px-6 mb-12">
      {/* ================= قسم انظر أيضًا ================= */}
      <div className="relative mt-20 mb-8 pt-4">
        {/* عنوان القسم */}
        <div className="relative z-10 mb-10 flex items-end justify-start border-b border-border pb-4">
          <h2
            className={`relative z-10 inline-block bg-background pl-6 text-[32px] font-bold text-foreground sm:text-[40px] text-start`}
          >
            {t("seeAlso")}
          </h2>
        </div>

        {/* شبكة الكروت السفلية */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* الكرت الأول: متطلبات التأشيرة */}
          <div className="flex h-[250px] flex-col justify-between rounded-4xl border border-border bg-surface p-8 transition-shadow hover:shadow-lg">
            <div className="flex justify-start">
              <Image
                src="/assets/Getting-here-and-around/evisa-logo-1707824671.png"
                alt={t("visaAlt")}
                width={70}
                height={50}
              />
            </div>
            <h3 className={`text-[20px] font-bold text-foreground text-start`}>
              {t("visaTitle")}
            </h3>
            <div className="flex justify-start">
              <a
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90"
                href="https://www.visitsaudi.com/ar/plan-your-trip/visa-regulations"
                target="_blank"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="rtl:rotate-180"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* الكرت الثاني: خطط إقامتك */}
          <div className="flex h-[250px] flex-col justify-between rounded-4xl border border-border bg-surface p-8 transition-shadow hover:shadow-lg">
            <div className="flex justify-start text-primary">
              <Image
                src="/assets/Getting-here-and-around/icon3346.svg"
                alt={t("planStayAlt")}
                width={48}
                height={48}
              />
            </div>
            <h3 className={`text-[20px] font-bold text-foreground text-start`}>
              {t("planStayTitle")}
            </h3>
            <div className="flex justify-start">
              <a
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90"
                href="/accommodation"
                target="_blank"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="rtl:rotate-180"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* الكرت الثالث: اختر وجهتك */}
          <div className="flex h-[250px] flex-col justify-between rounded-4xl border border-border bg-surface p-8 transition-shadow hover:shadow-lg">
            <div className="flex justify-start text-primary">
              <Image
                src="/assets/Getting-here-and-around/Vector.svg"
                alt={t("pickDestinationAlt")}
                width={48}
                height={48}
              />
            </div>
            <h3 className={`text-[20px] font-bold text-foreground text-start`}>
              {t("pickDestinationTitle")}
            </h3>
            <div className="flex justify-start">
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="rtl:rotate-180"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
