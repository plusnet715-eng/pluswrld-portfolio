import type { Metadata, Viewport } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { getPresenceLinks, getSettings } from "../lib/content";

const workSans = Work_Sans({ subsets: ["latin"], display: "swap", variable: "--font-work-sans" });
const siteUrl = "https://pluswrld-portfolio.vercel.app";\nconst themeInit = `try { const saved = localStorage.getItem("pluswrld-theme") || "system"; const mode = saved === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : saved; document.documentElement.dataset.theme = mode; document.documentElement.style.colorScheme = mode; } catch { document.documentElement.dataset.theme = "light"; }`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),\n  title: { default: "Pluswrld | Digital Builder for Ecommerce, Websites & Automation", template: "%s | Pluswrld" },
  description: "Digital building for Shopify ecommerce, websites, no-code applications, business automation and online visibility across search and social media.",
  applicationName: "Pluswrld",
  alternates: { canonical: "/" },\n  openGraph: { type: "website", siteName: "Pluswrld", title: "Pluswrld | Digital Builder for Ecommerce, Websites & Automation", description: "Shopify ecommerce, websites, no-code applications, business automation and search and social visibility." },\n  twitter: { card: "summary_large_image", title: "Pluswrld | Digital Builder for Ecommerce, Websites & Automation", description: "Digital building, ecommerce, automation and online visibility for growing businesses." },\n  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: [{ url: "https://cdn.sanity.io/images/a8mywjme/production/42120f93d9abacd9cd4b416d8c1de7678d7fd31e-512x512.png", type: "image/png" }], shortcut: [{ url: "https://cdn.sanity.io/images/a8mywjme/production/42120f93d9abacd9cd4b416d8c1de7678d7fd31e-512x512.png", type: "image/png" }] }
};
export const viewport: Viewport = { themeColor: "#08120d", colorScheme: "light dark" };
export const revalidate = 300;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [settings, profiles] = await Promise.all([getSettings(), getPresenceLinks()]);
  return <html lang="en-NG" data-theme="light"><head>
    <script dangerouslySetInnerHTML={{ __html: themeInit }} />
    <link rel="preconnect" href="https://use.typekit.net" />
    <link rel="stylesheet" href="https://use.typekit.net/hmk3hsy.css" />
  </head><body className={workSans.variable}><SiteHeader settings={settings} /><main>{children}</main><SiteFooter settings={settings} profiles={profiles} /></body></html>;
}
