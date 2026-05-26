/** @type {import('next').NextConfig} */
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  trailingSlash: false,
  // Fixes "inferred workspace root" warning when multiple lockfiles exist.
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.arthhwise.com" }],
        destination: "https://arthhwise.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    // Prevent CDN/browser caching of HTML/RSC responses that can reference old chunk hashes
    // (common cause of ChunkLoadError after deploys behind a proxy/CDN).
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        has: [{ type: "header", key: "RSC" }],
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
