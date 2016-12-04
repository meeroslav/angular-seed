module.exports = {
  devtool: '#inline-source-map',
  module: {
    loaders: [
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.css/, loader: 'css' }
    ]
  },
  plugins: [
    // new webpack.NoErrorsPlugin() // no errors plugin is not needed when using hot replacement
  ],
  watch: false,
  output: {
    publicPath: 'http://localhost:51961/'
  }
};
