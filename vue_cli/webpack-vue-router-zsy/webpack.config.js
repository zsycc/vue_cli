var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/main.js',
  output: {
    //__dirname + './public' 之前的写法
    //path.resolve(__dirname, './dist') 和上面是一样的
    path: path.resolve(__dirname, './dist'),
    //  publicPath: 顾名思义就是一个公共地址，用于处理静态资源的引用地址问题，比如图片的地址路径问题。
    //  /dist/ 之前是这个 但是我们本地运行报错了
    // publicPath: './',
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    //配置文件后缀
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    //当使用html5 history api,将会在响应404时返回index.html
    historyApiFallback: true,
    //启用noInfo，类似webpack bundle启动或保存的信息将会被隐藏，Errors和warnings仍会被显示。
    noInfo: true,
    //在浏览器上全屏显示编译的errors或warnings。
    overlay: true
  },
  //性能检测
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}
//生产环境和开发环境的判断
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new HtmlWebpackPlugin({
      template : 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
