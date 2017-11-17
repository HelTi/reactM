/**
 * Created by 29912 on 2017/9/11.
 */
var path = require('path');
var utils = require('./utils');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    devtool: '#source-map',
    entry: './src/index.js',
    output: {
        filename: "static/js/[name][hash].js",
        path: path.join(__dirname, 'dist'),
        publicPath:'/'
        // publicPath: 'http://localhost:3000/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                loader: "html-loader?attrs=img:src img:data-src"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit:10000,
                    name:utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[ext]')
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'static/css/app.css'
        }),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: 'index.html', //生成的html存放路径，相对于 path
            template: './index.html', //html模板路径
            inject: 'body',
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    //方便开发使用，浏览器输入：http://localhost:3000访问
    devServer: {
        contentBase: './',
        host: 'localhost',
        compress: true,
        hot: true,
        port: 3000,
        inline: true
    }
}