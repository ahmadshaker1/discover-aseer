import type { AseerCuisineHeroData } from "@/components/aseer-cuisine/AseerCuisineHero";
import type { AseerCuisineDishesSectionData } from "@/components/aseer-cuisine/AseerCuisineDishesSection";
import type { AseerCuisineRestaurantsSectionData } from "@/components/aseer-cuisine/AseerCuisineRestaurantsSection";
import type { AseerCuisineLocalFlavorsSectionData } from "@/components/aseer-cuisine/AseerCuisineLocalFlavorsSection";
import type { AseerCuisineCookingExperiencesSectionData } from "@/components/experiences/AseerExperiencesSection";
import type { AseerCuisineChefsVideoSectionData } from "@/components/aseer-cuisine/AseerCuisineChefsVideoSection";

export interface AseerCuisinePageData {
  hero: AseerCuisineHeroData;
  dishesSection: AseerCuisineDishesSectionData;
  restaurantsSection: AseerCuisineRestaurantsSectionData;
  localFlavorsSection: AseerCuisineLocalFlavorsSectionData;
  cookingExperiencesSection: AseerCuisineCookingExperiencesSectionData;
  chefsVideoSection: AseerCuisineChefsVideoSectionData;
}
