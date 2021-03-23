const path = require('path')
const webpack = require('webpack')
const cp = require('child_process')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");

const version = cp.execSync('git rev-parse --short HEAD').toString().trim()

module.exports = {
  entry: './src',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      'GIT_VERSION': JSON.stringify(version),
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/_redirects", to: "" },
        {
          from: 'src/assets/images/favicon.ico',
          to: 'favicon.ico'
        }
      ],
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    stats: 'errors-only',
    overlay: true,
  },
}
