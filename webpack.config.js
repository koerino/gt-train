module.exports = {
  entry: [
    './application/static/js/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/application/static/js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};