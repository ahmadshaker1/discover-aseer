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
import type { MapPlace } from "./InteractiveMap";
import { MapListingsCloseIcon } from "./MapListingsCloseIcon";
import { MapPlaceDescription } from "./MapPlaceDescription";
import { resolveMapPlaceImageUrl } from "./mapPlaceImage";

type MapListingsSidebarProps = {
  className?: string;
  locale?: string;
  ui: {
    discover: string;
    filterLabel: string;
    search: string;
    locations: string;
    clearFilters: string;
    noGeo: string;
    viewMore: string;
    viewLess: string;
    noResults: string;
    loadingLocations: string;
  };
  isLoading?: boolean;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  selectedCity: string;
  onSelectedCityChange: (city: string) => void;
  cities: string[];
  filteredPlaces: MapPlace[];
  radioSelectedPlaceId: string | null;
  onSelectPlace: (placeId: string) => void;
  onClearFilters: () => void;
  showCloseButton?: boolean;
  onClose?: () => void;
  closeLabel?: string;
};

export function MapListingsSidebar({
  className = "",
  locale = "en",
  ui,
  searchTerm,
  onSearchTermChange,
  selectedCity,
  onSelectedCityChange,
  cities,
  filteredPlaces,
  isLoading = false,
  radioSelectedPlaceId,
  onSelectPlace,
  onClearFilters,
  showCloseButton = false,
  onClose,
  closeLabel = "Close",
}: MapListingsSidebarProps) {
  const isRtl = locale === "ar";

  return (
    <aside
      dir={isRtl ? "rtl" : "ltr"}
      className={`h-full w-full bg-surface text-foreground ${className}`}
    >
      <div className="border-b border-border p-4 sm:p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h1 className="text-[clamp(28px,6vw,42px)] font-bold leading-none text-start">
            {ui.discover}
          </h1>
          {showCloseButton && onClose ? (
            <Button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="inline-flex shrink-0 cursor-pointer border-0 bg-transparent p-0 data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2"
            >
              <MapListingsCloseIcon className="block" />
            </Button>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          <Field className="relative min-w-0 flex-1">
            <Label className="sr-only">{ui.search}</Label>
            <Input
              type="search"
              value={searchTerm}
              onChange={(event) => onSearchTermChange(event.target.value)}
              placeholder={ui.search}
              className="h-11 w-full rounded-md border border-border bg-background px-4 text-[15px] text-foreground outline-none text-start data-focus:border-primary data-focus:ring-2 data-focus:ring-primary/30"
            />
          </Field>
          <Button
            type="button"
            aria-label={ui.filterLabel}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-transparent text-lg text-foreground data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2"
          >
            ⌕
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3 sm:px-5 sm:py-4">
        <h2 className="text-[clamp(22px,5vw,30px)] font-bold leading-tight">
          {ui.locations}
        </h2>
        <Button
          type="button"
          onClick={onClearFilters}
          className="inline-flex shrink-0 items-center rounded-full border border-border px-3 py-1.5 text-[14px] font-semibold text-foreground transition hover:bg-muted data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2 sm:px-4 sm:text-[15px]"
        >
          {ui.clearFilters}
        </Button>
      </div>

      <div className="border-b border-border p-4">
        <Listbox value={selectedCity} onChange={onSelectedCityChange}>
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

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex min-h-[200px] flex-1 items-center justify-center py-12">
            <div
              className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary"
              role="status"
              aria-label={ui.loadingLocations}
            />
          </div>
        ) : null}
        {!isLoading && filteredPlaces.length > 0 ? (
          <RadioGroup
            value={radioSelectedPlaceId ?? ""}
            onChange={onSelectPlace}
            className="space-y-3"
          >
            {filteredPlaces.map((place) => {
              const imageSrc = resolveMapPlaceImageUrl(place.imageUrl);

              return (
                <RadioGroup.Option
                  key={place.id}
                  value={place.id}
                  className={({ checked, focus }) =>
                    `relative flex min-h-[140px] w-full cursor-pointer overflow-hidden rounded-[14px] border text-start outline-none transition ${
                      checked
                        ? "border-primary bg-muted"
                        : "border-border bg-surface hover:bg-muted"
                    } ${focus ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : ""}`
                  }
                >
                  <div className="absolute inset-y-0 start-0 z-0 w-1/3 shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element -- CMS photo or default placeholder */}
                    <img
                      src={imageSrc}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative z-10 min-w-0 flex-1 p-4 ps-[calc(33.333%+12px)]">
                    {(place.city || place.tag) ? (
                      <span className="mb-2 inline-flex rounded-full bg-muted px-2.5 py-1 text-[13px] font-semibold text-foreground">
                        {place.city || place.tag}
                      </span>
                    ) : null}
                    <h3 className="line-clamp-2 text-[18px] font-bold leading-[1.15] sm:text-[21px]">
                      {place.title}
                    </h3>
                    <MapPlaceDescription
                      html={place.description}
                      viewMore={ui.viewMore}
                      viewLess={ui.viewLess}
                      className="mt-1.5"
                    />
                    {!place.hasCoordinates ? (
                      <p className="mt-2 text-[14px] text-muted-foreground">
                        {ui.noGeo}
                      </p>
                    ) : null}
                  </div>
                </RadioGroup.Option>
              );
            })}
          </RadioGroup>
        ) : null}
        {!isLoading && filteredPlaces.length === 0 ? (
          <div className="rounded-lg border border-border bg-surface p-4 text-center text-base text-muted-foreground sm:text-lg">
            {ui.noResults}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
