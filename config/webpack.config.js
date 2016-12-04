var environment = require('./environment');
var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var merge = require('extendify')({ isDeep: true, arrays: 'concat' });
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var devConfig = require('./webpack.config.dev');
var stagingConfig = require('./webpack.config.staging');
var prodConfig = require('./webpack.config.prod');

// empty array lines are needed for extendify to work
module.exports = merge({
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    module: {
      loaders: [
        { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'], exclude: [/\.(spec|e2e)\.ts$/] },
        { test: /\.json/, loader: 'json-loader' },
        { test: /\.html$/, loader: 'raw-loader' },
        { test: /\.(png(.*?)|woff(.*?)|woff2(.*?)|eot(.*?)|ttf(.*?)|svg(.*?))$/, loader: 'url-loader?limit=10000&name=assets/styles/[name]_[hash].[ext]' }
      ]
    },
    entry: {
      polyfills: ['./src/polyfills.ts'],
      vendor: ['./src/vendor.ts'],
      main: ['./src/main.ts']
    },
    output: {
      path: path.join(__dirname, 'dist', ''),
      filename: '[name].js',
      publicPath: '/'
    },
    plugins: [
      // with this plugin we make build time vars (like environment settings) available to client app
      // primarily used in src/main.ts to enable angular production mode
      new webpack.DefinePlugin({
        'process.env': {
          'isDevelopment': environment.isDevelopment,
          'isStaging': environment.isStaging,
          'isProduction': environment.isProduction
        }
      }),
      new CopyWebpackPlugin([
        {
          from: 'src/assets/images',
          to: 'assets/images'
        },
        {
          from: 'src/assets/locales',
          to: 'assets/locales'
        }
      ]),
      new ForkCheckerPlugin(),
      new webpack.LoaderOptionsPlugin({
        test: /\.ts$/,
        exclude: [/node_modules/, /\.(e2e|spec)\.ts$/],
        options: {
          tslint: {
            configuration: require('../tslint.json'),
            failOnHint: true,
            emitErrors: true
          }
        }
      }),
      new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' })
    ],
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  },
  environment.isDevelopment ? devConfig : (environment.isStaging ? stagingConfig : prodConfig)
);
