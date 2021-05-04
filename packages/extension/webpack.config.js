const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { ESBuildMinifyPlugin } = require('esbuild-loader')

module.exports = {
  entry: './src',
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'static', to: '' }],
    }),
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
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'scripts/panel.bundle.js',
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
}
