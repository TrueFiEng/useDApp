// const webpack = require("webpack");
const path = require('path');
const webpack = require('webpack');

module.exports = function (context, options) {
  return {
    name: 'usedapp-webpack-plugin',
    configureWebpack(config, isServer) {
      return {
        plugins: [
          new webpack.ProvidePlugin({
            Buffer: [require.resolve('buffer/'), 'Buffer']
          })
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
