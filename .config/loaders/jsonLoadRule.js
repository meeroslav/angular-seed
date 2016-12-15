const Promise = require('bluebird');
const path = require('path');
const _ = require('lodash');
const mergeFile = require('./mergeFile');
const globAsync = Promise.promisify(require('glob'));

module.exports = function(globalRef, rule) {
  const info = globalRef.info;
  const debug = globalRef.debug;
  const output = globalRef.output;

  const globArgs = _.assign({
    cwd: rule.context
  }, rule.fromArgs || {});

  if (rule.fromType === 'nonexistent') {
    return Promise.resolve();
  }
  info(`begin globbing '${rule.absoluteFrom}' with a context of '${rule.context}'`);
  return globAsync(rule.absoluteFrom, globArgs)
    .map((fileFrom) => {
      const file = {
        absoluteFrom: path.resolve(rule.context, fileFrom)
      };
      file.relativeFrom = path.relative(rule.context, file.absoluteFrom);

      if (rule.flatten) {
        file.relativeFrom = path.basename(file.relativeFrom);
      }

      // Change the to path to be relative for webpack
      if (rule.toType === 'dir') {
        file.webpackTo = path.join(rule.to, file.relativeFrom);
      } else if (rule.toType === 'file') {
        file.webpackTo = rule.to || file.relativeFrom;
      } else if (rule.toType === 'template') {
        file.webpackTo = rule.to;
      }

      debug(`found ${fileFrom}`);

      if (path.isAbsolute(file.webpackTo)) {
        file.webpackTo = path.relative(output, file.webpackTo);
      }
      file.webpackTo = file.webpackTo.replace(/\\/g, '/'); // ensure forward slashes

      info(`\n\ndetermined that '${fileFrom}' should be combined to '${file.webpackTo}'\n\n`);

      return mergeFile(globalRef, rule, file);

    }, {concurrency: 100});
};
