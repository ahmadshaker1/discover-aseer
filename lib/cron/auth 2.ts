/**
 * Shared auth for Coolify scheduled tasks / cron HTTP endpoints.
 *
 * Coolify → Scheduled Tasks typically run:
 *   curl -fsS -X POST "http://localhost:3000/api/.../cron/..." \
 *     -H "Authorization: Bearer $CRON_SECRET"
 *
 * Accepted secrets (first match wins):
 *   CRON_SECRET → DIRECTUS_WEBHOOK_SECRET → TOUR_GUIDE_STATUS_WEBHOOK_SECRET
 */
export function getCronSecret(): string | undefined {
  return (
    process.env.CRON_SECRET?.trim() ||
    process.env.DIRECTUS_WEBHOOK_SECRET?.trim() ||
    process.env.TOUR_GUIDE_STATUS_WEBHOOK_SECRET?.trim()
  );
}

export function isCronAuthorized(request: Request): boolean {
  const secret = getCronSecret();
  if (!secret) return false;

  const headerSecret =
    request.headers.get("x-cron-secret")?.trim() ||
    request.headers.get("x-webhook-secret")?.trim() ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();

  const url = new URL(request.url);
  const querySecret = url.searchParams.get("secret")?.trim();

  return headerSecret === secret || querySecret === secret;
}
