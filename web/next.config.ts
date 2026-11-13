import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "www.whiskerwise.com.co", pathname: "/cdn/shop/**" },
      { protocol: "https", hostname: "cdn.shopify.com" }
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000
  },
  poweredByHeader: false
};

export default nextConfig;
