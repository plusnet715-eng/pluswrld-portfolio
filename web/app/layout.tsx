import type { Metadata, Viewport } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { getPresenceLinks, getSettings } from "../lib/content";

const workSans = Work_Sans({ subsets: ["latin"], display: "swap", variable: "--font-work-sans" });
const siteUrl = "https://pluswrld-portfolio.vercel.app";
const themeInit = `try { const saved = localStorage.getItem("pluswrld-theme") || "system"; const mode = saved === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : saved; document.documentElement.dataset.theme = mode; document.documentElement.style.colorScheme = mode; } catch { document.documentElement.dataset.theme = "light"; }`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Digital Builder for Shopify, Websites & Automation", template: "%s | Pluswrld" },
  description: "Paul Oloruntobi (Pluswrld) builds Shopify ecommerce stores, websites, no-code applications and business automations, and helps businesses improve search and social visibility.",
  applicationName: "Pluswrld",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Pluswrld",
    title: "Digital Builder for Shopify, Websites & Automation | Pluswrld",
    description: "Shopify ecommerce, websites, no-code applications, business automation and search and social visibility."
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Builder for Shopify, Websites & Automation | Pluswrld",
    description: "Digital building, ecommerce, automation and online visibility for growing businesses."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 }
  },
  icons: {
    icon: [{ url: "https://cdn.sanity.io/images/a8mywjme/production/42120f93d9abacd9cd4b416d8c1de7678d7fd31e-512x512.png", type: "image/png" }],
    shortcut: [{ url: "https://cdn.sanity.io/images/a8mywjme/production/42120f93d9abacd9cd4b416d8c1de7678d7fd31e-512x512.png", type: "image/png" }]
  }
};

export const viewport: Viewport = { themeColor: "#08120d", colorScheme: "light dark" };
export const revalidate = 300;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [settings, profiles] = await Promise.all([getSettings(), getPresenceLinks()]);
  const socialProfiles = profiles.filter((profile) =>
    profile.enabled === true && ["Instagram", "Facebook", "TikTok", "LinkedIn", "Threads"].includes(profile.name)
  );
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Pluswrld",
      url: siteUrl,
      publisher: { "@type": "Organization", name: "Pluswrld", url: siteUrl }
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Paul Oloruntobi",
      alternateName: "Pluswrld",
      url: siteUrl,
      jobTitle: "Digital Builder",
      description: "Digital builder helping businesses with Shopify ecommerce, websites, no-code applications, business automation, search visibility and social media visibility.",
      worksFor: { "@type": "Organization", name: "Pluswrld", url: siteUrl },
      knowsAbout: [
        "Shopify ecommerce",
        "Website development",
        "No-code application development",
        "Business automation",
        "Search engine optimisation",
        "Social media optimisation",
        "Creator commerce"
      ],
      sameAs: socialProfiles.map((profile) => profile.url)
    }
  ];

  return <html lang="en-NG" data-theme="light">
    <head>
      <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://cdn.shopify.com" />
    </head>
    <body className={workSans.variable}>
      <SiteHeader settings={settings} />
      <main>{children}</main>
      <SiteFooter settings={settings} profiles={profiles} />
    </body>
  </html>;
}
