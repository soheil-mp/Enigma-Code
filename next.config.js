/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  webpack: (config) => {
    // Handle canvas dependency
    config.resolve.alias.canvas = false;
    
    // Add rule for .tex files
    config.module.rules.push({
      test: /\.tex$/,
      use: 'raw-loader'
    });

    return config;
  }
};

module.exports = nextConfig; 