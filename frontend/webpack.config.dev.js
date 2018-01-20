const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base');

module.exports = merge(webpackBaseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['app'],
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendorm',
            chunks: ['appm'],
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            },
            // 混淆
            mangle: false
        })
    ],
    devtool: 'source-map'
});