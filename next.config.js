module.exports = {
  future: {
    webpack5: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack: (config, {}) => {
    // Perform customizations to webpack config
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
