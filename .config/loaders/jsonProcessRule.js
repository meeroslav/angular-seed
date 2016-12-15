const Promise = require('bluebird');
const path = require('path');
const _ = require('lodash');
const isGlob = require('is-glob');

const fs = Promise.promisifyAll(require('fs'));

// https://www.debuggex.com/r/VH2yS2mvJOitiyr3
const isTemplateLike = /(\[ext])|(\[name])|(\[path])|(\[folder])|(\[emoji(:\d+)?])|(\[(\w+:)?hash(:\w+)?(:\d+)?])|(\[\d+])/;

module.exports = function(globalRef, rule) {
  const info = globalRef.info;
  const debug = globalRef.debug;
  const warning = globalRef.warning;
  const context = globalRef.context;
  const fileDependencies = globalRef.fileDependencies;
  const contextDependencies = globalRef.contextDependencies;
  const compilation = globalRef.compilation;

  rule = _.cloneDeep(rule);
  rule.to = rule.to || '';
  rule.context = rule.context || context;

  if (!path.isAbsolute(rule.context)) {
    rule.context = path.join(context, rule.context);
  }

  info(`processing from: '${rule.from}' to: '${rule.to}'`);

  switch(true) {
    case !!rule.toType: // if toType already exists
      break;
    case isTemplateLike.test(rule.to):
      rule.toType = 'template';
      break;
    case path.extname(rule.to) === '' || rule.to.slice(-1) === '/':
      rule.toType = 'dir';
      break;
    default:
      rule.toType = 'file';
  }

  debug(`determined '${rule.to}' is a '${rule.toType}'`);

  if (path.isAbsolute(rule.from)) {
    rule.absoluteFrom = rule.from;
  } else {
    rule.absoluteFrom = path.resolve(rule.context, rule.from);
  }

  debug(`determined '${rule.from}' to be read from '${rule.absoluteFrom}'`);

  return fs
    .statAsync(rule.absoluteFrom)
    .catch(() => {
      // If from doesn't appear to be a glob, then log a warning
      if (isGlob(rule.from) || rule.from.indexOf('*') !== -1) {
        rule.fromType = 'glob';
      } else {
        const msg = `unable to locate '${rule.from}' at '${rule.absoluteFrom}'`;
        warning(msg);
        compilation.errors.push(`[copy-webpack-plugin] ${msg}`);
        rule.fromType = 'nonexistent';
      }
    })
    .then((stat) => {
      if (!stat) {
        return rule;
      }

      if (stat.isDirectory()) {
        rule.fromType = 'dir';
        rule.context = rule.absoluteFrom;
        contextDependencies.push(rule.absoluteFrom);
        rule.absoluteFrom = path.join(rule.absoluteFrom, '**/*');
        rule.fromArgs = {
          dot: true
        };
      } else if(stat.isFile()) {
        rule.fromType = 'file';
        rule.context = path.dirname(rule.absoluteFrom);
        rule.fromArgs = {
          dot: true
        };
        fileDependencies.push(rule.absoluteFrom);
      } else if(!rule.fromType) {
        info(`Unrecognized file type for ${rule.from}`);
      }
      return rule;
    });
};
