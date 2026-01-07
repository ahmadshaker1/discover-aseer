"use client";

import { useState } from "react";
import TourGuidesFilter from "../TourGuidesFilter/TourGuidesFilter";
import TourGuidesGrid from "../TourGuidesGrid/TourGuidesGrid";
import TourGuideModal from "../TourGuideModal/TourGuideModal";
import { TourGuideData } from "../TourGuideCard/TourGuideCard";

interface TourGuidesPageContentProps {
  guides: TourGuideData[];
}

const TourGuidesPageContent = ({ guides }: TourGuidesPageContentProps) => {
  const [selectedGuide, setSelectedGuide] = useState<TourGuideData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredGuides, setFilteredGuides] = useState<TourGuideData[]>(guides);

  const handleGuideClick = (guide: TourGuideData) => {
    setSelectedGuide(guide);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGuide(null);
  };

  const getGuideDetails = (guide: TourGuideData) => {
    return {
      about: guide.description || "مرشد سياحي محترف",
      pricePerHour: guide.pricePerHour || 200,
      maxPersons: guide.maxPersons || 8,
      transportation: guide.transportation || "سيارة",
      availability: guide.availability || "مرنة",
    };
  };

  const guideDetails = selectedGuide ? getGuideDetails(selectedGuide) : null;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-auto lg:flex-shrink-0">
            <TourGuidesFilter
              guides={guides}
              onFilterChange={setFilteredGuides}
            />
          </aside>

          {/* Guides Grid */}
          <div className="flex-1 w-full">
            <TourGuidesGrid
              guides={filteredGuides}
              onGuideClick={handleGuideClick}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedGuide && guideDetails && (
        <TourGuideModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          guide={selectedGuide}
          about={guideDetails.about}
          pricePerHour={guideDetails.pricePerHour}
          maxPersons={guideDetails.maxPersons}
          transportation={guideDetails.transportation}
          availability={guideDetails.availability}
        />
      )}
    </>
  );
};

export default TourGuidesPageContent;

