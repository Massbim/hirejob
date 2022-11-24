/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_APP_API_URL: process.env.NEXT_APP_API_URL,
  },
  images: {
    domains: ["drive.google.com"],
  },
};

module.exports = nextConfig;
