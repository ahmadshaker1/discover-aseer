interface RecipesHeaderProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export const RecipesHeader = ({
  title = "المطبخ العسيري",
  subtitle = "زيارة واحدة لا تكفي مع وفرة الخيارات من الأنشطة والتجارب",
  buttonText = "المطبخ العسيري",
}: RecipesHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 text-foreground sm:mb-8 sm:flex-row sm:gap-6 md:mb-10">
      <div className="flex flex-1 flex-col items-start space-y-4">
        <h2 className="w-full text-right text-3xl font-bold text-foreground md:text-7xl">
          {title}
        </h2>
        <span className="h-px w-24 bg-linear-to-l from-transparent via-foreground/40 to-transparent" />
        <p className="max-w-2xl text-right text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
        <button className="cursor-pointer whitespace-nowrap rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 sm:px-8 sm:text-base md:px-10">
          {buttonText}
        </button>
      </div>
    </div>
  );
};
