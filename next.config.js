/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeFonts: true,
    scrollRestoration: true,
  },
  images: {
    domains: ['vmedia.droptune.net'],
  },
}

module.exports = nextConfig
