const Promise = require('bluebird');
const loaderUtils = require('loader-utils');
const path = require('path');
const _ = require('lodash');

const fs = Promise.promisifyAll(require('fs')); // eslint-disable-line import/no-commonjs

module.exports = function(globalRef, rule, file) {
  'use strict';

  const info = globalRef.info;
  const debug = globalRef.debug;
  const fileDependencies = globalRef.fileDependencies;
  const compilation = globalRef.compilation;
  const written = globalRef.written;

  function transformContent(content, relativePath) {
    let data = JSON.parse(content.toString());
    let paths = relativePath.split('/');
    paths.pop(); // remove name
    while(paths.length) {
      let path = paths.pop();
      let newData = {};
      newData[path] = data;
      data = newData;
    }

    return new Buffer(JSON.stringify(data));
  }

  function mergeContent(destination, source) {
    let sourceData = JSON.parse(source.toString());
    let destinationData = JSON.parse(destination.toString());

    let result = _.merge(sourceData, destinationData);

    return new Buffer(JSON.stringify(result));
  }

  rule.transform = rule.transform || transformContent;

  return fs.statAsync(file.absoluteFrom)
    .then((stat) => {
      // We don't parse directories
      if (stat.isDirectory()) {
        return;
      }

      // If this came from a glob, add it to the file watchlist
      if (rule.fromType === 'glob') {
        fileDependencies.push(file.absoluteFrom);
      }

      info(`reading ${file.absoluteFrom} to write to assets`);

      return fs.readFileAsync(file.absoluteFrom)
        .then((content) => {
          'use strict';

          content = rule.transform(content, file.relativeFrom.replace(/\\/g, '/')); // ensure forward slashes
          const hash = loaderUtils.getHashDigest(content);

          if (rule.toType === 'template') {
            info(`interpolating template '${file.webpackTo}' for '${file.relativeFrom}'`);
            let basename = path.basename(file.relativeFrom);
            let dotRemoved = false;
            if (basename[0] === '.') {
              dotRemoved = true;
              file.relativeFrom = path.join(path.dirname(file.relativeFrom), basename.slice(1));
            }

            // If it doesn't have an extension, remove it from the pattern
            // ie. [name].[ext] or [name][ext] both become [name]
            if (!path.extname(file.relativeFrom)) {
              file.webpackTo = file.webpackTo.replace(/\.?\[ext]/g, '');
            }

            // A hack because loaderUtils.interpolateName doesn't
            // find the right path if no directory is defined
            // ie. [path] applied to 'file.txt' would return 'file'
            if (file.relativeFrom.indexOf(path.sep) < 0) {
              file.relativeFrom = path.sep + file.relativeFrom;
            }

            file.webpackTo = loaderUtils.interpolateName(
              { resourcePath: file.relativeFrom },
              file.webpackTo,
              { content });

            // Add back removed dots
            if (dotRemoved) {
              let newBasename = path.basename(file.webpackTo);
              file.webpackTo = path.dirname(file.webpackTo) + '/.' + newBasename;
            }
          }

          if (written[file.absoluteFrom] && written[file.absoluteFrom][hash]) {
            info(`skipping '${file.webpackTo}', because it hasn't changed`);
            return;
          } else {
            written[file.absoluteFrom] = { [hash]: true };
          }

          // TODO: Remove old, add new kind of deal
          if (compilation.assets[file.webpackTo]) {
            info(`adding data to '${file.webpackTo}', because it already exists`);
            let newSize = compilation.assets[file.webpackTo].size() + stat.size;
            let newContent = mergeContent(compilation.assets[file.webpackTo].source(), content);
            compilation.assets[file.webpackTo] = {
              size: function() { return newSize; },
              source: function() { return newContent; }
            };
            return;
          }

          info(`writing '${file.webpackTo}' to compilation assets from '${file.absoluteFrom}'`);
          compilation.assets[file.webpackTo] = {
            size: function() { return stat.size; },
            source: function() { return content; }
          };
        });
    });
};
