"use client";
import React, { useState, useEffect } from "react";

// روابط الـ API والقاعدة حق الصور من Directus
const DIRECTUS_ASSETS_BASE_URL =
  "https://tool-portal.discoveraseer.com/assets/";
const FOOD_DINING_API_URL = "/api/igcat/food-dining";

// ==========================================
// الأيقونات (فارغة لتقوم بإضافة صورك)
// ==========================================
const StarIcon = () => (
  <span>
    <img src="/assets/igcat/Icon.png" alt="تقييم" />
  </span>
);
const PinIcon = () => (
  <span>
    <img src="/assets/igcat/map-pin.png" alt="" />
  </span>
);
const BillIcon = () => (
  <span>
    <img src="/assets/igcat/Saudi_riyal_Symbol2 1.png" alt="" />
  </span>
);
const PeopleIcon = () => (
  <span className="w-4 h-4">
    <img src="/assets/igcat/foodicon.png" alt="" />
  </span>
);

// ==========================================
// Types
// ==========================================
type CuisineItem = {
  id: string | number;
  name?: string;
  image?: string;
  [key: string]: any;
};

type RestaurantItem = {
  id: string | number;
  name?: string;
  image?: string;
  reviews_count?: number;
  rating?: number | string;
  location_text?: string;
  price_range?: string;
  category?: string;
  [key: string]: any;
};

// ==========================================
// مكونات الكروت الفرعية
// ==========================================

// 1. كرت الطبق التقليدي (صورة خلفية كاملة)
const CuisineCard: React.FC<{ item: CuisineItem }> = ({ item }) => {
  // بناء رابط الصورة الكامل
  const imageUrl = item.image
    ? typeof item.image === "string" &&
      (item.image.startsWith("http://") || item.image.startsWith("https://"))
      ? item.image
      : `${DIRECTUS_ASSETS_BASE_URL}${item.image}`
    : "/assets/placeholder-food.jpg";

  return (
    <div className="relative w-full aspect-square rounded-3xl overflow-hidden group shadow-md transition-transform duration-300 hover:-translate-y-1">
      {/* الصورة الخلفية */}
      <img
        src={imageUrl}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* تدرج أسود بالأسفل عشان النص */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>

      {/* الاسم بالأبيض أسفل اليسار */}
      <div className="absolute bottom-5 start-5 end-5 text-start z-10">
        <h3 className="text-white font-bold text-[18px] md:text-[20px] drop-shadow-md">
          {item.name}
        </h3>
      </div>
    </div>
  );
};

// 2. كرت المطعم الشهير (تصميم الـ Planner)
const RestaurantCard: React.FC<{ item: RestaurantItem }> = ({ item }) => {
  // بناء رابط الصورة الكامل
  const imageUrl = item.image
    ? typeof item.image === "string" &&
      (item.image.startsWith("http://") || item.image.startsWith("https://"))
      ? item.image
      : `${DIRECTUS_ASSETS_BASE_URL}${item.image}`
    : "/assets/placeholder-restaurant.jpg";

  // نفترض أن البيانات ترجع بهذه الحقول من الـ API
  // rating, reviews_count, location_text, price_range, category

  return (
    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* الصورة العلوية مع التقييم */}
      <div className="relative w-full h-[200px]">
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {/* التقييم */}
        <div className="absolute top-4 end-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 text-[12px]">
          <StarIcon />
          <span className="font-bold text-gray-700">
            ({item.reviews_count || 0}) {item.rating || "0.0"}
          </span>
        </div>
      </div>

      {/* التفاصيل بالأسفل */}
      <div className="p-5 text-start">
        {/* اسم المطعم */}
        <h3 className="text-black font-bold text-[18px] mb-3 leading-tight">
          {item.name}
        </h3>

        <div className="flex flex-col gap-2.5">
          {/* الموقع */}
          <div className="flex items-center justify-start gap-2 text-[13px] text-gray-500">
            <span>{item.location_text || "أبها"}</span>
            <PinIcon />
          </div>

          {/* التصنيف والسعر */}
          <div className="flex items-center justify-start gap-5 text-[13px] font-bold text-black pt-1">
            <div className="flex items-center gap-1.5">
              <span>{item.category || "سعودي"}</span>
              <PeopleIcon />
            </div>
            <div className="flex items-center gap-1.5">
              <span>{item.price_range || "50-100 ﷼"}</span>
              <BillIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// المكون الأساسي للقسم
// ==========================================
export default function FoodAndDiningSection() {
  const [cuisines, setCuisines] = useState<CuisineItem[]>([]);
  const [restaurants, setRestaurants] = useState<RestaurantItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const cuisineCards = cuisines.slice(0, 8);
  const restaurantCards = restaurants.slice(0, 8);

  // جلب البيانات من Directus
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(FOOD_DINING_API_URL, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch food data: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data?.cuisines)) setCuisines(data.cuisines);
        if (Array.isArray(data?.restaurants)) setRestaurants(data.restaurants);
      } catch (error) {
        console.error("Error fetching dining data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-24 text-gray-500">
        جاري تحميل المطاعم والأطباق العسيرية...
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 1. قسم الأطباق التقليدية (Grid: 4 أعمدة) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* العنوان والتاق */}
          <div className="flex justify-between items-center gap-4 mb-12">
            {/* العنوان (يمين) */}
            <h2 className="text-[28px] md:text-[36px] font-bold text-black text-start leading-tight">
              الأطباق التقليدية في عسير
            </h2>
            {/* التاق (يسار) */}
            <a
              className="bg-[#7300CD] text-white px-8 py-2.5 rounded-full font-bold text-[14px] shadow-sm hover:bg-[#6027D2] transition-colors"
              href="/aseer-cuisine"
            >
              المطبخ العسيري
            </a>
          </div>

          {/* شبكة الأطباق (تتحول لعمود واحد في الجوال) */}
          <div className="w-full overflow-x-auto pb-5">
            <div className="flex min-w-max gap-6 px-1">
              {cuisineCards.map((dish) => (
                <div key={dish.id} className="w-[282px] shrink-0 sm:w-[300px]">
                  <CuisineCard item={dish} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. قسم أشهر المطاعم (Grid: 4 أعمدة بتصميم الـ Planner) */}
      <section className="py-16 md:py-24 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* العنوان والتاق */}
          <div className="flex justify-between items-center gap-4 mb-12">
            {/* التاق (يسار) */}
            {/* العنوان (يمين) */}
            <h2 className="text-[28px] md:text-[36px] font-bold text-black text-start leading-tight">
              أشهر المطاعم
            </h2>
            <a
              className="bg-[#7300CD] text-white px-8 py-2.5 rounded-full font-bold text-[14px] shadow-sm hover:bg-[#6027D2] transition-colors"
              href="/restaurants"
            >
              المطاعم
            </a>
          </div>

          {/* شبكة المطاعم (تتحول لعمود واحد في الجوال) */}
          <div className="w-full overflow-x-auto pb-5">
            <div className="flex min-w-max gap-6 px-1">
              {restaurantCards.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="w-[282px] shrink-0 sm:w-[300px]"
                >
                  <RestaurantCard item={restaurant} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
