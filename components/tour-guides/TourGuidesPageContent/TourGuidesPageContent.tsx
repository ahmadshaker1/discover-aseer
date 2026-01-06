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

  const handleGuideClick = (guide: TourGuideData) => {
    setSelectedGuide(guide);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGuide(null);
  };

  // Mock data for modal - replace with actual data from API
  const getGuideDetails = (guide: TourGuideData) => {
    return {
      about:
        "مرشد سياحي معتمد من الهيئة السعودية للسياحة مع خبرة 7 سنوات في مجال الإرشاد السياحي. متخصص في الجولات التاريخية والتراثية في مدينة الرياض والمناطق المحيطة. حاصل على شهادة الإرشاد السياحي المتقدم وشهادة الإسعافات الأولية. أقدم تجربة سياحية مميزة تجمع بين المعرفة التاريخية والترفيه الراقي.",
      experienceTags: [
        "تجارب تاريخية",
        "تجارب ترفيهية",
        "تجارب تراثية",
        "تجارب جبلية",
      ],
      pricePerHour: 200,
      maxPersons: 8,
      transportation: "سيارة",
      availability: "مرنة",
    };
  };

  const guideDetails = selectedGuide ? getGuideDetails(selectedGuide) : null;

  return (
    <>
      <div className="container mx-auto py-12">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <aside className="flex-shrink-0">
            <TourGuidesFilter />
          </aside>

          {/* Guides Grid */}
          <div className="flex-1">
            <TourGuidesGrid guides={guides} onGuideClick={handleGuideClick} />
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
          experienceTags={guideDetails.experienceTags}
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

