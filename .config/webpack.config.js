const fs = require('fs');
const webpack = require('webpack');
const helpers = require('./helpers/index');
const root = helpers.root;
const chalk = require('chalk');

// Webpack Plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('./loaders/index'); // temporary use custom version of copy-webpack-plugin
const DashboardPlugin = require('webpack-dashboard/plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin'); // Or `import 'base-href-webpack-plugin';` if using typescript

const rxPaths = require('rxjs/_esm5/path-mapping');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const entryPoints = ['inline', 'polyfills', 'vendor', 'main'];
const nodeModules = root('node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = root('src', '$$_gendir', 'node_modules');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const NODE_ENV = process.env.NODE_ENV;
const isBuild = ENV === 'build';
const isProduction = isBuild && NODE_ENV && NODE_ENV.indexOf('production') !== -1;
const isLocalE2E = isBuild && NODE_ENV && NODE_ENV.indexOf('e2e') !== -1;
const isTeamCity = process.env.TEAMCITY_VERSION;

const TRANSLATION_HASH = helpers.hashDate('');
const CONFIG_HASH = helpers.hashDate('');

const baseHref = process.env.BASE_HREF || '/';

const childProcess = require('child_process');
const GIT_COMMIT = isTeamCity ?
  'Not available' :
  childProcess.execSync('git rev-parse --short HEAD').toString().replace(/\n/, '');
const GIT_BRANCH = isTeamCity ?
  'Unknown' :
  childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\n/, '');

module.exports = (function makeWebpackConfig() {
  console.info('');
  console.info(chalk.cyan('                                      __  '));
  console.info(chalk.cyan(' .‾‾\\--.-----.  .-----.-----.-----.--|  | '));
  console.info(chalk.cyan(' |     |  _  |  |__ --|  -__|  -__|  _  | '));
  console.info(chalk.cyan(' |__\\__|\\__  |  |_____|_____|_____|_____| '));
  console.info(chalk.cyan('        |____/                            '));
  console.info(chalk.magenta('                                 ........ '));
  console.info('');

  let config = {};

  config.resolve = {
    // only discover files that have those extensions
    extensions: ['.ts', '.js'],
    modules: ['./node_modules'],
    symlinks: true,
    alias: rxPaths()
  };

  config.entry = {
    polyfills: './src/polyfills.ts',
    main: './src/main.ts'
  };

  config.output = {
    path: root('dist'),
    publicPath: isBuild ? '' : 'http://localhost:51961/',
    filename: isBuild ? '[name].[hash].js' : '[name].js',
    chunkFilename: isBuild ? '[id].[hash].chunk.js' : '[id].chunk.js'
  };

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */
  config.module = {
    rules: [
      // support for .html as raw text
      {
        test: /\.html$/, loader: 'raw-loader', include: root('src', 'app')
      },
      // support for assets
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=assets/images/[name].[hash].[ext]&limit=10000'
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=assets/styles/fonts/[name].[hash].[ext]&limit=10000'
      },
      // TS file pre-linting
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack'
      },

      // Support for CSS as raw text
      // all css in src/style will be bundled in an external css file
      {
        test: /\.css$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader'] })
      },
      // all css required in src/app files will be merged in js files
      { test: /\.css$/, include: root('src', 'app'), loader: 'raw-loader!postcss-loader' },
      // support for .scss/.sass files
      // all css in src/style will be bundled in an external css file
      {
        test: /\.(scss|sass)$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'sass-loader'] })
      },
      // all css required in src/app files will be merged in js files
      { test: /\.(scss|sass)$/, exclude: root('src', 'assets', 'styles'), loader: 'raw-loader!postcss-loader!sass-loader' },

      // support for .less files
      // all css in src/style will be bundled in an external css file
      {
        test: /\.less$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'less-loader']})
      },
      // all css required in src/app files will be merged in js files
      { test: /\.less$/, exclude: root('src', 'assets', 'styles'), loader: 'raw-loader!postcss-loader!less-loader' }
    ]
  };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    new CircularDependencyPlugin({
      exclude: /(\\|\/)node_modules(\\|\/)/,
      failOnError: false,
      onDetected: false,
      cwd: process.cwd(),
    }),
    // Define env variables to help with builds
    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(isProduction || isLocalE2E ? 'production' : 'development'),
        TRANSLATION_HASH: JSON.stringify(TRANSLATION_HASH),
        CONFIG_HASH: JSON.stringify(CONFIG_HASH),
        BRANCH: JSON.stringify(GIT_BRANCH),
        COMMITHASH: JSON.stringify(GIT_COMMIT)
      }
    }),
    new BaseHrefWebpackPlugin({ baseHref: baseHref }),
    // Inject script and link tags into html files
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      hash: false,
      inject: true,
      compile: true,
      favicon: false,
      minify: false,
      cache: true,
      showErrors: true,
      chunks: 'all',
      excludeChunks: [],
      xhtml: true,
      chunksSortMode: function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
          return 1;
        } else if (leftIndex < rightindex) {
          return -1;
        } else {
          return 0;
        }
      }
    }),
    // Generate minimum chunks
    new CommonsChunkPlugin({
      name: ['inline'],
      minChunks: null
    }),
    new CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: (module) => {
        return module.resource
          && (module.resource.startsWith(nodeModules)
            || module.resource.startsWith(genDirNodeModules)
            || module.resource.startsWith(realNodeModules));
      },
      chunks: ['main']
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map[query]',
      moduleFilenameTemplate: '[resource-path]',
      fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
      sourceRoot: 'webpack:///'
    }),
    new CommonsChunkPlugin({
      name: ['main'],
      minChunks: 2,
      async: 'common'
    }),
    new webpack.NamedModulesPlugin(),
    // Extract css files
    new ExtractTextPlugin({filename: '[name].[hash].css', disable: !isBuild}),
    // copy static resources
    new CopyWebpackPlugin([
      {
        from: root('src/assets/images/'),
        to: 'assets/images/[path][name].[ext]'
      },
      {
        from: root('src/assets/locales'),
        to: 'assets/locales/[name].' + TRANSLATION_HASH + '.json',
        transform: helpers.transformJsonFile,
        merge: helpers.combineJsonFiles
      },
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
        transform: helpers.transformJsonFileFlat( isProduction ? ['prod'] : ['dev', 'prod']),
        merge: helpers.combineJsonConfigFiles
      },
      {
        from: root('src/health'),
        to: 'health/',
        transform: helpers.injectIntoHealth(CONFIG_HASH)
      }
    ], { copyUnmodified: true }),
    // TODO: check if needed >>> Ts lint configuration for webpack 2
    new webpack.LoaderOptionsPlugin({
      debug: !(isProduction || isLocalE2E),
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    }),
    new AngularCompilerPlugin({
      mainPath: 'main.ts',
      platform: 0,
      hostReplacementPaths: {
        'environments/environment.ts': isProduction || isLocalE2E ?
          'environments/environment.prod.ts' :
          'environments/environment.ts'
      },
      sourceMap: true,
      tsConfigPath: 'src/tsconfig.app.json',
      skipCodeGeneration: true,
      compilerOptions: {}
    })
  ];

  // Add build specific plugins
  if (isBuild) {
    if (isProduction || isLocalE2E) {
      config.plugins.push(
        new webpack.NoEmitOnErrorsPlugin(),
        new ProgressPlugin()
      );
    }
  } else {
    config.plugins.push(new DashboardPlugin());
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    quiet: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  };

  config.node = {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  };

  return config;
}());
