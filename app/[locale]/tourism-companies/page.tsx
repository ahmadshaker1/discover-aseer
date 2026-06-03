import TourismCompaniesHero from "@/components/tourism-companies/hero";
import TourismCompaniesCardSection from "@/components/tourism-companies/card";

export default function TourismCompaniesPage() {
  return (
    <div className="flex w-full flex-col">
      <TourismCompaniesHero />
      <TourismCompaniesCardSection />
    </div>
  );
}
