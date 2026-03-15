import Link from "next/link";
import { Button } from "@headlessui/react";

const EventsBanner = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-[75vh] w-screen overflow-hidden"
      style={{
        backgroundImage: `url('/assets/events/banner/image.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay pattern - similar to the geometric pattern in the image */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.1) 20px
          )`,
        }}
      ></div>

      {/* Main content - centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-48">
        {/* Breadcrumb navigation */}
        <div className="flex items-center space-x-2 text-white text-base font-medium mb-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            الصفحة الرئيسية
          </Link>
          <span className="mx-2">{" > "}</span>
          <span>المواسم والفعاليات</span>
        </div>

        {/* Main title */}
        <h1 className="text-7xl font-bold text-white mb-6">
          المواسم والفعاليات
        </h1>

        {/* Description */}
        <p className="text-2xl font-medium text-white max-w-4xl leading-relaxed mb-8">
          فعاليات فنية وثقافية وشعبية وتجارب بيئية ورياضية ضمن أنشطة وتجارب أخرى
          صممت لجميع الاهتمامات على مدار العام.
        </p>

        {/* Call-to-action button */}
        <Button className="px-8 py-4 bg-[#7300CD] hover:bg-[#6027D2] text-white font-medium rounded-3xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          أضف فعاليتك
        </Button>
      </div>
    </div>
  );
};

export default EventsBanner;
