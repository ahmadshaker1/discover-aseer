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
    <div className="flex flex-col sm:flex-row items-start justify-between mb-6 sm:mb-8 md:mb-10 gap-4 sm:gap-6">
      <div className="flex flex-col items-start space-y-4 flex-1">
        <h2 className="text-3xl md:text-7xl font-bold text-right w-full text-black">
          {title}
        </h2>
        <span className="h-px w-24 bg-gradient-to-l from-transparent via-black/40 to-transparent" />
        <p className="text-base md:text-lg text-gray-700 text-right max-w-2xl">
          {subtitle}
        </p>
        <button className="px-6 sm:px-8 md:px-10 py-3 cursor-pointer bg-[#6027D2] text-white rounded-full font-semibold text-sm sm:text-base hover:bg-[#6D28D9] transition-colors whitespace-nowrap">
          {buttonText}
        </button>
      </div>
    </div>
  );
};
