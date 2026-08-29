const withTM = require('next-transpile-modules')(['@uauth/node']);

module.exports = withTM({
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['assets.prod.euler.tools'],
  },
});
