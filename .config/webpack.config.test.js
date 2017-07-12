const path = require('path');
const webpack = require('webpack');
const root = require('./helpers/index').root;

const ENV = process.env.npm_lifecycle_event;
const isTestWatch = ENV === 'test:watch';
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = (function makeWebpackConfig() {
  var config = {};

  config.devtool = 'inline-source-map';

  config.resolve = {
    extensions: ['.ts', '.js', '.html']
  };

  var atlOptions = 'inlineSourceMap=true&sourceMap=false';
  if (isTestWatch) {
    atlOptions = '';
  }

  config.module = {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader?' + atlOptions, 'angular2-template-loader', 'angular2-router-loader'],
        exclude: [/\.(e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, exclude: root('src', 'app'), loader: 'null-loader' },
      { test: /\.css$/, include: root('src', 'app'), loader: 'raw-loader!postcss-loader' },
      { test: /\.(scss|sass)$/, exclude: root('src', 'app'), loader: 'null-loader' },
      { test: /\.(scss|sass)$/, exclude: root('src', 'assets', 'styles'), loader: 'raw-loader!postcss-loader!sass-loader' },
      { test: /\.less$/, exclude: root('src', 'app'), loader: 'null-loader' },
      { test: /\.less$/, exclude: root('src', 'assets', 'styles'), loader: 'raw-loader!postcss-loader!less-loader'},
      { test: /\.html$/, loader: 'raw-loader', exclude: [root('src/index.html')] }
    ]
  };

  if (!isTestWatch) {
    // instrument only testing sources with Istanbul, covers ts files
    config.module.rules.push({
      test: /\.ts$/,
      enforce: 'post',
      include: path.resolve('src'),
      loader: 'istanbul-instrumenter-loader',
      exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
    });
  }

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('./src') // location of your src
    ),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
      }
    })
  ];

  if (isTestWatch) {
    config.plugins.push(new DashboardPlugin());
  }

  return config;
}());
