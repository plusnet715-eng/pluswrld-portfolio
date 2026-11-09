"use client";
import Link from "next/link";
import { useState } from "react";
import type { Settings } from "../lib/content";

const links = [{ href: "/services", label: "Services" }, { href: "/work", label: "Selected work" }, { href: "/about", label: "About" }, { href: "/process", label: "Process" }];
function Brand() {
  return <Link href="/" className="brand" aria-label="Pluswrld home"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 42 42"><path d="M7 31V11l10 12 9-12v20M27 31V18l8-8M31 10h4v4" /></svg></span><span className="brand-word">pluswrld<span className="brand-dot">.</span></span></Link>;
}
export function SiteHeader({ settings }: { settings: Settings }) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container header-inner">
    <Brand />
    <button className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
    <nav className={"main-nav" + (open ? " nav-open" : "")} aria-label="Main navigation">
      {links.map((x) => <Link key={x.href} href={x.href} onClick={() => setOpen(false)}>{x.label}</Link>)}
      <Link className="nav-mobile-extra" href="/how-i-can-help" onClick={() => setOpen(false)}>How I can help</Link>
      <Link className="nav-mobile-extra" href="/testimonials" onClick={() => setOpen(false)}>Reviews</Link>
      <Link className="button button-small" href="/contact" onClick={() => setOpen(false)}>Discuss a project <span>↗</span></Link>
    </nav>
  </div></header>;
}
export function SiteFooter({ settings }: { settings: Settings }) {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top">
      <div className="footer-brand"><Brand /><p>Build · Automate · Grow</p><span className="footer-philosophy">EMMPIRISISSO — {settings.secondaryTaglineMeaning}</span></div>
      <div className="footer-column"><span className="footer-label">Explore</span><Link href="/about">About me</Link><Link href="/how-i-can-help">How I can help</Link><Link href="/services">Services</Link><Link href="/process">My process</Link><Link href="/work">Past work</Link><Link href="/testimonials">Reviews</Link><Link href="/faq">FAQ</Link></div>
      <div className="footer-column"><span className="footer-label">Connect</span><a href="https://www.fiverr.com/timi_p1" target="_blank" rel="noreferrer">Fiverr ↗</a><a href="https://www.upwork.com/freelancers/~016b078cb44626d3a3" target="_blank" rel="noreferrer">Upwork ↗</a><a href={settings.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp ↗</a><a href={"mailto:" + settings.email}>Email ↗</a></div>
      <div className="footer-contact"><span className="footer-label">Have a project in mind?</span><h3>Let&apos;s make the next step clear.</h3><Link href="/contact" className="text-link">Start a conversation <span>↗</span></Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Pluswrld. All rights reserved.</span><span>Independent digital systems consultancy</span></div>
  </div></footer>;
}