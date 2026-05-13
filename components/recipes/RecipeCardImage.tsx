import Image from "next/image";

interface RecipeCardImageProps {
  image: string;
  alt: string;
  rating: number;
  reviews: number;
}

export const RecipeCardImage = ({
  image,
  alt,
  rating,
  reviews,
}: RecipeCardImageProps) => {
  return (
    <div className="relative h-44 sm:h-52 md:h-60">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 240px, (max-width: 768px) 260px, 320px"
      />
      {/* Rating badge */}
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs flex items-center gap-1">
        <span>({reviews})</span>
        <span>{rating.toFixed(1)}/5</span>
        <span>⭐</span>
      </div>
    </div>
  );
};
