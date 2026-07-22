"use client";

import type { KeyboardEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { NavbarDropdownLink, NavbarMegaMenu } from "./navbarData";

interface MegaMenuTriggerProps {
  label: string;
  menuKey: string;
  openMenuKey: string | null;
  onOpenChange: (key: string | null) => void;
  panelId: string;
}

interface MegaMenuPanelProps {
  label: string;
  menu: NavbarMegaMenu;
  panelId: string;
  isOpen: boolean;
  onNavigate: () => void;
}

function MegaLinkBadge({ badge }: { badge?: NavbarDropdownLink["badge"] }) {
  const t = useTranslations("nav");
  if (!badge) return null;

  if (badge === "pdf") {
    return (
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: "#fff",
          border: "1px solid rgba(255,255,255,.6)",
          borderRadius: 5,
          padding: "1px 6px",
        }}
      >
        {t("badgePdf")}
      </span>
    );
  }

  return (
    <span
      style={{
        fontSize: 9,
        fontWeight: 700,
        color: "#fff",
        background: "#7300CD",
        borderRadius: 5,
        padding: "2px 7px",
      }}
    >
      {t("badgeNew")}
    </span>
  );
}

/** Immersive Preview trigger: `.navlink` + ▾ caret. */
export function MegaMenuTrigger({
  label,
  menuKey,
  openMenuKey,
  onOpenChange,
  panelId,
}: MegaMenuTriggerProps) {
  const isOpen = openMenuKey === menuKey;

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (
      event.key === "ArrowDown" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      onOpenChange(menuKey);
    }
  };

  return (
    <button
      type="button"
      className="navlink"
      aria-expanded={isOpen}
      aria-controls={panelId}
      aria-haspopup="true"
      onClick={() => onOpenChange(isOpen ? null : menuKey)}
      onMouseEnter={() => onOpenChange(menuKey)}
      onFocus={() => onOpenChange(menuKey)}
      onKeyDown={onTriggerKeyDown}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "6px 0",
        fontSize: 16,
        fontWeight: 600,
        color: "#F4EFE4",
        whiteSpace: "nowrap",
        cursor: "pointer",
        background: "none",
        border: "none",
      }}
    >
      <span>{label}</span>
      <span
        aria-hidden
        style={{
          display: "inline-block",
          fontSize: 11,
          color: "#fff",
          transition: "transform .2s",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        ▾
      </span>
    </button>
  );
}

function MegaMenuLinkRow({
  item,
  isOpen,
  onNavigate,
}: {
  item: NavbarDropdownLink;
  isOpen: boolean;
  onNavigate: () => void;
}) {
  const t = useTranslations();
  const style = {
    display: "block" as const,
    padding: "12px 2px",
    borderBottom: "1px solid rgba(255,255,255,.09)",
    breakInside: "avoid" as const,
  };
  const inner = (
    <span
      className="megalink-u"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 16,
        fontWeight: 600,
        color: "#F4EFE4",
      }}
    >
      <span>{t(item.labelKey)}</span>
      <MegaLinkBadge badge={item.badge} />
    </span>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="megalink"
        tabIndex={isOpen ? 0 : -1}
        onClick={onNavigate}
        style={style}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className="megalink"
      tabIndex={isOpen ? 0 : -1}
      onClick={onNavigate}
      style={style}
    >
      {inner}
    </Link>
  );
}

function FeaturedCard({
  item,
  isOpen,
  onNavigate,
}: {
  item: NavbarDropdownLink;
  isOpen: boolean;
  onNavigate: () => void;
}) {
  const t = useTranslations();
  const title = t(item.labelKey);
  const kicker = item.badge === "pdf" ? t("nav.badgePdf") : t("nav.explore");

  const content = (
    <>
      <Image
        src={item.image}
        alt=""
        fill
        sizes="27vw"
        className="object-cover"
        aria-hidden
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(24,12,40,.92), rgba(24,12,40,.05) 62%, transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          insetInline: 0,
          bottom: 0,
          padding: "28px 26px",
          textAlign: "start",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#fff",
            fontWeight: 700,
            marginBottom: 7,
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            fontSize: 23,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 13,
            color: "#E7DEF0",
            marginTop: 6,
            lineHeight: 1.4,
          }}
        >
          {t(item.subKey)}
        </div>
      </div>
    </>
  );

  const style = {
    flex: 1,
    position: "relative" as const,
    overflow: "hidden" as const,
    display: "block" as const,
    borderInlineStart: "1px solid rgba(255,255,255,.08)",
  };

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={isOpen ? 0 : -1}
        onClick={onNavigate}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      tabIndex={isOpen ? 0 : -1}
      onClick={onNavigate}
      style={style}
    >
      {content}
    </Link>
  );
}

/** Immersive Preview mega panel — exact sizes from the HTML script. */
export function MegaMenuPanel({
  label,
  menu,
  panelId,
  isOpen,
  onNavigate,
}: MegaMenuPanelProps) {
  const featured = menu.featuredIndices
    .map((index) => menu.links[index])
    .filter(Boolean) as NavbarDropdownLink[];

  return (
    <div
      id={panelId}
      role="region"
      aria-label={label}
      aria-hidden={!isOpen}
      style={{
        position: "absolute",
        insetInline: 0,
        top: "100%",
        zIndex: 40,
        display: isOpen ? "flex" : "none",
        background: "rgba(45,0,80,0.92)",
        backdropFilter: "blur(20px) saturate(1.2)",
        WebkitBackdropFilter: "blur(20px) saturate(1.2)",
        color: "#fff",
        height: 474,
        overflow: "hidden",
        animation: isOpen ? "megaIn .24s ease" : undefined,
        boxShadow: "0 30px 60px -30px rgba(44,26,72,.6)",
      }}
    >
      <div
        style={{
          width: "46%",
          padding: "40px 44px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            columns: 2,
            columnGap: 38,
            marginTop: 4,
            flex: 1,
          }}
        >
          {menu.links.map((item) => (
            <MegaMenuLinkRow
              key={`${item.href}-${item.labelKey}`}
              item={item}
              isOpen={isOpen}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex" }}>
        {featured.map((item) => (
          <FeaturedCard
            key={`featured-${item.href}-${item.labelKey}`}
            item={item}
            isOpen={isOpen}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}
