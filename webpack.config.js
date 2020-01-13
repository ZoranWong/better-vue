'use strict'

const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const resolve = dir => path.join(__dirname, '.', dir)

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    entry: {
        main: './src/main.js',
        better_cli: './bin/main.js'
    },
    output: {
        path: resolve('dist'), // 输出目录
        filename: '[name].js', // 输出文件
        libraryTarget: 'umd', // 采用通用模块定义
        library: 'better-vue', // 库名称
        libraryExport: 'default', // 兼容 ES6(ES2015) 的模块系统、CommonJS 和 AMD 模块规范
        globalObject: 'this' // 兼容node和浏览器运行，避免window is not undefined情况
    },
    devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')],
                exclude: /(node_modules)/
            }
        ]
    },
    plugins: isProd
        ? [
            new UglifyJsPlugin({
                parallel: true,
                // uglifyOptions: {
                //     compress: {
                //         warnings: false
                //     },
                //     mangle: true
                // },
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log']
                    }
                },
                sourceMap: true
            })
        ]
        : [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]
}
