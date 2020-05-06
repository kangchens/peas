// build/webpack.dev.js
const merge = require('webpack-merge');
const webpackConfig = require("./webpack.config");
const webpack = require('webpack');
module.exports = merge(webpackConfig,{
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.less$/,
                use:  [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options:  {
                            importLoaders:  2
                        }
                    },
                    {
                        loader: 'less-loader'
                    },
                    {
                        loader:  'postcss-loader'
                    }
                ]
            },
        ]
    },
    // DefinePlugin可以定义环境变量
    plugins: [
        new webpack.DefinePlugin({
            process:  {
                env:{
                    NODE_ENV: JSON.stringify('development'),
                    BASE_URL:"'http://localhost:3000'"
                }
            }
        })
    ]
})