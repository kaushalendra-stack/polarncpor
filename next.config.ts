import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/api/(.*)",
        headers: [
          ...securityHeaders,
          {
            key: "Cache-Control",
            value: "public, max-age=300, stale-while-revalidate=600",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/npdc/:path*", destination: "https://npdc.ncpor.res.in/:path*", permanent: true },
      { source: "/data/:path*", destination: "https://data.ncpor.res.in/:path*", permanent: false },
      { source: "/ncpor/:path*", destination: "https://ncpor.res.in/:path*", permanent: true },
      { source: "/moes/:path*", destination: "https://moes.gov.in/:path*", permanent: true },
      { source: "/sih/:path*", destination: "https://sih.gov.in/:path*", permanent: true },
    ];
  },
  compress: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;