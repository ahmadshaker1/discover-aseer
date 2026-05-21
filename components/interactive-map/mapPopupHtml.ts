import {
  htmlToPlainText,
  MAP_DESCRIPTION_PREVIEW_LENGTH,
} from "./mapPlaceDescription";
import { MAP_DIRECTIONS_ICON_SVG } from "./mapDirectionsIcon";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

type MapPopupPlace = {
  id: string;
  title: string;
  description: string;
  city?: string;
  tag?: string;
  mapsUrl?: string;
  imageUrl?: string;
};

export function buildMapPopupHtml(
  place: MapPopupPlace,
  options: {
    directionsLabel: string;
    viewMoreLabel: string;
    viewLessLabel: string;
    locale: string;
  },
): string {
  const plainDescription = htmlToPlainText(place.description);
  const isLongDescription =
    plainDescription.length > MAP_DESCRIPTION_PREVIEW_LENGTH;
  const expandId = `interactive-map-popup-expand-${place.id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const dir = options.locale === "ar" ? "rtl" : "ltr";
  const badgeLabel = (place.city || place.tag || "").trim();

  const imageHtml = place.imageUrl
    ? `<div class="interactive-map-popup-media"><img src="${escapeHtml(place.imageUrl)}" alt="" /></div>`
    : "";

  const badgeHtml = badgeLabel
    ? `<span class="interactive-map-popup-tag">${escapeHtml(badgeLabel)}</span>`
    : "";

  const headerHtml = `<div class="interactive-map-popup-header">
        <strong class="interactive-map-popup-title">${escapeHtml(place.title)}</strong>
        ${badgeHtml}
      </div>`;

  const descriptionHtml = plainDescription
    ? isLongDescription
      ? `<div class="interactive-map-popup-desc-wrap">
          <input type="checkbox" id="${expandId}" class="interactive-map-popup-expand" aria-hidden="true" />
          <p class="interactive-map-popup-desc">${escapeHtml(plainDescription)}</p>
          <label for="${expandId}" class="interactive-map-popup-toggle interactive-map-popup-toggle-more">${escapeHtml(options.viewMoreLabel)}</label>
          <label for="${expandId}" class="interactive-map-popup-toggle interactive-map-popup-toggle-less">${escapeHtml(options.viewLessLabel)}</label>
        </div>`
      : `<p class="interactive-map-popup-desc">${escapeHtml(plainDescription)}</p>`
    : "";

  const mapsHtml = place.mapsUrl
    ? `<a href="${escapeHtml(place.mapsUrl)}" target="_blank" rel="noopener noreferrer" class="interactive-map-popup-directions"><span class="interactive-map-popup-directions-icon">${MAP_DIRECTIONS_ICON_SVG}</span><span class="interactive-map-popup-directions-label">${escapeHtml(options.directionsLabel)}</span></a>`
    : "";

  return `<div class="interactive-map-popup-card" dir="${dir}">
      ${imageHtml}
      <div class="interactive-map-popup-body">
        ${headerHtml}
        ${descriptionHtml}
        ${mapsHtml}
      </div>
    </div>`;
}
