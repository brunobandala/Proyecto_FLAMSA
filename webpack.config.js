var webpack = require('webpack'); 
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    watch : false,
    mode : "development",
    context : path.resolve(__dirname,'web-app'),
    entry: {
        polyfills: './src/scripts/config/polyfills.ts',
        vendor: './src/scripts/config/vendor.ts',
        app: './src/scripts/main.ts' 
    }, 
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'fletes-[name].js',
        chunkFilename: 'fletes-[id].chunk.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port : 9001
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            {
              loader: 'awesome-typescript-loader',
              options: { configFileName: path.resolve(__dirname+'/tsconfig.json') }
            } , 'angular2-template-loader'
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader'

        },
        {
          test: /\.css$/,
          loaders: ['to-string-loader','style-loader', 'css-loader']
        }
      ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/, 
      path.resolve(__dirname,'./web-app'),{}),
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    })

  ]
};