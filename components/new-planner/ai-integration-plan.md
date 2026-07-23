# AI Integration Plan with Directus CMS Data

Based on your request and a review of the existing API workflow (`app/api/planner/route.ts` and `app/api/planner/save/route.ts`), as well as the data structure coming from Directus, this plan outlines an efficient way to connect user inputs with the AI. This approach minimizes token consumption and ensures an accurate travel itinerary.

## 1. Target Data from Directus (Fields to Extract)

To allow the AI to select appropriate places for the customer, we do not need to send the entire dataset for each item (which increases costs and slows down response times). We will only send the "essential metadata" along with the identifier (`id`).

### A. Restaurants

Suggested fields:

- `id`: The unique identifier.
- `title` / `title_ar`: Restaurant name (depends on the prompt language).
- `cuisine_type`: Cuisine type (crucial for matching with Food Preferences).
- `content` / `content_ar`: A brief description of the restaurant.
- `city`: City (to filter places based on the customer's choice).

### B. Experiences

Suggested fields:

- `id`: The unique identifier.
- `title` / `title_eng`: Experience name.
- `type` / `type_en`: Experience category (to match customer Interests).
- `duration` / `duration_En`: Experience duration (important for scheduling).
- `description`: A brief description.

### C. Events

Suggested fields:

- `id`: The unique identifier.
- `title` / `title_en`: Event name.
- `description` / `description_en`: Description.

---

## 2. Submission Mechanism and Prompt Construction

### Step One: Pre-filtering

In the `route.ts` route, before sending the request to `Anthropic/Claude`, we fetch the data from Directus.

- We filter the data locally (on the server) to exclude places that are not in the user's chosen city.
- We extract only the fields mentioned above to create a "Mini-Catalog".

### Step Two: Modifying the AI Prompt

We will append a mini-list of (restaurants, experiences, events) to the prompt message, asking the AI to pick from them to fill the trip days. The returned JSON schema will be based primarily on the `id` and the item type.

Example of the new Prompt:

```json
{
  "dayLabel": "Day One",
  "date": "October 20",
  "events": [{ "itemId": 1 }],
  "experiences": [
    {
      "itemId": 2,
      "time": "10:00 AM",
      "travelToNext": { "duration": "10 min" }
    }
  ],
  "restaurants": [
    {
      "itemId": 3,
      "mealType": "breakfast"
    }
  ]
}
```

_Note:_

- For **events**, the AI will only return the `itemId`. No time or details are needed.
- For **restaurants**, the AI will only return the `itemId` and the `mealType` (e.g. breakfast, lunch, dinner, coffee & tea).
- For **experiences**, the AI returns `itemId`, `time`, and `travelToNext`.

### Step Three: Local Data Enrichment

Once the JSON is received from the AI, our server will look up the `id` in the Directus data we fetched earlier, append the full details (links, `location_map` URLs, images, and prices), and then send the complete plan to the Frontend.

---

## 3. Saving & Sharing the Plan

The `save/route.ts` file has been reviewed and is ready to receive data and send it to the `saved_plans` table in Directus.

### Workflow:

1. When the plan is displayed to the customer on the frontend, we send the complete `plan_data` object to the save endpoint `POST /api/planner/save`.
2. The plan is saved in Directus, which returns an `id` (usually a UUID).
3. In the Frontend, we update the URL to include this identifier (e.g., `https://discoveraseer.com/plan/{uuid}`).
4. When this link is shared, we fetch the previously saved data directly from Directus using the UUID, without needing to contact the AI again.

---

## 4. Overall Workflow Diagram

1. The user completes the Form in `new-planner` and clicks "Generate Plan".
2. The server fetches available events, experiences, and restaurants, filters them, and prepares them.
3. The server sends (customer preferences + shortened Directus list) to the AI.
4. The server receives the AI's selections (via ID) and merges them with the full details.
5. The frontend displays the final plan.
6. `/api/planner/save` is called in the background to save the plan and generate a shareable link.
