 const path = require('path');
 const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件,使得每次运行时，dist目录先清空，然后把最新的文件放进去
 const{CleanWebpackPlugin}=require('clean-webpack-plugin');
const { env } = require('process');
 //  webpack中所有的配置信息都写在module.exports里
 module.exports = {
    // 指定入口文件
          entry: "./src/index.ts",
        //   指定打包文件所在目录
         output:{
            // 指定打包文件的目录
            path:path.resolve(__dirname,'dist'),
            // 打包后文件的名字
            filename:"bundle.js",
            // webpack不使用箭头函数
            // environment:{
            //    arrowFunction: false
            // }
         },
         mode: 'development',
         // webpack打包时使用的模块
         module:{
            // 指定要加载的规则
            rules:[
                {//test指定的是规则生效的文件
                    test:/\.ts$/,
                    // 要使用的loader
                    use:[
                     // 配置babel
                     {
                        // 指定加载器
                        loader:"babel-loader",
                        options: {
                           // 设置预定义的环境
                           presets:[
                             [
                              // 指定环境的插件
                              "@babel/preset-env",
                              {
                                 // 要兼容的目标浏览器，本机的chorme打不开，然后就要报错
                                 // targets:{
                                 //    "chorme":"88"
                                 // },
                                 "corejs":"3",
                                 // usage表示使用浏览器时按照需求加载
                                 "useBuiltIns":"usage"
                              }
                             ]
                           ]
                        }
                     },
                     'ts-loader'
                  ],

                    // 排除的文件
                    exclude: /node-modules/
                },
               //  设置less文件的处理
               {
                  test:/\.less$/,
                  use:[
                     // 由下往上选择执行
                     "style-loader",
                     "css-loader",
                     // 引入postcss以解决css的兼容性问题
                     {
                        loader:"postcss-loader",
                        options:{
                           postcssOptions:{
                              plugins:[
                                 [
                                    // 预制环境
                                    "postcss-preset-env",
                                    {
                                       // 兼容浏览器信息,每个浏览器最新的两个版本
                                       Browserslist: 'last2 versions'
                                    }
                                 ]
                              ]
                           }
                        }
                     },
                     "less-loader"
                  ]
               }
            ]
         },
         // 配置webpack插件,可自动生成html文件，引入相关之源
         plugins: [
            new CleanWebpackPlugin(),
            // 自动生成html文件
            new HTMLWebpackPlugin(
               {
                   title:"贪吃蛇",
                  // template可以指定某个模板
                  template: "./src/index.html"
               }
            ),
         ],
         // 表示ts和js文件可以成为模块被引入
         resolve: {
            extensions: ['.ts','.js']
         }
 };