/**
 * One-time backfill: resolve google_maps_url → lat/lng and PATCH Directus.
 *
 * Usage: npm run backfill:map-coordinates
 *
 * Works with public write on `locations` or DIRECTUS_WRITE_TOKEN in .env.local
 */
import { backfillLocationCoordinates } from "../lib/maps/directusLocations";

const main = async () => {
  let remaining = 1;
  let batch = 0;
  const maxBatches = 25;

  console.log("[backfill] Starting coordinate backfill to Directus…");

  while (remaining > 0 && batch < maxBatches) {
    batch += 1;
    const result = await backfillLocationCoordinates({
      locale: "ar",
      limit: 40,
      concurrency: 8,
    });

    const { stats } = result;
    remaining = result.remaining;

    console.log(
      `[backfill] Batch ${batch}: saved=${stats.geocodedThisRequest} resolved=${stats.resolvedThisRequest} failed=${stats.geocodeFailed} persistFailed=${stats.geocodePersistFailed} remaining=${remaining}`,
    );

    if (stats.resolvedThisRequest === 0 && stats.geocodedThisRequest === 0) {
      console.warn("[backfill] No progress this batch — stopping.");
      break;
    }
  }

  if (remaining === 0) {
    console.log(
      "[backfill] Done. All locations with Maps URLs now have coordinates.",
    );
  } else {
    console.log(
      `[backfill] Stopped with ${remaining} locations still missing coordinates.`,
    );
  }
};

main().catch((error) => {
  console.error("[backfill] Fatal error:", error);
  process.exit(1);
});
