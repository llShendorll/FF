const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rules = require('./webpack.config.rules');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve('dist')
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            ...rules,
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlPlugin({
            template: 'index.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};
