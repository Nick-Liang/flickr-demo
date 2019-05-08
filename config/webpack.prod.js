const helper = require('./helper');
const webpack = require('webpack');
const ngw = require('@ngtools/webpack');
const commonConfig = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Webpack Config
const prodConfig = {
    mode: 'production',
    output: {
        publicPath: '/',
        filename: '[name].[contenthash].js',
        path: helper.root('dist')
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),

        new ngw.AngularCompilerPlugin({
            tsConfigPath: helper.root('tsconfig.aot.json'),
            entryModule: helper.root('src', 'app', 'app.module#AppModule')
        })
    ],
    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            }
        ]
    },
    optimization: {
        runtimeChunk: 'single',
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
        ],
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
