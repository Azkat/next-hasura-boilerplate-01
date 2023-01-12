/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeFonts: true,
    scrollRestoration: true,
  },
  images: {
    domains: ['vmedia.droptune.net'],
    domains: ['media.droptune.net'],
  },
  async headers() {
    const headers = []
    if (
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'staging' ||
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'dev'
    ) {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      })
    }
    return headers
  },
}

module.exports = nextConfig
