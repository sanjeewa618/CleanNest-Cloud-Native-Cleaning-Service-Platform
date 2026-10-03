/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    // Build එකේදී ESLint warnings/errors නිසා build එක fail වීම නවත්වයි
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type errors නිසා production build එක fail වීම නවත්වයි
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
