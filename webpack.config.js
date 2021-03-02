const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production'
    const isDev = !isProd

    console.log('isProd: ', isProd)
    console.log('isDev: ', isDev)

    const filename = ext => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`

    return{
        context: path.resolve(__dirname, 'src'),
        entry: {
            main: ['@babel/polyfill' ,'./index.js']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: filename('js')
        },
        resolve: {
            extensions: ['.js'],
            alias: {
                '@' : path.resolve(__dirname, 'src'),
                '@core' : path.resolve(__dirname, 'src', 'core')
            }
        },
        devtool: 'inline-source-map',
        plugins: [
            new HtmlWebpackPlugin({
                template:'./index.html'
            }),
            new FaviconsWebpackPlugin(
                {
                    logo: './assets/excel.svg',
                    cache: true,
                    favicons: {
                        appName: 'pure-js-excel',
                        appDescription: 'pureJS Excel',
                        developerName: 'Yulia Devin',
                    }
                }
            ),
            new MiniCssExtractPlugin({
                filename: filename('css')
            }),
            new CleanWebpackPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
            ]
        },
    }
}

