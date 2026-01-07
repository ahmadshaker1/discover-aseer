"use client";

import Image from "next/image";
import { Button } from "@headlessui/react";
import { useState } from "react";

interface PointOfInterest {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
}

const pointsOfInterest: PointOfInterest[] = [
  {
    id: 1,
    image: "/assets/points-of-interest/Rectangle 2154.jpg",
    title: "وجهات رئيسية.. تهول",
    subtitle: "الشواطئ الساحلية",
    location: "أبها",
    description:
      "انا ذاهب الى محاولة لجعل كعكة بها ، ولكن انا ذاهب الى محاولة لجعلها تعمل.",
  },
  {
    id: 2,
    image: "/assets/points-of-interest/Rectangle 2155.jpg",
    title: "وجهات رئيسية.. تهول",
    subtitle: "الشواطئ الساحلية",
    location: "أبها",
    description:
      "انا ذاهب الى محاولة لجعل كعكة بها ، ولكن انا ذاهب الى محاولة لجعلها تعمل.",
  },
  {
    id: 3,
    image: "/assets/points-of-interest/Rectangle 2158.jpg",
    title: "وجهات رئيسية.. تهول",
    subtitle: "الشواطئ الساحلية",
    location: "أبها",
    description:
      "انا ذاهب الى محاولة لجعل كعكة بها ، ولكن انا ذاهب الى محاولة لجعلها تعمل.",
  },
  {
    id: 4,
    image: "/assets/points-of-interest/Rectangle 2159.jpg",
    title: "وجهات رئيسية.. تهول",
    subtitle: "الشواطئ الساحلية",
    location: "أبها",
    description:
      "انا ذاهب الى محاولة لجعل كعكة بها ، ولكن انا ذاهب الى محاولة لجعلها تعمل.",
  },
  {
    id: 5,
    image: "/assets/points-of-interest/Rectangle 2162.jpg",
    title: "وجهات رئيسية.. تهول",
    subtitle: "الشواطئ الساحلية",
    location: "أبها",
    description:
      "انا ذاهب الى محاولة لجعل كعكة بها ، ولكن انا ذاهب الى محاولة لجعلها تعمل.",
  },
];

const PointsOfInterest = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPoint = pointsOfInterest[currentIndex];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % pointsOfInterest.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + pointsOfInterest.length) % pointsOfInterest.length
    );
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full min-h-screen max-w-screen-2xl mx-auto overflow-hidden">
      {/* Main Background Image */}
      <div className="relative w-full min-h-screen">
        <Image
          src={currentPoint.image}
          alt={currentPoint.title}
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40" />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-12 lg:p-24">
          {/* Top Section - Title and Subtitle */}
          <div className="text-right space-y-4 sm:space-y-6 md:space-y-8 mt-4 sm:mt-6 md:mt-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white border-b border-white pb-3 sm:pb-4 md:pb-6 w-full sm:w-4/5 md:w-2/3">
              {currentPoint.title}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/90">
              {currentPoint.subtitle}
            </h2>
            {/* Bottom Section - Location and Description */}
            <div className="text-right space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8 mt-8 sm:mt-12 md:mt-24 lg:mt-36">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {currentPoint.location}
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-full sm:max-w-xl md:max-w-2xl ml-auto">
                {currentPoint.description}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Preview Images - Lower Left */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-12 md:left-12 lg:bottom-24 lg:left-24 flex flex-col items-end gap-2 sm:gap-3 md:gap-4">
          {/* Navigation Arrows */}
          <div className="flex flex-row gap-1.5 sm:gap-2">
            <Button
              onClick={nextImage}
              className="w-8 h-8 sm:w-10 sm:h-10 rotate-180 cursor-pointer rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Next image"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25 12.2744L19.25 12.2744"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.2998 18.2988L4.24981 12.2748L10.2998 6.24976"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <Button
              onClick={prevImage}
              className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Previous image"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25 12.2744L19.25 12.2744"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.2998 18.2988L4.24981 12.2748L10.2998 6.24976"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
          {/* Preview Images Carousel */}
          <div
            className="flex gap-2 sm:gap-3 overflow-x-auto hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {pointsOfInterest.map((point, index) => (
              <Button
                key={point.id}
                onClick={() => selectImage(index)}
                className={`relative shrink-0 w-20 h-14 sm:w-24 sm:h-16 md:w-32 md:h-20 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? "scale-110"
                    : "opacity-70 hover:opacity-100 hover:scale-105"
                }`}
                aria-label={`Select ${point.title}`}
              >
                <Image
                  src={point.image}
                  alt={point.title}
                  fill
                  className="object-cover"
                />
                {index === currentIndex && <div className="absolute inset-0" />}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsOfInterest;
