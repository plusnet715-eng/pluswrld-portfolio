"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { PresenceLink, Settings } from "../lib/content";

const links = [{ href: "/services", label: "Services" }, { href: "/work", label: "Selected work" }, { href: "/about", label: "About" }, { href: "/process", label: "Process" }];
type ThemePreference = "system" | "light" | "dark";

function applyTheme(preference: ThemePreference) {
  const resolved = preference === "system"
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : preference;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
}

function ThemePicker() {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let saved: ThemePreference = "system";
    try {
      const stored = window.localStorage.getItem("pluswrld-theme");
      if (stored === "light" || stored === "dark" || stored === "system") saved = stored;
    } catch {}
    setPreference(saved);
    applyTheme(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyTheme(preference);
    try { window.localStorage.setItem("pluswrld-theme", preference); } catch {}
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => { if (preference === "system") applyTheme("system"); };
    media.addEventListener?.("change", onSystemChange);
    return () => media.removeEventListener?.("change", onSystemChange);
  }, [preference, ready]);

  return <label className="theme-picker">
    <span className="theme-picker-label">Theme</span>
    <select aria-label="Choose website theme" value={preference} onChange={(event) => setPreference(event.target.value as ThemePreference)}>
      <option value="system">System</option>
      <option value="light">White</option>
      <option value="dark">Black</option>
    </select>
  </label>;
}

function Brand({ settings }: { settings: Settings }) {
  return <Link href="/" className="brand brand-text-lockup" aria-label="Pluswrld home">
    <span className="brand-wordmark"><span className="brand-plus">Plus</span><span className="brand-wrld">wrld</span></span>
    <span className="brand-tagline">{settings.tagline || "Build • Automate • Grow"}</span>
    <span className="brand-philosophy">{settings.secondaryTagline || "Knowledge comes from sensory ideas"}</span>
  </Link>;
}
export function SiteHeader({ settings }: { settings: Settings }) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container header-inner">
    <Brand settings={settings} />
    <div className="header-actions">
      <ThemePicker />
      <button className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
    <nav className={"main-nav" + (open ? " nav-open" : "")} aria-label="Main navigation">
      {links.map((x) => <Link key={x.href} href={x.href} onClick={() => setOpen(false)}>{x.label}</Link>)}
      <Link className="nav-mobile-extra" href="/how-i-can-help" onClick={() => setOpen(false)}>How I can help</Link>
      <Link className="nav-mobile-extra" href="/testimonials" onClick={() => setOpen(false)}>Reviews</Link>
      <Link className="button button-small" href="/contact" onClick={() => setOpen(false)}>Discuss a project <span>↗</span></Link>
    </nav>
  </div></header>;
}
export function SiteFooter({ settings, profiles }: { settings: Settings; profiles: PresenceLink[] }) {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top">
      <div className="footer-brand"><Brand settings={settings} /></div>
      <div className="footer-column"><span className="footer-label">Explore</span><Link href="/about">About me</Link><Link href="/how-i-can-help">How I can help</Link><Link href="/services">Services</Link><Link href="/process">My process</Link><Link href="/work">Past work</Link><Link href="/testimonials">Reviews</Link><Link href="/faq">FAQ</Link></div>
      <div className="footer-column"><span className="footer-label">Connect</span><a href="https://www.fiverr.com/timi_p1" target="_blank" rel="noreferrer">Fiverr ↗</a><a href="https://www.upwork.com/freelancers/~016b078cb44626d3a3" target="_blank" rel="noreferrer">Upwork ↗</a><a href={settings.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp ↗</a><a href={"mailto:" + settings.email}>Email ↗</a></div>
      <div className="footer-contact"><span className="footer-label">Have a project in mind?</span><h3>Let&apos;s make the next step clear.</h3><Link href="/contact" className="text-link">Start a conversation <span>↗</span></Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Pluswrld. All rights reserved.</span><span>Knowledge comes from sensory ideas.</span></div>
  </div></footer>;
}
