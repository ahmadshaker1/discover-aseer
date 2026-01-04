import AseerLogo from "../Logo/AseerLogo";

const Navbar = () => {
  return (
    <div className="flex flex-row items-center justify-between absolute top-0 left-0 w-full h-24 z-50 bg-[#191919]/32 backdrop-blur-md">
      <div className="flex flex-row items-center justify-between w-full max-w-7xl mx-auto">
        <AseerLogo />
      </div>
    </div>
  );
};

export default Navbar;
