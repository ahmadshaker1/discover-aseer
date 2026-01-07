import TourGuideCard, { TourGuideData } from "../TourGuideCard/TourGuideCard";

interface TourGuidesGridProps {
  guides: TourGuideData[];
  onGuideClick: (guide: TourGuideData) => void;
}

const TourGuidesGrid = ({ guides, onGuideClick }: TourGuidesGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {guides.map((guide) => (
        <TourGuideCard
          key={guide.id}
          {...guide}
          onCardClick={() => onGuideClick(guide)}
        />
      ))}
    </div>
  );
};

export default TourGuidesGrid;
