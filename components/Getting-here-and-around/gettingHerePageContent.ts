/**
 * Duplicate structure for banner + surface travel sections; keeps Getting-here RTL/EN copy in one place.
 */
export interface GettingHereBannerCopy {
  home: string;
  crumbExperiences: string;
  title: string;
  subtitle: string;
}

export interface GettingHereTravelAirCopy {
  flyByAir: string;
  abhaAirportTitle: string;
  abhaAirportBody: string;
  bishaAirportTitle: string;
  bishaAirportBody: string;
  viewOnMap: string;
  domesticFlights: string;
  internationalFlights: string;
  bookNow: string;
  bookingSite: string;
  featured: string;
  budget: string;
  saudiLabel: string;
  saudiCarrier: string;
  flyNasLabel: string;
  flyNasTagline: string;
  flyadealLabel: string;
  flyadealTagline: string;
  flyDubai: string;
  airArabia: string;
  nileAir: string;
  airCairo: string;
}

export interface GettingHereTravelLandCopy {
  travelByRoad: string;
  roadLead: string;
  fromRiyadh: string;
  fromJeddah: string;
  fromDammam: string;
  hours950: string;
  hours630: string;
  hours1400: string;
  time910: string;
  time67: string;
  time1314: string;
  saptcoTitle: string;
  saptcoBody: string;
  bookOnWebsite: string;
  downloadApp: string;
  gettingAroundTitle: string;
  airportTaxiTitle: string;
  airportTaxiAlt: string;
  airportTaxiBody: string;
  rideAppsTitle: string;
  downloadAppShort: string;
  bolt: string;
  careem: string;
  uber: string;
  carRentalTitle: string;
  carRentalLead: string;
  theebTitle: string;
  seeAlso: string;
  visaTitle: string;
  visaAlt: string;
  planStayTitle: string;
  planStayAlt: string;
  pickDestinationTitle: string;
  pickDestinationAlt: string;
}

export type GettingHerePageContent = {
  banner: GettingHereBannerCopy;
  air: GettingHereTravelAirCopy;
  land: GettingHereTravelLandCopy;
};

export const gettingHerePageContent = {
  ar: {
    banner: {
      home: "الصفحة الرئيسية",
      crumbExperiences: "التجارب",
      title: "الوصول والتجول",
      subtitle:
        "زيارة واحدة لا تكفي مع وفرة الخيارات من الأنشطة والتجارب.",
    },
    air: {
      flyByAir: "السفر جواً",
      abhaAirportTitle: "مطار أبها الدولي (AHB)",
      abhaAirportBody:
        "البوابة الرئيسية للمنطقة، ويقع على بعد 18 كم فقط من وسط مدينة أبها. يخدم الوجهات المحلية والمراكز الدولية الرئيسية في المنطقة.",
      bishaAirportTitle: "مطار بيشة (BHH)",
      bishaAirportBody:
        "موقع استراتيجي للمسافرين الراغبين بزيارة الأجزاء الشمالية من منطقة عسير، مع توفير رحلات ربط محلية فعالة.",
      viewOnMap: "عرض على الخريطة",
      domesticFlights: "الرحلات الداخليه",
      internationalFlights: "الرحلات الدوليه",
      bookNow: "احجز الأن",
      bookingSite: "موقع الحجز",
      featured: "مميز",
      budget: "اقتصادي",
      saudiLabel: "السعودية",
      saudiCarrier: "الناقل الوطني",
      flyNasLabel: "طيران ناس",
      flyNasTagline: "الطيران الاقتصادي الرائد",
      flyadealLabel: "اديل",
      flyadealTagline: "سفر ذكي",
      flyDubai: "فلاي دبي",
      airArabia: "العربية للطيران",
      nileAir: "النيل للطيران",
      airCairo: "إير كايرو",
    },
    land: {
      travelByRoad: "السفر برا",
      roadLead:
        "القيادة إلى عسير هي رحلة عبر تضاريس متغيرة. من السهول الساحلية إلى المرتفعات الشاهقة، الطرق مجهزة بشكل جيد وتوفر إطلالات لا مثيل لها.",
      fromRiyadh: "من الرياض",
      fromJeddah: "من جدة",
      fromDammam: "من الدمام",
      hours950: "950 كم",
      hours630: "630 كم",
      hours1400: "1,400 كم",
      time910: "9-10 ساعات",
      time67: "6-7 ساعات",
      time1314: "13-14 ساعة",
      saptcoTitle: "حافلات سابتكو",
      saptcoBody:
        "استمتع بتجربة سفر مريحة عبر البلاد مع خدمة الحافلات الرائدة في المملكة العربية السعودية. توفر سابتكو رحلات منتظمة من جميع المدن الرئيسية مباشرة إلى محطة أبها المركزية.",
      bookOnWebsite: "احجز عبر الموقع",
      downloadApp: "تحميل التطبيق",
      gettingAroundTitle: "التنقل في عسير",
      airportTaxiTitle: "تاكسي المطار",
      airportTaxiAlt: "تاكسي المطار",
      airportTaxiBody:
        "متوفر خارج صالات الوصول. على الرغم من موثوقيتها، قد يكون توفرها محدوداً خلال مواسم الذروة السياحية. عادة ما تطبق أسعار ثابتة للانتقال إلى المدينة.",
      rideAppsTitle: "تطبيقات التوصيل",
      downloadAppShort: "تحميل التطبيق",
      bolt: "بولت",
      careem: "كريم",
      uber: "أوبر",
      carRentalTitle: "تأجير السيارات",
      carRentalLead:
        "للحصول على حرية مطلقة لاستكشاف القرى الجبلية والمطلات الخفية، يُنصى بشدة باستئجار سيارة. يعمل العديد من المزودين المحليين والدوليين في المطار.",
      theebTitle: "ذيب",
      seeAlso: "انظر أيضًا",
      visaTitle: "متطلبات التأشيرة والدخول",
      visaAlt: "متطلبات التأشيرة",
      planStayTitle: "خطط إقامتك",
      planStayAlt: "خطط إقامتك",
      pickDestinationAlt: "اختر وجهتك",
      pickDestinationTitle: "اختر وجهتك",
    },
  },
  en: {
    banner: {
      home: "Home",
      crumbExperiences: "Experiences",
      title: "Getting here & around",
      subtitle:
        "One visit is rarely enough—with so many activities and experiences to explore.",
    },
    air: {
      flyByAir: "Flying in",
      abhaAirportTitle: "Abha International Airport (AHB)",
      abhaAirportBody:
        "The main gateway to the region—about 18 km from downtown Abha—with domestic flights and links to international hubs.",
      bishaAirportTitle: "Bisha Domestic Airport (BHH)",
      bishaAirportBody:
        "Ideal if you’re heading to northern parts of Asir with efficient domestic connections.",
      viewOnMap: "View on map",
      domesticFlights: "Domestic flights",
      internationalFlights: "International flights",
      bookNow: "Book now",
      bookingSite: "Booking site",
      featured: "Featured",
      budget: "Budget",
      saudiLabel: "Saudia",
      saudiCarrier: "National carrier",
      flyNasLabel: "flynas",
      flyNasTagline: "Leading economy airline",
      flyadealLabel: "flyadeal",
      flyadealTagline: "Smart travel",
      flyDubai: "flydubai",
      airArabia: "Air Arabia",
      nileAir: "Nile Air",
      airCairo: "Air Cairo",
    },
    land: {
      travelByRoad: "Driving in",
      roadLead:
        "Driving to Asir crosses changing terrain—from coastal plains to high mountains—on well-maintained roads with unforgettable views.",
      fromRiyadh: "From Riyadh",
      fromJeddah: "From Jeddah",
      fromDammam: "From Dammam",
      hours950: "950 km",
      hours630: "630 km",
      hours1400: "1,400 km",
      time910: "9–10 hours",
      time67: "6–7 hours",
      time1314: "13–14 hours",
      saptcoTitle: "SAPTCO buses",
      saptcoBody:
        "Travel comfortably nationwide with SAPTCO’s scheduled inter‑city buses, including routes to central Abha station.",
      bookOnWebsite: "Book online",
      downloadApp: "Download app",
      gettingAroundTitle: "Getting around Asir",
      airportTaxiTitle: "Airport taxis",
      airportTaxiAlt: "Airport taxi",
      airportTaxiBody:
        "Available outside arrivals. Reliable though supply can tighten in peak tourism seasons; fixed fares into town are typical.",
      rideAppsTitle: "Ride‑hailing apps",
      downloadAppShort: "Download app",
      bolt: "Bolt",
      careem: "Careem",
      uber: "Uber",
      carRentalTitle: "Car rental",
      carRentalLead:
        "For villages and viewpoints, renting a car is recommended. Local and international desks operate at airports.",
      theebTitle: "Theeb",
      seeAlso: "See also",
      visaTitle: "Visa & entry requirements",
      visaAlt: "Visa requirements",
      planStayTitle: "Plan your stay",
      planStayAlt: "Plan your stay",
      pickDestinationAlt: "Pick your destination",
      pickDestinationTitle: "Choose your destination",
    },
  },
} satisfies Record<"ar" | "en", GettingHerePageContent>;

export function resolveGettingHereContent(locale: string): GettingHerePageContent {
  return locale === "en" ? gettingHerePageContent.en : gettingHerePageContent.ar;
}
