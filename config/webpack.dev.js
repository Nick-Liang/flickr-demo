const helper = require('./helper');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Webpack Dev Config
const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
        path: helper.root('dist')
    },
    module:{
        rules:[
            // .ts files for TypeScript
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {configFileName: helper.root('tsconfig.json')}
                    },
                    'angular2-template-loader',
                    'angular2-router-loader'
                ],
            }
        ]
    },
    devServer: {
        contentBase: helper.root('dist'),
        port: 3000,
        historyApiFallback: true,
        watchOptions: {aggregateTimeout: 300, poll: 1000},
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    }
};


module.exports = webpackMerge(commonConfig, devConfig);
