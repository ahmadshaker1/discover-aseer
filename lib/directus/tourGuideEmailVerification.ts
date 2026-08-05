import jwt from "jsonwebtoken";
import { getDirectusServerUrl } from "@/lib/directus/server";

const VERIFY_PURPOSE = "tour-guide-email-verify";
const TOKEN_TTL = "48h";

export type DirectusAuthUserRow = {
  id: string;
  email?: string | null;
  status?: string | null;
  first_name?: string | null;
  last_name?: string | null;
};

function jwtSecret(): string {
  return (
    process.env.NEXTAUTH_SECRET?.trim() ||
    process.env.CRON_SECRET?.trim() ||
    process.env.DIRECTUS_WEBHOOK_SECRET?.trim() ||
    "fallback-secret-for-jwt"
  );
}

export function getSiteOriginFromRequest(request?: Request): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");

  const origin = request?.headers.get("origin")?.trim();
  if (origin) return origin.replace(/\/+$/, "");

  return "http://localhost:3000";
}

export function createEmailVerificationToken(options: {
  email: string;
  userId: string;
}): string {
  return jwt.sign(
    {
      purpose: VERIFY_PURPOSE,
      email: options.email.trim().toLowerCase(),
      userId: options.userId,
    },
    jwtSecret(),
    { expiresIn: TOKEN_TTL },
  );
}

export function verifyEmailVerificationToken(token: string): {
  email: string;
  userId: string;
} {
  const decoded = jwt.verify(token, jwtSecret()) as {
    purpose?: string;
    email?: string;
    userId?: string;
  };

  if (decoded.purpose !== VERIFY_PURPOSE || !decoded.email || !decoded.userId) {
    throw new Error("Invalid verification token.");
  }

  return {
    email: decoded.email.trim().toLowerCase(),
    userId: decoded.userId,
  };
}

async function adminHeaders(): Promise<HeadersInit> {
  const token = process.env.DIRECTUS_ADMIN_TOKEN?.trim();
  if (!token) {
    throw new Error("DIRECTUS_ADMIN_TOKEN is not configured.");
  }
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export async function findDirectusUserByEmail(
  email: string,
): Promise<DirectusAuthUserRow | null> {
  const baseUrl = getDirectusServerUrl();
  if (!baseUrl) throw new Error("Directus is not configured.");

  const url = new URL(`${baseUrl}/users`);
  url.searchParams.set("filter[email][_eq]", email.trim().toLowerCase());
  url.searchParams.set("fields", "id,email,status,first_name,last_name");
  url.searchParams.set("limit", "1");

  const response = await fetch(url.toString(), {
    headers: await adminHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to look up user (${response.status}).`);
  }

  const json = (await response.json()) as { data?: DirectusAuthUserRow[] };
  return json.data?.[0] ?? null;
}

export async function setDirectusUserStatus(
  userId: string,
  status: "unverified" | "active",
): Promise<void> {
  const baseUrl = getDirectusServerUrl();
  if (!baseUrl) throw new Error("Directus is not configured.");

  const response = await fetch(`${baseUrl}/users/${userId}`, {
    method: "PATCH",
    headers: await adminHeaders(),
    body: JSON.stringify({ status }),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Failed to update user status (${response.status}): ${text.slice(0, 200)}`,
    );
  }
}

export function buildVerifyEmailUrl(options: {
  origin: string;
  locale: "ar" | "en";
  token: string;
}): string {
  return `${options.origin}/${options.locale}/tour-guides/verify-email?token=${encodeURIComponent(options.token)}`;
}

export function isUnverifiedStatus(status: string | null | undefined): boolean {
  return (status || "").trim().toLowerCase() === "unverified";
}
