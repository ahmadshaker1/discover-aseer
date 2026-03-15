"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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

const InteractiveMap = ({ initialPins = [], onPinAdd }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const initialPinsRef = useRef<string>("");

  const addMarker = useCallback((pin: LocationPin) => {
    if (!map.current) return;

    const el = document.createElement("div");
    el.className = "custom-marker";
    el.style.width = "30px";
    el.style.height = "30px";
    el.style.borderRadius = "50%";
    el.style.backgroundColor = "#3b82f6";
    el.style.border = "3px solid white";
    el.style.cursor = "pointer";
    el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";

    const marker = new mapboxgl.Marker(el)
      .setLngLat([pin.longitude, pin.latitude])
      .addTo(map.current);

    if (pin.title) {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(pin.title);
      marker.setPopup(popup);
    }

    markersRef.current.push(marker);
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
    if (!token) {
      console.error("Mapbox token is not set. Please add NEXT_PUBLIC_MAPBOX_API_KEY to your .env file");
      return;
    }

    mapboxgl.accessToken = token;

    // Initialize map centered on Aseer, Saudi Arabia
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [42.5000, 18.2167], // Aseer, Saudi Arabia [longitude, latitude]
      zoom: 10,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add initial pins after map is loaded
    map.current.on("load", () => {
      if (initialPins.length > 0) {
        initialPins.forEach((pin) => {
          addMarker(pin);
        });
        initialPinsRef.current = JSON.stringify(initialPins);
      }
    });

    // Cleanup
    return () => {
      // Remove all markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Handle initialPins changes (only when they actually change)
  useEffect(() => {
    if (!map.current) return;

    const currentPinsString = JSON.stringify(initialPins);
    // Only update if pins actually changed
    if (currentPinsString === initialPinsRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new pins
    if (initialPins.length > 0) {
      initialPins.forEach((pin) => {
        addMarker(pin);
      });
    }

    initialPinsRef.current = currentPinsString;
  }, [initialPins, addMarker]);

  // Function to add a pin programmatically
  const addPin = useCallback((latitude: number, longitude: number, title?: string) => {
    const newPin: LocationPin = {
      id: `pin-${Date.now()}`,
      latitude,
      longitude,
      title,
    };
    addMarker(newPin);
    if (onPinAdd) {
      onPinAdd(newPin);
    }
  }, [addMarker, onPinAdd]);

  // Expose addPin function via window for external use
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).addMapPin = addPin;
    }
    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).addMapPin;
      }
    };
  }, [addPin]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default InteractiveMap;
export type { LocationPin, InteractiveMapProps };
