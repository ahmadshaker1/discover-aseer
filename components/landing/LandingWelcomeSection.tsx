import Image from "next/image";
import { Link } from "@/i18n/navigation";

const ara = "var(--font-ara-hamah-1964), sans-serif";

const OVERLAY_GRADIENT =
  "linear-gradient(179.52deg, rgba(0, 0, 0, 0) 5.53%, #000000 99.58%)";

type LocalizedLandingCard = {
  title: string;
  href: string;
  image: string;
};

interface LandingWelcomeSectionProps {
  title?: string;
  description?: string;
  cards?: LocalizedLandingCard[];
}

/**
 * Welcome block under the hero: centered title + subtitle, then six linked image cards (3×2).
 * Matches layout spec: outer max 1440, padding 86 / 130, inner 1180, gaps 48 / 50 / 34.
 */
const LandingWelcomeSection = ({
  title = "اكتشف عسير",
  description = "في ثنائيات من البهاء؛ تلتقي قمم الجبال مع لؤلؤ الشطآن الصافية، وتصافح الرمال الذهبية الهضاب الخضراء. طبيعة يتماهى فيها المطر مع دفء السهول، ويختال فيها الضباب مع شموخ المكان.",
  cards = [
    { title: "الفعاليات و المواسم", href: "/events", image: "/assets/landing/fireworks.png" },
    { title: "التجارب", href: "/experiences", image: "/assets/activities/activities.jpg" },
    { title: "واجهات رئيسية", href: "/destinations/browse", image: "/assets/landing/city1.jpg" },
    { title: "الإقامة في عسير", href: "/accommodation", image: "/assets/landing/manwalking.jpg" },
    { title: "المطبخ العسيري", href: "/aseer-cuisine", image: "/assets/activities/aseer-cuisine.jpg" },
    { title: "المعالم السياحية", href: "/attractions", image: "/assets/experiences/experiences.png" },
  ],
}: LandingWelcomeSectionProps) => {
  return (
    <section
      className="mx-auto w-full max-w-[1440px] bg-white px-4 py-12 md:px-[130px] md:py-[86px]"
      dir="auto"
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-12 md:gap-[48px]">
        <div className="flex w-full flex-col items-center gap-[50px]">
          <h2
            className="w-full max-w-[258px] text-center text-[clamp(40px,5vw,64px)] font-bold leading-[119%] text-black"
            style={{ fontFamily: ara }}
          >
            {title}
          </h2>
          <p
            className="w-full max-w-[744px] text-center text-[clamp(18px,2vw,24px)] font-bold leading-[119%] text-[#252525]/80"
            style={{ fontFamily: ara }}
          >
            {description}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 justify-items-center gap-[34px] sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative block h-[266px] w-full max-w-[382.67px] overflow-hidden rounded-lg outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#6027D2] focus-visible:ring-offset-2 sm:max-w-none"
              style={{ borderRadius: 8 }}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) min(382px, 100vw), (max-width: 1024px) 45vw, 31vw"
              />
              <div
                className="absolute inset-x-0 bottom-0 flex h-[155px] flex-col justify-end gap-5"
                style={{
                  background: OVERLAY_GRADIENT,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  paddingTop: 32,
                  paddingBottom: 32,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <span
                  className="block w-full text-right text-[22px] font-bold leading-[119%] text-white md:text-[24px]"
                  style={{ fontFamily: ara }}
                >
                  {card.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingWelcomeSection;
