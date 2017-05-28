'use strict';

// Modules
let webpack = require('webpack');
let autoprefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function makeWebpackConfig() {
    var config = {};

    config.entry = {
        app: './src/app/app.js'
    };

    config.output = {
        path: __dirname + 'dist',
        publicPath: 'http://localhost:8080'
    };

    config.devtool = 'eval-source-map';

    config.module = {
        rules: [{
            // JS LOADER
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            // CSS LOADER
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: [
                    {loader: 'css-loader', query: {sourceMap: true}},
                    {loader: 'postcss-loader'}
                ],
            })
        }, {
            // ASSET LOADER
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader'
        }, {
            // HTML LOADER
            test: /\.html$/,
            loader: 'raw-loader'
        }]
    };

    config.plugins = [
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/i,
            options: {
                postcss: {
                    plugins: [autoprefixer]
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body'
        }),

        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files
        // Disabled when in test mode or not in build mode
        new ExtractTextPlugin({filename: 'css/[name].css', disable: false, allChunks: true}),

        new webpack.NoEmitOnErrorsPlugin(),

        // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
        // Dedupe modules in the output
        // new webpack.optimize.DedupePlugin(),

        // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
        // Minify all javascript, switch loaders to minimizing mode
        new webpack.optimize.UglifyJsPlugin(),

        // Copy assets from the public folder
        // Reference: https://github.com/kevlened/copy-webpack-plugin
        new CopyWebpackPlugin([{
            from: __dirname + '/src/public'
        }])
    ];

    config.devServer = {
        contentBase: './src/public',
        stats: 'minimal',
        proxy: {
            '/api/login': {
                'pathRewrite': {'^/api': ''},
                'target': 'http://vps394659.ovh.net:8081/',
                changeOrigin: true
            },
            '/api': {
                'target': 'http://vps394659.ovh.net:8081/',
                changeOrigin: true
            }
        }
    };

    return config;
}();
