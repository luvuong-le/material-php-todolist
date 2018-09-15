const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    entry: [
        './src/js/app.js',
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js')
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src') 
        }
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        minimize: true,
                    }
                },
                {
                    loader: "postcss-loader",
                },
                {
                    loader: "sass-loader",
                }
            ]
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['env']
                }
            }
        },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../css/main.css",
        }),
        new OptimizeCssAssetsPlugin({}),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8081,
            proxy: 'http://localhost:8080/',
            files: ['./**/*'],
        })
    ]
};