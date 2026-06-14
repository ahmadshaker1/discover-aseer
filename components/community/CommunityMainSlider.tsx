import Image from "next/image";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

export interface CommunitySlide {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface CommunityMainSliderContent {
  // Body heading above the slider.
  sectionTitle: string;
  // Body subtext above the slider.
  sectionSubtitle: string;
  // Previous button label.
  prevLabel: string;
  // Next button label.
  nextLabel: string;
  // Slider dataset from backend/CMS.
  slides: CommunitySlide[];
}

interface CommunityMainSliderProps {
  content: CommunityMainSliderContent;
}

const CommunityMainSlider = ({ content }: CommunityMainSliderProps) => {
  const slides = content.slides;

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 md:px-[60px]">
      {/* Header */}
      <div className="mx-auto mb-16 flex w-full max-w-[760px] flex-col items-center text-center">
        <h2
          className="text-[44px] font-bold leading-[130%] text-foreground mb-4"
          style={{ fontFamily: ara }}
        >
          {content.sectionTitle}
        </h2>
        <p className="text-[20px] font-medium leading-relaxed text-muted-foreground">
          {content.sectionSubtitle}
        </p>
      </div>

      {/* Sections List */}
      <div className="flex flex-col rounded-[20px] p-5 gap-16 md:gap-24 max-w-[1298px] mx-auto">
        {slides.map((slide, index) => {
          const isImageRight = index % 2 === 1;

          return (
            <div
              key={slide.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              {/* Image Container */}
              <div
                className={`relative h-[320px] sm:h-[440px] lg:h-[500px] w-full overflow-hidden rounded-[20px] shadow-lg ${
                  isImageRight ? "md:order-2" : "md:order-1"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>

              {/* Text Container */}
              <div
                className={`flex flex-col justify-center text-start gap-4 ${
                  isImageRight ? "md:order-1" : "md:order-2"
                }`}
              >
                <h3
                  className="text-[28px] sm:text-[36px] font-bold leading-[120%] text-foreground"
                  style={{ fontFamily: ara }}
                >
                  {slide.title}
                </h3>
                <p
                  className="text-[16px] sm:text-[18px] font-normal leading-7 text-muted-foreground"
                  style={{ fontFamily: ibm }}
                >
                  {slide.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CommunityMainSlider;
