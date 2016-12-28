// const path = require('path');
const webpack = require('webpack');
const helpers = require('./helpers/index');
const root = helpers.root;

// Webpack Plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('./loaders/index'); // temporary use custom version of copy-webpack-plugin
const DashboardPlugin = require('webpack-dashboard/plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const NODE_ENV = process.env.NODE_ENV;
const isBuild = ENV === 'build';
const isStaging = isBuild && NODE_ENV && NODE_ENV.indexOf('staging') !== -1;
const isCi = isBuild && NODE_ENV && NODE_ENV.indexOf('ci') !== -1;
const isProduction = isBuild && NODE_ENV && NODE_ENV.indexOf('production') !== -1;

const TRANSLATION_HASH = helpers.hashDate('tr$-');
const CONFIG_HASH = helpers.hashDate('con$-');

module.exports = (function makeWebpackConfig() {
  'use strict';

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (isStaging || isCi) {
    config.devtool = '#source-map';
  } else if (!isProduction) {
    config.devtool = '#cheap-module-source-map';
  }

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   */
  config.entry = {
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts',
    app: './src/main.ts' // our angular app
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   */
  config.output = {
    path: root('dist'),
    publicPath: isBuild ? '/' : 'http://localhost:51961/',
    filename: isBuild ? '[name].[hash].js' : '[name].js',
    chunkFilename: isBuild ? 'app/[id].[hash].chunk.js' : 'app/[id].chunk.js'
    // sourceMapFilename: isBuild ? 'app/[id].[hash].chunk.js.map' : 'app/[id].chunk.js.map',
  };

  /**
   * Resolve
   * Reference: http://webpack.github.io/docs/configuration.html#resolve
   */
  config.resolve = {
    // only discover files that have those extensions
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.less', '.html']
  };

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */
  config.module = {
    rules: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader'],
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },

      // copy those assets to output
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=assets/images/[name].[hash].[ext]'
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=assets/styles/fonts/[name].[hash].[ext]'
      },

      // Support for *.json files.
      {test: /\.json$/, loader: 'json-loader', include: root('src', 'app'), exclude: root('src', 'assets')},

      // Support for CSS as raw text
      // all css in src/style will be bundled in an external css file
      {
        test: /\.css$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader', 'postcss-loader']})
      },
      // all css required in src/app files will be merged in js files
      {test: /\.css$/, include: root('src', 'app'), loader: 'raw-loader!postcss-loader'},

      // support for .scss/.sass files
      // all css in src/style will be bundled in an external css file
      {
        test: /\.(scss|sass)$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader', 'postcss-loader', 'sass-loader']})
      },
      // all css required in src/app files will be merged in js files
      {test: /\.(scss|sass)$/, exclude: root('src', 'assets', 'styles'), loader: 'raw-loader!postcss-loader!sass-loader'},

      // support for .less files
      // all css in src/style will be bundled in an external css file
      {
        test: /\.less$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader', 'postcss-loader', 'less-loader']})
      },
      // all css required in src/app files will be merged in js files
      { test: /\.less$/, exclude: root('src', 'assets', 'styles'), loader: 'raw-loader!postcss-loader!less-loader'},

      // support for .html as raw text
      // change the loader to something that adds a hash to images
      {test: /\.html$/, loader: 'raw-loader',  include: root('src', 'app')}
    ]
  };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    // Define env variables to help with builds
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(isProduction ? 'production' : 'development'),
        TRANSLATION_HASH: JSON.stringify(TRANSLATION_HASH),
        CONFIG_HASH: JSON.stringify(CONFIG_HASH)
      }
    }),

    // Workaround needed for angular 2 angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('./src') // location of your src
    ),

    new ForkCheckerPlugin(),

    // Generate common chunks if necessary
    // Reference: https://webpack.github.io/docs/code-splitting.html
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new CommonsChunkPlugin({
      name: ['vendor', 'polyfills']
    }),

    // Inject script and link tags into html files
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      chunksSortMode: 'dependency'
    }),

    // Extract css files
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin({filename: '[name].[hash].css', disable: !isBuild}),

    // copy static resources
    new CopyWebpackPlugin([
      {
        from: root('src/public')
      },
      {
        from: root('src/assets/images/'),
        to: 'assets/images/[path][name].[ext]'
      },
      {
        from: root('src/assets/locales'),
        to: 'assets/locales/[name].' + TRANSLATION_HASH + '.json',
        transform: helpers.transformJsonFile,
        merge: helpers.combineJsonFiles
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: root('src/assets/configs'), to: 'assets/configs/config.production.' +  CONFIG_HASH + '.json',
        transform: helpers.transformJsonFileFlat(['prod']),
        merge: helpers.combineJsonConfigFiles
      },
      {
        from: root('src/assets/configs'), to: 'assets/configs/config.dev.' +  CONFIG_HASH + '.json',
        transform: helpers.transformJsonFileFlat(['dev', 'prod']),
        merge: helpers.combineJsonConfigFiles
      },
      {
        from: root('src/assets/configs'), to: 'assets/configs/config.ci.' +  CONFIG_HASH + '.json',
        transform: helpers.transformJsonFileFlat(['ci', 'prod']),
        merge: helpers.combineJsonConfigFiles
      },
      {
        from: root('src/assets/configs'), to: 'assets/configs/config.staging.' +  CONFIG_HASH + '.json',
        transform: helpers.transformJsonFileFlat(['staging', 'prod']),
        merge: helpers.combineJsonConfigFiles
      },
      {
        from: root('src/assets/configs'), to: 'assets/configs/config.' +  CONFIG_HASH + '.json',
        transform: helpers.transformJsonFileFlat( isProduction ?
          ['prod'] :
          isStaging ?
            ['staging', 'prod'] :
            isCi ? ['ci', 'prod'] :
              ['dev', 'prod']
        ),
        merge: helpers.combineJsonConfigFiles
      }
    ], { copyUnmodified: true }),

    // Tslint configuration for webpack 2
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        /**
         * Apply the tslint loader as pre/postLoader
         * Reference: https://github.com/wbuchwalter/tslint-loader
         */
        tslint: {
          emitErrors: false,
          failOnHint: false
        },
        /**
         * Sass
         * Reference: https://github.com/jtangelder/sass-loader
         * Transforms .scss files to .css
         */
        sassLoader: {
          //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
        },
        /**
         * Less
         * Reference: https://github.com/webpack/less-loader
         * Transforms .less files to .css
         */
        lessLoader: {
          //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/less")]
        },
        /**
         * PostCSS
         * Reference: https://github.com/postcss/autoprefixer-core
         * Add vendor prefixes to your css
         */
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    })
  ];

  // Add build specific plugins
  if (isBuild) {
    if (isProduction) {
      config.plugins.push(
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({sourceMap: false, mangle: {keep_fnames: false}})
      );
    }
  } else {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new DashboardPlugin());
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './src/public',
    historyApiFallback: true,
    quiet: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  };

  return config;
}());
