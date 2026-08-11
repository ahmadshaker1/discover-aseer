"use client";

import { HamburgerIcon } from "./Icons";

interface MobileMenuButtonProps {
  onClick: () => void;
}

const MobileMenuButton = ({ onClick }: MobileMenuButtonProps) => {
  return (
    <button
      type="button"
      className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-white/10 lg:hidden"
      onClick={onClick}
      aria-label="Open menu"
    >
      <HamburgerIcon isOpen={false} />
    </button>
  );
};

export default MobileMenuButton;
