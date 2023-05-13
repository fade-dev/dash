/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/button-roles',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
