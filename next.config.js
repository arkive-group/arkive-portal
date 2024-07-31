module.exports = {
  trailingSlash: true,
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.formula1.com',
      },
      {
        protocol: 'https',
        hostname: 'media.formula1.com',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
