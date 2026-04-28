import Link from "next/link";
import Image from "next/image";
import AseerLogo from "../Logo/AseerLogo";
import {
  XIcon,
  YouTubeIcon,
  InstagramIcon,
} from "./Icons";

const ara = "var(--font-ara-hamah-1964), sans-serif";

const SnapchatIcon = () => (
  <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      d="M9.87076 18.764C8.68076 18.764 7.88676 18.203 7.17776 17.708C6.67476 17.351 6.20176 17.012 5.64476 16.918C5.37956 16.8724 5.11085 16.8503 4.84176 16.852C4.36976 16.852 3.99476 16.923 3.72776 16.977C3.55776 17.007 3.41576 17.035 3.30376 17.035C3.18776 17.035 3.04076 17.003 2.98376 16.807C2.93376 16.647 2.90276 16.495 2.87176 16.348C2.79176 15.978 2.72476 15.751 2.58576 15.728C1.09676 15.501 0.205758 15.158 0.0317585 14.752C0.0177585 14.708 0.000758328 14.662 0.000758328 14.627C-0.00924167 14.502 0.0807585 14.4 0.205758 14.377C1.38676 14.181 2.44776 13.553 3.34376 12.519C4.03976 11.716 4.37876 10.94 4.40976 10.856C4.40976 10.846 4.41876 10.846 4.41876 10.846C4.58876 10.495 4.62376 10.196 4.52076 9.951C4.32976 9.491 3.69576 9.295 3.26376 9.161C3.15276 9.131 3.05876 9.095 2.97876 9.068C2.60876 8.921 1.99276 8.608 2.07376 8.176C2.13176 7.864 2.54576 7.641 2.88476 7.641C2.97876 7.641 3.05876 7.655 3.12476 7.691C3.50476 7.864 3.84776 7.953 4.14176 7.953C4.50776 7.953 4.68176 7.815 4.72576 7.771C4.71645 7.5732 4.70478 7.37552 4.69076 7.178C4.60076 5.813 4.49876 4.119 4.93076 3.148C6.22876 0.241 8.98376 0.0079999 9.79976 0.0079999L10.1558 0H10.2058C11.0208 0 13.7758 0.227 15.0738 3.139C15.5108 4.11 15.4038 5.809 15.3138 7.169L15.3058 7.236C15.2958 7.418 15.2828 7.592 15.2738 7.771C15.3188 7.806 15.4788 7.94 15.8088 7.944C16.0948 7.936 16.4068 7.842 16.7628 7.681C16.8613 7.63839 16.9674 7.61595 17.0748 7.615C17.1998 7.615 17.3248 7.645 17.4318 7.681H17.4408C17.7398 7.793 17.9358 8.002 17.9358 8.221C17.9448 8.426 17.7838 8.738 17.0218 9.046C16.9418 9.076 16.8478 9.113 16.7368 9.139C16.3128 9.269 15.6798 9.474 15.4788 9.929C15.3678 10.169 15.4128 10.477 15.5818 10.824C15.5818 10.834 15.5908 10.834 15.5908 10.834C15.6398 10.958 16.9278 13.883 19.7948 14.36C19.8534 14.3699 19.9064 14.4006 19.9441 14.4466C19.9818 14.4926 20.0016 14.5506 19.9998 14.61C19.9998 14.654 19.9908 14.699 19.9688 14.739C19.7948 15.149 18.9118 15.483 17.4138 15.715C17.2758 15.737 17.2088 15.965 17.1288 16.335C17.0967 16.4892 17.0594 16.6423 17.0168 16.794C16.9728 16.941 16.8788 17.021 16.7188 17.021H16.6958C16.5938 17.021 16.4558 17.008 16.2728 16.972C15.9063 16.8939 15.5325 16.855 15.1578 16.856C14.8948 16.856 14.6228 16.879 14.3558 16.923C13.8028 17.013 13.3258 17.356 12.8218 17.713C12.1048 18.203 11.3068 18.764 10.1248 18.764H9.87076Z"
      fill="currentColor"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      d="M0.00401338 20L1.35601 15.032C0.465151 13.5049 -0.00289063 11.768 1.34322e-05 10C1.34322e-05 4.477 4.47701 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C8.23279 20.0029 6.49667 19.5352 4.97001 18.645L0.00401338 20ZM6.39101 5.308C6.26188 5.31602 6.13569 5.35003 6.02001 5.408C5.91153 5.46943 5.81251 5.54622 5.72601 5.636C5.60601 5.749 5.53801 5.847 5.46501 5.942C5.09542 6.423 4.89662 7.01342 4.90001 7.62C4.90201 8.11 5.03001 8.587 5.23001 9.033C5.63901 9.935 6.31201 10.89 7.20101 11.775C7.41501 11.988 7.62401 12.202 7.84901 12.401C8.9524 13.3725 10.2673 14.073 11.689 14.447L12.258 14.534C12.443 14.544 12.628 14.53 12.814 14.521C13.1053 14.506 13.3896 14.4271 13.647 14.29C13.813 14.202 13.891 14.158 14.03 14.07C14.03 14.07 14.073 14.042 14.155 13.98C14.29 13.88 14.373 13.809 14.485 13.692C14.568 13.606 14.64 13.505 14.695 13.39C14.773 13.227 14.851 12.916 14.883 12.657C14.907 12.459 14.9 12.351 14.897 12.284C14.893 12.177 14.804 12.066 14.707 12.019L14.125 11.758C14.125 11.758 13.255 11.379 12.724 11.137C12.668 11.1126 12.608 11.0987 12.547 11.096C12.4786 11.089 12.4095 11.0967 12.3443 11.1186C12.2791 11.1405 12.2193 11.1761 12.169 11.223V11.221C12.164 11.221 12.097 11.278 11.374 12.154C11.3325 12.2098 11.2754 12.2519 11.2098 12.2751C11.1443 12.2982 11.0733 12.3013 11.006 12.284C10.9409 12.2666 10.877 12.2445 10.815 12.218C10.691 12.166 10.648 12.146 10.563 12.109L10.558 12.107C9.98592 11.8572 9.45624 11.5198 8.98801 11.107C8.86201 10.997 8.74501 10.877 8.62501 10.761C8.23159 10.3842 7.88873 9.95801 7.60501 9.493L7.54601 9.398C7.50364 9.33416 7.46937 9.2653 7.44401 9.193C7.40601 9.046 7.50501 8.928 7.50501 8.928C7.50501 8.928 7.74801 8.662 7.86101 8.518C7.9551 8.39832 8.04289 8.27382 8.12401 8.145C8.24201 7.955 8.27901 7.76 8.21701 7.609C7.93701 6.925 7.64701 6.244 7.34901 5.568C7.29001 5.434 7.11501 5.338 6.95601 5.319C6.90201 5.313 6.84801 5.307 6.79401 5.303C6.65972 5.29633 6.52515 5.29766 6.39101 5.307V5.308Z"
      fill="currentColor"
    />
  </svg>
);

const TiktokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      d="M16.5 4C16.7 5.4 17.5 6.5 18.8 7.1C19.4 7.4 20.1 7.6 20.8 7.6V10.4C19.4 10.4 18 10 16.8 9.2V15.2C16.8 18.1 14.5 20.4 11.6 20.4C8.7 20.4 6.4 18.1 6.4 15.2C6.4 12.3 8.7 10 11.6 10C11.9 10 12.2 10 12.4 10.1V13C12.2 12.9 11.9 12.8 11.6 12.8C10.3 12.8 9.2 13.9 9.2 15.2C9.2 16.5 10.3 17.6 11.6 17.6C12.9 17.6 14 16.5 14 15.2V4H16.5Z"
      fill="currentColor"
    />
  </svg>
);

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
          <div className="h-auto pb-6 lg:h-[344px] lg:pb-0">
            <div
              className="grid h-full grid-cols-1 gap-8 text-right sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
              dir="ltr"
            >
              {/* Column 1 */}
              <div className="flex items-start justify-end gap-4 lg:order-4" dir="ltr">
                <ul className="flex h-[175px] w-[175px] flex-col items-end text-right text-[18px] font-bold leading-[197%]" style={{ fontFamily: ara }} dir="rtl">
                  <li className="w-full text-right"><Link href="/destinations" className="inline-block w-full text-right hover:opacity-80">الوجهات الرئيسية</Link></li>
                  <li className="w-full text-right"><Link href="/attractions" className="inline-block w-full text-right hover:opacity-80">المعالم السياحية</Link></li>
                  <li className="w-full text-right"><Link href="/experiences" className="inline-block w-full text-right hover:opacity-80">التجارب السياحية</Link></li>
                  <li className="w-full text-right"><Link href="/aseer-cuisine" className="inline-block w-full text-right hover:opacity-80">المطبخ العسيري</Link></li>
                  <li className="w-full text-right"><Link href="/aseer-community" className="inline-block w-full text-right hover:opacity-80">مجتمع عسير</Link></li>
                  <li className="w-full text-right"><Link href="/event-seasons" className="inline-block w-full text-right hover:opacity-80">المواسم و الفعاليات</Link></li>
                </ul>
                <h3 className="min-w-max text-right text-[14px] font-bold leading-[110%] text-[#FFFFFFCC]" style={{ fontFamily: ara }}>
                  اكتشف عسير
                </h3>
              </div>

              {/* Column 2 */}
              <div className="flex items-start justify-end gap-4 lg:order-3" dir="ltr">
                <ul className="flex h-[175px] w-[175px] flex-col items-end text-right text-[18px] font-bold leading-[197%]" style={{ fontFamily: ara }} dir="rtl">
                  <li className="w-full text-right"><Link href="/planner" className="inline-block w-full text-right hover:opacity-80">صمم رحلتك</Link></li>
                  <li className="w-full text-right"><Link href="/accommodation" className="inline-block w-full text-right hover:opacity-80">أماكن الإقامة</Link></li>
                  <li className="w-full text-right"><Link href="/restaurants" className="inline-block w-full text-right hover:opacity-80">المطاعم</Link></li>
                  <li className="w-full text-right"><Link href="/tour-guides" className="inline-block w-full text-right hover:opacity-80">المرشدين السياحيين</Link></li>
                  <li className="w-full text-right"><Link href="/travel-tips" className="inline-block w-full text-right hover:opacity-80">الوصول و التجول</Link></li>
                </ul>
                <h3 className="min-w-max text-right text-[14px] font-bold leading-[110%] text-[#FFFFFFCC]" style={{ fontFamily: ara }}>
                  خطط رحلتك
                </h3>
              </div>

              {/* Column 3 */}
              <div className="flex items-start justify-end gap-4 lg:order-2" dir="ltr">
                <ul className="flex h-[175px] w-[175px] flex-col items-end text-right text-[18px] font-bold leading-[197%]" style={{ fontFamily: ara }} dir="rtl">
                  <li className="w-full text-right"><Link href="/about-aseer" className="inline-block w-full text-right hover:opacity-80">اكتشف عسير</Link></li>
                  <li className="w-full text-right"><Link href="/activities" className="inline-block w-full whitespace-nowrap text-right hover:opacity-80">دليل الأنشطة الخارجية</Link></li>
                </ul>
                <h3 className="min-w-max text-right text-[14px] font-bold leading-[110%] text-[#FFFFFFCC]" style={{ fontFamily: ara }}>
                  كتيبات
                </h3>
              </div>

              {/* Column 4 */}
              <div className="flex flex-col items-end gap-4 text-right lg:order-1">
                <h3 className="text-right text-[14px] font-bold leading-[110%] text-[#FFFFFFCC]" style={{ fontFamily: ara }}>
                  التواصل
                </h3>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/services-support"
                    className="text-right text-[18px] font-bold leading-[197%] hover:opacity-80"
                  >
                    تواصل معنا
                  </Link>
                  <div className="text-sm text-white/80">مركز الاتصال الدولي</div>
                  <a href="tel:+9669200000890" className="text-lg hover:opacity-80" dir="ltr">
                    +966 9200000890
                  </a>
                  <div className="text-xs text-white/70">تابعنا في وسائل التواصل الاجتماعية</div>
                  <div className="flex w-full flex-row items-center justify-end gap-3 text-right" dir="ltr">
                    <a href="#" className="text-white hover:opacity-80 transition-opacity" aria-label="X (Twitter)">
                      <XIcon />
                    </a>
                    <a href="#" className="text-white hover:opacity-80 transition-opacity" aria-label="Snapchat">
                      <SnapchatIcon />
                    </a>
                    <a href="#" className="text-white hover:opacity-80 transition-opacity" aria-label="WhatsApp">
                      <WhatsAppIcon />
                    </a>
                    <a href="#" className="text-white hover:opacity-80 transition-opacity" aria-label="TikTok">
                      <TiktokIcon />
                    </a>
                    <a href="#" className="text-white hover:opacity-80 transition-opacity" aria-label="YouTube">
                      <YouTubeIcon />
                    </a>
                    <a href="#" className="text-white hover:opacity-80 transition-opacity" aria-label="Instagram">
                      <InstagramIcon />
                    </a>
                  </div>
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
                className="flex h-[39px] w-[168px] items-center justify-center rounded-[44px] border border-white px-4 text-center text-[18px] font-bold leading-[119%] text-white"
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
