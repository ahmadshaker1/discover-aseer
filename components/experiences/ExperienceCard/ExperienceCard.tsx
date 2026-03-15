import Image from "next/image";
import ExperienceCardShareButton from "./ExperienceCardShareButton";
import ExperienceCardActions from "./ExperienceCardActions";
import { BuildingIcon, PersonIcon, SaudiRiyalIcon } from "./Icons";

export interface ExperienceCardProps {
  id: string | number;
  imageUrl: string;
  category: string;
  title: string;
  duration: string;
  description: string;
  provider: string;
  price: number;
  currency?: string;
  groupSize: number;
  bookUrl: string;
}

const ExperienceCard = ({
  id,
  imageUrl,
  category,
  title,
  duration,
  description,
  provider,
  price,
  currency = "إ.ر",
  groupSize,
  bookUrl,
}: ExperienceCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Banner Section */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Share Button - Top Left */}
        <ExperienceCardShareButton experienceId={id} title={title} />
        {/* Category Badge - Top Right */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="text-white text-xs font-medium">{category}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-black mb-1">{title}</h3>

        {/* Duration */}
        <p className="text-base font-bold text-black mb-3">{duration}</p>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Provider */}
        <div className="flex items-center gap-2 mb-4">
          <BuildingIcon />
          <span className="text-sm text-black">{provider}</span>
        </div>

        {/* Price and Group Size */}
        <div className="flex items-center justify-start mb-4 pb-4 ">
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold text-black">{price}</span>
            <SaudiRiyalIcon />
          </div>
          /
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-black">مجموعة</span>
            <span className="text-sm font-medium text-black">x{groupSize}</span>
            <PersonIcon />
          </div>
        </div>

        {/* Action Buttons */}
        <ExperienceCardActions experienceId={id} bookUrl={bookUrl} />
      </div>
    </div>
  );
};

export default ExperienceCard;
