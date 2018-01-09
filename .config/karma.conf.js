const webpackConfig = require('./webpack.config.test.js');
const ENV = process.env.npm_lifecycle_event;
const isTestWatch = ENV === 'test:watch';
const isPureTest = ENV === 'test:pure';
const isTeamCity = process.env.TEAMCITY_VERSION;

module.exports = function (config) {
  'use strict';

  let _config = {
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

    // list of files to exclude
    exclude: [],

    // list of files / patterns to load in the browser
    files: [
      { pattern: './node_modules/jasmine-data_driven_tests/src/all.js', watched: false },
      { pattern: './.config/karma-shim.js', watched: false }
    ],

    // preprocess matching files before serving them to the browser
    preprocessors: {
      './.config/karma-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    webpackServer: {
      noInfo: true // please don't spam the console when running in karma!
    },

    reporters: [],
    port: 9876,
    colors: true,
    logLevel: isTeamCity ? config.LOG_ERROR : config.LOG_INFO,
    autoWatch: false,
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
    if (!isPureTest) {
      _config.reporters.push('coverage');
      _config.plugins.push(require('karma-coverage'));

      _config.coverageReporter = {
        dir: 'coverage/',
        reporters: [{ type: 'json', subdir: '.', file: 'report.json' }]
      };
    }

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
