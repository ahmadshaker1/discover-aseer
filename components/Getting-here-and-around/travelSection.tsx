export default function TravelSection() {
  return (
    <section dir="rtl" className="py-12 text-right">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="travel-section-title">السفر جواً</h2>
        <div className="mb-6 border-b border-[#E4E4E4]" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-[#E4E4E4] bg-[#F8F8F8] p-6">
            <p className="mb-3 text-2xl font-bold text-[#280048]">
              مطار أبها الدولي (AHB)
            </p>
            <p className="mb-5 text-base leading-7 text-gray-700">
              البوابة الرئيسية للمنطقة، ويقع على بعد 18 كم فقط من وسط مدينة
              أبها. يخدم الوجهات المحلية والمراكز الدولية الرئيسية في المنطقة.
            </p>
            <a
              href="https://www.google.com/maps/place/Abha+International+Airport/@18.2343646,42.6553277,937m/data=!3m2!1e3!4b1!4m6!3m5!1s0x15fca9c54b96b363:0xfe8a0c2ac4f96600!8m2!3d18.2343646!4d42.6579026!16s%2Fm%2F02882r5?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[36px] w-[170px] items-center gap-3 rounded-[86px] border border-[#7300CD] px-4 py-[10px] text-[#7300CD]"
            >
              <span aria-hidden="true" className="inline-flex">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C12 22 19 15 19 10.5C19 6.35786 15.866 3 12 3C8.13401 3 5 6.35786 5 10.5C5 15 12 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="10.5"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </span>
              <span className="text-sm font-medium">عرض على الخريطة</span>
            </a>
          </article>

          <article className="rounded-2xl border border-[#E4E4E4] bg-[#F8F8F8] p-6">
            <p className="mb-3 text-2xl font-bold text-[#280048]">
              مطار بيشة (BHH)
            </p>
            <p className="mb-5 text-base leading-7 text-gray-700">
              موقع استراتيجي للمسافرين الراغبين بزيارة الأجزاء الشمالية من منطقة
              عسير، مع توفير رحلات ربط محلية فعالة.
            </p>
            <a
              href="https://www.google.com/maps/place/Bisha+Domestic+Airport/@19.8797569,43.6564457,23565m/data=!3m1!1e3!4m6!3m5!1s0x15f02937bd44e1c5:0x4c127fec01eb95f!8m2!3d19.9942184!4d42.6185414!16s%2Fm%2F02882_2?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[36px] w-[170px] items-center gap-3 rounded-[86px] border border-[#7300CD] px-4 py-[10px] text-[#7300CD]"
            >
              <span aria-hidden="true" className="inline-flex">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C12 22 19 15 19 10.5C19 6.35786 15.866 3 12 3C8.13401 3 5 6.35786 5 10.5C5 15 12 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="10.5"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </span>
              <span className="text-sm font-medium">عرض على الخريطة</span>
            </a>
          </article>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <p className="text-right align-middle text-[24px] font-bold uppercase leading-[20px] tracking-[0px] text-[#747782]">
          الرحلات الداخليه
        </p>
        <div className="mt-6 flex flex-wrap justify-between gap-4">
          <div className="flex min-h-[230px] w-full max-w-[420px] flex-col rounded-2xl border border-[#E4E4E4] bg-[#F8F8F8] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] lg:max-w-[360px]">
            <div className="mb-6 flex items-start justify-between">
              <span className="flex h-[78px] w-[78px] items-center justify-center rounded-md bg-[#1F4695] text-[44px] font-bold leading-none text-[#6E8CD9]">
                س
              </span>
              <span className="rounded-full bg-[#F4EEDC] px-4 py-1 text-[12px] font-bold leading-none text-[#8C5B00]">
                مميز
              </span>
            </div>
            <div className="mt-auto text-right">
              <p className="text-[24px] font-bold leading-[1.05] text-[#2D1360]">
                السعودية
              </p>
              <p className="mt-3 text-[16px] leading-[1.2] text-[#1F1F1F]">
                الناقل الوطني
              </p>
              <a
                href="https://www.saudia.com/?cid=&gad_campaignid=23017945566"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#D6B8EC] bg-[#EADAF7] px-2 py-1 text-[16px] font-bold leading-none text-[#7300CD] transition-colors hover:bg-[#e3cff3]"
              >
                احجز الأن
                <span aria-hidden="true" className="text-[24px]">
                  ↗
                </span>
              </a>
            </div>
          </div>
          <div className="flex min-h-[332px] w-full max-w-[500px] flex-col rounded-2xl border border-[#E4E4E4] bg-[#F8F8F8] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] lg:max-w-[420px]">
            <div className="mb-10 flex items-start justify-between">
              <span className="flex h-[78px] w-[78px] items-center justify-center rounded-md bg-[#4CA62A] text-[44px] font-bold leading-none text-[#EAF5E4]">
                ن
              </span>
              <span className="rounded-full bg-[#E9ECF2] px-4 py-1 text-[12px] font-bold leading-none text-[#747782]">
                اقتصادي
              </span>
            </div>
            <div className="mt-auto text-right">
              <p className="text-[24px] font-bold leading-[1.05] text-[#2D1360]">
                طيران ناس
              </p>
              <p className="mt-3 text-[16px] leading-[1.2] text-[#1F1F1F]">
                الطيران الاقتصادي الرائد
              </p>
              <a
                href="https://www.flynas.com/ar?gclsrc=aw.ds&gad_source=1&gad_campaignid=17793646925"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#D6B8EC] bg-[#EADAF7] px-2 py-1 text-[16px] font-bold leading-none text-[#7300CD] transition-colors hover:bg-[#e3cff3]"
              >
                احجز الأن
                <span aria-hidden="true" className="text-[24px]">
                  ↗
                </span>
              </a>
            </div>
          </div>
          <div className="flex min-h-[332px] w-full max-w-[500px] flex-col rounded-2xl border border-[#E4E4E4] bg-[#F8F8F8] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] lg:max-w-[420px]">
            <div className="mb-10 flex items-start justify-between">
              <span className="flex h-[78px] w-[78px] items-center justify-center rounded-md bg-[#8227A2] text-[44px] font-bold leading-none text-[#F0E4F6]">
                أ
              </span>
              <span className="rounded-full bg-[#E9ECF2] px-4 py-1 text-[12px] font-bold leading-none text-[#747782]">
                اقتصادي
              </span>
            </div>
            <div className="mt-auto text-right">
              <p className="text-[24px] font-bold leading-[1.05] text-[#2D1360]">
                اديل
              </p>
              <p className="mt-3 text-[16px] leading-[1.2] text-[#1F1F1F]">
                سفر ذكي
              </p>
              <a
                href="https://www.flyadeal.com/en/search-flight?gad_source=1&gad_campaignid=13589844465&gclid=Cj0KCQjwkYLPBhC3ARIsAIyHi3TbmImJwiG4yASbL6E_-RQecLzG09amnaOoE7BEKfyyaZmPQ7TYm68aAswdEALw_wcB"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#D6B8EC] bg-[#EADAF7] px-2 py-1 text-[16px] font-bold leading-none text-[#7300CD] transition-colors hover:bg-[#e3cff3]"
              >
                احجز الأن
                <span aria-hidden="true" className="text-[24px]">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 px-6">
        <p className="text-right align-middle text-[24px] font-bold uppercase leading-[20px] tracking-[0px] text-[#747782]">
          الرحلات الدوليه
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* الكرت الأول: فلاي دبي */}
          <div className="flex h-[150px] w-full flex-col rounded-2xl border border-[#E4E4E4] bg-[#F8F8F8] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-start">
              <img
                src="/assets/Getting-here-and-around/Icon.png"
                alt=""
                aria-hidden="true"
                className="h-8 w-8 object-contain"
              />
            </div>
            <div className="mt-auto text-right">
              <p className="text-[24px] font-bold leading-[1.05] text-[#2D1360]">
                فلاي دبي
              </p>
              <a
                href="https://www.flydubai.com/ar-ae/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-3 rounded-full px-2 py-1 text-[16px] font-bold leading-none text-[#7300CD] transition-colors hover:bg-[#e3cff3]"
              >
                موقع الحجز
                <span aria-hidden="true" className="text-[24px]">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* الكرت الثاني: العربية للطيران */}
          <div className="flex h-[150px] w-full flex-col rounded-2xl border border-[#E4E4E4] bg-[#F8F8F8] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-start">
              <img
                src="/assets/Getting-here-and-around/Icon.png"
                alt=""
                aria-hidden="true"
                className="h-8 w-8 object-contain"
              />
            </div>
            <div className="mt-auto text-right">
              <p className="text-[24px] font-bold leading-[1.05] text-[#2D1360]">
                العربية للطيران
              </p>
              <a
                href="https://www.airarabia.com/ar"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-3 rounded-full px-2 py-1 text-[16px] font-bold leading-none text-[#7300CD] transition-colors hover:bg-[#e3cff3]"
              >
                موقع الحجز
                <span aria-hidden="true" className="text-[24px]">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* الكرت الثالث: النيل للطيران */}
          <div className="flex h-[150px] w-full flex-col rounded-2xl border border-[#E4E4E4] bg-[#F8F8F8] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-start">
              <img
                src="/assets/Getting-here-and-around/Icon.png"
                alt=""
                aria-hidden="true"
                className="h-8 w-8 object-contain"
              />
            </div>
            <div className="mt-auto text-right">
              <p className="text-[24px] font-bold leading-[1.05] text-[#2D1360]">
                النيل للطيران
              </p>
              <a
                href="https://www.nileair.com/ar"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-3 rounded-full px-2 py-1 text-[16px] font-bold leading-none text-[#7300CD] transition-colors hover:bg-[#e3cff3]"
              >
                موقع الحجز
                <span aria-hidden="true" className="text-[24px]">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* الكرت الرابع: إير كايرو */}
          <div className="flex h-[150px] w-full flex-col rounded-2xl border border-[#E4E4E4] bg-[#F8F8F8] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-start">
              <img
                src="/assets/Getting-here-and-around/Icon.png"
                alt=""
                aria-hidden="true"
                className="h-8 w-8 object-contain"
              />
            </div>
            <div className="mt-auto text-right">
              <p className="text-[24px] font-bold leading-[1.05] text-[#2D1360]">
                إير كايرو
              </p>
              <a
                href="https://aircairo.com/ar-sa/homepage"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-3 rounded-full px-2 py-1 text-[16px] font-bold leading-none text-[#7300CD] transition-colors hover:bg-[#e3cff3]"
              >
                موقع الحجز
                <span aria-hidden="true" className="text-[24px]">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
