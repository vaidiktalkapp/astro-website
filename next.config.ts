import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  // ✅ Image optimization — WebP/AVIF delivery (fixes "Improve image delivery")
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 1 day cache for optimized images
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },

  async headers() {
    return [
      // ✅ Static Next.js assets — 1 year immutable cache
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // ✅ Public images/media — 1 day cache
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      // ✅ Pages — CDN caches for 60s, browser revalidates (was: no-cache = re-fetch EVERY time!)
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=3600',
          },
        ],
      },
    ]
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    if (isServer) {
      config.externals = [...(config.externals || []), 'agora-rtc-sdk-ng'];
    }

    if (dev) {
      config.cache = false;
    }

    return config;
  },
};

export default nextConfig;