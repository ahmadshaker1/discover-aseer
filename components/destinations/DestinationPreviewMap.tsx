"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocale } from "next-intl";
import { brandPrimary } from "@/lib/theme/palette";
import {
  ensureMapboxRtlTextPluginRegistered,
  setMapLabelLanguage,
} from "@/lib/mapbox/mapboxLocale";

interface DestinationPreviewMapProps {
  lat: number;
  lon: number;
  title?: string;
  className?: string;
}

const DestinationPreviewMap = ({
  lat,
  lon,
  title,
  className = "",
}: DestinationPreviewMapProps) => {
  const locale = useLocale();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
    if (!token) {
      console.error(
        "Mapbox token is not set. Please add NEXT_PUBLIC_MAPBOX_API_KEY to your .env file",
      );
      return;
    }

    mapboxgl.accessToken = token;
    ensureMapboxRtlTextPluginRegistered(mapboxgl);

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lon, lat],
      zoom: 11,
      attributionControl: false,
      interactive: false,
    });

    map.scrollZoom.disable();
    map.boxZoom.disable();
    map.dragRotate.disable();
    map.dragPan.disable();
    map.keyboard.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();

    map.on("load", () => {
      setMapLabelLanguage(map, locale);
    });

    markerRef.current = new mapboxgl.Marker({ color: brandPrimary })
      .setLngLat([lon, lat])
      .addTo(map);

    if (title) {
      const popup = new mapboxgl.Popup({
        offset: 16,
        closeButton: false,
        closeOnClick: false,
      })
        .setLngLat([lon, lat])
        .setText(title);
      markerRef.current.setPopup(popup);
      popup.addTo(map);
    }

    mapRef.current = map;

    return () => {
      markerRef.current?.remove();
      markerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lon, title, locale]);

  return <div ref={mapContainer} className={`h-full w-full ${className}`} />;
};

export default DestinationPreviewMap;
