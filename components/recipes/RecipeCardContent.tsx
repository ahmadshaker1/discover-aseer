interface RecipeCardContentProps {
  title: string;
  timeToPrepare: number;
  mainIngredient: string;
}

export const RecipeCardContent = ({
  title,
  timeToPrepare,
  mainIngredient,
}: RecipeCardContentProps) => {
  return (
    <div className="flex flex-col items-end gap-2 px-4 sm:px-6 py-3 sm:py-4">
      <h3 className="text-base sm:text-lg font-semibold text-right w-full">
        {title}
      </h3>
      <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground w-full justify-end">
        <div className="flex items-center gap-1">
          <span>{mainIngredient}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>🕐</span>
          <span>{timeToPrepare} دقيقة</span>
        </div>
      </div>
    </div>
  );
};
