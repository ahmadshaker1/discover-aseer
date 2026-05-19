"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import TourGuidesFilter, {
  type TourGuidesFilterState,
} from "../TourGuidesFilter/TourGuidesFilter";
import TourGuidesGrid from "../TourGuidesGrid/TourGuidesGrid";
import TourGuideModal from "../TourGuideModal/TourGuideModal";
import type {
  TourGuideWithFilterMeta,
  TourGuidesFilterOptions,
} from "@/components/tour-guides/data";
import type { TourGuideData } from "../TourGuideCard/TourGuideCard";

const INITIAL_FILTERS: TourGuidesFilterState = {
  specializations: [],
  gender: [],
  transportation: null,
};

function applyFilters(
  guides: TourGuideWithFilterMeta[],
  filters: TourGuidesFilterState
): TourGuideWithFilterMeta[] {
  return guides.filter((guide) => {
    if (filters.specializations.length > 0) {
      const hasSpec = guide.filterSpecializations.some((s) =>
        filters.specializations.includes(s)
      );
      if (!hasSpec) return false;
    }
    if (filters.gender.length > 0) {
      if (!filters.gender.includes(guide.gender)) return false;
    }
    if (filters.transportation === "yes" && !guide.hasTransportation)
      return false;
    if (filters.transportation === "no" && guide.hasTransportation)
      return false;
    return true;
  });
}

interface TourGuidesPageContentProps {
  guides: TourGuideWithFilterMeta[];
  filterOptions: TourGuidesFilterOptions;
}

const TourGuidesPageContent = ({
  guides,
  filterOptions,
}: TourGuidesPageContentProps) => {
  const t = useTranslations("tourGuides");
  const [filters, setFilters] = useState<TourGuidesFilterState>(INITIAL_FILTERS);
  const [selectedGuide, setSelectedGuide] = useState<TourGuideData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredGuides = useMemo(
    () => applyFilters(guides, filters),
    [guides, filters]
  );

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
      about: guide.description || t("defaultAbout"),
      pricePerHour: guide.pricePerHour ?? 200,
      maxPersons: guide.maxPersons ?? 8,
      transportation: guide.transportation || t("defaultTransport"),
      availability: guide.availability || t("defaultAvailability"),
    };
  };

  const guideDetails = selectedGuide ? getGuideDetails(selectedGuide) : null;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <div className="order-2 w-full flex-1 lg:order-1">
            <TourGuidesGrid
              guides={filteredGuides}
              onGuideClick={handleGuideClick}
            />
            {filteredGuides.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                {t("noGuidesFilter")}
              </p>
            )}
          </div>

          <aside className="order-1 w-full shrink-0 lg:order-2 lg:w-auto">
            <TourGuidesFilter
              filterOptions={filterOptions}
              filters={filters}
              onFiltersChange={setFilters}
              onReset={() => setFilters(INITIAL_FILTERS)}
            />
          </aside>
        </div>
      </div>

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
