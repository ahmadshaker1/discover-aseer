import Link from "next/link";

const PlannerBreadcrumb = () => {
  return (
    <div className="w-full px-4 pb-8 pt-8 sm:px-6 sm:pb-12 sm:pt-10 md:pb-16 md:pt-12 lg:px-8">
      <div className="container mx-auto">
        {/* Breadcrumb - Centered */}
        <div className="flex items-center justify-center text-gray-400 text-sm sm:text-base font-medium mb-6 sm:mb-8">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            الصفحة الرئيسية
          </Link>
          <span className="mx-2 text-gray-500">{" › "}</span>
          <span className="text-gray-400">خطط مسار رحلتك</span>
        </div>

        {/* Main Title - Centered, Big Text */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-black">
            خطط مسار رحلتك
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PlannerBreadcrumb;
