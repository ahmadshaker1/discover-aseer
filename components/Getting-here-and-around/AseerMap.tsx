"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import "./AseerMap.css";
import {
  ASEER_COORDS,
  getCitiesData,
  getFullPath,
  REGIONS_PATHS,
  getControlPoint,
} from "./AseerMapLogic";

export default function AseerMap() {
  const t = useTranslations("gettingHere.land");
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const cities = getCitiesData(t);

  const [activeCityId, setActiveCityId] = useState<string | null>(null);
  const [pinnedCityId, setPinnedCityId] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const cityDotsRef = useRef<{ [key: string]: SVGGElement | null }>({});

  const activeCity = cities.find((c) => c.id === activeCityId);

  // Touch detection
  useEffect(() => {
    const handleTouch = (e: PointerEvent) => {
      setIsTouch(e.pointerType === "touch");
    };
    window.addEventListener("pointerdown", handleTouch, true);
    return () => window.removeEventListener("pointerdown", handleTouch, true);
  }, []);

  const handlePointerEnter = (cityId: string) => {
    if (!isTouch) setActiveCityId(cityId);
  };
  const handlePointerLeave = () => {
    if (!isTouch) setActiveCityId(pinnedCityId);
  };
  const handleClick = (cityId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (pinnedCityId === cityId) {
      setPinnedCityId(null);
      setActiveCityId(null);
    } else {
      setPinnedCityId(cityId);
      setActiveCityId(cityId);
    }
  };

  useEffect(() => {
    const handleWindowClick = () => {
      setPinnedCityId(null);
      setActiveCityId(null);
    };
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, []);

  // Tooltip positioning
  const [tooltipPos, setTooltipPos] = useState({
    left: 0,
    top: 0,
    below: false,
  });

  useEffect(() => {
    if (!activeCityId || !wrapRef.current || !tooltipRef.current) return;

    const cityEl = cityDotsRef.current[activeCityId];
    if (!cityEl) return;

    const outerDot = cityEl.querySelector(".dot-outer");
    if (!outerDot) return;

    const updatePos = () => {
      if (!wrapRef.current || !tooltipRef.current) return;

      const m = outerDot.getBoundingClientRect();
      const w = wrapRef.current.getBoundingClientRect();
      const pad = 12;
      const cx = m.left - w.left + m.width / 2;
      const cy = m.top - w.top + m.height / 2;
      const tw = tooltipRef.current.offsetWidth;
      const th = tooltipRef.current.offsetHeight;

      const below = cy - th - 22 < 0;
      const left = Math.max(
        pad + tw / 2,
        Math.min(cx, w.width - pad - tw / 2),
      );
      const top = below ? cy + m.height / 2 : cy - m.height / 2;

      setTooltipPos((prev) =>
        prev.left === left && prev.top === top && prev.below === below
          ? prev
          : { left, top, below },
      );
    };

    updatePos();
    window.addEventListener("resize", updatePos);
    return () => window.removeEventListener("resize", updatePos);
  }, [activeCityId]);

  return (
    <div
      className="aseer-map-container mx-auto"
      style={{ width: "100%", direction: dir as any }}
    >
      <div className="map-content">
        <div className="map-wrap" id="mapWrap" ref={wrapRef}>
          <svg
            className="map"
            id="map"
            viewBox="0 0 1000 824"
            preserveAspectRatio="xMidYMid meet"
            aria-label="خريطة المملكة العربية السعودية"
          >
            <g id="features">
              {REGIONS_PATHS.map((r) => {
                const isOriginActive = activeCity && activeCity.region === r.id;
                const isAseer = r.id === "SA14";
                const isAseerLit = !!activeCityId;

                return (
                  <path
                    key={r.id}
                    d={r.d}
                    id={r.id}
                    name={r.name}
                    className={`region-path ${
                      isOriginActive ? "origin-active" : ""
                    } ${isAseer && isAseerLit ? "aseer-lit" : ""}`}
                  />
                );
              })}
            </g>
            <g id="routes">
              {cities.map((c) => {
                const isActive = activeCityId === c.id;
                const pathData = isActive
                  ? getFullPath(c.x, c.y)
                  : `M${c.x} ${c.y}`;
                return (
                  <path
                    key={`route-${c.id}`}
                    className={`route ${isActive ? "on" : ""}`}
                    d={pathData}
                  />
                );
              })}
            </g>
            <g id="aseer-layer">
              <circle
                className="aseer-pulse"
                cx={ASEER_COORDS.x}
                cy={ASEER_COORDS.y}
                r="9"
              />
              <circle
                className="aseer-ring"
                cx={ASEER_COORDS.x}
                cy={ASEER_COORDS.y}
                r="11"
              />
              <circle
                className="aseer-core"
                cx={ASEER_COORDS.x}
                cy={ASEER_COORDS.y}
                r="4.5"
              />
              <text
                className="map-label"
                x={ASEER_COORDS.x}
                y={ASEER_COORDS.y + 30}
                textAnchor="middle"
                fontSize="28"
              >
                {t("aseer", { fallback: "عسير" })}
              </text>
            </g>
            <g id="markers">
              {cities.map((c) => {
                const isActive = activeCityId === c.id;
                return (
                  <g
                    key={`marker-${c.id}`}
                    className={`marker ${isActive ? "active" : ""}`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${c.name}، ${c.km} كم، ${c.hours} بالسيارة إلى عسير`}
                    onPointerEnter={() => handlePointerEnter(c.id)}
                    onPointerLeave={handlePointerLeave}
                    onClick={(e) => handleClick(c.id, e)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleClick(c.id, e as any);
                      }
                    }}
                    ref={(el) => {
                      cityDotsRef.current[c.id] = el;
                    }}
                  >
                    <circle className="hit" cx={c.x} cy={c.y} r="18" />
                    <circle className="dot-outer" cx={c.x} cy={c.y} r="7.5" />
                    <circle className="dot-inner" cx={c.x} cy={c.y} r="3.4" />
                    <text
                      className="map-label"
                      x={c.x}
                      y={c.y - 14}
                      textAnchor="middle"
                      fontSize="24"
                      fill="var(--ink)"
                    >
                      {c.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
          <div
            className={`map-tip ${tooltipPos.below ? "below" : ""}`}
            ref={tooltipRef}
            role="status"
            aria-live="polite"
            style={{
              display: activeCity ? "block" : "none",
              left: tooltipPos.left + "px",
              top: tooltipPos.top + "px",
            }}
          >
            {activeCity && (
              <>
                <div className="t-city">{activeCity.name}</div>
                <div className="t-rows">
                  <span className="t-k">
                    {t("distance", { fallback: "المسافة" })}
                  </span>
                  <span className="t-v" dir={dir as any}>
                    {activeCity.km}
                  </span>
                  <span className="t-k">
                    {t("drivingTime", { fallback: "مدة القيادة" })}
                  </span>
                  <span className="t-v accent" dir={dir as any}>
                    {activeCity.hours}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="map-side">
          <div className="mb-8 text-start">
            <h1 className="text-[48px] font-bold text-secondary leading-tight">
              {t("drivingToAseer")}
            </h1>
            <p className="text-[24px] text-muted-foreground mt-1 leading-normal">
              {t("distancesFromMajorCities")}
            </p>
          </div>
          <div className="map-legend" id="legend">
            {cities.map((c) => {
              const isActive = activeCityId === c.id;
              return (
                <div
                  key={`chip-${c.id}`}
                  className={`map-chip ${isActive ? "active" : ""}`}
                  onPointerEnter={() => handlePointerEnter(c.id)}
                  onPointerLeave={handlePointerLeave}
                  onClick={(e) => handleClick(c.id, e)}
                >
                  <span className="c-dot"></span>
                  <span className="c-body">
                    <span className="c-name">{c.name}</span>
                    <span className="c-meta">
                      <b dir={dir as any}>{c.km}</b> &middot;{" "}
                      <span dir={dir as any}>{c.hours}</span>
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
