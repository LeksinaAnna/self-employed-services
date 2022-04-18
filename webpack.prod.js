const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = () => ({
    mode: 'production',
    entry: {
        app: ['@babel/polyfill', 'whatwg-fetch', './src/client/index.tsx'],
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: 'chunks/[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist/client'),
        publicPath: '/',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    './src/client/loaders/classnames-loader',
                    'less-loader',
                ],
                include: /src/,
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(ts|js)x?$/,
                include: /react-hotkeys-hook/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
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
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
    ],
});
