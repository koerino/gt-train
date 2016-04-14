module.exports = {
  entry: [
    './application/static/js/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/application/static/js'
  },
  module: {
      loaders: [
          {test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel', query: {presets: ['es2015']}},
          {test: /\.css$/, loader: 'style-loader!css-loader'},
          {test: /\.png$/, loader: "url-loader"}
      ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};