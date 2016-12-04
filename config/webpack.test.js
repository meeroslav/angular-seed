var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: '#inline-source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  entry: '',
  verbose: true,
  module: {
    preLoaders: [
      { test: /\.ts$/, exclude: [/node_modules/,/\.(e2e|spec)\.ts$/], loader: 'tslint' }
    ],
    loaders: [
      /**
       * Unlike ts-loader, awesome-typescript-loader doesn't allow to override TS compiler options
       * in query params. We use separate `tsconfig.test.json` file, which only differs in one thing:
       * inline source maps. They are used for code coverage report.
       *
       * See project repository for details / configuration reference:
       * https://github.com/s-panferov/awesome-typescript-loader
       */
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          sourceMap: false,
          inlineSourceMap: true
        }
      },
      { test: /\.json/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.(png(.*?)|woff(.*?)|woff2(.*?)|eot(.*?)|ttf(.*?)|svg(.*?))$/, loader: 'url-loader?limit=10000&name=assets/styles/[name]_[hash].[ext]' },
      { test: /jquery\.js$/, loader: "expose?jQuery!expose?$" } // karma test loader wont expose jquery with ProvidePlugin, so needs to be like this
    ],
    postLoaders: [
      /**
       * Instruments TS source files for subsequent code coverage.
       * See https://github.com/deepsweet/istanbul-instrumenter-loader
       */
      {
        test: /\.ts$/,
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          /node_modules/,
          /\.(e2e|spec)\.ts$/
        ]
      }
    ]
  },
  tslint: {
    configuration: require('./tslint.json'),
    failOnHint: true,
    emitErrors: true
  }
};

