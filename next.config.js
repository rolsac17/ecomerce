/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // pageExtensions: ['page.ts'],
  images: {
    domains: [
      process.env.NEXT_PUBLIC_API_DOMAIN,
      'tailwindui.com',
      'ui-avatars.com',
      'http://ec2-34-237-243-251.compute-1.amazonaws.com',
      'images.pexels.com',
      'api.weexa.net',
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
