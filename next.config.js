const {withPlausibleProxy} = require('next-plausible')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = withPlausibleProxy()(nextConfig)
