import Link from "next/link";

interface ImageGridItem {
  background: string;
  title: string;
  link: string;
}

interface ImageGridProps {
  data: ImageGridItem[];
}

const ImageGrid = ({ data }: ImageGridProps) => {
  // Organize data into columns (3 columns, 2 rows = 6 items)
  const columns: ImageGridItem[][] = [[], [], []];

  data.forEach((item, index) => {
    const columnIndex = index % 3;
    columns[columnIndex].push(item);
  });

  // Check if background is a URL (image) or a color
  const isImageUrl = (bg: string) => {
    return (
      bg.startsWith("/") || bg.startsWith("http") || bg.startsWith("data:")
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-full min-h-[600px]">
      {columns.map((column, columnIndex) => {
        const isEvenColumn = columnIndex % 2 === 0;

        return (
          <div key={columnIndex} className="flex flex-col gap-4 h-full">
            {column.map((item, itemIndex) => {
              // Even columns: top = 2/3, bottom = 1/3
              // Odd columns: top = 1/3, bottom = 2/3
              const isTopCard = itemIndex === 0;
              const flexClass = isEvenColumn
                ? isTopCard
                  ? "flex-[2]"
                  : "flex-[1]"
                : isTopCard
                ? "flex-[1]"
                : "flex-[2]";

              const isImage = isImageUrl(item.background);

              return (
                <Link
                  key={itemIndex}
                  href={item.link}
                  className={`relative rounded-lg overflow-hidden ${flexClass} min-h-[200px] block cursor-pointer transition-transform hover:scale-[1.02]`}
                  style={{
                    backgroundImage: isImage
                      ? `url(${item.background})`
                      : undefined,
                    backgroundColor: !isImage ? item.background : undefined,
                    backgroundSize: isImage ? "cover" : undefined,
                    backgroundPosition: isImage ? "center" : undefined,
                    backgroundRepeat: isImage ? "no-repeat" : undefined,
                  }}
                >
                  {/* Gradient overlay from bottom to top */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)",
                    }}
                  >
                    <h3 className="text-white text-xl font-bold text-right">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
