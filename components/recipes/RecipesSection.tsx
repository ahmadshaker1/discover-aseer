import { fetchRecipes } from "./data";
import { RecipesHeader } from "./RecipesHeader";
import { RecipesCarousel } from "./RecipesCarousel";

export const RecipesSection = async () => {
  const recipes = await fetchRecipes();

  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
        <RecipesHeader />
        <RecipesCarousel recipes={recipes} />
      </div>
    </section>
  );
};

export default RecipesSection;
