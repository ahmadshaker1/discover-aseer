import { Recipe } from "./data";
import { RecipeCardImage } from "./RecipeCardImage";
import { RecipeCardContent } from "./RecipeCardContent";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="min-w-[240px] shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-surface text-foreground shadow-lg transition-shadow hover:shadow-xl sm:min-w-[260px] sm:rounded-3xl md:min-w-[320px]">
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
