import type { Map } from "mapbox-gl";

/**
 * Mapbox-hosted RTL worker build matching `@mapbox/mapbox-gl-rtl-text@0.4.0`.
 * Override with `NEXT_PUBLIC_MAPBOX_RTL_TEXT_PLUGIN_URL` if you self-host the file.
 */
const DEFAULT_RTL_PLUGIN_URL =
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.4.0/mapbox-gl-rtl-text.js";

let rtlTextPluginRegistrationAttempted = false;

export function mapLocaleToMapboxLanguage(locale: string): "ar" | "en" {
  return locale.toLowerCase().startsWith("ar") ? "ar" : "en";
}

/**
 * Registers the Mapbox RTL text plugin once (Arabic / Hebrew shaping).
 * Always load it: English maps in Aseer still show Arabic-only place names,
 * and without this plugin those labels render as disconnected letters.
 * Synchronous and non-blocking — does not wait on network; Mapbox loads the worker when needed.
 */
export function ensureMapboxRtlTextPluginRegistered(
  mapboxgl: typeof import("mapbox-gl").default,
): void {
  if (typeof window === "undefined") return;
  if (rtlTextPluginRegistrationAttempted) return;
  rtlTextPluginRegistrationAttempted = true;

  const url =
    process.env.NEXT_PUBLIC_MAPBOX_RTL_TEXT_PLUGIN_URL?.trim() ||
    DEFAULT_RTL_PLUGIN_URL;
  try {
    mapboxgl.setRTLTextPlugin(
      url,
      (err) => {
        if (err) console.warn("[mapbox] RTL text plugin:", err);
      },
      true,
    );
  } catch {
    /* already registered (e.g. HMR) */
  }
}

/** @deprecated Use `ensureMapboxRtlTextPluginRegistered` — kept for call sites that still `await`. */
export async function prepareMapboxForLocale(
  mapboxgl: typeof import("mapbox-gl").default,
  _locale?: string,
): Promise<void> {
  ensureMapboxRtlTextPluginRegistered(mapboxgl);
}

/**
 * Sets basemap label language via Mapbox GL JS (`streets-v12` supports `ar` / `en`).
 */
export function setMapLabelLanguage(map: Map, locale: string): void {
  const lang = mapLocaleToMapboxLanguage(locale);
  try {
    map.setLanguage(lang);
  } catch (e) {
    console.warn("[mapbox] setLanguage:", e);
  }
}
