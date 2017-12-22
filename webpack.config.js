const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

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
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015','es2016','es2017']
        }
      },{
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },{
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('./style.css')
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './docs'), // A directory or URL to serve HTML content from
    historyApiFallback: true, // fallback to /index.html for Single Page Applications.
    inline: true, // inline mode (set to false to disable including clinet scripts (like livereload))
    open: true // open default browser while launching
  }
};
