/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Force clean rebuild
  generateBuildId: async () => `build-${Date.now()}`,
}

export default nextConfig
