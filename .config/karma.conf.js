const webpackConfig = require('./webpack.config.test.js');
const ENV = process.env.npm_lifecycle_event;
const isTestWatch = ENV === 'test:watch';
const isTeamCity = process.env.TEAMCITY_VERSION;

module.exports = function (config) {
  'use strict';

  var _config = {
    basePath: '../', // base path that will be used to resolve all patterns (eg. files, exclude)
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-sourcemap-loader'),
      require('karma-webpack')
    ],

    // list of files / patterns to load in the browser
    files: [
      { pattern: './node_modules/jasmine-data_driven_tests/src/all.js', watched:false },
      { pattern: './.config/karma-shim.js', watched: false }
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './.config/karma-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true // please don't spam the console when running in karma!
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'mocha'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: .config.LOG_DISABLE || .config.LOG_ERROR || .config.LOG_WARN || .config.LOG_INFO || .config.LOG_DEBUG
    logLevel: isTeamCity ? config.LOG_ERROR : config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [], // Chrome is defined later

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    browserNoActivityTimeout: 100000,
    browserDisconnectTolerance: 3
  };

  if (!isTestWatch) {
    // no need for full blown chrome here
    _config.browsers.push('ChromeHeadless');

    // add coverage
    _config.reporters.push('coverage');
    _config.plugins.push(require('karma-coverage'));

    _config.coverageReporter = {
      dir: 'coverage/',
      reporters: [{ type: 'json', subdir: '.', file: 'report.json' }]
    };

    if (isTeamCity) {
      _config.reporters.push('teamcity');
      _config.plugins.push(require('karma-teamcity-reporter'));
    } else {
      _config.reporters.push('mocha');
      _config.plugins.push(require('karma-mocha-reporter'));
    }
  } else {
    _config.browsers.push('Chrome');

    _config.reporters.push('kjhtml');
    _config.plugins.push(require('karma-jasmine-html-reporter'));
    _config.logLevel = config.LOG_DEBUG;
  }
  config.set(_config);
};
