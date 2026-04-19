import DestinationsGridCard from "@/components/destinations/DestinationsGridCard";
import type { Destination } from "@/components/destinations/data";

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface DestinationsRelatedSectionProps {
  destinations: Destination[];
  excludeSlug: string;
}

/** Inner destination page — other destinations (same card as browse/main grid). */
const DestinationsRelatedSection = ({ destinations, excludeSlug }: DestinationsRelatedSectionProps) => {
  const related = destinations.filter((d) => d.slug !== excludeSlug).slice(0, 8);

  if (related.length === 0) return null;

  return (
    <section className="w-full bg-white py-12" dir="rtl">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        <h2
          className="mx-auto mb-8 max-w-[1320px] text-right text-[48px] font-bold leading-[100%] text-[#280048]"
          style={{ fontFamily: ara }}
        >
          وجهات أخرى قد تعجبك
        </h2>

        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {related.map((d) => (
            <DestinationsGridCard key={d.id} destination={d} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsRelatedSection;
