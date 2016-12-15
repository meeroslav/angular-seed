const Promise = require('bluebird');
const _ = require('lodash');
const jsonProcessRule = require('./jsonProcessRule');
const jsonLoadRule = require('./jsonLoadRule');
const chalk = require('chalk');

module.exports = function(rules, options) {
  rules = rules || [];
  options = options || {};

  if (!Array.isArray(rules)) {
    throw new Error('[json-combine-webpack-plugin] patterns must be an array');
  }
  options.debug = options.debug || 'warning';
  if (options.debug === true) {
    options.debug = 'info';
  }

  const debugLevels = ['warning', 'info', 'debug'];
  const debugLevelIndex = debugLevels.indexOf(options.debug);
  function log(msg, level) {
    if (level === 0) {
      msg = `WARNING - ${msg}`;
    } else {
      level = level || 1;
    }
    if (level <= debugLevelIndex) {
      console.log('[json-combine-webpack-plugin] ' + msg);
    }
  }

  function warning(msg) {
    log(msg, 0);
  }

  function info(msg) {
    log(msg, 1);
  }

  function debug(msg) {
    log(msg, 2);
  }

  const apply = (compiler) => {
    const fileDependencies = [];
    const contextDependencies = [];
    const written = {};

    compiler.plugin('emit', (compilation, cb) => {
      debug('starting emit');

      const globalRef = {
        info,
        debug,
        warning,
        compilation,
        written,
        fileDependencies,
        contextDependencies,
        context: compiler.options.context,
        output: compiler.options.output.path,
      };

      const callback = () => {
        debug('finishing emit');
        cb();
      };

      Promise.each(rules, (rule) => {
        return jsonProcessRule(globalRef, rule)
        .then((rule) => {
          return jsonLoadRule(globalRef, rule);
        });
      }).catch((err) => {
        compilation.errors.push(err);
      }).finally(callback);
    });

    compiler.plugin('after-emit', (compilation, cb) => {
      debug('starting after-emit');
      const callback = () => {
        debug('finishing after-emit');
        cb();
      };

      // Add file dependencies if they're not already tracked
      _.forEach(fileDependencies, (file) => {
        if (_.includes(compilation.fileDependencies, file)) {
          debug(`not adding ${file} to change tracking, because it's already tracked`);
        } else {
          debug(`adding ${file} to change tracking`);
          compilation.fileDependencies.push(file);
        }
      });

      // Add context dependencies if they're not already tracked
      _.forEach(contextDependencies, (context) => {
        if (_.includes(compilation.contextDependencies, context)) {
          debug(`not adding ${context} to change tracking, because it's already tracked`);
        } else {
          debug(`adding ${context} to change tracking`);
          compilation.contextDependencies.push(context);
        }
      });

      callback();
    });
  };

  return {
    apply
  };
};
