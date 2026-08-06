"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocale } from "next-intl";
import MapPlaceholderSection from "@/components/MapPlaceholderSection";
import {
  ensureMapboxRtlTextPluginRegistered,
  setMapLabelLanguage,
} from "@/lib/mapbox/mapboxLocale";

const DEFAULT_ZOOM = 12.5;

export interface AttractionPointMapProps {
  latitude: number;
  longitude: number;
  mapHref: string;
  ctaLabel: string;
  imageAlt?: string;
}

function MapboxMapInner({
  latitude,
  longitude,
  mapHref,
  ctaLabel,
}: AttractionPointMapProps) {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const mapInstRef = useRef<mapboxgl.Map | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const lng = longitude;
    const lat = latitude;
    const token = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
    if (!token) return;

    let cancelled = false;

    const onOrientation = () => mapInstRef.current?.resize();

    ensureMapboxRtlTextPluginRegistered(mapboxgl, locale);
    if (cancelled || !containerRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: el,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: DEFAULT_ZOOM,
      attributionControl: true,
    });

    if (cancelled) {
      map.remove();
      return;
    }

    mapInstRef.current = map;

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    markerRef.current = new mapboxgl.Marker({ color: "#6027D2" }).setLngLat([lng, lat]).addTo(map);

    map.once("load", () => {
      if (cancelled) return;
      setMapLabelLanguage(map, locale);
    });

    if (typeof ResizeObserver !== "undefined") {
      roRef.current = new ResizeObserver(() => map.resize());
      roRef.current.observe(el);
    }
    window.addEventListener("orientationchange", onOrientation);

    return () => {
      cancelled = true;
      window.removeEventListener("orientationchange", onOrientation);
      roRef.current?.disconnect();
      roRef.current = null;
      markerRef.current?.remove();
      markerRef.current = null;
      mapInstRef.current?.remove();
      mapInstRef.current = null;
    };
  }, [latitude, longitude, locale]);

  return (
    <section className="w-full bg-background py-12 text-foreground">
      <div className="mx-auto w-full max-w-[1437px] px-4 sm:px-6">
        <div className="relative h-[468.7745056152344px] w-full max-w-[1437px] shrink-0 overflow-hidden rounded-xl border border-border shadow-sm">
          <div ref={containerRef} className="absolute inset-0 h-full w-full" />
          <div className="pointer-events-none absolute inset-x-4 top-1/2 z-10 flex -translate-y-1/2 justify-center">
            <a
              href={mapHref}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto inline-flex max-w-full items-center justify-center gap-2 whitespace-normal rounded-[55px] border border-solid border-[#FFFFFF54] bg-[#6027D2] px-6 py-3 text-center text-[20px] font-bold leading-[119%] text-white transition-opacity hover:opacity-90 sm:px-10 sm:py-[14px]"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Single-point Mapbox map for an attraction. Falls back to the static placeholder
 * when `NEXT_PUBLIC_MAPBOX_API_KEY` is not set (same UX as before).
 */
const AttractionPointMap = (props: AttractionPointMapProps) => {
  if (!process.env.NEXT_PUBLIC_MAPBOX_API_KEY) {
    return (
      <MapPlaceholderSection
        ctaLabel={props.ctaLabel}
        mapHref={props.mapHref}
        imageAlt={props.imageAlt}
      />
    );
  }

  return <MapboxMapInner {...props} />;
};

export default AttractionPointMap;
