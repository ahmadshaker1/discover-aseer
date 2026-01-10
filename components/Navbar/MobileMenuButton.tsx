"use client";

import { HamburgerIcon } from "./Icons";

interface MobileMenuButtonProps {
  onClick: () => void;
}

const MobileMenuButton = ({ onClick }: MobileMenuButtonProps) => {
  return (
    <button
      type="button"
      className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
      onClick={onClick}
      aria-label="Open menu"
    >
      <HamburgerIcon isOpen={false} />
    </button>
  );
};

export default MobileMenuButton;
