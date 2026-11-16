"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";

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
          timerRef.current = window.setTimeout(() => setActive(true), 2600);
        } else {
          if (timerRef.current !== null) window.clearTimeout(timerRef.current);
          timerRef.current = null;
          setActive(false);
          setLoaded(false);
        }
      }
    }, { threshold: 0.65 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") setActive(true);
  };
  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      setActive(false);
      setLoaded(false);
    }
  };

  return <div ref={rootRef} className={`live-website-preview ${active ? "is-previewing" : ""} ${className}`} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave}>
    {poster && <Image className="live-preview-poster" src={poster} alt={title + " website preview poster"} fill sizes="(max-width: 760px) 100vw, 50vw" unoptimized={poster.endsWith(".svg") || (!poster.startsWith("/") && !poster.includes("cdn.sanity.io") && !poster.includes("cdn.shopify.com"))} />}
    {active && <iframe
      src={url}
      title={title + " live website preview"}
      loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      referrerPolicy="strict-origin-when-cross-origin"
      onLoad={() => setLoaded(true)}
      className={loaded ? "is-loaded" : ""}
    />}
    <span className="live-preview-hint">{active && loaded ? "LIVE WEBSITE" : active ? "LOADING PREVIEW" : "HOVER TO PREVIEW"}</span>
  </div>;
}
