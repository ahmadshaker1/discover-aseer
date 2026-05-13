import Image from "next/image";
import { useTranslations } from "next-intl";

export default function TravelLandSection() {
  const t = useTranslations("gettingHere.land");

  return (
    <section className={`py-12 text-foreground text-start`}>
      <div
        className="mt-12 h-[300px] w-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(102, 102, 102, 0.5) 100%), url('/assets/Getting-here-and-around/b508a57eb99cf2e6f865588877b7c2da00e3ec1b.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "70% 65%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="container mx-auto px-6 mb-12">
        {/* العنوان */}
        <div className="mb-6 border-b border-border pb-4 pt-6">
          <h2 className={`text-[32px] font-bold text-foreground sm:text-[40px] text-start`}>
            {t("travelByRoad")}
          </h2>
        </div>

        {/* الوصف (محدد العرض عشان يجي على اليمين زي الصورة) */}
        <div className="mb-8 flex justify-start">
          <p className={`max-w-2xl text-[16px] leading-[1.6] text-muted-foreground sm:text-[18px] text-start`}>
            {t("roadLead")}
          </p>
        </div>

        {/* القسم السفلي: شبكة من عمودين */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* العمود الأيمن (قائمة المسافات) */}
          <div className="flex flex-col gap-4">
            {/* الرياض */}
            <div className="flex items-center justify-between rounded-2xl bg-surface p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <path d="M9 17h6" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                </div>
                <div className="text-start">
                  <p className="mb-0.5 text-[14px] text-muted-foreground">{t("fromRiyadh")}</p>
                  <p className="text-[18px] font-bold text-foreground">{t("hours950")}</p>
                </div>
              </div>
              <div className="text-start">
                <p className="text-[18px] font-bold text-foreground">{t("time910")}</p>
              </div>
            </div>

            {/* جدة */}
            <div className="flex items-center justify-between rounded-2xl bg-surface p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <path d="M9 17h6" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                </div>
                <div className="text-start">
                  <p className="mb-0.5 text-[14px] text-muted-foreground">{t("fromJeddah")}</p>
                  <p className="text-[18px] font-bold text-foreground">{t("hours630")}</p>
                </div>
              </div>
              <div className="text-start">
                <p className="text-[18px] font-bold text-foreground">{t("time67")}</p>
              </div>
            </div>

            {/* الدمام */}
            <div className="flex items-center justify-between rounded-2xl bg-surface p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <path d="M9 17h6" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                </div>
                <div className="text-start">
                  <p className="mb-0.5 text-[14px] text-muted-foreground">{t("fromDammam")}</p>
                  <p className="text-[18px] font-bold text-foreground">{t("hours1400")}</p>
                </div>
              </div>
              <div className="text-start">
                <p className="text-[18px] font-bold text-foreground">{t("time1314")}</p>
              </div>
            </div>
          </div>

          {/* العمود الأيسر (بطاقة سابتكو) */}
          <div className="flex flex-col justify-between rounded-4xl bg-[#333036] p-8 shadow-lg ">
            <div>
              <div className="mb-6 flex items-center justify-start gap-3">
                <h3 className="text-[28px] font-bold text-white">
                  {t("saptcoTitle")}
                </h3>
                <div className="text-[#FBB03B]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
                  </svg>
                </div>
              </div>
              <p className={`mb-8 text-[16px] leading-[1.8] text-white/80 text-start`}>
                {t("saptcoBody")}
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-start gap-4 mt-auto">
              <a
                href="https://saptco.com.sa/intercity-transport"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl bg-[#FBB03B] px-8 py-3 text-[16px] font-bold text-[#333036] transition hover:bg-[#e59e35]"
              >
                {t("bookOnWebsite")}
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.sat.passenger&hl=ar&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl bg-[#4A474E] px-8 py-3 text-[16px] font-bold text-white transition hover:brightness-110"
              >
                {t("downloadApp")}
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* قسم التنقل في عسير */}
      <div className="container mx-auto px-6 mb-12">
        {/* العنوان الرئيسي */}
        <div className="mb-8 border-b border-border pb-4 pt-6">
          <h2 className={`text-[32px] font-bold text-foreground sm:text-[40px] text-start`}>
            {t("gettingAroundTitle")}
          </h2>
        </div>

        {/* محتوى القسم (شبكة من عمودين) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* العمود الأيمن: تاكسي المطار */}
          <div className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-4xl shadow-md">
            {/* الصورة الخلفية */}
            <img
              src="/assets/Getting-here-and-around/89fb030a28469fcdf2237c498d9867f61d4ab7f0.jpg"
              alt={t("airportTaxiAlt")}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* تدرج لوني عشان النص يكون واضح */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>

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
              <p className="text-[14px] leading-[1.8] text-white/80">
                {t("airportTaxiBody")}
              </p>
            </div>
          </div>

          {/* العمود الأيسر: تطبيقات التوصيل */}
          <div className="flex flex-col justify-center rounded-4xl border border-border bg-surface p-8 shadow-sm">
            <h3 className={`mb-6 text-[20px] font-bold text-foreground text-start`}>
              {t("rideAppsTitle")}
            </h3>

            {/* شبكة كروت التطبيقات */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* كرت بولت */}
              <div className="flex flex-col items-center justify-between rounded-2xl bg-muted p-6 transition-all hover:shadow-md">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#2EBA7F] text-[24px] font-bold text-white">
                  B
                </div>
                <p className="mb-4 text-[18px] font-bold text-secondary">
                  {t("bolt")}
                </p>
                <a
                  href="https://play.google.com/store/apps/details?id=ee.mtakso.client&hl=ar"
                  target="_blank"
                  className="text-[14px] font-bold text-primary hover:underline"
                >
                  {t("downloadAppShort")}
                </a>
              </div>

              {/* كرت كريم */}
              <div className="flex flex-col items-center justify-between rounded-2xl bg-muted p-6 transition-all hover:shadow-md">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#48D52A] text-[24px] font-bold text-white">
                  C
                </div>
                <p className="mb-4 text-[18px] font-bold text-secondary">
                  {t("careem")}
                </p>
                <a
                  href="https://play.google.com/store/apps/details?id=com.careem.acma&hl=ar"
                  target="_blank"
                  className="text-[14px] font-bold text-primary hover:underline"
                >
                  {t("downloadAppShort")}
                </a>
              </div>

              {/* كرت أوبر */}
              <div className="flex flex-col items-center justify-between rounded-2xl bg-muted p-6 transition-all hover:shadow-md">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-black text-[24px] font-bold text-white">
                  U
                </div>
                <p className="mb-4 text-[18px] font-bold text-secondary">
                  {t("uber")}
                </p>
                <a
                  href="https://play.google.com/store/apps/details?id=com.ubercab&hl=ar"
                  target="_blank"
                  className="text-[14px] font-bold text-primary hover:underline"
                >
                  {t("downloadAppShort")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mb-12">
        {/* ================= قسم تأجير السيارات ================= */}
        <div className="mb-6 border-b border-border pb-4 pt-6">
          <h2 className={`text-[32px] font-bold text-foreground sm:text-[40px] text-start`}>
            {t("carRentalTitle")}
          </h2>
        </div>

        <div className="mb-8 flex justify-start">
          <p className={`max-w-3xl text-[16px] leading-[1.6] text-muted-foreground sm:text-[18px] text-start`}>
            {t("carRentalLead")}
          </p>
        </div>

        {/* كرت ذيب - كرت واحد كما طلبت */}
        <div className="mb-16 flex justify-start">
          <div className="relative flex w-full flex-col rounded-4xl bg-surface p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-transform hover:-translate-y-1 md:w-[350px]">
            {/* أيقونة B في اليسار */}
            <div className={`absolute top-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2EBA7F] text-white font-bold end-6`}>
              B
            </div>

            <div className={`mt-8 text-start`}>
              <h3 className="mb-6 text-[24px] font-bold text-secondary">{t("theebTitle")}</h3>

              {/* رقم الجوال */}
              <div className={`mb-4 flex items-center gap-3 text-[14px] font-medium text-foreground justify-start`}>
                <span dir="ltr">+966 9200000890</span>
                <svg
                  className="h-5 w-5 text-secondary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>

              {/* الموقع الإلكتروني */}
              <div className={`mb-8 flex items-center gap-3 text-[14px] font-bold text-secondary justify-start`}>
                <span>theeb.sa</span>
                <svg
                  className="h-5 w-5 text-secondary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>

              {/* رابط التحميل */}
              <a
                href="#"
                className={`flex text-[14px] font-bold text-primary hover:underline justify-start`}
              >
                {t("downloadAppShort")}
              </a>
            </div>
          </div>
        </div>

        {/* ================= قسم انظر أيضًا ================= */}
        <div className="relative mt-20 mb-8 pt-4">
          {/* عنوان القسم */}
          <div className="relative z-10 mb-10 flex items-end justify-start border-b border-border pb-4">
            <h2 className={`relative z-10 inline-block bg-background pl-6 text-[32px] font-bold text-foreground sm:text-[40px] text-start`}>
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
                  >
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
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
                  >
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
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
                  >
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
