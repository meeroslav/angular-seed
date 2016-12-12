var environment = require('./environment');
var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var merge = require('extendify')({ isDeep: true, arrays: 'concat' });
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');

var devConfig = require('./webpack.config.dev');
var stagingConfig = require('./webpack.config.staging');
var prodConfig = require('./webpack.config.prod');

// empty array lines are needed for extendify to work
module.exports = merge({
    resolve: {
      extensions: ['.ts', '.js', '.json', '.html', '.css', '.less']
    },
    entry: {
      polyfills: ['./src/polyfills.ts'],
      vendor: ['./src/vendor.ts'],
      main: ['./src/main.ts']
    },
    output: {
      path: root('dist'),
      filename: environment.isDevelopment ? '[name].js' : '[name].[hash].js',
      chunkFilename: environment.isDevelopment ? '[id].chunk.js' : '[id].[hash].chunk.js',
      publicPath: environment.isDevelopment ? 'http://localhost:51961/' : '/'
    },
    module: {
      loaders: [
        { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader'],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader' },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.html$/, loader: 'raw-loader' },
        { test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf)(.*?)$/, loader: 'url-loader?limit=10000&name=assets/styles/[name].[hash].[ext]' }
      ]
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
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        root('./src') // location of your src
      ),
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
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'polyfills']
      }),
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
      new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
      new HtmlWebpackPlugin({
        title: 'Angular2 seed',
        template: './src/index.html',
        chunksSortMode: 'dependency'
      })
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

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [path.resolve(__dirname, '..')].concat(args));
}