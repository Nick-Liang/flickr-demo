const isDev = process.env.NODE_ENV !== 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin/dist/clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//Webpack Defaults
const commonConfig = {
  entry: {
    'vendor': './src/vendor.ts',
    'polyfills': './src/polyfills.ts',
    'main': isDev ? './src/main.ts' : "./src/main.aot.ts"
  },
  module: {
    rules: [
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
    extensions: ['.ts', '.js', '.scss']
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      title: "Flickr Demo Development",
      template: 'src/index.html'
    }),

    new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ])
  ]
};
module.exports = commonConfig;
