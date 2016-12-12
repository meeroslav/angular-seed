var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('assets/styles/styles.css');

module.exports = {
  devtool: '#source-map',
  module: {
    loaders: [
      { test: /\.less$/, loader: extractCSS.extract({ fallbackLoader: 'style-loader', loader: "css-loader!less-loader" }) },
      { test: /\.css/, loader: extractCSS.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' }) }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    extractCSS
  ]
};