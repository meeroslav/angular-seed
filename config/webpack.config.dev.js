var DashboardPlugin = require('webpack-dashboard/plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('assets/styles/styles.css');

module.exports = {
  devtool: '#inline-source-map',
  module: {
    loaders: [
      { test: /\.less$/, loader: extractCSS.extract({ fallbackLoader: 'style-loader', loader:'css-loader!less-loader'}) },
      { test: /\.css/, loader: 'css' }
    ]
  },
  plugins: [
    new DashboardPlugin(),
    extractCSS
  ],
  watch: false,
  output: {
    publicPath: 'http://localhost:51961/'
  }
};