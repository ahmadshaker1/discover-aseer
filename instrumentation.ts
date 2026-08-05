/**
 * Runs once when the Next.js Node server starts (`next start` / Coolify).
 * Boots in-app cron schedules so license emails don't depend on external curl cron.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startAppCronJobs } = await import("@/lib/cron/scheduler");
    startAppCronJobs();
  }
}
