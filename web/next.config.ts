import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [\n      { protocol: "https", hostname: "cdn.sanity.io" },\n      { protocol: "https", hostname: "www.whiskerwise.com.co", pathname: "/cdn/shop/**" },\n      { protocol: "https", hostname: "cdn.shopify.com" }\n    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000
  },
  poweredByHeader: false
};

export default nextConfig;
