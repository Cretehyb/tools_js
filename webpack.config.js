var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 分离css
const uglify = require('uglifyjs-webpack-plugin');// js代码压缩插件
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");


const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|svg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500000,
              name: 'images/[name]-[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: /(node_modules|bower_components)/  // 优化处理加快速度
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
    })
  ]
}

if (isDev) {
  // 开发环境下
  config.devServer = {
    host: 'localhost',	// 服务器的IP地址，可以使用IP也可以使用localhost
    compress: true,	// 服务端压缩是否开启
    port: 3000, // 端口
    hot: true,
    open: true
  }

  config.module.rules.push(
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: (loader) => [
              require('postcss-import')({ root: loader.resourcePath }),
              require('postcss-cssnext')(),
              require('autoprefixer')(),
              require('cssnano')()
            ]
          }
        }

      ]
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: (loader) => [
              require('postcss-import')({ root: loader.resourcePath }),
              require('postcss-cssnext')(),
              require('autoprefixer')(),
              require('cssnano')()
            ]
          }
        },
        {
          loader: 'less-loader' // 如果less文件中使用了@import 引入了别的less文件，这里可以不用设置importLoaders
        }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: (loader) => [
              require('postcss-import')({ root: loader.resourcePath }),
              require('postcss-cssnext')(),
              require('autoprefixer')(),
              require('cssnano')()
            ]
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    }
  )
} else {
  // 生产模式下
  config.plugins.push(new uglify())
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  )

  config.module.rules.push(
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: (loader) => [
              require('postcss-import')({ root: loader.resourcePath }),
              require('postcss-cssnext')(),
              require('autoprefixer')(),
              require('cssnano')()
            ]
          }
        }
      ]
    },
    {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: (loader) => [
              require('postcss-import')({ root: loader.resourcePath }),
              require('postcss-cssnext')(),
              require('autoprefixer')(),
              require('cssnano')()
            ]
          }
        },
        'less-loader'
      ]
    },
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: (loader) => [
              require('postcss-import')({ root: loader.resourcePath }),
              require('postcss-cssnext')(),
              require('autoprefixer')(),
              require('cssnano')()
            ]
          }
        },
        'sass-loader'
      ]
    }
  )
  config.module.rules.push(
    {
      test: /\.(htm|html)$/i,
      loader: 'html-withimg-loader'
    }
  )
}

module.exports = config;