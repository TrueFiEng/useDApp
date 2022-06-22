const withFonts = require('next-fonts')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { DefinePlugin } = require('webpack')

const isDevelopment = process.env.NODE_ENV !== 'production'

const nextConfig = {
  reactStrictMode: true
}

module.exports = withFonts({
            ...nextConfig,
            enableSvg: true,
            webpack: {
              entry: './pages',
              devtool: isDevelopment ? 'eval-source-map' : 'source-map',
              plugins: [
                isDevelopment && new ReactRefreshWebpackPlugin(),
                new HtmlWebpackPlugin({
                  template: './src/index.html',
                }),
                new CopyPlugin({
                  patterns: [
                    { from: 'src/_redirects', to: '' },
                    {
                      from: 'src/assets/images/favicon.ico',
                      to: 'favicon.ico',
                    },
                  ],
                }),
                new DefinePlugin({
                  'process.env.MAINNET_URL': process.env.MAINNET_URL ? JSON.stringify(process.env.MAINNET_URL) : undefined
                })
              ].filter(Boolean),
              module: {
                rules: [
                  {
                    test: /\.tsx?$/,
                    loader: 'esbuild-loader',
                    exclude: /node_modules/,
                    options: {
                      loader: 'tsx',
                      target: 'es2018',
                    },
                  },
                  {
                    test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf|ico)$/,
                    use: ['file-loader'],
                  },
                ],
              },
              resolve: {
                extensions: ['.tsx', '.ts', '.js'],
              },
              output: {
                filename: '[name].[hash].js',
                path: path.resolve(__dirname, 'build'),
              },
              optimization: {
                minimizer: [
                  new ESBuildMinifyPlugin({
                    target: 'es2018',
                  }),
                ],
              },
              devServer: {
                historyApiFallback: true,
                host: '0.0.0.0',
                stats: 'errors-only',
                overlay: true,
                hot: true,
              },
              node: {
                fs: 'empty',
                net: 'empty',
                tls: 'empty',
                child_process: 'empty',
                module: 'empty'
              },
            },
        }
);