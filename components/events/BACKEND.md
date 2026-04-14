# Events listing: backend integration

This folder powers **`/events`**: the catalog grid, hover cards, and the filter sidebar. The page now fetches live data through `components/events/data.ts` and maps it to **`EventListingItem`** (`types.ts`).

## Runtime switches

- `NEXT_PUBLIC_EVENTS_USE_DUMMY=true` forces dummy rows.
- `NEXT_PUBLIC_EVENTS_USE_DUMMY=false` forces live API.
- `NEXT_PUBLIC_EVENTS_API_BASE` sets the API base URL (no trailing slash).
- Endpoint path used in code: `/items/events`.

## Where to plug in the API

| Location                                    | Role                                                                                                                                                             |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/events/page.tsx`                       | **Primary hook.** Fetch here (Server Component) or load in a client wrapper—then pass `events={...}` into `<EventsCatalog />`.                                   |
| `components/events/EventsCatalog.tsx`       | Client component: owns filter state and passes filtered events to `EventsListingGrid`. No API calls required if the page supplies the full list (current model). |
| `components/events/EventsFilterSidebar.tsx` | Pure UI + callbacks. Counts are derived in `EventsCatalog` from the `events` array.                                                                              |

**Minimal change:** in `app/events/page.tsx`, replace `DUMMY_EVENTS` with the result of `fetch` (or a data loader) and map the JSON to `EventListingItem[]`.

## Suggested HTTP contract

Use one list endpoint the UI can filter client-side (simplest migration from dummy data), or add query parameters if you prefer server-side filtering.

**Example (conceptual):**

- `GET /api/v1/events`  
  Optional query: `?interests=adventure,nature&cost=free&from=...&to=...`  
  Response: JSON array of event resources.

Align query names with `EventsCatalog` logic (`interestIds` OR-match, `costFilter` `free` | `paid`, date range TBD).

## Mapping API → `EventListingItem`

The UI expects **exactly** this shape (see `types.ts`):

| Field           | Type                       | Notes                                                                                                               |
| --------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `id`            | `string`                   | Stable unique id for React `key`.                                                                                   |
| `cityId`        | `string`                   | Reserved for future filters / analytics; not used in the current sidebar.                                           |
| `interestIds`   | `EventInterestId[]`        | Must use slugs: `adventure`, `heritage`, `culinary`, `nature`. Map from backend enums if names differ.              |
| `isFree`        | `boolean`                  | Drives **التكلفة** (`free` / `paid`). Derive from price or ticket type.                                             |
| `title`         | `string`                   | Arabic title on card + expanded header.                                                                             |
| `images`        | `[string, string, string]` | **Three** image URLs (Unsplash or your CDN). Pad or duplicate if the API returns fewer until the contract is fixed. |
| `rating`        | `number`                   | e.g. `4.8` — shown as `x.x/5`.                                                                                      |
| `reviewsCount`  | `number`                   | Shown in parentheses next to rating.                                                                                |
| `priceLabel`    | `string`                   | Localized display, e.g. `120 ريال` or `مجاني`.                                                                      |
| `locationLine`  | `string`                   | Short line (currently in type; overlay uses `mapsLinkLabel` for the prominent link—keep both in sync with product). |
| `mapsUrl`       | `string`                   | Full Google Maps (or other) URL.                                                                                    |
| `mapsLinkLabel` | `string`                   | Street / place name for the link text.                                                                              |
| `dateRange`     | `string`                   | Human-readable range for the listing (until a real date filter exists).                                             |
| `timeRange`     | `string`                   | Human-readable hours.                                                                                               |
| `venueLabel`    | `string` (optional)        | Expanded block subtitle; defaults to `title` if omitted in the card.                                                |

### Example JSON (one item)

```json
{
  "id": "evt_01",
  "cityId": "abha",
  "interestIds": ["adventure", "culinary"],
  "isFree": false,
  "title": "شارع الفن",
  "images": [
    "https://cdn.example.com/events/01/a.jpg",
    "https://cdn.example.com/events/01/b.jpg",
    "https://cdn.example.com/events/01/c.jpg"
  ],
  "rating": 4.8,
  "reviewsCount": 233,
  "priceLabel": "120 ريال",
  "locationLine": "أبها، عسير",
  "mapsUrl": "https://www.google.com/maps/search/?api=1&query=...",
  "mapsLinkLabel": "طريق الملك خالد، المفتاحة",
  "dateRange": "1 مارس - 1 ابريل",
  "timeRange": "9:00 صباحا - 11:00 مساء",
  "venueLabel": "شارع الفن"
}
```

Add a small **`mapApiEventToListingItem`** (e.g. in `lib/events` or next to the fetch) so API renames or nulls do not leak into components.

## Filtering and PDF

- **Client filters** today: `EventsCatalog` filters the in-memory list by `interestIds`, `isFree`, and (placeholder) date text. If the API supports the same query params, you can either pass pre-filtered lists or move filter state into the fetch (URL search params + `router.refresh` / SWR).
- **تحميل الفعاليات لملف PDF** (`EventsFilterSidebar`): implement `onClick` to call a backend export endpoint (e.g. `POST /api/v1/events/export` with the same filters) or generate a client-side PDF from the filtered list—wire the handler next to the button.

## Next.js notes

- Prefer **Server Components** for the initial `fetch` on `app/events/page.tsx`, then pass serializable props to `EventsCatalog`.
- If you need live filters against the server, extract a client `EventsPageClient` that receives initial data and refetches on filter change, or use SWR/React Query with a route handler under `app/api/...`.

## Related files

- `types.ts` — canonical `EventListingItem` + `EventInterestId`
- `dummyEvents.ts` — reference data until the API is live
- `EventListingCard/EventListingCard.tsx` — card UI (RTL, three images, expanded panel)
- `EventsCatalog.tsx` — filter state + `interestCounts` aggregation
