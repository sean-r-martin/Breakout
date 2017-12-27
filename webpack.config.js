const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './app/start.js',
  output: {
    path: path.resolve(__dirname, './docs'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },{
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        }))
      },{
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },{
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '../',
              outputPath: 'img/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('./css/style.css')
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './docs'), // A directory or URL to serve HTML content from
    historyApiFallback: true, // fallback to /index.html for Single Page Applications.
    inline: true, // inline mode (set to false to disable including clinet scripts (like livereload))
    open: true // open default browser while launching
  }
};

if (process.env.NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeCSSAssets()
  )
}