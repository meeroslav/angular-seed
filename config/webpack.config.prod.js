var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('assets/styles/styles.css');

module.exports = {
  module: {
    loaders: [
      { test: /\.less$/, loader: extractCSS.extract({ fallbackLoader: 'style-loader', loader: "css-loader!less-loader" }) },
      { test: /\.css/, loader: extractCSS.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' }) }
    ]
  },
  plugins: [
    extractCSS,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      minimize: true,
      mangle: false // Due to https://github.com/angular/angular/issues/6678
    })
  ]
};
