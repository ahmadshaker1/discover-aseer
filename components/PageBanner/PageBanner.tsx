import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageBannerProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

const PageBanner = ({
  breadcrumbs,
  title,
  subtitle,
  backgroundImage = "/assets/experiences/experiences.png",
}: PageBannerProps) => {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-[75vh] w-screen overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay pattern - similar to the geometric pattern in the image */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.1) 20px
          )`,
        }}
      ></div>

      {/* Main content - centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-48">
        {/* Breadcrumb navigation */}
        <div className="flex items-center space-x-2 text-white text-base font-medium">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center">
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:opacity-80 transition-opacity"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2">{" > "}</span>
              )}
            </span>
          ))}
        </div>

        {/* Main title */}
        <h1 className="text-7xl font-bold text-white mb-6">{title}</h1>

        {/* Subtitle */}
        <p className="text-2xl font-medium text-white max-w-4xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default PageBanner;
