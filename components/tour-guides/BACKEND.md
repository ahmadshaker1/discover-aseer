# Tour Guides — Directus backend

## Collections

| Collection | Purpose |
|------------|---------|
| `tourist_guides` | Published guide profiles on `/tour-guides` and self-service portal |
| `tour_guides_form` | Legacy one-off registration form (`/tour-guides/register`) |

## Tour guide portal (`/tour-guides/portal`)

Guides sign in with **Directus user accounts**, create or edit their row in `tourist_guides`, and every save sets `status` to `draft`. Admins change `status` to `published` in Directus.

### Required `tourist_guides` fields

Add or confirm these fields in Directus:

| Field | Type | Notes |
|-------|------|-------|
| `status` | Dropdown | Values: `draft`, `published`. Default: `draft` |
| `name`, `name_en` | Text | |
| `image` | File (M2O) | Profile photo |
| `license_attachment` | File (M2O) | License scan |
| `phone_number`, `whatsapp`, `email` | Text | |
| `description`, `description_en` | Text | |
| `gender`, `national_id`, `license_number`, `date` | Text / Date | |
| `arabic_language_level`, `english_language_level` | Text | `beginner` / `intermediate` / `advanced` |
| `other_languages`, `specializations` | Text | |
| `transportation` | Boolean | |
| `website`, `instagram`, `x_platform`, `tiktok` | Text | optional |
| `commitment_1`, `commitment_2`, `commitment_3` | Boolean | |

`user_created` is set automatically by Directus and links each profile to the signed-in guide.

### Directus settings

1. **Settings → Security → Auth**
   - Enable **Public Registration** (or create users manually and share credentials).
   - Set the default role for new registrations to a **Tour Guide** role (see below).

2. **CORS** — not required for the guide portal (requests go through Next.js API routes). Still configure CORS if other client-side Directus calls exist.

### Tour Guide role permissions

Create a role **Tour Guide** with permissions on `tourist_guides`:

| Action | Rule |
|--------|------|
| **Create** | Allowed (or public write as you prefer) |
| **Read** | `user_created` equals `$CURRENT_USER` |
| **Update** | `user_created` equals `$CURRENT_USER` |
| **Delete** | Deny (recommended) |

On **Create** and **Update**, use field presets or validation so guides **cannot** set `status` to `published` (only `draft`). Admins use the Administrator role to set `status` to `published`.

On **`directus_files`**: allow **Create** for the Tour Guide role so profile photos and licenses can be uploaded.

### Public listing

The website only loads published guides:

```
GET /items/tourist_guides?filter[status][_eq]=published
```

Set existing live rows to `published` in Directus after adding the `status` field.

### Frontend env

```env
NEXT_PUBLIC_DIRECTUS_APP_URL=https://your-directus.example.com
# Optional server override for portal/auth proxy routes:
DIRECTUS_WRITE_BASE_URL=https://your-directus.example.com
```

Portal auth and profile writes are proxied through Next.js API routes (`/api/tour-guides/auth/*`, `/api/tour-guides/portal/*`), so **browser CORS to Directus is not required** for the guide portal.

No write token is needed on the server for the portal — guides authenticate with their own access token, forwarded by the API routes.

---

## Legacy registration (`/tour-guides/register`)

### Runtime configuration

- `DIRECTUS_WRITE_BASE_URL`: Directus base URL (no trailing slash).
- `DIRECTUS_WRITE_TOKEN`: server-side token used for write operations.
- `DIRECTUS_TOUR_GUIDE_APPLICATIONS_COLLECTION`: target collection for submissions.
- `TOUR_GUIDE_UPLOAD_MAX_MB`: max file size per uploaded file.

### API route

- Endpoint: `POST /api/tour-guides/register`
- File: `app/api/tour-guides/register/route.ts`
- Input: `multipart/form-data`

## Notes

- The listing page (`/tour-guides`) only shows items with `status=published`.
- Keep `DIRECTUS_WRITE_TOKEN` server-only; do not place it in `NEXT_PUBLIC_*` variables.
