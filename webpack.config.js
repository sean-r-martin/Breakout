module.exports = {
  entry: './app/start.js',
  output: {
    path: __dirname,
    filename: './docs/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  }
};
