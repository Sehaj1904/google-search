/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'www.google.co.in',
      'lp2.hm.com',
      'image.uniqlo.com',
      'asset.brandfetch.io',
      'rukminim1.flixcart.com'
    ],
  },
}

module.exports = nextConfig

