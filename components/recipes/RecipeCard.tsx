import { Recipe } from "./data";
import { RecipeCardImage } from "./RecipeCardImage";
import { RecipeCardContent } from "./RecipeCardContent";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="min-w-[240px] sm:min-w-[260px] md:min-w-[320px] bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden flex-shrink-0 cursor-pointer hover:shadow-xl transition-shadow">
      <RecipeCardImage
        image={recipe.image}
        alt={recipe.title}
        rating={recipe.rating}
        reviews={recipe.reviews}
      />
      <RecipeCardContent
        title={recipe.title}
        timeToPrepare={recipe.timeToPrepare}
        mainIngredient={recipe.mainIngredient}
      />
    </div>
  );
};
