const webpack = require('webpack');
const root = require('./helpers/index').root;
const rxPaths = require('rxjs/_esm5/path-mapping');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const ENV = process.env.npm_lifecycle_event;
const isTestWatch = ENV === 'test:watch';

module.exports = (function makeWebpackConfig() {
  let config = {};

  config.devtool = 'inline-source-map';

  config.resolve = {
    // only discover files that have those extensions
    extensions: ['.ts', '.js'],
    modules: ['./node_modules'],
    symlinks: true,
    alias: rxPaths()
  };

  config.module = {
    rules: [
      // support for .html as raw text
      {test: /\.html$/, loader: 'raw-loader', include: root('src', 'app')},
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack'
      },
      { test: /\.css$/, exclude: root('src', 'app'), loader: 'null-loader' },
      { test: /\.css$/, include: root('src', 'app'), loader: 'raw-loader!postcss-loader' },
      { test: /\.(scss|sass)$/, exclude: root('src', 'app'), loader: 'null-loader' },
      { test: /\.(scss|sass)$/, exclude: root('src', 'assets', 'styles'), loader: 'raw-loader!postcss-loader!sass-loader' }
    ]
  };

  if (!isTestWatch) {
    // instrument only testing sources with Istanbul, covers ts files
    config.module.rules.push({
      test: /\.ts$/,
      enforce: 'post',
      include: root('src'),
      loader: 'istanbul-instrumenter-loader',
      exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /\.po\.ts$/, /node_modules/, /_e2e/]
    });
  }

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: { }
    }),
    new AngularCompilerPlugin({
      mainPath: 'main.ts',
      platform: 0,
      hostReplacementPaths: {
        'environments/environment.ts': 'environments/environment.ts'
      },
      sourceMap: true,
      tsConfigPath: 'src/tsconfig.spec.json',
      skipCodeGeneration: true,
      compilerOptions: {}
    })
  ];

  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    quiet: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  };

  return config;
}());
