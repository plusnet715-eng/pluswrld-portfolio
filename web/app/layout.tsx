import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { getPresenceLinks, getSettings } from "../lib/content";

export const metadata: Metadata = {
  title: { default: "Pluswrld — Build. Automate. Grow.", template: "%s | Pluswrld" },
  description: "Independent digital systems consultancy for Shopify ecommerce, websites, no-code applications and AI-powered business automation.",
  applicationName: "Pluswrld",
  openGraph: { type: "website", siteName: "Pluswrld", title: "Pluswrld — Build. Automate. Grow.", description: "Practical digital systems, clearly scoped and built around your business." },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" }
};
export const viewport: Viewport = { themeColor: "#08120d", colorScheme: "light" };
export const revalidate = 300;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [settings, profiles] = await Promise.all([getSettings(), getPresenceLinks()]);
  return <html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://use.typekit.net/hmk3hsy.css" />
  </head><body><SiteHeader settings={settings} /><main>{children}</main><SiteFooter settings={settings} profiles={profiles} /></body></html>;
}