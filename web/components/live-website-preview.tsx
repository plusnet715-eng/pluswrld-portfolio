"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  url: string;
  title: string;
  poster?: string;
  className?: string;
};

export function LiveWebsitePreview({ url, title, poster, className = "" }: Props) {
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const touchDevice = window.matchMedia("(hover: none)").matches;
    if (!touchDevice || !rootRef.current) return;
    const node = rootRef.current;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (timerRef.current !== null) window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => setActive(true), 2200);
        } else {
          if (timerRef.current !== null) window.clearTimeout(timerRef.current);
          timerRef.current = null;
          setActive(false);
          setLoaded(false);
        }
      }
    }, { threshold: 0.35, rootMargin: "0px 0px -10% 0px" });
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    setActive(true);
    setLoaded(false);
  };
  const handleMouseLeave = () => {
    setActive(false);
    setLoaded(false);
  };

  return <div ref={rootRef} className={`live-website-preview ${active ? "is-previewing" : ""} ${className}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    {poster && <Image className="live-preview-poster" src={poster} alt={title + " website preview poster"} fill sizes="(max-width: 760px) 100vw, 50vw" unoptimized={poster.endsWith(".svg") || (!poster.startsWith("/") && !poster.includes("cdn.sanity.io") && !poster.includes("cdn.shopify.com"))} />}
    {active && <iframe
      src={url}
      title={title + " live website preview"}
      loading="eager"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      aria-hidden="true"
      tabIndex={-1}
      onLoad={() => setLoaded(true)}
      className={loaded ? "is-loaded" : ""}
    />}
    <span className="live-preview-hint">{active && loaded ? "LIVE WEBSITE" : active ? "LOADING PREVIEW" : "HOVER TO PREVIEW"}</span>
  </div>;
}
