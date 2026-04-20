import Image from "next/image";
export default function TravelLandSection() {
  return (
    <section dir="rtl" className="py-12 text-right">
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
      <div className="container mx-auto px-6 mb-12" dir="rtl">
        {/* العنوان */}
        <div className="border-b border-[#E4E4E4] pb-4 pt-6 mb-6">
          <h2 className="text-[32px] sm:text-[40px] font-bold text-black text-right">
            السفر برا
          </h2>
        </div>

        {/* الوصف (محدد العرض عشان يجي على اليمين زي الصورة) */}
        <div className="mb-8 flex justify-start">
          <p className="text-[16px] sm:text-[18px] leading-[1.6] text-[#333] text-right max-w-2xl">
            القيادة إلى عسير هي رحلة عبر تضاريس متغيرة. من السهول الساحلية إلى
            المرتفعات الشاهقة، الطرق مجهزة بشكل جيد وتوفر إطلالات لا مثيل لها.
          </p>
        </div>

        {/* القسم السفلي: شبكة من عمودين */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* العمود الأيمن (قائمة المسافات) */}
          <div className="flex flex-col gap-4">
            {/* الرياض */}
            <div className="flex items-center justify-between bg-[#F8F8F8] rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EFE6F7] text-[#7300CD]">
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
                <div className="text-right">
                  <p className="text-[14px] text-gray-500 mb-0.5">من الرياض</p>
                  <p className="text-[18px] font-bold text-black">950 كم</p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-[18px] font-bold text-black">9-10 ساعات</p>
              </div>
            </div>

            {/* جدة */}
            <div className="flex items-center justify-between bg-[#F8F8F8] rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EFE6F7] text-[#7300CD]">
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
                <div className="text-right">
                  <p className="text-[14px] text-gray-500 mb-0.5">من جدة</p>
                  <p className="text-[18px] font-bold text-black">630 كم</p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-[18px] font-bold text-black">6-7 ساعات</p>
              </div>
            </div>

            {/* الدمام */}
            <div className="flex items-center justify-between bg-[#F8F8F8] rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EFE6F7] text-[#7300CD]">
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
                <div className="text-right">
                  <p className="text-[14px] text-gray-500 mb-0.5">من الدمام</p>
                  <p className="text-[18px] font-bold text-black">1,400 كم</p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-[18px] font-bold text-black">13-14 ساعة</p>
              </div>
            </div>
          </div>

          {/* العمود الأيسر (بطاقة سابتكو) */}
          <div className="flex flex-col justify-between rounded-[2rem] bg-[#333036] p-8 shadow-lg ">
            <div>
              <div className="mb-6 flex items-center justify-start gap-3">
                <h3 className="text-[28px] font-bold text-white">
                  حافلات سابتكو
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
              <p className="mb-8 text-right text-[16px] leading-[1.8] text-gray-300">
                استمتع بتجربة سفر مريحة عبر البلاد مع خدمة الحافلات الرائدة في
                المملكة العربية السعودية. توفر سابتكو رحلات منتظمة من جميع المدن
                الرئيسية مباشرة إلى محطة أبها المركزية.
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-start gap-4 mt-auto">
              <a
                href="https://saptco.com.sa/intercity-transport"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl bg-[#FBB03B] px-8 py-3 text-[16px] font-bold text-[#333036] transition hover:bg-[#e59e35]"
              >
                احجز عبر الموقع
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.sat.passenger&hl=ar&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl bg-[#4A474E] px-8 py-3 text-[16px] font-bold text-white transition hover:bg-gray-600"
              >
                تحميل التطبيق
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* قسم التنقل في عسير */}
      <div className="container mx-auto px-6 mb-12" dir="rtl">
        {/* العنوان الرئيسي */}
        <div className="border-b border-[#E4E4E4] pb-4 pt-6 mb-8">
          <h2 className="text-[32px] sm:text-[40px] font-bold text-black text-right">
            التنقل في عسير
          </h2>
        </div>

        {/* محتوى القسم (شبكة من عمودين) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* العمود الأيمن: تاكسي المطار */}
          <div className="relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[2rem] shadow-md group">
            {/* الصورة الخلفية */}
            <img
              src="/assets/Getting-here-and-around/89fb030a28469fcdf2237c498d9867f61d4ab7f0.jpg"
              alt="تاكسي المطار"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* تدرج لوني عشان النص يكون واضح */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

            {/* المحتوى النصي */}
            <div className="relative z-10 p-8 text-right">
              <div className="mb-3 flex justify-end">
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
                تاكسي المطار
              </h3>
              <p className="text-[14px] leading-[1.8] text-gray-200">
                متوفر خارج صالات الوصول. على الرغم من موثوقيتها، قد يكون توفرها
                محدوداً خلال مواسم الذروة السياحية. عادة ما تطبق أسعار ثابتة
                للانتقال إلى المدينة.
              </p>
            </div>
          </div>

          {/* العمود الأيسر: تطبيقات التوصيل */}
          <div className="flex flex-col justify-center rounded-[2rem] border border-[#E4E4E4] bg-white p-8 shadow-sm">
            <h3 className="mb-6 text-right text-[20px] font-bold text-[#333]">
              تطبيقات التوصيل
            </h3>

            {/* شبكة كروت التطبيقات */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* كرت بولت */}
              <div className="flex flex-col items-center justify-between rounded-2xl bg-[#F8F8F8] p-6 transition-all hover:shadow-md">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#2EBA7F] text-[24px] font-bold text-white">
                  B
                </div>
                <p className="mb-4 text-[18px] font-bold text-[#2D1360]">
                  بولت
                </p>
                <a
                  href="https://play.google.com/store/apps/details?id=ee.mtakso.client&hl=ar"
                  target="_blank"
                  className="text-[14px] font-bold text-[#7300CD] hover:underline"
                >
                  تحميل التطبيق
                </a>
              </div>

              {/* كرت كريم */}
              <div className="flex flex-col items-center justify-between rounded-2xl bg-[#F8F8F8] p-6 transition-all hover:shadow-md">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#48D52A] text-[24px] font-bold text-white">
                  C
                </div>
                <p className="mb-4 text-[18px] font-bold text-[#2D1360]">
                  كريم
                </p>
                <a
                  href="https://play.google.com/store/apps/details?id=com.careem.acma&hl=ar"
                  target="_blank"
                  className="text-[14px] font-bold text-[#7300CD] hover:underline"
                >
                  تحميل التطبيق
                </a>
              </div>

              {/* كرت أوبر */}
              <div className="flex flex-col items-center justify-between rounded-2xl bg-[#F8F8F8] p-6 transition-all hover:shadow-md">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-black text-[24px] font-bold text-white">
                  U
                </div>
                <p className="mb-4 text-[18px] font-bold text-[#2D1360]">
                  أوبر
                </p>
                <a
                  href="https://play.google.com/store/apps/details?id=com.ubercab&hl=ar"
                  target="_blank"
                  className="text-[14px] font-bold text-[#7300CD] hover:underline"
                >
                  تحميل التطبيق
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mb-12" dir="rtl">
        {/* ================= قسم تأجير السيارات ================= */}
        <div className="border-b border-[#E4E4E4] pb-4 pt-6 mb-6">
          <h2 className="text-[32px] sm:text-[40px] font-bold text-black text-right">
            تأجير السيارات
          </h2>
        </div>

        <div className="mb-8 flex justify-start">
          <p className="text-[16px] sm:text-[18px] leading-[1.6] text-[#333] text-right max-w-3xl">
            للحصول على حرية مطلقة لاستكشاف القرى الجبلية والمطلات الخفية، يوصى
            بشدة باستئجار سيارة. يعمل العديد من المزودين المحليين والدوليين في
            المطار.
          </p>
        </div>

        {/* كرت ذيب - كرت واحد كما طلبت */}
        <div className="mb-16 flex justify-start">
          <div className="flex w-full md:w-[350px] flex-col rounded-[2rem] bg-[#F8F8F8] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative transition-transform hover:-translate-y-1">
            {/* أيقونة B في اليسار */}
            <div className="absolute top-6 left-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2EBA7F] text-white font-bold">
              B
            </div>

            <div className="mt-8 text-right">
              <h3 className="text-[24px] font-bold text-[#2D1360] mb-6">ذيب</h3>

              {/* رقم الجوال */}
              <div className="flex items-center justify-end gap-3 mb-4 text-[#333] text-[14px] font-medium">
                <span dir="ltr">+966 9200000890</span>
                <svg
                  className="w-5 h-5 text-[#2D1360]"
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
              <div className="flex items-center justify-end gap-3 mb-8 text-[#2D1360] font-bold text-[14px]">
                <span>theeb.sa</span>
                <svg
                  className="w-5 h-5 text-[#2D1360]"
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
                className="text-[14px] font-bold text-[#7300CD] hover:underline flex justify-end"
              >
                تحميل التطبيق
              </a>
            </div>
          </div>
        </div>

        {/* ================= قسم انظر أيضًا ================= */}
        <div className="relative mt-20 mb-8 pt-4">
          {/* عنوان القسم */}
          <div className="relative z-10 border-b border-[#E4E4E4] pb-4 mb-10 flex justify-start items-end">
            <h2 className="text-[32px] sm:text-[40px] font-bold text-black text-right inline-block bg-white pl-6 relative z-10">
              انظر أيضًا
            </h2>
          </div>

          {/* شبكة الكروت السفلية */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* الكرت الأول: متطلبات التأشيرة */}
            <div className="flex flex-col justify-between h-[250px] rounded-[2rem] border border-[#E4E4E4] bg-white p-8 transition-shadow hover:shadow-lg">
              <div className="flex justify-start">
                <Image
                  src="/assets/Getting-here-and-around/evisa-logo-1707824671.png"
                  alt="اختر وجهتك"
                  width={70}
                  height={50}
                />
              </div>
              <h3 className="text-right text-[20px] font-bold text-black">
                متطلبات التأشيرة والدخول
              </h3>
              <div className="flex justify-start">
                <a
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7300CD] text-white transition hover:bg-[#6027D2]"
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
            <div className="flex flex-col justify-between h-[250px] rounded-[2rem] border border-[#E4E4E4] bg-white p-8 transition-shadow hover:shadow-lg">
              <div className="flex justify-start text-[#7300CD]">
                <Image
                  src="/assets/Getting-here-and-around/icon3346.svg"
                  alt="اختر وجهتك"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className="text-right text-[20px] font-bold text-black">
                خطط إقامتك
              </h3>
              <div className="flex justify-start">
                <a
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7300CD] text-white transition hover:bg-[#6027D2]"
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
            <div className="flex flex-col justify-between h-[250px] rounded-[2rem] border border-[#E4E4E4] bg-white p-8 transition-shadow hover:shadow-lg">
              <div className="flex justify-start text-[#7300CD]">
                <Image
                  src="/assets/Getting-here-and-around/Vector.svg"
                  alt="اختر وجهتك"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className="text-right text-[20px] font-bold text-black">
                اختر وجهتك
              </h3>
              <div className="flex justify-start">
                <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7300CD] text-white transition hover:bg-[#6027D2]">
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
