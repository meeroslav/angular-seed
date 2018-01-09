/**
 * Constants
 */
const fs = require('fs');
const ext64 = fs.readFileSync('./.config/chrome-auth.crx', 'base64');
const root = require('./helpers/index').root;
const chalk = require('chalk');
const HtmlScreenShotReporter = require('protractor-jasmine2-screenshot-reporter');

const reporter = new HtmlScreenShotReporter({
  dest: 'report/screenshots',
  captureOnlyFailedSpecs: true
});

const LOCAL_URL = 'http://localhost:3000/';

// only run with --start-fullscreen flag if OS is not windows
let chromeArguments = ['start-maximized', '--disable-infobars'];
if (process.platform.toString().indexOf('win') === -1) {
  chromeArguments = ['start-maximized', '--start-fullscreen', '--disable-infobars'];
}

let user = 'svc_tester';
// No override when running on teamcity
if (!process.env.TEAMCITY_VERSION) {
  if (process.env.USER) {
    user = process.env.USER;
  } else if (process.env.USERNAME) {
    user = process.env.USERNAME;
  }
}

console.log(chalk.cyan('*****************************************************'));
console.log(chalk.cyan('Testing against: ' + LOCAL_URL));
console.log(chalk.cyan('OS: ' + process.platform));
console.log(chalk.cyan('With user: ' + user));
console.log(chalk.cyan('*****************************************************'));

exports.config = {
  baseUrl: LOCAL_URL,

  specs: [
    root('src/**/*.e2e.ts')
  ],
  exclude: [],

  framework: 'jasmine',

  allScriptsTimeout: 11000,
  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  directConnect: true,

  capabilities: {
    browserName: 'chrome',
    maxInstances: 1,
    chromeOptions: {
      args: chromeArguments,
      extensions: [ext64]
    }
  },

  beforeLaunch: function () {
    return new Promise(function (resolve) {
      reporter.beforeLaunch(resolve);
    });
  },

  onPrepare: function () {
    browser.ignoreSynchronization = true;
    require('ts-node').register({
      project: '../src/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(reporter);
    if (process.env.TEAMCITY_VERSION) {
      const jasmineReporters = require('jasmine-reporters');
      jasmine.getEnv().addReporter(new jasmineReporters.TeamCityReporter());
    }
  },

  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *
   */
  useAllAngular2AppRoots: true
};
