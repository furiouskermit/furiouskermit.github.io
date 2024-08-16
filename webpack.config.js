const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mode: 'production',
    devtool: 'eval',
    resolve: {
		extensions: ['.js', '.vue'],
        alias: {
            "@": path.resolve(__dirname, "./src/"),
        }
    },
    entry: {
        app: path.join(__dirname, 'main.js'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test : /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                    name: '[name].[contenthash].[ext]',
                    esModule: false,
                    },
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
        new HtmlWebpackPlugin()
    ],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist',
    },
}