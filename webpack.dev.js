const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (env, argv) => ({
    mode: 'development',
    entry: {
        app: ['@babel/polyfill', 'whatwg-fetch', './src/client/index.tsx'],
    },
    output: {
        filename: '[name].js',
        chunkFilename: 'chunks/[name].js',
        path: path.resolve(__dirname, 'dist/client'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    './src/client/loaders/classnames-loader',
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]--[local]--[hash:base64:5]',
                                mode: 'local',
                            },
                        },
                    },
                    'less-loader',
                ],
                include: /src/,
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // {
            //     test: /\.(ts|js)x?$/,
            //     include: /react-hotkeys-hook/,
            //     exclude: /node_modules/,
            //     use: ['babel-loader'],
            // },
            {
                test: /\.css$/i,
                include: /react-(ui|icons)/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { modules: 'global' },
                    },
                ],
            },
            {
                test: /\.(img|png|jpe?g|gif|svg|woff|woff2|eot)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    devtool: 'source-map',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        open: true,
        https: true,
        allowedHosts: 'all',
        host: process.env.HOST,
        port: process.env.PORT || 3000,
        proxy: {
            '/api': {
                target: process.env.BASE_URL,
                changeOrigin: true,
                secure: false // проверка серта при https
            }
        },
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
            DEBUG: false,
            BASE_URL: process.env.BASE_URL,
            mode: 'development',
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
        }),
    ],
});
