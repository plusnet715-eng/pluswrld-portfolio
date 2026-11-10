"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { PresenceLink, Settings } from "../lib/content";

const primaryLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Selected work" }
];
const exploreLinks = [
  { href: "/about", label: "About me", description: "The person and approach behind Pluswrld" },
  { href: "/how-i-can-help", label: "How I can help", description: "Find the right starting point" },
  { href: "/process", label: "My process", description: "How projects are scoped and delivered" },
  { href: "/testimonials", label: "Reviews", description: "Feedback from clients and buyers" },
  { href: "/faq", label: "FAQ", description: "Answers before we begin" }
];
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

function FooterBrandEmblem() {
  return <svg className="footer-brand-emblem" viewBox="0 0 120 120" role="img" aria-label="Knowledge comes from sensory ideas">
    <defs>
      <path id="pluswrld-footer-tagline-arc" d="M 60,60 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0" />
    </defs>
    <text className="footer-emblem-curved-copy">
      <textPath href="#pluswrld-footer-tagline-arc" startOffset="2%" textLength="296" lengthAdjust="spacingAndGlyphs">Knowledge comes from sensory ideas</textPath>
    </text>
    <image href="https://cdn.sanity.io/images/a8mywjme/production/42120f93d9abacd9cd4b416d8c1de7678d7fd31e-512x512.png" x="29" y="29" width="62" height="62" preserveAspectRatio="xMidYMid meet" />
  </svg>;
}

export function SiteHeader({ settings }: { settings: Settings }) {
  const [open, setOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const closeMenus = () => { setOpen(false); setExploreOpen(false); };
  return <header className="site-header"><div className="container header-inner">
    <Brand settings={settings} />
    <div className="header-actions">
      <ThemePicker />
      <button className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => { setOpen(!open); setExploreOpen(false); }}><span /><span /></button>
    </div>
    <nav className={"main-nav" + (open ? " nav-open" : "")} aria-label="Main navigation">
      {primaryLinks.map((item) => <Link key={item.href} href={item.href} onClick={closeMenus}>{item.label}</Link>)}
      <div className={"nav-dropdown" + (exploreOpen ? " nav-dropdown-open" : "")}>
        <button className="nav-dropdown-trigger" type="button" aria-expanded={exploreOpen} aria-controls="pluswrld-explore-menu" onClick={() => setExploreOpen(!exploreOpen)}>
          Explore <svg viewBox="0 0 12 12" aria-hidden="true"><path d="m2 4 4 4 4-4" /></svg>
        </button>
        <div className="nav-dropdown-panel" id="pluswrld-explore-menu">
          <span className="nav-dropdown-heading">EXPLORE PLUSWRLD</span>
          {exploreLinks.map((item) => <Link key={item.href} href={item.href} onClick={closeMenus}>
            <strong>{item.label}</strong><span>{item.description}</span>
          </Link>)}
        </div>
      </div>
      <Link className="button button-small" href="/contact" onClick={closeMenus}>Discuss a project <span>↗</span></Link>
    </nav>
  </div></header>;
}

export function SiteFooter({ settings, profiles }: { settings: Settings; profiles: PresenceLink[] }) {
  const contactEmail = settings.email?.trim() || "timileyinpaul26@gmail.com";
  return <footer className="site-footer"><div className="container">
    <div className="footer-top">
      <div className="footer-brand">
        <div className="footer-brand-lockup"><FooterBrandEmblem /><Brand settings={settings} /></div>
        
      </div>
      <div className="footer-column"><span className="footer-label">Explore</span><Link href="/about">About me</Link><Link href="/how-i-can-help">How I can help</Link><Link href="/services">Services</Link><Link href="/process">My process</Link><Link href="/work">Past work</Link><Link href="/testimonials">Reviews</Link><Link href="/faq">FAQ</Link></div>
      <div className="footer-column"><span className="footer-label">Connect</span><a href="https://www.fiverr.com/timi_p1" target="_blank" rel="noreferrer">Fiverr ↗</a><a href="https://www.upwork.com/freelancers/~016b078cb44626d3a3" target="_blank" rel="noreferrer">Upwork ↗</a><a href={settings.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp ↗</a><a href={"mailto:" + contactEmail} aria-label={"Email " + contactEmail}>Email ↗</a></div>
      <div className="footer-contact"><span className="footer-label">Have a project in mind?</span><h3>Let&apos;s make the next step clear.</h3><Link href="/contact" className="text-link">Start a conversation <span>↗</span></Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Pluswrld. All rights reserved.</span><span>Knowledge comes from sensory ideas.</span></div>
  </div></footer>;
}
