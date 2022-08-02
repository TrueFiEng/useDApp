// const webpack = require("webpack");
const path = require('path');
const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = function (context, options) {
  return {
    name: 'usedapp-webpack-plugin',
    configureWebpack(config, isServer) {
      return {
        plugins: [
          new webpack.DefinePlugin({
            "process.env.NODE_DEBUG": JSON.stringify(process.env.NODE_DEBUG)
          }),
          new webpack.ProvidePlugin({
            Buffer: [require.resolve('buffer/'), 'Buffer']
          }),
          new NodePolyfillPlugin()
        ],
        resolve: {
          fallback: {
            os: false,
            http: false,
            https: false,
            stream: false,
            "buffer": require.resolve("buffer/")
          }
        }
      }
    },
  };
};
