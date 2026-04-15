import Link from "next/link";
import AseerLogo from "../Logo/AseerLogo";
import PoweredByLogo from "./PoweredByLogo";
import {
  XIcon,
  LinkedInIcon,
  YouTubeIcon,
  FacebookIcon,
  InstagramIcon,
} from "./Icons";

const Footer = () => {
  return (
    <footer className="bg-[#280048] text-white w-full">
      {/* Top Section */}
      <div className="border-b border-white/20 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
          {/* Logo - Right side in RTL */}
          <div className="w-full lg:w-auto px-0 lg:px-4 h-full border-b lg:border-b-0 lg:border-l border-white pb-4 lg:pb-0">
            <AseerLogo />
          </div>

          {/* Connect With Us - Middle Left */}
          <div className="flex flex-col gap-3 flex-1 w-full lg:w-auto">
            <h3 className="text-sm sm:text-base font-semibold">تواصل معنا</h3>
            <div className="flex flex-row items-center gap-3 sm:gap-4">
              <a
                href="#"
                className="text-white hover:opacity-80 transition-opacity"
                aria-label="X (Twitter)"
              >
                <XIcon />
              </a>
              <a
                href="#"
                className="text-white hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="#"
                className="text-white hover:opacity-80 transition-opacity"
                aria-label="YouTube"
              >
                <YouTubeIcon />
              </a>
              <a
                href="#"
                className="text-white hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                className="text-white hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Call Center - Middle Right */}
          <div className="flex flex-col gap-3 flex-1 w-full lg:w-auto">
            <h3 className="text-sm sm:text-base font-semibold">مركز الاتصال</h3>
            <div className="flex flex-col gap-1">
              <a
                href="tel:+9669200000890"
                className="text-white hover:opacity-80 transition-opacity text-right text-sm sm:text-base"
                dir="ltr"
              >
                +966 9200000890
              </a>
              <Link
                href="#"
                className="text-white hover:opacity-80 transition-opacity text-xs sm:text-sm"
              >
                مركز الاتصال الدولي
              </Link>
            </div>
          </div>

          {/* Powered by - Left side in RTL */}
          <div className="flex flex-col gap-3 flex-shrink-0 w-full lg:w-auto">
            <h3 className="text-sm sm:text-base font-semibold">مدعوم من</h3>
            <PoweredByLogo />
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="border-b border-white/20 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Column 1 - Discover Aseer */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-sm sm:text-base font-semibold">اكتشف عسير</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  عن عسير
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  الوجهات
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  المعالم السياحية
                </Link>
              </li>
              <li>
                <Link
                  href="/experiences"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  التجارب
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  المطبخ العسيري
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  مجتمعنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Plan Your Trip */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-sm sm:text-base font-semibold">خطط لرحلتك</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  الإقامة
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  المطاعم
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  رحلات موصى بها
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  المرشدون السياحيون
                </Link>
              </li>
              <li>
                <Link
                  href="/services-support"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  الخدمات المساندة
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  معلومات أساسية
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Seasons and Events */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-sm sm:text-base font-semibold">
              المواسم والفعاليات
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  فعاليات رمضان
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  فعاليات العيد
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  موسم الجاكراندا
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  موسم عسير الصيفي
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  موسم عسير الشتوي
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact us and Newsletter */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Contact us */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <h3 className="text-sm sm:text-base font-semibold">اتصل بنا</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="#"
                    className="text-white/90 hover:text-white transition-colors text-sm"
                  >
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/90 hover:text-white transition-colors text-sm"
                  >
                    تسجيل المرشد السياحي
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/90 hover:text-white transition-colors text-sm"
                  >
                    تسجيل دخول المرشد السياحي
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm sm:text-base font-semibold">
                النشرة الإخبارية
              </h3>
              <p className="text-white/90 text-xs sm:text-sm">
                اشترك في نشرتنا الإخبارية للاطلاع على المزيد من العروض الخاصة
                والخصومات.
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="مثال @email.com"
                  className="bg-[#7300CD21] border border-white/30 rounded-full px-4 py-2 text-white placeholder:text-white/60 focus:outline-none focus:border-white/60 transition-colors text-sm flex-1"
                />
                <button
                  type="submit"
                  className="bg-white text-[#2a1a3d] rounded-full px-4 py-2 font-medium hover:opacity-90 transition-opacity text-sm sm:text-base whitespace-nowrap"
                >
                  اشترك
                </button>
              </form>
            </div>
          </div>

          {/* Column 5 - Utilities */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-sm sm:text-base font-semibold">الأدوات</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/about-aseer"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  عن عسير
                </Link>
              </li>
              <li>
                <Link
                  href="/aseer-community"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  مجتمع عسير
                </Link>
              </li>
              <li>
                <Link
                  href="/travel-tips"
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  معلومات أساسية
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Copyright */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 py-4 sm:py-6">
        <p className="text-center text-white text-xs sm:text-sm">
          عسير @ 2026. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
