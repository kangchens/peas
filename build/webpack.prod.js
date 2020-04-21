const marge = require('webpack-merge')
const webpackConfig = require('./webpack.config');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')//用于提取css到文件中
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin'); //用于压缩css代码
/*   clean-webpack-plugin 3.0 以上的版本需要使用对象结构  */
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');//用于删除上次构建的文件
const CopyWebpackPlugin = require('copy-webpack-plugin');//用户拷贝静态资源
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = marge(webpackConfig,{
    mode:'production',
    devtool:'#source-map',
    optimization:{
        splitChunks:{
            cacheGroups:{
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\\/]node_modules[\\\/]/,
                    priority: -10,
                    chunks: 'initial'
                  },
                  common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                  }
            }
        }
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin .loader
                    },
                    {
                        loader:'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    {
                        loader:'less-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        new MiniCssExtractPlugin({
            filename:'css/[name].[contenthash:8].css',
            chunkFilename:'css/[name].[contenthash:8].css'
        }),
        new OptimizeCssnanoPlugin({
            sourceMap: true,
            cssnanoOptions: {
              preset: [
                'default',
                {
                  mergeLonghand: false,
                  cssDeclarationSorter: false
                }
              ]
            }
          }),
          new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, '../public'),
              to: path.resolve(__dirname, '../dist')
            }
          ]),
          new CleanWebpackPlugin(),
          new bundleAnalyzerPlugin({
              analyzerMode:'static'
          })
    ]
})