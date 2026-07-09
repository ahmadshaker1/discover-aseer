# Tour guides — Directus setup

One collection: **`tourist_guides`**. One portal: **`/tour-guides/portal`**.

The app behavior is **fixed in code** — no tour-guide-specific `.env` toggles. You only need:

```env
NEXT_PUBLIC_DIRECTUS_APP_URL=https://tool-portal.discoveraseer.com
DIRECTUS_WRITE_BASE_URL=https://tool-portal.discoveraseer.com
DIRECTUS_ADMIN_TOKEN=your-admin-static-token
```

`DIRECTUS_ADMIN_TOKEN` is used **server-side only** so the portal can load linked guide rows when Directus Guide/Public policies cannot filter on `email` yet. Never expose it to the client.

Directus base URL used by the app: `https://tool-portal.discoveraseer.com`

---

## 1. Collection fields

Add these on **`tourist_guides`** (plus your existing CMS profile fields):

| Field | Type | Purpose |
|-------|------|---------|
| **`account`** | M2O → `directus_users` | Links row to signed-in user |
| **`email`** | Text | Links row to login email (required for portal lookup) |
| **`status`** | Dropdown: `draft`, `under_review`, `published`, `rejected` | Portal submit → `under_review`; admins publish or reject |
| **`name`** | Text | Arabic display name |
| **`name_en`** | Text | English display name |
| **`phone_number`** | Text | Mobile |
| **`whatsapp`** | Text | WhatsApp |
| **`image`** | File | Profile photo |
| **`license_attachment`** | File | License scan |
| **`national_id`** | Text | National ID |
| **`license_number`** | Text | License number |
| **`date`** | Date | License expiry |
| **`gender`** | Text | Gender |
| **`description`** / **`description_en`** | Text | About me |
| **`arabic_language_level`** | Text | Arabic level |
| **`english_language_level`** | Text | English level |
| **`other_languages`** | Text | Other languages |
| **`specializations`** | Text | Specializations |
| **`transportation`** | Boolean | Offers transportation |
| **`instagram`**, **`website`**, **`tiktok`**, **`x_platform`** | Text | Social links |
| **`commitment_1`**, **`commitment_2`**, **`commitment_3`** | Boolean | Commitment checkboxes |
| **`residence`** | Text (`aseer` / `other`) | Optional residence (portal form) |

On save, the portal automatically sets:

- **`account`** → current Directus user id
- **`email`** → login email (from auth, not the form)
- **`status`** → `under_review`

Admin workflow in Directus:

| Status | Meaning |
|--------|---------|
| `draft` | Incomplete / not yet submitted (legacy or manual) |
| `under_review` | Guide submitted; awaiting admin decision |
| `published` | Live on `/tour-guides` |
| `rejected` | Declined; guide can edit and resubmit |

**Profile lookup (read):** `email` equals login email → stored profile id (from a previous save). Legacy CMS rows must have **`email`** set in Directus to prefill on login.

---

## 2. Security settings (required)

**Settings → Security → User Registration**

| Setting | Value |
|---------|-------|
| **Public Registration** | Enabled |
| **Default Role** | **Guide** (the role below) |

This allows `POST /users/register` for self-sign-up at `/tour-guides/portal`.  
You do **not** need Create permission on the `directus_users` collection for the Guide role — registration uses this dedicated endpoint.

**Auth endpoints** (no collection permission needed):

| Endpoint | Used for |
|----------|----------|
| `POST /auth/login` | Sign in |
| `POST /auth/refresh` | Refresh token |
| `GET /users/me` | Load own user (`id`, `email`, `first_name`, `last_name`) |
| `POST /users/register` | Create account (Public Registration must be on) |

`/users/me` returns **only the logged-in user**. It does **not** require Read access on the `directus_users` collection.

---

## 3. Roles & permissions

You need **two app-facing roles**: **Public** and **Guide**.  
**Administrator** keeps full access for publishing and backfill.

### A) Public — for visitors (`/tour-guides`)

| Collection | Create | Read | Update | Delete |
|------------|--------|------|--------|--------|
| **`tourist_guides`** | — | ✓ rule below | — | — |
| **`directus_files`** | ✓ | — | — | — |

**Read rule** (published guides only):

```json
{
  "status": {
    "_eq": "published"
  }
}
```

**Fields (Read):** all fields needed for the public listing and detail pages (at minimum: `id`, `name`, `name_en`, `image`, `phone_number`, `whatsapp`, `specializations`, `specializations_en`, `status`, and any field shown on `/tour-guides`).

**`directus_files` Create:** required for profile photo and license uploads from the portal (uploads use the Public role, not the guide token).

---

### B) Guide — for `/tour-guides/portal`

Assign this role as the **default registration role**.

#### `directus_users` — keep locked down

| Create | Read | Update | Delete |
|--------|------|--------|--------|
| — | — | — | — |

**Do not** grant Guide role access to list or edit other users.  
Sign-in and `/users/me` still work without these permissions.

Optional (only if you later add “change password” in the portal): allow **Update** on **own user only** via `PATCH /users/me`. The current portal does **not** need this.

#### `tourist_guides` — main portal collection

| Create | Read | Update | Delete |
|--------|------|--------|--------|
| ✓ | ✓ | ✓ | — |

**Item permission rule** (Read & Update — own rows only, including **draft**):

```json
{
  "_or": [
    { "account": { "_eq": "$CURRENT_USER" } },
    { "email": { "_eq": "$CURRENT_USER.email" } }
  ]
}
```

If `$CURRENT_USER.email` is not supported in your Directus version, use only:

```json
{
  "account": {
    "_eq": "$CURRENT_USER"
  }
}
```

In that case, ensure **`account`** is set on every row (the portal sets it automatically on save).

**Do not** add a `status: published` filter on Read — guides must load and edit **draft / under_review / rejected** profiles.

**Create — allow all fields** the portal writes:

| Field | Set by |
|-------|--------|
| `account` | Server (login user id) |
| `email` | Server (login email) |
| `status` | Server (`under_review`) |
| `name`, `name_en` | Form |
| `gender`, `national_id`, `license_number`, `date` | Form |
| `description`, `description_en` | Form |
| `arabic_language_level`, `english_language_level`, `other_languages` | Form |
| `specializations` | Form |
| `phone_number`, `whatsapp` | Form |
| `transportation` | Form |
| `instagram`, `website`, `tiktok`, `x_platform` | Form |
| `commitment_1`, `commitment_2`, `commitment_3` | Form |
| `residence` | Form (optional) |
| `image`, `license_attachment` | Form (file ids after upload) |

**Read & Update — same fields as Create**, plus any existing CMS fields you want prefilled (`content`, `content_en`, `slug`, etc.).

**Critical field-level permissions:** Guide role must be allowed to **write** `account`, `email`, and `status`. If these are read-only for Guide, save will fail or the row will not link to the user.

#### `directus_files`

Guide role does **not** need file permissions — uploads go through **Public Create** on `directus_files`.

---

### C) Administrator — for your team

Full access to **`tourist_guides`** and **`directus_users`**:

- Publish guides (`status` → `published`)
- Backfill legacy rows (`email`, `account`)
- Create guide accounts manually if Public Registration is disabled

---

## 4. How the app uses Directus

| Page / action | Directus call | Role / token |
|---------------|---------------|--------------|
| `/tour-guides` | `GET /items/tourist_guides?filter[status][_eq]=published` | Public (no token) |
| Portal login | `POST /auth/login` → `GET /users/me` | — |
| Portal register | `POST /users/register` or login if account exists | Public Registration |
| Load profile | `GET /items/tourist_guides?filter[email][_eq]={login email}` | Guide token |
| Save profile | `POST` or `PATCH /items/tourist_guides` | Guide token |
| Upload photo / license | `POST /files` | Public Create on `directus_files` |

Portal flow:

1. Guide logs in → Directus access token (Guide role)
2. Load profile → filter `tourist_guides` by login **email**
3. Save profile → create or update row; set `account`, `email`, `status: under_review`
4. Admin publishes in Directus → row appears on `/tour-guides`

---

## 5. Backfill existing CMS rows

Legacy rows imported from the old CMS often have `"email": null` and `"account": null`. The portal **cannot** match them until you link them.

In Directus admin, for each guide who will use the portal:

1. Set **`email`** on the `tourist_guides` row to their login email (e.g. `guide@example.com`), **or**
2. Set **`account`** to their `directus_users` record

After that, login → portal prefills the form.

Alternatively, the guide can save once from the portal (creates a new row with `email` + `account` set).

---

## 6. Verify permissions

### In Directus admin

1. **Settings → Security** — Public Registration on, default role = Guide
2. **Settings → Access Control → Public** — Read `tourist_guides` (published only); Create `directus_files`
3. **Settings → Access Control → Guide** — Create/Read/Update `tourist_guides` with own-row rule; **no** access to `directus_users`

### API smoke tests

Replace `BASE` with `https://tool-portal.discoveraseer.com`.

**Public listing (should return published guides):**

```http
GET BASE/items/tourist_guides?filter[status][_eq]=published&limit=1
```

**Register (should succeed when Public Registration is on):**

```http
POST BASE/users/register
Content-Type: application/json

{
  "email": "test-guide@example.com",
  "password": "YourSecurePassword1!",
  "first_name": "Test",
  "last_name": "Guide"
}
```

**Own user after login (should return 200):**

```http
GET BASE/users/me?fields=id,email
Authorization: Bearer <access_token>
```

**Profile by email (should return row after email is set on the record):**

```http
GET BASE/items/tourist_guides?filter[email][_eq]=test-guide@example.com&fields=*
Authorization: Bearer <access_token>
```

**List all users as Guide (should return 403 — correct):**

```http
GET BASE/users
Authorization: Bearer <access_token>
```

### End-to-end portal test

1. Register / log in at `/tour-guides/portal`
2. Save a profile → row appears in Directus as **draft** with `email` and `account` filled
3. Log out and back in → form prefilled
4. Publish in Directus (`status` → `published`) → guide appears on `/tour-guides`

---

## 7. Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Cannot register | Public Registration off or wrong default role | Settings → Security |
| Login works, profile API returns 401 | Token not sent or expired | Check browser storage / re-login |
| Profile load returns `null` | No row with matching `email` | Set `email` on legacy row or save once from portal |
| Profile load returns `null` but row exists in Directus | Guide/Public policies cannot read linked rows (`email` / `account` set) | Ensure `DIRECTUS_ADMIN_TOKEN` is set server-side (portal uses admin fallback on GET) |
| Save fails with permission error | Guide missing Create/Update on `tourist_guides` | Guide role permissions |
| Save succeeds but `email` / `account` stay empty | Field-level write blocked on `email` or `account` | Allow Guide to write those fields |
| Upload fails | Public missing Create on `directus_files` | Public role → `directus_files` Create |
| Guide sees other guides’ drafts | Read rule too broad | Restrict Read/Update to own `account` / `email` |
| Published guide not on public page | Row still `draft` | Admin sets `status` → `published` |
| Setup script returns 401 | Invalid or expired admin token | Regenerate static token (see §8) |

---

## 8. Automated setup (admin)

A script applies all permissions from this document to your Directus instance.

### 1. Get a valid admin token

The token must belong to an **Administrator** user.

1. Open `https://tool-portal.discoveraseer.com/admin`
2. Click your user (bottom-left) → **Admin Options** or **User Directory** → your admin user
3. Set the **Token** field (static token) → **Save**
4. Copy the token into `.env`:

```env
DIRECTUS_ADMIN_TOKEN=your-static-token-here
```

**Alternative** — use email/password instead of a static token:

```env
DIRECTUS_ADMIN_EMAIL=admin@example.com
DIRECTUS_ADMIN_PASSWORD=your-password
```

Do **not** commit `.env` to git. Rotate the token if it was ever shared in chat.

### 2. Run the script

From the project root:

```bash
npm run setup:directus-permissions
```

Or:

```bash
node scripts/setup-directus-tour-guide-permissions.mjs
```

### 3. What the script configures

| Item | Action |
|------|--------|
| **Guide role** | Creates if missing |
| **Public policy / permissions** | Read `tourist_guides` (published only); Create `directus_files` |
| **Guide policy / permissions** | Create / Read / Update `tourist_guides` (own row rule) |
| **Public registration** | Enabled, default role → Guide |

Works with **Directus 11+** (policies API) and falls back to **Directus 10** (role permissions).

### 4. After running

1. In Directus admin, confirm **Settings → Access Control** shows the new policies on **Public** and **Guide**
2. Backfill legacy guide rows: set **`email`** on each row to the guide’s login email
3. Test the portal at `/tour-guides/portal`

### 5. Manual setup (if you prefer the UI)

Use sections **2–3** above. The script is optional — it mirrors the same rules.
