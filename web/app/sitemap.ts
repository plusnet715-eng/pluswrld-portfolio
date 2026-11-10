import type { MetadataRoute } from "next";

const siteUrl = "https://pluswrld-portfolio.vercel.app";

const routes = [
  "",
  "/about",
  "/how-i-can-help",
  "/services",
  "/process",
  "/work",
  "/testimonials",
  "/faq",
  "/contact"
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === "" ? 1 :
      route === "/services" || route === "/work" || route === "/contact" ? 0.8 :
      0.6
  }));
}
