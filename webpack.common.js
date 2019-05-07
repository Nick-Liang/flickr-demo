const path = require('path');

// Our Webpack Defaults
const commonConfig = {
  entry: {
    'main': './src/main.ts',
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts'
  },

  output: {
    publicPath: '/',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist')
  },

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

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'node_modules')]
  }

};

module.exports = commonConfig;
