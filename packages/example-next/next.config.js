/** @type {import('next').NextConfig['webpack']} */
const webpack = (config, options) => {
  config.module.rules.push({
    test: /\.(png|gif|woff|woff2|eot|ttf|svg)$/,
    loader: 'url-loader',
  })

  return config
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack
}

module.exports = nextConfig
