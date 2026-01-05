import Image from "next/image";

const PoweredByLogo = () => {
  return (
    <div className="flex flex-row items-center gap-3">
      <Image
        src="/assets/powered-by/image.png"
        alt="Powered by"
        width={100}
        height={48}
      />
    </div>
  );
};

export default PoweredByLogo;
