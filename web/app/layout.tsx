import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { getPresenceLinks, getSettings } from "../lib/content";

const siteUrl = "https://pluswrld-portfolio.vercel.app";
const themeInit = `try { const saved = localStorage.getItem("pluswrld-theme") || "system"; const mode = saved === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : saved; document.documentElement.dataset.theme = mode; document.documentElement.style.colorScheme = mode; } catch { document.documentElement.dataset.theme = "light"; }`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Shopify, Websites, Automation & Paid Advertising", template: "%s | Pluswrld" },
  description: "Build and improve Shopify stores, websites and automations, and manage paid advertising campaigns that help businesses reach the right customers.",
  applicationName: "Pluswrld",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Pluswrld",
    title: "Shopify Store Setup, Websites & Automation | Pluswrld",
    description: "Shopify store setup, websites, no-code apps, AI automation and paid advertising campaign management by Paul Oloruntobi at Pluswrld."
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify Store Setup, Websites & Automation | Pluswrld",
    description: "Build or improve your Shopify store, business website or no-code app. Pluswrld also connects AI workflows and strengthens search and social visibility."
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
    profile.enabled === true && ["Instagram", "Facebook", "TikTok", "LinkedIn", "Threads", "WhatsApp", "X", "Twitter"].includes(profile.name)
  );
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Pluswrld",
      url: siteUrl,
      logo: `${siteUrl}/pluswrld-logo.svg`,
      description: "Shopify store setup, website development, no-code applications, AI workflow automation and paid advertising campaign management.",
      sameAs: socialProfiles.map((profile) => profile.url)
    },
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
      description: "Digital builder helping businesses with Shopify ecommerce, websites, no-code applications, business automation and paid advertising campaign management.",
      worksFor: { "@type": "Organization", name: "Pluswrld", url: siteUrl },
      knowsAbout: [
        "Shopify ecommerce",
        "Website development",
        "No-code application development",
        "Business automation",
        "Search engine optimisation",
        "Social media optimisation",
        "Creator commerce",
        "Paid advertising campaign management",
        "Campaign strategy and optimisation"
      ],
      sameAs: socialProfiles.map((profile) => profile.url)
    }
  ];

  return <html lang="en-NG" data-theme="light">
    <head>
      <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://a8mywjme.apicdn.sanity.io" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://cdn.shopify.com" />
    </head>
    <body>
      <SiteHeader settings={settings} />
      <main>{children}</main>
      <SiteFooter settings={settings} profiles={profiles} />
    </body>
  </html>;
}
