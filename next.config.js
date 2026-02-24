/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/qr-code-generator',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig