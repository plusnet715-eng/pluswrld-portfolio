import type { NextConfig } from "next";
const nextConfig: NextConfig = {\n  images: {\n    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],\n    formats: ["image/avif", "image/webp"],\n    minimumCacheTTL: 2592000\n  },\n  poweredByHeader: false\n};
export default nextConfig;