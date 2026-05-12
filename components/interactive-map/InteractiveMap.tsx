"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import SafeHtml from "@/components/common/SafeHtml";
import { useLocale } from "next-intl";

interface LocationPin {
  id: string;
  latitude: number;
  longitude: number;
  title?: string;
}

interface InteractiveMapProps {
  initialPins?: LocationPin[];
  onPinAdd?: (pin: LocationPin) => void;
}

interface MapPlace {
  id: string;
  title: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  hasCoordinates: boolean;
  category: string;
  city: string;
  tag?: string;
}

const MAP_CENTER: [number, number] = [42.62, 18.25];

const EMPTY_PLACES: MapPlace[] = [];

const CATEGORY_CHIPS = [
  { label: "استفسارات", icon: "ⓘ" },
  { label: "التجارب السياحية", icon: "◉" },
  { label: "المعالم السياحية", icon: "⌂" },
  { label: "تقييم + مكافآت", icon: "★" },
  { label: "مطاعم وكافيهات", icon: "☕" },
  { label: "أماكن الإقامة", icon: "🏨" },
] as const;

const UI_COPY = {
  ar: {
    all: "الكل",
    allCategories: "كل الفئات",
    discover: "اكتشف عسير",
    filterLabel: "فلترة",
    search: "البحث...",
    locations: "المواقع",
    clearFilters: "مسح الفلاتر",
    noGeo: "الموقع الجغرافي غير متوفر حالياً على الخريطة",
    showOnMap: "عرض على الخريطة",
    noResults: "لا توجد نتائج مطابقة للبحث الحالي.",
    tokenHint: "أضف `NEXT_PUBLIC_MAPBOX_API_KEY` في ملف البيئة لتشغيل الخريطة.",
  },
  en: {
    all: "All",
    allCategories: "All categories",
    discover: "Discover Aseer",
    filterLabel: "Filter",
    search: "Search...",
    locations: "Locations",
    clearFilters: "Clear filters",
    noGeo: "Location coordinates are currently unavailable on the map.",
    showOnMap: "Show on map",
    noResults: "No places match the current search.",
    tokenHint: "Add `NEXT_PUBLIC_MAPBOX_API_KEY` in the environment file to enable the map.",
  },
} as const;

const placesToGeoJSON = (places: MapPlace[]): GeoJSON.FeatureCollection<GeoJSON.Point> => ({
  type: "FeatureCollection",
  features: places.map((place) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [place.longitude as number, place.latitude as number],
    },
    properties: {
      id: place.id,
      title: place.title,
      category: place.category,
      city: place.city,
    },
  })),
});

const InteractiveMap = ({ initialPins = [], onPinAdd }: InteractiveMapProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const ui = isRtl ? UI_COPY.ar : UI_COPY.en;
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapLoadedRef = useRef(false);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const placesRef = useRef<MapPlace[]>(EMPTY_PLACES);

  const [activeCategory, setActiveCategory] = useState<string>(ui.all);
  const [selectedCity, setSelectedCity] = useState<string>(ui.all);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [places, setPlaces] = useState<MapPlace[]>(EMPTY_PLACES);

  const cities = useMemo(
    () => [ui.all, ...Array.from(new Set(places.map((place) => place.city)))],
    [places, ui.all],
  );

  const filteredPlaces = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return places.filter((place) => {
      const categoryMatch = activeCategory === ui.all || place.category === activeCategory;
      const cityMatch = selectedCity === ui.all || place.city === selectedCity;
      const searchMatch =
        normalizedSearch.length === 0 ||
        place.title.toLowerCase().includes(normalizedSearch) ||
        place.description.toLowerCase().includes(normalizedSearch);
      return categoryMatch && cityMatch && searchMatch;
    });
  }, [activeCategory, places, searchTerm, selectedCity]);

  const mappablePlaces = useMemo(
    () => filteredPlaces.filter((place) => place.hasCoordinates && place.latitude != null && place.longitude != null),
    [filteredPlaces],
  );

  useEffect(() => {
    placesRef.current = places;
  }, [places]);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const response = await fetch(`/api/interactive-map/locations?locale=${locale}`, { cache: "no-store" });
        if (!response.ok) return;

        const json: { data?: MapPlace[] } = await response.json();
        if (!Array.isArray(json.data) || json.data.length === 0) return;

        if (json.data.length > 0) {
          setPlaces(json.data);
        }
      } catch (error) {
        console.error("[interactive-map] Failed to load Directus locations", error);
      }
    };

    loadLocations();
  }, [locale]);

  const focusPlace = useCallback((place: MapPlace) => {
    setSelectedPlaceId(place.id);
    if (!mapRef.current || !place.hasCoordinates || place.latitude == null || place.longitude == null) {
      popupRef.current?.remove();
      return;
    }
    mapRef.current.flyTo({
      center: [place.longitude, place.latitude],
      zoom: 12.5,
      essential: true,
    });

    popupRef.current?.remove();
    popupRef.current = new mapboxgl.Popup({ offset: 18, closeButton: false })
      .setLngLat([place.longitude, place.latitude])
      .setHTML(
        `<div style="font-family: Arial, sans-serif; direction: ${isRtl ? "rtl" : "ltr"}; text-align: ${isRtl ? "right" : "left"};">
          <strong>${place.title}</strong><br/>
          <span style="font-size: 12px; opacity: 0.8;">${place.city}</span>
        </div>`,
      )
      .addTo(mapRef.current);
  }, [isRtl]);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (mapRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
    if (!token) {
      console.error("Mapbox token is not set. Please add NEXT_PUBLIC_MAPBOX_API_KEY to your .env file");
      return;
    }

    mapboxgl.accessToken = token;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: MAP_CENTER,
      zoom: 7.6,
      attributionControl: false,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "bottom-left");

    mapRef.current.on("load", () => {
      if (!mapRef.current) return;
      mapLoadedRef.current = true;

      mapRef.current.addSource("places", {
        type: "geojson",
        data: placesToGeoJSON(mappablePlaces),
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 44,
      });

      mapRef.current.addLayer({
        id: "clusters",
        type: "circle",
        source: "places",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#6C2BD9",
          "circle-radius": [
            "step",
            ["get", "point_count"],
            17,
            10,
            20,
            30,
            24,
            60,
            30,
          ],
          "circle-opacity": 0.95,
        },
      });

      mapRef.current.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "places",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: {
          "text-color": "#FFFFFF",
        },
      });

      mapRef.current.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "places",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#7A2BDE",
          "circle-radius": 8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#FFFFFF",
        },
      });

      mapRef.current.on("click", "clusters", (event) => {
        if (!mapRef.current) return;
        const features = mapRef.current.queryRenderedFeatures(event.point, {
          layers: ["clusters"],
        });
        const clusterId = features[0]?.properties?.cluster_id;
        if (typeof clusterId !== "number") return;
        const source = mapRef.current.getSource("places") as mapboxgl.GeoJSONSource & {
          getClusterExpansionZoom: (
            clusterIdParam: number,
            callback: (error: Error | null, zoom: number) => void,
          ) => void;
        };
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err || !mapRef.current) return;
          const feature = features[0];
          const geometry = feature?.geometry as GeoJSON.Point;
          const safeZoom = typeof zoom === "number" ? zoom : mapRef.current.getZoom();
          mapRef.current.easeTo({
            center: geometry.coordinates as [number, number],
            zoom: safeZoom,
          });
        });
      });

      mapRef.current.on("click", "unclustered-point", (event) => {
        const feature = event.features?.[0];
        const placeId = feature?.properties?.id as string | undefined;
        if (!placeId) return;
        const place = placesRef.current.find((item) => item.id === placeId);
        if (!place) return;
        focusPlace(place);
      });

      mapRef.current.on("mouseenter", "clusters", () => {
        if (mapRef.current) mapRef.current.getCanvas().style.cursor = "pointer";
      });
      mapRef.current.on("mouseleave", "clusters", () => {
        if (mapRef.current) mapRef.current.getCanvas().style.cursor = "";
      });
      mapRef.current.on("mouseenter", "unclustered-point", () => {
        if (mapRef.current) mapRef.current.getCanvas().style.cursor = "pointer";
      });
      mapRef.current.on("mouseleave", "unclustered-point", () => {
        if (mapRef.current) mapRef.current.getCanvas().style.cursor = "";
      });
    });

    return () => {
      popupRef.current?.remove();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [focusPlace, mappablePlaces]);

  useEffect(() => {
    if (!mapRef.current || !mapLoadedRef.current) return;
    const source = mapRef.current.getSource("places") as mapboxgl.GeoJSONSource | undefined;
    source?.setData(placesToGeoJSON(mappablePlaces));
    if (selectedPlaceId && !filteredPlaces.some((place) => place.id === selectedPlaceId)) {
      setSelectedPlaceId(null);
      popupRef.current?.remove();
    }
  }, [filteredPlaces, mappablePlaces, selectedPlaceId]);

  useEffect(() => {
    if (!initialPins.length || !onPinAdd) return;
    initialPins.forEach((pin) => onPinAdd(pin));
  }, [initialPins, onPinAdd]);

  const tokenExists = Boolean(process.env.NEXT_PUBLIC_MAPBOX_API_KEY);

  return (
    <div className="flex h-full w-full bg-background text-foreground" dir={isRtl ? "rtl" : "ltr"}>
      <div className="relative order-2 h-full flex-1">
        <div ref={mapContainer} className="h-full w-full" />

        <div className={`absolute top-4 z-20 flex max-w-[78%] flex-wrap gap-2 ${isRtl ? "right-4" : "left-4"}`} dir={isRtl ? "rtl" : "ltr"}>
          <button
            type="button"
            onClick={() => setActiveCategory(ui.all)}
            className={`rounded-full border px-4 py-1.5 text-[12px] font-medium shadow-sm transition ${activeCategory === ui.all
                ? "border-[#6C2BD9] bg-[#6C2BD9] text-white"
                : "border-border bg-surface text-foreground"
              }`}
          >
            {ui.all}
          </button>
          {CATEGORY_CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => setActiveCategory(chip.label)}
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[12px] font-medium shadow-sm transition ${activeCategory === chip.label
                  ? "border-[#6C2BD9] bg-[#6C2BD9] text-white"
                  : "border-border bg-surface text-foreground"
                }`}
            >
              <span>{chip.icon}</span>
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      </div>

      <aside className="order-1 flex h-full w-[330px] flex-col bg-surface text-foreground shadow-[-4px_0_18px_rgba(0,0,0,0.18)] md:w-[360px]">
        <div className="border-b border-border p-4">
          <h1 className={`mb-3 text-[36px] font-bold leading-none ${isRtl ? "text-right" : "text-left"}`}>{ui.discover}</h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={ui.filterLabel}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-transparent text-foreground"
            >
              ⌕
            </button>
            <div className="relative flex-1">
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={ui.search}
                className={`h-9 w-full rounded-md border border-border bg-background px-3 text-[13px] text-foreground outline-none ${isRtl ? "text-right" : "text-left"}`}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-[26px] font-bold">{ui.locations}</h2>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedCity(ui.all);
              setActiveCategory(ui.all);
              setSelectedPlaceId(null);
              popupRef.current?.remove();
            }}
            className="inline-flex items-center rounded-full border border-border px-3 py-1 text-[12px] font-semibold text-foreground transition hover:bg-muted"
          >
            {ui.clearFilters}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 border-b border-border p-3">
          <select
            value={selectedCity}
            onChange={(event) => setSelectedCity(event.target.value)}
            className="h-9 rounded-md border border-border bg-background px-2 text-[12px] text-foreground outline-none"
          >
            {cities.map((city) => (
              <option key={city} value={city} className="text-foreground">
                {city}
              </option>
            ))}
          </select>
          <select
            value={activeCategory}
            onChange={(event) => setActiveCategory(event.target.value)}
            className="h-9 rounded-md border border-border bg-background px-2 text-[12px] text-foreground outline-none"
          >
            <option value={ui.all} className="text-foreground">
              {ui.allCategories}
            </option>
            {CATEGORY_CHIPS.map((chip) => (
              <option key={chip.label} value={chip.label} className="text-foreground">
                {chip.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-3">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className={`relative w-full overflow-hidden rounded-[14px] border p-3 text-right transition ${selectedPlaceId === place.id
                  ? "border-primary bg-muted"
                  : "border-border bg-surface hover:bg-muted"
                }`}
            >
              <img
                src="/assets/travel-essentials/angledsquarepattern.png"
                alt=""
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 opacity-25"
              />
              <div className="relative z-10">
                {place.tag ? (
                  <span className="mb-2 inline-flex rounded-full bg-background px-2 py-0.5 text-[10px] font-semibold text-foreground">
                    {place.tag}
                  </span>
                ) : null}
                <h3 className="text-[27px] font-bold leading-[1.1]">{place.title}</h3>
                <SafeHtml html={place.description} className="mt-2 text-[13px] leading-normal text-muted-foreground" />
                {!place.hasCoordinates ? (
                  <p className="mt-2 text-[11px] text-muted-foreground">{ui.noGeo}</p>
                ) : null}
                <div className="mt-3 flex justify-start">
                  <button
                    type="button"
                    onClick={() => focusPlace(place)}
                    disabled={!place.hasCoordinates}
                    className="inline-flex items-center rounded-full border border-border px-3 py-1 text-[12px] font-semibold text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {ui.showOnMap}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredPlaces.length === 0 ? (
            <div className="rounded-lg border border-border bg-surface p-4 text-center text-sm text-muted-foreground">
              {ui.noResults}
            </div>
          ) : null}
        </div>
      </aside>

      {!tokenExists ? (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black/35">
          <div className="rounded-xl bg-surface px-5 py-4 text-sm font-medium text-foreground">
            {ui.tokenHint}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InteractiveMap;
export type { LocationPin, InteractiveMapProps };
