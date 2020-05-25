const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry:{
        //配置入口文件
        main:['@babel/polyfill',path.resolve(__dirname,'../src/main.ts')]
    },
    output:{
        //配置出口文件
        path:path.resolve(__dirname,"../dist"),
        //生成的文件名
        filename:'js/[name].[hash:8].js',
        //生成的chunk名
        chunkFilename:'js/[name].[hash:8].js',
        //静态文件访问路径
        publicPath:'/'
    },
    devServer: {
      hot: true,
      port: 3000,
      contentBase: path.join(__dirname, "../public"),
      open:true,
      proxy:[{
        context:['/user','/base','/tool'],
        target:'http://127.0.0.1:7001'
      }]
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js'
      },
      extensions: [
        '.js',
        '.vue',
        '.ts'
      ]
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                loader:'babel-loader'
            },
            // {
            //   test:/\.tsx?$/,
            //   use:'ts-loader',
            //   exclude: /node_modules/
            // },
            {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              use: [
                "babel-loader",
                {
                  loader: "ts-loader",
                  options: { appendTsxSuffixTo: [/\.vue$/] }
                },
                {
                  loader: 'tslint-loader'
                }
              ]
            },
            {
              test: /\.vue$/,
              use: [
                {
                  loader: 'cache-loader'
                },
                {
                  loader: 'vue-loader',
                  options: {
                    compilerOptions: {
                      preserveWhitespace: false
                    },
                  }
                }
              ]
            },
            {
              test:/\.css$/,
              use:[
                {
                  loader:'style-loader'
                },
                {
                  loader:'css-loader'
                }
              ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 4096,
                      fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[hash:8].[ext]'
                        }
                      }
                    }
                  }
                ]
              },
              {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 4096,
                      fallback: {
                        loader: 'file-loader',
                        options: {
                          name: 'media/[name].[hash:8].[ext]'
                        }
                      }
                    }
                  }
                ]
              },
              {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 4096,
                      fallback: {
                        loader: 'file-loader',
                        options: {
                          name: 'fonts/[name].[hash:8].[ext]'
                        }
                      }
                    }
                  }
                ]
              },
        ]
    },
    externals: {
      'AMap': 'AMap' // 高德地图配置
    },
    plugins:[
      
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}