# Tour Guides — Directus backend



## Collections



| Collection | Purpose |

|------------|---------|

| `tourist_guides` | Published guide profiles on `/tour-guides` and self-service portal |

| `tour_guides_form` | Legacy one-off registration form (`/tour-guides/register`) |



## Tour guide portal (`/tour-guides/portal`)



Guides sign in with **Directus user accounts** (public registration + login). Profile rows are linked via an **`account`** field (Many-to-One → `directus_users`).



**Important:** Login is only used to identify the user in Next.js. Profile **create/read/update** calls Directus with **Public** permissions (no bearer token). Configure the **Public** role below — not a separate “guide” role.



Every save sets `status` to `draft`. Admins change `status` to `published` in Directus.



### Required `tourist_guides` fields



| Field | Type | Notes |

|-------|------|-------|

| **`account`** | **M2O → `directus_users`** | Links profile to signed-in user; set by the portal on save. |

| `status` | Dropdown | Values: `draft`, `published`. Default: `draft` |

| `name`, `name_en` | Text | |

| `image` | File (M2O) | Profile photo |

| `license_attachment` | File (M2O) | License scan |

| `phone_number`, `whatsapp` | Text | |

| `description`, `description_en` | Text | |

| `gender`, `national_id`, `license_number`, `date` | Text / Date | |

| `arabic_language_level`, `english_language_level` | Text | |

| `other_languages`, `specializations` | Text | |

| `transportation` | Boolean | |

| `website`, `instagram`, `x_platform`, `tiktok` | Text | optional |

| `commitment_1`, `commitment_2`, `commitment_3` | Boolean | |



#### Add the `account` field



1. **Settings → Data Model → `tourist_guides` → Create Field**

2. Type: **Many to One (M2O)** → **`directus_users`**

3. Field key: **`account`**



### Directus permissions — **guide user role** (recommended)

The portal sends the **signed-in user's Directus token** to load/save profiles.  
Per-user rules like “only my data” must be on the **role assigned at registration**, not only on Public.

On the **guide role** (default role for new users), enable **`tourist_guides`**:

| Action | Item rule |
|--------|-----------|
| **Create** | (none) — allow writing **`account`** on create |
| **Read** | `{ "account": { "_eq": "$CURRENT_USER" } }` |
| **Update** | `{ "account": { "_eq": "$CURRENT_USER" } }` |

Also allow **`directus_files`** **Create** on the **Public** role (file uploads use Public, not the guide token).

On the **guide role**, `directus_files` is **not** required for the portal.

**Public** role: Read **published** only for the public `/tour-guides` listing.

Also enable **Public Registration** under **Settings → Security → Auth**.



### Env



```env

NEXT_PUBLIC_DIRECTUS_APP_URL=https://your-directus.example.com

DIRECTUS_TOUR_GUIDE_OWNER_FIELD=account

# Optional fallback if guide-role permissions are not used
DIRECTUS_WRITE_TOKEN=your-static-admin-token

```

The portal uses the guide's login token first. `DIRECTUS_WRITE_TOKEN` is only a server-side fallback.



---



## Public listing



```

GET /items/tourist_guides?filter[status][_eq]=published

```


