"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { ApiTouristGuide } from "@/components/tour-guides/types";
import { araBold, ibm } from "@/components/experiences/submit/experienceFormStyles";
import {
  getTourGuideSession,
  getValidAccessToken,
  logoutTourGuide,
  type DirectusAuthSession,
} from "@/lib/directus/tourGuideAuth";
import { fetchMyTourGuideProfile } from "@/lib/directus/tourGuideProfile";
import TourGuidePortalAuth from "./TourGuidePortalAuth";
import TourGuidePortalHero from "./TourGuidePortalHero";
import TourGuidePortalProfileForm from "./TourGuidePortalProfileForm";

const TourGuidePortalFlow = () => {
  const t = useTranslations("tourGuidePortal");
  const [session, setSession] = useState<DirectusAuthSession | null>(null);
  const [profile, setProfile] = useState<ApiTouristGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const loadProfile = useCallback(async () => {
    const token = await getValidAccessToken();
    if (!token) {
      setSession(null);
      setProfile(null);
      return;
    }
    const item = await fetchMyTourGuideProfile();
    setProfile(item);
  }, []);

  useEffect(() => {
    const stored = getTourGuideSession();
    if (!stored) {
      setLoading(false);
      return;
    }
    setSession(stored);
    loadProfile()
      .catch((err) => {
        setLoadError(
          err instanceof Error ? err.message : t("profile.errorGeneric"),
        );
      })
      .finally(() => setLoading(false));
  }, [loadProfile, t]);

  const onAuthenticated = async (nextSession: DirectusAuthSession) => {
    setSession(nextSession);
    setLoadError("");
    setLoading(true);
    try {
      await loadProfile();
    } catch (err) {
      setLoadError(
        err instanceof Error ? err.message : t("profile.errorGeneric"),
      );
    } finally {
      setLoading(false);
    }
  };

  const onLogout = () => {
    logoutTourGuide();
    setSession(null);
    setProfile(null);
    setLoadError("");
  };

  const onSaved = (saved: ApiTouristGuide) => {
    setProfile(saved);
  };

  return (
    <div className="flex min-h-0 w-full flex-col bg-background pb-4 text-foreground sm:pb-6">
      <TourGuidePortalHero />

      <div className="w-full px-4 pb-24 pt-10 sm:px-6 sm:pb-28 sm:pt-12 md:px-10 lg:px-8 lg:pb-32 lg:pt-14">
        {loading && (
          <p
            className="mx-auto max-w-[590px] text-center text-muted-foreground"
            style={{ fontFamily: ibm }}
          >
            {t("loading")}
          </p>
        )}

        {!loading && !session && (
          <TourGuidePortalAuth onAuthenticated={onAuthenticated} />
        )}

        {!loading && session && (
          <div className="mx-auto flex w-full max-w-[1026px] flex-col gap-8">
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p
                className="text-base text-secondary text-start"
                style={{ fontFamily: ibm }}
              >
                {t("signedInAs", { email: session.user.email ?? "" })}
              </p>
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex h-[42px] shrink-0 cursor-pointer items-center justify-center rounded-[43px] border border-border bg-background px-5 text-sm font-bold text-foreground transition-opacity hover:opacity-90"
                style={{ fontFamily: araBold }}
              >
                {t("logout")}
              </button>
            </div>

            {loadError && (
              <p
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 text-start"
                style={{ fontFamily: ibm }}
                role="alert"
              >
                {loadError}
              </p>
            )}

            <TourGuidePortalProfileForm profile={profile} onSaved={onSaved} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TourGuidePortalFlow;
