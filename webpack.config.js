const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

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
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    },
                },
                use: {
                    // loader: 'file-loader',
                    loader: 'image-webpack-loader',
                    options: {
                        // name: '[name].[contenthash].[ext]',
                        // esModule: false,
                        mozjpeg: {
                            progressive: true,
                            quality: 65,
                        },
                        opting: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: [0.65, 0.9],
                            speed: 4,
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        webp: {
                            quality: 75,
                        },
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
        new HtmlWebpackPlugin({
            template: "public/index.html"
        }),
    ],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'docs'),
        publicPath: '',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false
                    }
                }
            })
        ]
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}