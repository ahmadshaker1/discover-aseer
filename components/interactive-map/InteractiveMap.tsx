"use client";

import { Button } from "@headlessui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { brandPrimary } from "@/lib/theme/palette";
import { useLocale, useTranslations } from "next-intl";
import {
  ensureMapboxRtlTextPluginRegistered,
  setMapLabelLanguage,
} from "@/lib/mapbox/mapboxLocale";
import {
  MAP_CATEGORY_ICONS,
  MAP_CATEGORY_KEYS,
  resolvePlaceCategoryKey,
  type MapCategoryKey,
} from "./mapCategories";
import { placeMatchesMapSearch } from "./mapSearch";

import { MapListingsOpenIcon } from "./MapListingsOpenIcon";
import { MapListingsSidebar } from "./MapListingsSidebar";
import { MapPopupContent } from "./MapPopupContent";

interface LocationPin {
  id: string;
  latitude: number;
  longitude: number;
  title?: string;
}

interface InteractiveMapProps {
  initialPins?: LocationPin[];
  onPinAdd?: (pin: LocationPin) => void;
  initialFocus?: {
    latitude: number;
    longitude: number;
    title?: string;
  };
}

interface MapPlace {
  id: string;
  title: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  hasCoordinates: boolean;
  category: string;
  categoryAr?: string;
  categoryEn?: string;
  categoryKey?: MapCategoryKey | null;
  city: string;
  tag?: string;
  mapsUrl?: string;
  imageUrl?: string;
  image?: string;
  image_new?: string;
  picture_url?: string;
  picture_url_new?: string;
  season?: string;
}

interface MapLoadStats {
  totalFetched: number;
  published: number;
  listed: number;
  withCoordinates: number;
  withoutCoordinates: number;
  resolvedThisRequest: number;
  geocodedThisRequest: number;
  geocodeFailed: number;
  geocodeSkippedNoUrl: number;
  byCategoryAr: Record<string, number>;
  eventsFetchOk?: boolean;
  eventsListed?: number;
}

const MAP_CENTER: [number, number] = [42.62, 18.25];

const EMPTY_PLACES: MapPlace[] = [];

const UI_KEYS = [
  "all",
  "discover",
  "filterLabel",
  "search",
  "locations",
  "clearFilters",
  "noGeo",
  "showOnMap",
  "directions",
  "viewMore",
  "viewLess",
  "noResults",
  "loadingLocations",
  "tokenHint",
  "openListings",
  "closeListings",
] as const;

/** Fisher–Yates shuffle; new order on each call (e.g. when places load). */
function shuffleIds(ids: string[]): string[] {
  const copy = [...ids];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const placesToGeoJSON = (
  places: MapPlace[],
): GeoJSON.FeatureCollection<GeoJSON.Point> => ({
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

const InteractiveMap = ({
  initialPins = [],
  onPinAdd,
  initialFocus,
}: InteractiveMapProps) => {
  const locale = useLocale();
  const t = useTranslations("interactiveMap");
  const ui = useMemo(
    () =>
      Object.fromEntries(UI_KEYS.map((key) => [key, t(key)])) as Record<
        (typeof UI_KEYS)[number],
        string
      >,
    [t],
  );
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapLoadedRef = useRef(false);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const popupRootRef = useRef<Root | null>(null);
  const placesRef = useRef<MapPlace[]>(EMPTY_PLACES);

  const [activeCategories, setActiveCategories] = useState<MapCategoryKey[]>(
    [],
  );
  const [selectedCity, setSelectedCity] = useState<string>(ui.all);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [places, setPlaces] = useState<MapPlace[]>(EMPTY_PLACES);
  const [isPlacesLoading, setIsPlacesLoading] = useState(true);
  const [isListingsOpen, setIsListingsOpen] = useState(false);

  const cities = useMemo(
    () => [ui.all, ...Array.from(new Set(places.map((place) => place.city)))],
    [places, ui.all],
  );

  const categoryLabel = useCallback(
    (key: MapCategoryKey) => t(`categories.${key}`),
    [t],
  );

  const toggleCategory = useCallback((key: MapCategoryKey) => {
    setActiveCategories((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  }, []);

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const placeCategoryKey = resolvePlaceCategoryKey(place);
      const categoryMatch =
        activeCategories.length === 0 ||
        (placeCategoryKey != null &&
          activeCategories.includes(placeCategoryKey));
      const cityMatch = selectedCity === ui.all || place.city === selectedCity;
      const searchMatch = placeMatchesMapSearch(place, searchTerm);
      return categoryMatch && cityMatch && searchMatch;
    });
  }, [activeCategories, places, searchTerm, selectedCity, ui.all]);

  const sidebarPlaceOrder = useMemo(() => {
    const shuffled = shuffleIds(places.map((place) => place.id));
    return new Map(shuffled.map((id, index) => [id, index]));
  }, [places]);

  const sidebarPlaces = useMemo(() => {
    if (sidebarPlaceOrder.size === 0) return filteredPlaces;
    return [...filteredPlaces].sort(
      (a, b) =>
        (sidebarPlaceOrder.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
        (sidebarPlaceOrder.get(b.id) ?? Number.MAX_SAFE_INTEGER),
    );
  }, [filteredPlaces, sidebarPlaceOrder]);

  const mappablePlaces = useMemo(
    () =>
      filteredPlaces.filter(
        (place) =>
          place.hasCoordinates &&
          place.latitude != null &&
          place.longitude != null,
      ),
    [filteredPlaces],
  );

  const radioSelectedPlaceId = useMemo((): string | null => {
    if (!selectedPlaceId) return null;
    return filteredPlaces.some((place) => place.id === selectedPlaceId)
      ? selectedPlaceId
      : null;
  }, [filteredPlaces, selectedPlaceId]);

  useEffect(() => {
    placesRef.current = places;
  }, [places]);

  useEffect(() => {
    let cancelled = false;
    setIsPlacesLoading(true);

    const loadLocations = async () => {
      try {
        const response = await fetch(
          `/api/interactive-map/locations?${new URLSearchParams({
            locale,
            /** Many CMS rows only have a Maps URL; server resolves lat/lng for pins. */
            resolve: "true",
            resolveLimit: "40",
          }).toString()}`);
        if (!response.ok || cancelled) return;

        const json: { data?: MapPlace[]; stats?: MapLoadStats } =
          await response.json();

        if (Array.isArray(json.data) && !cancelled) {
          setPlaces(json.data);
        }

        if (
          process.env.NODE_ENV === "development" &&
          json.stats &&
          !cancelled
        ) {
          console.info(
            "[interactive-map] loaded from /api/interactive-map/locations (Directus runs on server). Stats:",
            json.stats,
          );
        }
      } catch (error) {
        console.error(
          "[interactive-map] Failed to load Directus locations",
          error,
        );
      } finally {
        if (!cancelled) setIsPlacesLoading(false);
      }
    };

    loadLocations();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const clearMapPopup = useCallback(() => {
    popupRef.current?.remove();
    popupRef.current = null;
    popupRootRef.current?.unmount();
    popupRootRef.current = null;
  }, []);

  const showPlacePopup = useCallback(
    (place: MapPlace) => {
      if (
        !mapRef.current ||
        place.latitude == null ||
        place.longitude == null
      ) {
        return;
      }

      clearMapPopup();

      const container = document.createElement("div");
      const root = createRoot(container);
      popupRootRef.current = root;
      root.render(
        <MapPopupContent
          place={place}
          directionsLabel={ui.directions}
          viewMoreLabel={ui.viewMore}
          viewLessLabel={ui.viewLess}
          locale={locale}
        />,
      );

      const popup = new mapboxgl.Popup({
        offset: 18,
        closeButton: true,
        maxWidth: "320px",
        className: "interactive-map-popup",
      })
        .setLngLat([place.longitude, place.latitude])
        .setDOMContent(container)
        .addTo(mapRef.current);

      popup.on("close", () => {
        popupRootRef.current?.unmount();
        popupRootRef.current = null;
      });

      popupRef.current = popup;
    },
    [clearMapPopup, locale, ui.directions, ui.viewLess, ui.viewMore],
  );

  const focusCoordinates = useCallback(
    (latitude: number, longitude: number) => {
      if (!mapRef.current) return;
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 12.5,
        essential: true,
      });
    },
    [],
  );

  const focusPlace = useCallback(
    (place: MapPlace) => {
      setSelectedPlaceId(place.id);
      if (
        !place.hasCoordinates ||
        place.latitude == null ||
        place.longitude == null
      ) {
        return;
      }
      focusCoordinates(place.latitude, place.longitude);
      showPlacePopup(place);
    },
    [focusCoordinates, showPlacePopup],
  );

  useEffect(() => {
    if (!mapContainer.current) return;
    if (mapRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
    if (!token) {
      console.error(
        "Mapbox token is not set. Please add NEXT_PUBLIC_MAPBOX_API_KEY to your .env file",
      );
      return;
    }

    let cancelled = false;

    ensureMapboxRtlTextPluginRegistered(mapboxgl);
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: MAP_CENTER,
      zoom: 7.6,
      attributionControl: false,
      config: {
        basemap: {
          theme: "faded",
          lightPreset: "day",
        },
      },
    });

    if (cancelled) {
      mapRef.current.remove();
      mapRef.current = null;
      return;
    }

    mapRef.current.addControl(
      new mapboxgl.NavigationControl(),
      locale === "ar" ? "bottom-right" : "bottom-left",
    );

    mapRef.current.on("load", () => {
      if (!mapRef.current || cancelled) return;
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
          "circle-color": brandPrimary,
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
          "circle-color": brandPrimary,
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
        const source = mapRef.current.getSource(
          "places",
        ) as mapboxgl.GeoJSONSource & {
          getClusterExpansionZoom: (
            clusterIdParam: number,
            callback: (error: Error | null, zoom: number) => void,
          ) => void;
        };
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err || !mapRef.current) return;
          const feature = features[0];
          const geometry = feature?.geometry as GeoJSON.Point;
          const safeZoom =
            typeof zoom === "number" ? zoom : mapRef.current.getZoom();
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

      setMapLabelLanguage(mapRef.current, locale);
      mapLoadedRef.current = true;
      mapRef.current.resize();
    });

    return () => {
      cancelled = true;
      clearMapPopup();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      mapLoadedRef.current = false;
    };
  }, [clearMapPopup, focusPlace, locale]);

  useEffect(() => {
    if (!mapRef.current || !mapLoadedRef.current) return;
    ensureMapboxRtlTextPluginRegistered(mapboxgl);
    setMapLabelLanguage(mapRef.current, locale);
  }, [locale]);

  useEffect(() => {
    if (!mapRef.current || !mapLoadedRef.current) return;
    const source = mapRef.current.getSource("places") as
      | mapboxgl.GeoJSONSource
      | undefined;
    source?.setData(placesToGeoJSON(mappablePlaces));
    if (
      selectedPlaceId &&
      !filteredPlaces.some((place) => place.id === selectedPlaceId)
    ) {
      clearMapPopup();
    }
  }, [clearMapPopup, filteredPlaces, mappablePlaces, selectedPlaceId]);

  useEffect(() => {
    if (!initialPins.length || !onPinAdd) return;
    initialPins.forEach((pin) => onPinAdd(pin));
  }, [initialPins, onPinAdd]);

  useEffect(() => {
    if (!initialFocus || !mapRef.current || !mapLoadedRef.current) return;
    focusCoordinates(initialFocus.latitude, initialFocus.longitude);
  }, [focusCoordinates, initialFocus]);

  useEffect(() => {
    if (!isListingsOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isListingsOpen]);

  useEffect(() => {
    const desktopMq = window.matchMedia("(min-width: 768px)");
    const closeDrawerOnDesktop = () => {
      if (desktopMq.matches) setIsListingsOpen(false);
    };
    desktopMq.addEventListener("change", closeDrawerOnDesktop);
    return () => desktopMq.removeEventListener("change", closeDrawerOnDesktop);
  }, []);

  useEffect(() => {
    if (!selectedPlaceId || !popupRef.current) return;

    const place = placesRef.current.find((item) => item.id === selectedPlaceId);
    if (!place || place.latitude == null || place.longitude == null) {
      return;
    }

    const refreshPopupTheme = () => {
      popupRef.current?.setHTML(
        buildMapPopupHtml(place, {
          directionsLabel: ui.directions,
          locale,
        }),
      );
    };

    const observer = new MutationObserver(refreshPopupTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [locale, selectedPlaceId, ui.directions]);

  useEffect(() => {
    const container = mapContainer.current;
    if (!container) return;

    const resizeMap = () => {
      mapRef.current?.resize();
    };

    const observer = new ResizeObserver(resizeMap);
    observer.observe(container);

    const desktopMq = window.matchMedia("(min-width: 768px)");
    desktopMq.addEventListener("change", resizeMap);

    return () => {
      observer.disconnect();
      desktopMq.removeEventListener("change", resizeMap);
    };
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCity(ui.all);
    setActiveCategories([]);
    setSelectedPlaceId(null);
    clearMapPopup();
  }, [clearMapPopup, ui.all]);

  const handleSelectPlace = useCallback(
    (placeId: string) => {
      const id = placeId.length > 0 ? placeId : null;
      setSelectedPlaceId(id);
      if (!id) return;
      const place = filteredPlaces.find((item) => item.id === id);
      if (place) focusPlace(place);
      setIsListingsOpen(false);
    },
    [filteredPlaces, focusPlace],
  );

  const listingsSidebarProps = {
    ui,
    searchTerm,
    onSearchTermChange: setSearchTerm,
    selectedCity,
    onSelectedCityChange: setSelectedCity,
    cities,
    filteredPlaces: sidebarPlaces,
    isLoading: isPlacesLoading,
    radioSelectedPlaceId,
    onSelectPlace: handleSelectPlace,
    onClearFilters: handleClearFilters,
    viewMore: ui.viewMore,
    viewLess: ui.viewLess,
    closeLabel: ui.closeListings,
  };

  const tokenExists = Boolean(process.env.NEXT_PUBLIC_MAPBOX_API_KEY);
  const isRtl = locale === "ar";

  const mapColumn = (
    <div className="relative h-full min-h-0 min-w-0 flex-1">
      <div ref={mapContainer} className="h-full w-full min-h-[280px]" />

      <div className="pointer-events-none absolute inset-x-3 top-3 z-20 max-md:end-14 sm:inset-x-4 sm:top-4">
        <div className="pointer-events-auto flex w-full min-w-0 flex-nowrap gap-1.5 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2">
          {MAP_CATEGORY_KEYS.map((key) => {
            const Icon = MAP_CATEGORY_ICONS[key];
            const label = categoryLabel(key);
            const isActive = activeCategories.includes(key);
            return (
              <Button
                key={key}
                type="button"
                aria-pressed={isActive}
                onClick={() => toggleCategory(key)}
                className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-2 text-[13px] font-medium leading-tight shadow-sm transition sm:gap-2 sm:px-4 sm:py-2.5 sm:text-[15px] data-focus:outline-none data-focus:ring-2 data-focus:ring-[#6C2BD9] data-focus:ring-offset-2 ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-foreground"
                }`}
              >
                <Icon className="size-4 sm:size-5" />
                <span className="whitespace-nowrap">{label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsListingsOpen(true)}
        aria-label={ui.openListings}
        className="absolute bottom-[calc(env(safe-area-inset-bottom)+2.5rem)] end-5 z-50 flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-primary bg-surface text-primary shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:hidden"
      >
        <MapListingsOpenIcon />
      </button>

      {!tokenExists ? (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black/35">
          <div className="rounded-xl bg-surface px-5 py-4 text-sm font-medium text-foreground">
            {ui.tokenHint}
          </div>
        </div>
      ) : null}
    </div>
  );

  const desktopSidebar = (
    <div
      className={`hidden h-full w-[360px] shrink-0 md:flex xl:w-[400px] ${isRtl ? "shadow-[-4px_0_18px_rgba(0,0,0,0.18)]" : "shadow-[4px_0_18px_rgba(0,0,0,0.18)]"}`}
    >
      <MapListingsSidebar
        {...listingsSidebarProps}
        locale={locale}
        className="flex h-full w-full min-h-0 flex-col"
      />
    </div>
  );

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="relative flex h-full w-full flex-row bg-background text-foreground"
    >
      {desktopSidebar}
      {mapColumn}

      {isListingsOpen ? (
        <div className="fixed inset-0 z-60 md:hidden" role="presentation">
          <button
            type="button"
            aria-label={ui.closeListings}
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsListingsOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 top-[12dvh] flex max-h-[88dvh] flex-col overflow-hidden rounded-t-2xl border-t border-border bg-surface shadow-[0_-8px_32px_rgba(0,0,0,0.2)]">
            <div
              className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-border"
              aria-hidden
            />
            <MapListingsSidebar
              {...listingsSidebarProps}
              locale={locale}
              showCloseButton
              onClose={() => setIsListingsOpen(false)}
              className="flex min-h-0 flex-1 flex-col"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InteractiveMap;
export type { LocationPin, InteractiveMapProps, MapPlace };
