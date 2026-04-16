const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

const GOOGLE_MAPS_VIEW_URL =
  "https://www.google.com/maps/search/?api=1&query=%D9%82%D8%B5%D9%88%D8%B1%20%D8%A2%D9%84%20%D8%A3%D8%A8%D9%88%20%D8%B3%D8%B1%D8%A7%D8%AD";
const GOOGLE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=%D9%82%D8%B5%D9%88%D8%B1%20%D8%A2%D9%84%20%D8%A3%D8%A8%D9%88%20%D8%B3%D8%B1%D8%A7%D8%AD";

const AttractionsMapSection = () => {
  return (
    <section className="w-full bg-white py-12" dir="rtl">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        <h2
          className="mb-6 text-center text-[42px] font-bold leading-[119%] text-[#280048]"
          style={{ fontFamily: ara }}
        >
          مشاهدة قصور آل أبو سراح على الخريطة
        </h2>

        <div className="mx-auto h-[468px] w-full max-w-[1437px] overflow-hidden rounded-[14px] border border-[#EEE6F8] shadow-[0_20px_50px_rgba(41,72,152,0.08)]">
          <img
            src="/assets/attractions/attractions-map-placeholder.svg"
            alt="خريطة قصور آل أبو سراح"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <a
            href={GOOGLE_MAPS_VIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border border-[#280048] px-5 py-2 text-[14px] font-bold text-[#280048] hover:bg-[#F7F2FF]"
            style={{ fontFamily: ibm }}
          >
            فتح الموقع في خرائط Google
          </a>
          <a
            href={GOOGLE_MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-[#280048] px-5 py-2 text-[14px] font-bold text-white hover:opacity-90"
            style={{ fontFamily: ibm }}
          >
            عرض الاتجاهات
          </a>
        </div>
      </div>
    </section>
  );
};

export default AttractionsMapSection;
