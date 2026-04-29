import Link from "next/link";
import Image from "next/image";
import AseerLogo from "../Logo/AseerLogo";
import {
  XIcon,
  YouTubeIcon,
  InstagramIcon,
  SnapchatIcon,
  WhatsAppIcon,
  TiktokIcon,
  BookletSmallArrowIcon,
} from "./Icons";

const ara = "var(--font-ara-hamah-1964), sans-serif";

const Footer = () => {
  return (
    <footer className="w-full bg-[linear-gradient(359.31deg,#280048_43.01%,#3B016B_99.52%)] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-8 md:px-16 lg:h-[647px] lg:px-[130px]">
        <div className="flex h-full w-full flex-col gap-8 lg:h-[562px]">
          {/* Section 1 */}
          <div className="h-auto border-b border-white/20 lg:h-[122px]">
            <div className="flex h-full w-full items-center justify-between py-5">
              <div className="flex h-[82px] w-[295px] items-start gap-3">
                <div className="flex h-[82px] w-[100px] flex-col items-start gap-4">
                  <p className="text-right text-[16px] font-bold leading-[110%]">
                    مشغل بواسطة
                  </p>
                  <Image
                    src="/assets/footer/powerd-by.png"
                    alt="مشغل بواسطة"
                    width={100}
                    height={48}
                    className="h-[48px] w-[100px] object-contain"
                  />
                </div>
              </div>

              <div className="h-[60.92px] w-[151.62px]">
                <AseerLogo />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="h-auto pb-6 lg:h-[344px] lg:pb-0" dir="rtl">
            <div
              className="grid h-full grid-cols-1 gap-8 text-right sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
              dir="rtl"
            >   {/* اكتشف عسير */}
              <div className="flex w-full justify-self-start flex-col items-end text-right" dir="rtl">
                <h3 className="w-full text-right text-[14px] font-bold leading-[110%] text-white/80" style={{ fontFamily: ara }}>
                  اكتشف عسير
                </h3>

                <div className="flex w-full flex-col items-end text-[18px] font-bold leading-[197%]" style={{ fontFamily: ara }} dir="rtl">
                  <Link href="/destinations" dir="rtl" className="block w-full text-right hover:opacity-80">الوجهات الرئيسية</Link>
                  <Link href="/attractions" dir="rtl" className="block w-full text-right hover:opacity-80">المعالم السياحية</Link>
                  <Link href="/experiences" dir="rtl" className="block w-full text-right hover:opacity-80">التجارب السياحية</Link>
                  <Link href="/aseer-cuisine" dir="rtl" className="block w-full text-right hover:opacity-80">المطبخ العسيري</Link>
                  <Link href="/aseer-community" dir="rtl" className="block w-full text-right hover:opacity-80">مجتمع عسير</Link>
                  <Link href="/event-seasons" dir="rtl" className="mt-4 block w-full text-right hover:opacity-80">المواسم و الفعاليات</Link>
                </div>
              </div>

              {/* خطط لرحلتك */}
              <div className="flex w-full justify-self-start flex-col items-end text-right" dir="rtl">
                <h3 className="w-full text-right text-[14px] font-bold leading-[110%] text-white/80" style={{ fontFamily: ara }}>
                  خطط لرحلتك
                </h3>

                <div className="flex w-full flex-col items-end text-[18px] font-bold leading-[197%]" style={{ fontFamily: ara }} dir="rtl">
                  <Link href="/planner" dir="rtl" className="block w-full text-right hover:opacity-80">صمم رحلتك</Link>
                  <Link href="/accommodation" dir="rtl" className="block w-full text-right hover:opacity-80">أماكن الإقامة</Link>
                  <Link href="/restaurants" dir="rtl" className="block w-full text-right hover:opacity-80">المطاعم</Link>
                  <Link href="/tour-guides" dir="rtl" className="block w-full text-right hover:opacity-80">المرشدين السياحيين</Link>
                  <Link href="/travel-tips" dir="rtl" className="block w-full text-right hover:opacity-80">الوصول و التجول</Link>
                </div>
              </div>

              {/* كتيبات */}
              <div className="flex w-full justify-self-start flex-col items-end text-right" dir="rtl">
                <h3 className="w-full text-right text-[14px] font-bold leading-[110%] text-white/80" style={{ fontFamily: ara }}>
                  كتيبات
                </h3>

                <div className="flex w-full flex-col items-end text-[18px] font-bold leading-[197%]" style={{ fontFamily: ara }} dir="rtl">
                  <Link href="/about-aseer" dir="rtl" className="block w-full text-right hover:opacity-80">
                    <span className="inline-flex items-center gap-1 whitespace-nowrap" dir="rtl">
                      <span
                        className="text-right text-[18px] font-bold leading-[197%]"
                        style={{ fontFamily: ara }}
                      >
                        اكتشف عسير
                      </span>
                      <BookletSmallArrowIcon />
                    </span>
                  </Link>

                  <Link href="/activities" dir="rtl" className="block w-full text-right hover:opacity-80">
                    <span className="inline-flex items-center gap-1 whitespace-nowrap" dir="rtl">
                      <span
                        className="text-right text-[18px] font-bold leading-[197%]"
                        style={{ fontFamily: ara }}
                      >
                        دليل الأنشطة الخارجية
                      </span>
                      <BookletSmallArrowIcon />
                    </span>
                  </Link>
                </div>
              </div>

              {/* التواصل */}
              <div className="flex w-full justify-self-start flex-col items-end gap-4 text-right" dir="rtl" >
                <h3 className="w-full text-right text-[14px] font-bold leading-[110%] text-white/80" style={{ fontFamily: ara }}>
                  التواصل
                </h3>

                <Link href="/services-support" className="block w-full text-right text-[18px] font-bold leading-[197%] hover:opacity-80" style={{ fontFamily: ara }}>
                  تواصل معنا
                </Link>

                <div className="w-full text-right text-sm text-white/80" style={{ fontFamily: ara }}>
                  مركز الاتصال الدولي
                </div>

                <a href="tel:+9669200000890" dir="ltr" className="block w-full text-right text-lg hover:opacity-80">
                  +966 9200000890
                </a>

                <div className="w-full text-right text-xs text-white/70" style={{ fontFamily: ara }}>
                  تابعنا في وسائل التواصل الاجتماعية
                </div>

                <div className="flex w-full flex-row items-center justify-end gap-3" dir="ltr">
                  <a href="#" className="text-white transition-opacity hover:opacity-80" aria-label="X"><XIcon /></a>
                  <a href="#" className="text-white transition-opacity hover:opacity-80" aria-label="Snapchat"><SnapchatIcon /></a>
                  <a href="#" className="text-white transition-opacity hover:opacity-80" aria-label="WhatsApp"><WhatsAppIcon /></a>
                  <a href="#" className="text-white transition-opacity hover:opacity-80" aria-label="TikTok"><TiktokIcon /></a>
                  <a href="#" className="text-white transition-opacity hover:opacity-80" aria-label="YouTube"><YouTubeIcon /></a>
                  <a href="#" className="text-white transition-opacity hover:opacity-80" aria-label="Instagram"><InstagramIcon /></a>
                </div>
              </div>
            </div>
          </div>
          {/* Section 3 */}
          <div className="mx-auto w-full max-w-[1180px]">
            <div className="flex w-full items-center justify-between gap-4" dir="ltr">
              {/* Left block */}
              <div className="flex w-full max-w-[589px] items-center justify-between gap-4">
                {/* Input + button */}
                <div className="flex w-full max-w-[397px] items-center gap-3">
                  <button
                    type="button"
                    className="flex h-[51px] w-[102px] items-center justify-center rounded-[100px] bg-white px-8 py-[21px] text-[19px] font-bold leading-[119%] text-[#280048]"
                    style={{ fontFamily: ara }}
                  >
                    اشترك
                  </button>
                  <input
                    type="email"
                    placeholder="Example @email.com"
                    className="h-[52px] w-[283px] rounded-[100px] bg-[#7300CD29] px-6 py-[22px] text-[12px] font-medium leading-[119%] text-white placeholder:text-white/45 focus:outline-none"
                    style={{ fontFamily: "KoningDisplay Trial, sans-serif" }}
                  />
                </div>

                {/* Newsletter text */}
                <div className="flex h-[79px] w-[138px] flex-col items-end gap-4 text-right">
                  <p className="h-[18px] w-[100px] text-right text-[16px] font-bold leading-[110%]" style={{ fontFamily: ara }}>
                    النشرة البريدية
                  </p>
                  <p className="h-[45px] w-[138px] text-right text-[10px] font-normal leading-[100%] text-white">
                    اشترك في النشرة البريدية لدينا لمعرفة المزيد عن العروض الخصومات الخاصة.
                  </p>
                </div>
              </div>

              {/* Middle block */}
              <div className="flex h-[79px] w-[231px] flex-col items-end gap-3 text-right">
                <p className="h-[18px] w-[231px] text-right text-[16px] font-bold leading-[110%] text-white" style={{ fontFamily: ara }}>
                  عضو في
                </p>
                <div className="flex h-[34px] w-[231px] items-center justify-between gap-4" dir="ltr">
                  <Image
                    src="/assets/footer/UN-tourism.png"
                    alt="UN Tourism"
                    width={36}
                    height={34}
                    className="h-[34px] w-[36px] object-contain brightness-0 invert"
                  />
                  <Image
                    src="/assets/footer/PATA.png"
                    alt="PATA"
                    width={63}
                    height={34}
                    className="h-[34px] w-[63px] object-contain"
                  />
                  <Image
                    src="/assets/footer/GSTC.png"
                    alt="GSTC"
                    width={100}
                    height={34}
                    className="h-[34px] w-[100px] object-contain"
                  />
                </div>
              </div>

              {/* Right button */}
              <Link
                href="/tour-guides"
                className="flex h-[39px] w-[168px] items-center justify-center whitespace-nowrap rounded-[44px] border border-white px-4 text-center text-[18px] font-bold leading-[119%] text-white"
                style={{ fontFamily: ara }}
              >
                تسجيل/دخول المرشدين
              </Link>
            </div>

            {/* Copyright row below single divider */}
            <div className="mt-4 border-t border-white/20 pt-4">
              <div className="flex w-full justify-start" dir="ltr">
                <div className="flex h-[20px] w-[237px] items-center gap-6 text-[13px] font-bold leading-[150%]" style={{ fontFamily: ara }}>
                  <span className="whitespace-nowrap">Aseer @ 2026. All rights reserved.</span>
                  <Link href="#" className="whitespace-nowrap hover:opacity-80">
                    سياسة الخصوصية
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
