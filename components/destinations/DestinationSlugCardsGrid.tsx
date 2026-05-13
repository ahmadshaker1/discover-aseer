import DestinationsGridCard from "@/components/destinations/DestinationsGridCard";
import type { Destination } from "@/components/destinations/data";

interface DestinationSlugCardsGridProps {
  destinations: Destination[];
}

/** Card grid only — used directly under the destination slug hero. */
const DestinationSlugCardsGrid = ({ destinations }: DestinationSlugCardsGridProps) => {
  if (destinations.length === 0) return null;

  return (
    <section className="w-full bg-background py-10 text-foreground md:py-12">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {destinations.map((d) => (
            <DestinationsGridCard key={d.id} destination={d} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationSlugCardsGrid;
