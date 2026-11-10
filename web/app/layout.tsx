import type { Metadata, Viewport } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { getPresenceLinks, getSettings } from "../lib/content";

const workSans = Work_Sans({ subsets: ["latin"], display: "swap", variable: "--font-work-sans" });
const themeInit = `try { const saved = localStorage.getItem("pluswrld-theme") || "system"; const mode = saved === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : saved; document.documentElement.dataset.theme = mode; document.documentElement.style.colorScheme = mode; } catch { document.documentElement.dataset.theme = "light"; }`;

export const metadata: Metadata = {
  title: { default: "Pluswrld — Knowledge comes from sensory ideas", template: "%s | Pluswrld" },
  description: "Independent digital systems consultancy for Shopify ecommerce, websites, no-code applications and AI-powered business automation.",
  applicationName: "Pluswrld",
  openGraph: { type: "website", siteName: "Pluswrld", title: "Pluswrld — Knowledge comes from sensory ideas", description: "Practical digital systems, clearly scoped and built around your business." },
  icons: { icon: [{ url: "https://cdn.sanity.io/images/a8mywjme/production/a45e67c49c83edbb0b739c3348ae43406d8a67e4-576x513.png", type: "image/png" }], shortcut: [{ url: "https://cdn.sanity.io/images/a8mywjme/production/a45e67c49c83edbb0b739c3348ae43406d8a67e4-576x513.png", type: "image/png" }] }
};
export const viewport: Viewport = { themeColor: "#08120d", colorScheme: "light dark" };
export const revalidate = 300;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [settings, profiles] = await Promise.all([getSettings(), getPresenceLinks()]);
  return <html lang="en" data-theme="light"><head>
    <script dangerouslySetInnerHTML={{ __html: themeInit }} />
    <link rel="preconnect" href="https://use.typekit.net" />
    <link rel="stylesheet" href="https://use.typekit.net/hmk3hsy.css" />
  </head><body className={workSans.variable}><SiteHeader settings={settings} /><main>{children}</main><SiteFooter settings={settings} profiles={profiles} /></body></html>;
}
