/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  output: 'export',
  trailingSlash: true,
  // A static page can paint from its HTML instead of waiting for a separate stylesheet.
  experimental: { inlineCss: true },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
