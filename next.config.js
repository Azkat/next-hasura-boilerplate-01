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
}

module.exports = nextConfig
