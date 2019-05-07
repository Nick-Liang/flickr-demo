var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
// Webpack Config
var webpackConfig = {
  entry: {
    'main': './src/main.ts',
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts'
  },

  output: {
    publicPath: '',
    path: path.resolve(__dirname, './dist'),
  },

  plugins: [
    new CleanWebpackPlugin(),

    //new ExtractTextPlugin("app.css"),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new webpack.HashedModuleIdsPlugin()

  ],

  module: {
    rules: [
      // .ts files for TypeScript
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: {configFileName: './tsconfig.json'}
          },
          'angular2-template-loader',
          'angular2-router-loader'
        ],
      },
      {test: /\.css$/, loaders: ['to-string-loader', 'css-loader']},
      {test: /\.scss$/, loaders: 'sass-loader'},
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {test: /\.html$/, loader: 'html-loader'}
    ]
  },

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


// Our Webpack Defaults
var defaultConfig = {
  devtool: 'source-map',

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist')
    // sourceMapFilename: '[name].map'
    // chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'node_modules')]
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: {aggregateTimeout: 300, poll: 1000},
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },

  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
    clearImmediate: false,
    setImmediate: false
  }
};


module.exports = webpackMerge(defaultConfig, webpackConfig);
