const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Webpack Config
const prodConfig = {
  mode : 'production',

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new webpack.HashedModuleIdsPlugin()

  ],

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }

};

module.exports = webpackMerge(commonConfig, prodConfig);
