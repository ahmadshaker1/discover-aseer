import cron from "node-cron";
import { runTourGuideLicenseExpiryJob } from "@/lib/cron/tourGuideLicenseExpiry";

declare global {
  // Prevent duplicate schedules across Next.js hot reloads / multiple imports.
  // eslint-disable-next-line no-var
  var __discoverAseerCronStarted: boolean | undefined;
}

function envFlagEnabled(name: string, defaultEnabled = true): boolean {
  const raw = process.env[name]?.trim().toLowerCase();
  if (!raw) return defaultEnabled;
  return !["0", "false", "off", "no"].includes(raw);
}

/**
 * Start in-process cron jobs when the Next.js Node server boots.
 * Coolify runs `npm start` → one long-lived Node process → these schedules stay alive.
 */
export function startAppCronJobs(): void {
  if (globalThis.__discoverAseerCronStarted) return;
  if (process.env.NEXT_RUNTIME === "edge") return;

  // Disable with ENABLE_APP_CRON=false if you ever switch to external Coolify curl cron only.
  if (!envFlagEnabled("ENABLE_APP_CRON", true)) {
    console.info("[cron] ENABLE_APP_CRON=false — in-app schedules not started.");
    return;
  }

  globalThis.__discoverAseerCronStarted = true;

  // Daily 08:00 UTC — override with TOUR_GUIDE_LICENSE_CRON (standard 5-field cron).
  const licenseSchedule =
    process.env.TOUR_GUIDE_LICENSE_CRON?.trim() || "0 8 * * *";

  if (!cron.validate(licenseSchedule)) {
    console.error(
      `[cron] Invalid TOUR_GUIDE_LICENSE_CRON expression: ${licenseSchedule}`,
    );
    return;
  }

  cron.schedule(
    licenseSchedule,
    async () => {
      console.info("[cron] Running tour guide license expiry job…");
      try {
        const result = await runTourGuideLicenseExpiryJob();
        console.info(
          "[cron] License job finished",
          JSON.stringify({
            ok: result.ok,
            today: result.today,
            scanned: result.scanned,
            expiringSent: result.expiringSent,
            expiredSent: result.expiredSent,
            error: result.error,
          }),
        );
      } catch (error) {
        console.error("[cron] License job failed", error);
      }
    },
    { timezone: "UTC" },
  );

  console.info(
    `[cron] Tour guide license job scheduled (${licenseSchedule} UTC)`,
  );
}
