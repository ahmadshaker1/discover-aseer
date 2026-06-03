"use client";
import React, { useState } from "react";

const DIRECTUS_ASSETS_URL = "https://tool-portal.discoveraseer.com/assets";

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ImageIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

export default function MediaCategoriesClient({
  categories,
  items,
}: {
  categories: any[];
  items: any[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);

  const closeModal = () => setSelectedCategory(null);

  const allImages = items.filter((item) => item.type === "image");

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((category, index) => {
          const categoryItems = items.filter(
            (item) => item.category === category.id,
          );
          let coverImageItem = categoryItems.find((i) => i.type === "image");

          if (!coverImageItem && allImages.length > 0) {
            coverImageItem = allImages[index % allImages.length];
          }

          const coverImageUrl = coverImageItem
            ? `${DIRECTUS_ASSETS_URL}/${coverImageItem.file_id}`
            : "/assets/document-placeholder.jpg";

          return (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 flex flex-col group"
            >
              <div className="h-[200px] w-full overflow-hidden bg-gray-100 relative">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
                <img
                  src={coverImageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5 flex flex-col items-center text-center">
                <h3 className="text-xl font-bold text-black mb-2">
                  {category.name}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <ImageIcon />
                  <span>{categoryItems.length} ملفات</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          dir="rtl"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>

          <div className="relative bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-black">
                  {selectedCategory.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  تصفح وحمل الملفات الخاصة بهذا القسم
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items
                  .filter((i) => i.category === selectedCategory.id)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col gap-3"
                    >
                      <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-100 relative group">
                        {item.type === "image" && (
                          <img
                            src={`${DIRECTUS_ASSETS_URL}/${item.file_id}`}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {item.type === "video" && (
                          <video
                            src={`${DIRECTUS_ASSETS_URL}/${item.file_id}`}
                            controls
                            className="w-full h-full object-cover"
                          />
                        )}
                        {item.type === "file" && (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-purple-50 text-[#7300CD]">
                            <svg
                              width="48"
                              height="48"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                              <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            <span className="font-bold text-sm mt-2 text-[#7300CD]">
                              مستند
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between px-2 pb-1">
                        <span
                          className="font-bold text-sm text-gray-800 line-clamp-1"
                          title={item.title}
                        >
                          {item.title}
                        </span>
                        <a
                          href={`${DIRECTUS_ASSETS_URL}/${item.file_id}?download`}
                          download
                          className="text-xs px-3 py-1.5 bg-[#7300CD] text-white rounded-full hover:bg-[#6027D2] transition-colors"
                        >
                          تحميل
                        </a>
                      </div>
                    </div>
                  ))}

                {items.filter((i) => i.category === selectedCategory.id)
                  .length === 0 && (
                  <div className="col-span-full py-12 text-center text-gray-500 font-bold">
                    لا توجد ملفات في هذا القسم حالياً.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
