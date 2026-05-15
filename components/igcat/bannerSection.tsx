export default function IGCatBannerSection() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* 1. الصورة الخلفية */}
      <img
        src="/assets/igcat/banner.png"
        alt="عسير منطقة طهي"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 2. الطبقة الشفافة (عشان يبرز النص) */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 3. المحتوى (النص والزر) */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <h1 className="text-white text-[40px] md:text-[56px] font-bold mb-6 leading-[1.2]">
          عسير منطقة طهي
          <br />
          عالمية 2024
        </h1>
        <div>
          <button
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-start text-[20px] leading-[36px] tracking-[0] align-middle text-primary-foreground transition-opacity hover:opacity-90"
            style={{ fontFamily: "Ara Hamah 1964 B" }}
          >
            اكتشف
            <span>
              <img
                src="/assets/igcat/Vector (2).png"
                alt=""
                aria-hidden="true"
                className="inline-block h-4 w-4"
              />
            </span>
          </button>
        </div>

        {/* هنا تقدر تضيف اللوجوهات أو الأيقونات اللي تحت الزر */}
        <div className="flex items-center gap-4 mt-4">
          <img
            src="/assets/igcat/culinary.png"
            className="h-20"
            alt="Culinary icon"
          />
          <img
            src="/assets/igcat/award.png"
            className="h-20"
            alt="IGCAT award"
          />
        </div>
      </div>
    </div>
  );
}
