/**
 * Configure Directus roles & permissions for the tour guide portal.
 *
 * Usage:
 *   node scripts/setup-directus-tour-guide-permissions.mjs
 *
 * Auth (one of):
 *   DIRECTUS_ADMIN_TOKEN in .env — static token from Directus user profile
 *   DIRECTUS_ADMIN_EMAIL + DIRECTUS_ADMIN_PASSWORD in .env — admin login
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  const envPath = resolve(root, ".env");
  const text = readFileSync(envPath, "utf8");
  const env = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

const env = loadEnv();
const BASE =
  env.DIRECTUS_WRITE_BASE_URL?.replace(/\/$/, "") ||
  env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "");
const STATIC_TOKEN = env.DIRECTUS_ADMIN_TOKEN?.trim();
const ADMIN_EMAIL = env.DIRECTUS_ADMIN_EMAIL?.trim();
const ADMIN_PASSWORD = env.DIRECTUS_ADMIN_PASSWORD?.trim();

if (!BASE) {
  console.error("Missing NEXT_PUBLIC_DIRECTUS_APP_URL in .env");
  process.exit(1);
}

let accessToken = STATIC_TOKEN ?? null;

const GUIDE_OWN_ROW_RULE = {
  _or: [
    { account: { _eq: "$CURRENT_USER" } },
    { email: { _eq: "$CURRENT_USER.email" } },
  ],
};

const PUBLISHED_RULE = {
  status: { _eq: "published" },
};

const ALL_FIELDS = ["*"];

const PUBLIC_PERMISSIONS = [
  {
    collection: "tourist_guides",
    action: "read",
    permissions: PUBLISHED_RULE,
    fields: ALL_FIELDS,
  },
  {
    collection: "directus_files",
    action: "create",
    permissions: {},
    fields: ALL_FIELDS,
  },
];

const GUIDE_PERMISSIONS = [
  {
    collection: "tourist_guides",
    action: "create",
    permissions: {},
    fields: ALL_FIELDS,
  },
  {
    collection: "tourist_guides",
    action: "read",
    permissions: GUIDE_OWN_ROW_RULE,
    fields: ALL_FIELDS,
  },
  {
    collection: "tourist_guides",
    action: "update",
    permissions: GUIDE_OWN_ROW_RULE,
    fields: ALL_FIELDS,
  },
];

function authHeaders(json = true) {
  const headers = {};
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  if (json) headers["Content-Type"] = "application/json";
  return headers;
}

async function api(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: authHeaders(body !== undefined),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    const msg =
      json?.errors?.[0]?.message || json?.error || res.statusText || text;
    throw new Error(`${method} ${path} → ${res.status}: ${msg}`);
  }
  return json;
}

async function loginWithPassword() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error(
      "Invalid admin credentials. Set a valid DIRECTUS_ADMIN_TOKEN, or DIRECTUS_ADMIN_EMAIL + DIRECTUS_ADMIN_PASSWORD in .env.\n" +
        "Generate a static token: Directus Admin → your user → Token field → Save.",
    );
  }

  const json = await api("POST", "/auth/login", {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    mode: "json",
  });

  accessToken = json.data?.access_token ?? null;
  if (!accessToken) {
    throw new Error("Login succeeded but no access_token returned.");
  }
  console.log(`Logged in as ${ADMIN_EMAIL}`);
}

async function verifyAuth() {
  console.log(`Directus: ${BASE}`);
  if (!accessToken) await loginWithPassword();
  try {
    const me = await api("GET", "/users/me?fields=id,email,role.name");
    console.log(`Authenticated as: ${me.data?.email ?? me.data?.id}`);
  } catch {
    accessToken = null;
    await loginWithPassword();
    const me = await api("GET", "/users/me?fields=id,email,role.name");
    console.log(`Authenticated as: ${me.data?.email ?? me.data?.id}`);
  }
}

async function usesPoliciesApi() {
  try {
    await api("GET", "/policies?limit=1&fields=id,name");
    return true;
  } catch {
    return false;
  }
}

async function getRoles() {
  const { data } = await api("GET", "/roles?limit=-1&fields=id,name");
  return data ?? [];
}

async function ensureGuideRole(roles) {
  let guide = roles.find((r) => r.name === "Guide");
  if (guide) {
    console.log(`Guide role exists: ${guide.id}`);
    return guide.id;
  }

  const { data } = await api("POST", "/roles", {
    name: "Guide",
    description: "Tour guide portal — own tourist_guides row only",
    icon: "hiking",
    app_access: false,
    admin_access: false,
  });
  console.log(`Created Guide role: ${data.id}`);
  return data.id;
}

function findPublicRole(roles) {
  return (
    roles.find((r) => r.name === "Public") ??
    roles.find((r) => r.name?.toLowerCase() === "public") ??
    null
  );
}

async function getPermissionsForPolicy(policyId) {
  const { data } = await api(
    "GET",
    `/permissions?filter[policy][_eq]=${policyId}&limit=-1&fields=id,collection,action`,
  );
  return data ?? [];
}

async function upsertPermissionOnPolicy(policyId, spec) {
  const existing = (await getPermissionsForPolicy(policyId)).find(
    (p) => p.collection === spec.collection && p.action === spec.action,
  );

  const body = {
    policy: policyId,
    collection: spec.collection,
    action: spec.action,
    permissions: spec.permissions ?? {},
    validation: spec.validation ?? {},
    presets: spec.presets ?? null,
    fields: spec.fields ?? ALL_FIELDS,
  };

  if (existing?.id) {
    await api("PATCH", `/permissions/${existing.id}`, body);
    console.log(`  updated ${spec.collection}.${spec.action}`);
    return;
  }

  await api("POST", "/permissions", body);
  console.log(`  created ${spec.collection}.${spec.action}`);
}

async function ensurePolicy(name, description) {
  const { data: policies } = await api(
    "GET",
    `/policies?filter[name][_eq]=${encodeURIComponent(name)}&limit=1&fields=id,name`,
  );
  if (policies?.[0]) {
    console.log(`Policy "${name}" exists: ${policies[0].id}`);
    return policies[0].id;
  }

  const { data } = await api("POST", "/policies", {
    name,
    description,
    icon: "policy",
    admin_access: false,
    app_access: true,
  });
  console.log(`Created policy "${name}": ${data.id}`);
  return data.id;
}

async function attachPolicyToRole(roleId, policyId) {
  const { data: role } = await api(
    "GET",
    `/roles/${roleId}?fields=id,name,policies.policy.id`,
  );

  const linked = (role?.policies ?? [])
    .map((entry) => entry?.policy?.id ?? entry?.policy ?? entry)
    .filter(Boolean);

  if (linked.includes(policyId)) {
    console.log(`  policy already linked to role ${role.name}`);
    return;
  }

  await api("PATCH", `/roles/${roleId}`, {
    policies: [{ policy: policyId }],
  });
  console.log(`  linked policy to role ${role.name}`);
}

async function configureWithPolicies(publicRoleId, guideRoleId) {
  console.log("\n=== Directus 11+ (policies) ===");

  const publicPolicyId = await ensurePolicy(
    "Tour Guides — Public",
    "Published tourist_guides read + file uploads",
  );
  for (const spec of PUBLIC_PERMISSIONS) {
    await upsertPermissionOnPolicy(publicPolicyId, spec);
  }
  if (publicRoleId) {
    await attachPolicyToRole(publicRoleId, publicPolicyId);
  } else {
    console.warn("  No Public role found — attach public policy manually in Admin UI");
  }

  const guidePolicyId = await ensurePolicy(
    "Tour Guides — Guide Portal",
    "Guide create/read/update own tourist_guides rows",
  );
  for (const spec of GUIDE_PERMISSIONS) {
    await upsertPermissionOnPolicy(guidePolicyId, spec);
  }
  await attachPolicyToRole(guideRoleId, guidePolicyId);
}

async function getLegacyPermissions(roleId) {
  const roleParam =
    roleId === null
      ? "filter[role][_null]=true"
      : `filter[role][_eq]=${roleId}`;
  const { data } = await api(
    "GET",
    `/permissions?${roleParam}&limit=-1&fields=id,role,collection,action`,
  );
  return data ?? [];
}

async function upsertLegacyPermission(roleId, spec) {
  const existing = (await getLegacyPermissions(roleId)).find(
    (p) => p.collection === spec.collection && p.action === spec.action,
  );

  const body = {
    role: roleId,
    collection: spec.collection,
    action: spec.action,
    permissions: spec.permissions ?? {},
    validation: spec.validation ?? {},
    presets: spec.presets ?? null,
    fields: spec.fields ?? ALL_FIELDS,
  };

  if (existing?.id) {
    await api("PATCH", `/permissions/${existing.id}`, body);
    console.log(`  updated ${spec.collection}.${spec.action}`);
    return;
  }

  await api("POST", "/permissions", body);
  console.log(`  created ${spec.collection}.${spec.action}`);
}

async function configureLegacy(guideRoleId) {
  console.log("\n=== Legacy role permissions (Directus 10) ===");
  console.log("Public role (null):");
  for (const spec of PUBLIC_PERMISSIONS) {
    await upsertLegacyPermission(null, spec);
  }
  console.log("Guide role:");
  for (const spec of GUIDE_PERMISSIONS) {
    await upsertLegacyPermission(guideRoleId, spec);
  }
}

async function ensureLicenseAttachmentField() {
  console.log("\n=== Collection fields ===");
  const { data: fields } = await api(
    "GET",
    "/fields/tourist_guides?limit=-1&fields=field",
  );
  const names = new Set((fields ?? []).map((f) => f.field));
  if (names.has("license_attachment")) {
    console.log("  license_attachment already exists");
    return;
  }

  await api("POST", "/fields/tourist_guides", {
    field: "license_attachment",
    type: "string",
    meta: {
      interface: "input",
      width: "full",
      note: "Directus file id or external URL for the license attachment (portal upload).",
    },
    schema: {
      name: "license_attachment",
      table: "tourist_guides",
      data_type: "string",
      max_length: 512,
      is_nullable: true,
    },
  });
  console.log("  created license_attachment on tourist_guides");
}

async function configurePublicRegistration(guideRoleId) {
  console.log("\n=== Public registration ===");
  try {
    await api("PATCH", "/settings", {
      public_registration: true,
      public_registration_role: guideRoleId,
      public_registration_email_filter: null,
    });
    console.log("  enabled → default role Guide");
  } catch (err) {
    console.warn(`  settings PATCH failed: ${err.message}`);
    console.warn("  Enable manually: Settings → Security → Public Registration");
  }
}

async function smokeTest() {
  console.log("\n=== Smoke test ===");
  const pub = await fetch(
    `${BASE}/items/tourist_guides?filter[status][_eq]=published&limit=1&fields=id,status`,
  );
  const pubJson = await pub.json();
  console.log(
    `  public published read: HTTP ${pub.status}, ${pubJson.data?.length ?? 0} row(s)`,
  );
}

async function main() {
  await verifyAuth();
  const policyMode = await usesPoliciesApi();
  const roles = await getRoles();
  const guideRoleId = await ensureGuideRole(roles);
  const publicRoleId = findPublicRole(roles)?.id ?? null;

  await ensureLicenseAttachmentField();

  if (policyMode) {
    await configureWithPolicies(publicRoleId, guideRoleId);
  } else {
    await configureLegacy(guideRoleId);
  }

  await configurePublicRegistration(guideRoleId);
  await smokeTest();
  console.log("\nDone.");
  console.log("Guide role id:", guideRoleId);
}

main().catch((err) => {
  console.error("\nSetup failed:", err.message);
  process.exit(1);
});
