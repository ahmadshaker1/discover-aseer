"use client";

import { useRouter } from "next/navigation";
import { Button } from "@headlessui/react";

const ShowMoreButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/attractions");
  };

  return (
    <Button
      onClick={handleClick}
      className="mt-10 inline-flex items-center justify-center rounded-full bg-[#6027D2] px-10 py-3 text-sm md:text-base font-semibold text-white  cursor-pointer hover:bg-[#4f1fb0] transition-colors"
    >
      عرض المزيد
    </Button>
  );
};

export default ShowMoreButton;
