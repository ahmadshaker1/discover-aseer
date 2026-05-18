"use client";

import {
  Button,
  Field,
  Input,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  RadioGroup,
} from "@headlessui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
}

const MAP_CENTER: [number, number] = [42.62, 18.25];

const EMPTY_PLACES: MapPlace[] = [];

const CARD_DESCRIPTION_MAX_LENGTH = 160;

const toMapCardDescription = (html: string): string => {
  const plain = html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
  if (!plain) return "";
  if (plain.length <= CARD_DESCRIPTION_MAX_LENGTH) return plain;
  return `${plain.slice(0, CARD_DESCRIPTION_MAX_LENGTH).trimEnd()}…`;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildMapPopupHtml = (
  place: MapPlace,
  options: { directionsLabel: string; locale: string },
): string => {
  const description = toMapCardDescription(place.description);
  const dir = options.locale === "ar" ? "rtl" : "ltr";

  const imageHtml = place.imageUrl
    ? `<img src="${escapeHtml(place.imageUrl)}" alt="" style="display:block;width:100%;height:100px;object-fit:cover;" />`
    : "";

  const tagHtml = place.tag
    ? `<span style="display:inline-block;margin-bottom:8px;border-radius:9999px;background:var(--background,#fff);padding:4px 10px;font-size:13px;font-weight:600;color:var(--foreground,#111);">${escapeHtml(place.tag)}</span>`
    : "";

  const descriptionHtml = description
    ? `<p style="margin:6px 0 0;font-size:15px;line-height:1.35;color:var(--muted-foreground,#6b7280);">${escapeHtml(description)}</p>`
    : "";

  const mapsHtml = place.mapsUrl
    ? `<a href="${escapeHtml(place.mapsUrl)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:10px;font-size:14px;font-weight:600;color:var(--primary,#6027d2);text-decoration:underline;">${escapeHtml(options.directionsLabel)}</a>`
    : "";

  return `<div class="interactive-map-popup-card" style="direction:${dir};text-align:start;font-family:inherit;color:var(--foreground,#111);">
      ${imageHtml}
      <div style="padding:12px 14px 14px;">
        ${tagHtml}
        <strong style="display:block;font-size:20px;line-height:1.15;">${escapeHtml(place.title)}</strong>
        ${descriptionHtml}
        ${mapsHtml}
      </div>
    </div>`;
};

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
  "noResults",
  "tokenHint",
] as const;

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
  const placesRef = useRef<MapPlace[]>(EMPTY_PLACES);

  const [activeCategories, setActiveCategories] = useState<MapCategoryKey[]>(
    [],
  );
  const [selectedCity, setSelectedCity] = useState<string>(ui.all);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [places, setPlaces] = useState<MapPlace[]>(EMPTY_PLACES);

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
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return places.filter((place) => {
      const placeCategoryKey = resolvePlaceCategoryKey(place);
      const categoryMatch =
        activeCategories.length === 0 ||
        (placeCategoryKey != null &&
          activeCategories.includes(placeCategoryKey));
      const cityMatch = selectedCity === ui.all || place.city === selectedCity;
      const searchMatch =
        normalizedSearch.length === 0 ||
        place.title.toLowerCase().includes(normalizedSearch) ||
        place.description.toLowerCase().includes(normalizedSearch);
      return categoryMatch && cityMatch && searchMatch;
    });
  }, [activeCategories, places, searchTerm, selectedCity, ui.all]);

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

    const loadLocations = async () => {
      try {
        const response = await fetch(
          `/api/interactive-map/locations?${new URLSearchParams({ locale }).toString()}`,
          { cache: "no-store" },
        );
        if (!response.ok || cancelled) return;

        const json: { data?: MapPlace[]; stats?: MapLoadStats } =
          await response.json();

        if (Array.isArray(json.data) && !cancelled) {
          setPlaces(json.data);
        }

        if (process.env.NODE_ENV === "development" && json.stats && !cancelled) {
          console.info("[interactive-map] locations stats", json.stats);
        }
      } catch (error) {
        console.error(
          "[interactive-map] Failed to load Directus locations",
          error,
        );
      }
    };

    loadLocations();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const showPlacePopup = useCallback(
    (place: MapPlace) => {
      if (
        !mapRef.current ||
        place.latitude == null ||
        place.longitude == null
      ) {
        return;
      }

      popupRef.current?.remove();
      popupRef.current = new mapboxgl.Popup({
        offset: 18,
        closeButton: true,
        maxWidth: "300px",
        className: "interactive-map-popup",
      })
        .setLngLat([place.longitude, place.latitude])
        .setHTML(
          buildMapPopupHtml(place, {
            directionsLabel: ui.directions,
            locale,
          }),
        )
        .addTo(mapRef.current);
    },
    [locale, ui.directions],
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

    ensureMapboxRtlTextPluginRegistered(mapboxgl, locale);
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: MAP_CENTER,
      zoom: 7.6,
      attributionControl: false,
    });

    if (cancelled) {
      mapRef.current.remove();
      mapRef.current = null;
      return;
    }

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "bottom-left");

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
    });

    return () => {
      cancelled = true;
      popupRef.current?.remove();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      mapLoadedRef.current = false;
    };
  }, [focusPlace, locale]);

  useEffect(() => {
    if (!mapRef.current || !mapLoadedRef.current) return;
    ensureMapboxRtlTextPluginRegistered(mapboxgl, locale);
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
      popupRef.current?.remove();
    }
  }, [filteredPlaces, mappablePlaces, selectedPlaceId]);

  useEffect(() => {
    if (!initialPins.length || !onPinAdd) return;
    initialPins.forEach((pin) => onPinAdd(pin));
  }, [initialPins, onPinAdd]);

  useEffect(() => {
    if (!initialFocus || !mapRef.current || !mapLoadedRef.current) return;
    focusCoordinates(initialFocus.latitude, initialFocus.longitude);
  }, [focusCoordinates, initialFocus]);

  const tokenExists = Boolean(process.env.NEXT_PUBLIC_MAPBOX_API_KEY);

  return (
    <div className="flex h-full w-full bg-background text-foreground">
      <div className="relative order-2 h-full flex-1">
        <div ref={mapContainer} className="h-full w-full" />

        <div
          className={`absolute top-4 z-20 flex max-w-[78%] flex-wrap gap-2 start-4`}
        >
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
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-[15px] font-medium leading-tight shadow-sm transition data-focus:outline-none data-focus:ring-2 data-focus:ring-[#6C2BD9] data-focus:ring-offset-2 ${isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-foreground"
                  }`}
              >
                <Icon className="size-5" />
                <span>{label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <aside className="order-1 flex h-full w-[360px] flex-col bg-surface text-foreground shadow-[-4px_0_18px_rgba(0,0,0,0.18)] md:w-[400px]">
        <div className="border-b border-border p-5">
          <h1 className="mb-4 text-[42px] font-bold leading-none text-start">
            {ui.discover}
          </h1>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              aria-label={ui.filterLabel}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-transparent text-lg text-foreground data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2"
            >
              ⌕
            </Button>
            <Field className="relative flex-1">
              <Label className="sr-only">{ui.search}</Label>
              <Input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={ui.search}
                className="h-11 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none text-start data-focus:border-primary data-focus:ring-2 data-focus:ring-primary/30"
              />
            </Field>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-[30px] font-bold leading-tight">{ui.locations}</h2>
          <Button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedCity(ui.all);
              setActiveCategories([]);
              setSelectedPlaceId(null);
              popupRef.current?.remove();
            }}
            className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-[15px] font-semibold text-foreground transition hover:bg-muted data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2"
          >
            {ui.clearFilters}
          </Button>
        </div>

        <div className="border-b border-border p-4">
          <Listbox value={selectedCity} onChange={setSelectedCity}>
            <div className="relative">
              <ListboxButton className="flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-border bg-background px-3 text-start text-[15px] text-foreground data-focus:border-primary data-focus:outline-none data-focus:ring-2 data-focus:ring-primary/30">
                <span className="min-w-0 truncate">{selectedCity}</span>
                <span className="shrink-0 text-xs opacity-60" aria-hidden>
                  ▾
                </span>
              </ListboxButton>
              <ListboxOptions
                anchor="bottom start"
                transition
                modal={false}
                className="z-100 max-h-56 w-(--button-width) overflow-auto rounded-md border border-border bg-background py-1 text-[15px] shadow-lg [--anchor-gap:4px] transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0 data-[anchor~=end]:origin-top-end"
              >
                {cities.map((city) => (
                  <ListboxOption
                    key={city}
                    value={city}
                    className="cursor-pointer px-3 py-2.5 text-foreground data-focus:bg-muted data-selected:bg-primary/10 data-selected:font-semibold"
                  >
                    {city}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {filteredPlaces.length > 0 ? (
            <RadioGroup
              value={radioSelectedPlaceId}
              onChange={(placeId) => {
                setSelectedPlaceId(placeId);
                const place = filteredPlaces.find((item) => item.id === placeId);
                if (place) focusPlace(place);
              }}
              className="space-y-3"
            >
              {filteredPlaces.map((place) => {
                const descriptionPreview = toMapCardDescription(place.description);
                return (
                  <RadioGroup.Option
                    key={place.id}
                    value={place.id}
                    className={({ checked, focus }) =>
                      `relative flex min-h-[120px] w-full cursor-pointer overflow-hidden rounded-[14px] border text-start outline-none transition ${checked
                        ? "border-primary bg-muted"
                        : "border-border bg-surface hover:bg-muted"
                      } ${focus ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : ""}`
                    }
                  >
                    {place.imageUrl ? (
                      <div className="absolute inset-y-0 start-0 z-0 w-1/3 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element -- CMS image URL */}
                        <img
                          src={place.imageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : null}
                    <div
                      className={`relative z-10 min-w-0 flex-1 p-4 ${place.imageUrl ? "ps-[calc(33.333%+12px)]" : ""
                        }`}
                    >
                      {place.tag ? (
                        <span className="mb-2 inline-flex rounded-full bg-background px-2.5 py-1 text-[13px] font-semibold text-foreground">
                          {place.tag}
                        </span>
                      ) : null}
                      <h3 className="line-clamp-2 text-[20px] font-bold leading-[1.15] sm:text-[21px]">
                        {place.title}
                      </h3>
                      {descriptionPreview ? (
                        <p className="mt-1.5 line-clamp-4 text-[15px] leading-snug text-muted-foreground">
                          {descriptionPreview}
                        </p>
                      ) : null}
                      {!place.hasCoordinates ? (
                        <p className="mt-2 text-[14px] text-muted-foreground">
                          {ui.noGeo}
                        </p>
                      ) : null}
                      {place.mapsUrl ? (
                        <a
                          href={place.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="mt-2 inline-block text-[14px] font-semibold text-primary underline-offset-2 hover:underline"
                        >
                          {ui.directions}
                        </a>
                      ) : null}
                    </div>
                  </RadioGroup.Option>
                );
              })}
            </RadioGroup>
          ) : null}
          {filteredPlaces.length === 0 ? (
            <div className="rounded-lg border border-border bg-surface p-4 text-center text-lg text-muted-foreground">
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
export type { LocationPin, InteractiveMapProps, MapPlace };
