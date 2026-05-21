import {
  htmlToPlainText,
  MAP_DESCRIPTION_PREVIEW_LENGTH,
} from "./mapPlaceDescription";
import { MapDirectionsIcon } from "./MapDirectionsIcon";
import { resolveMapPlaceImageUrl } from "./mapPlaceImage";

export type MapPopupPlace = {
  id: string;
  title: string;
  description: string;
  city?: string;
  tag?: string;
  mapsUrl?: string;
  imageUrl?: string;
};

type MapPopupContentProps = {
  place: MapPopupPlace;
  directionsLabel: string;
  viewMoreLabel: string;
  viewLessLabel: string;
  locale: string;
};

export function MapPopupContent({
  place,
  directionsLabel,
  viewMoreLabel,
  viewLessLabel,
  locale,
}: MapPopupContentProps) {
  const plainDescription = htmlToPlainText(place.description);
  const isLongDescription =
    plainDescription.length > MAP_DESCRIPTION_PREVIEW_LENGTH;
  const expandId = `interactive-map-popup-expand-${place.id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const badgeLabel = (place.city || place.tag || "").trim();
  const imageSrc = resolveMapPlaceImageUrl(place.imageUrl);

  return (
    <div className="interactive-map-popup-card" dir={dir}>
      <div className="interactive-map-popup-media">
        {/* eslint-disable-next-line @next/next/no-img-element -- CMS photo or default placeholder */}
        <img src={imageSrc} alt="" />
      </div>
      <div className="interactive-map-popup-body">
        <div className="interactive-map-popup-header">
          <strong className="interactive-map-popup-title">{place.title}</strong>
          {badgeLabel ? (
            <span className="interactive-map-popup-tag">{badgeLabel}</span>
          ) : null}
        </div>

        {plainDescription ? (
          isLongDescription ? (
            <div className="interactive-map-popup-desc-wrap">
              <input
                type="checkbox"
                id={expandId}
                className="interactive-map-popup-expand"
                aria-hidden
              />
              <p className="interactive-map-popup-desc">{plainDescription}</p>
              <label
                htmlFor={expandId}
                className="interactive-map-popup-toggle interactive-map-popup-toggle-more"
              >
                {viewMoreLabel}
              </label>
              <label
                htmlFor={expandId}
                className="interactive-map-popup-toggle interactive-map-popup-toggle-less"
              >
                {viewLessLabel}
              </label>
            </div>
          ) : (
            <p className="interactive-map-popup-desc">{plainDescription}</p>
          )
        ) : null}

        {place.mapsUrl ? (
          <a
            href={place.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-map-popup-directions"
          >
            <span className="interactive-map-popup-directions-label">
              {directionsLabel}
            </span>
            <span className="interactive-map-popup-directions-icon">
              <MapDirectionsIcon />
            </span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
