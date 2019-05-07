const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Webpack Config
const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 3000,
      historyApiFallback: true,
      watchOptions: {aggregateTimeout: 300, poll: 1000},
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: 'Development',
          template: path.resolve(__dirname, 'src/index.html')
        }),
        new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ])
    ]
};


module.exports = webpackMerge(commonConfig, devConfig);
