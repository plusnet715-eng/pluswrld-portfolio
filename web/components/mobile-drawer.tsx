"use client";

import { useEffect, useId, useState } from "react";

export function MobileDrawer({
  children,
  label,
  expandedLabel,
  className = ""
}: {
  children: React.ReactNode;
  label: string;
  expandedLabel?: string;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(true);
  const contentId = useId();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const syncToViewport = () => setExpanded(!media.matches);
    syncToViewport();
    media.addEventListener?.("change", syncToViewport);
    return () => media.removeEventListener?.("change", syncToViewport);
  }, []);

  return <div className={["mobile-drawer", className].filter(Boolean).join(" ")}>
    <button
      className="mobile-drawer-toggle"
      type="button"
      aria-expanded={expanded}
      aria-controls={contentId}
      onClick={() => setExpanded((current) => !current)}
    >
      <span>{expanded ? (expandedLabel || label) : label}</span>
      <svg viewBox="0 0 16 16" aria-hidden="true" className={expanded ? "mobile-drawer-chevron is-open" : "mobile-drawer-chevron"}>
        <path d="m3 6 5 5 5-5" />
      </svg>
    </button>
    <div id={contentId} className="mobile-drawer-content" data-expanded={expanded}>
      {children}
    </div>
  </div>;
}
