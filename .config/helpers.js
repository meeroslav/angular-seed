const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const _ = require('lodash');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

// Add folder as parent node in json
function transformJsonFile(content, absolutePath, relativePath) {
  'use strict';

  let data = JSON.parse(content.toString());
  let paths = path.dirname(relativePath).replace(/\\/g, '/').split('/');
  while(paths.length) {
    let path = paths.pop();
    let newData = {};
    newData[path] = data;
    data = newData;
  }

  return new Buffer(JSON.stringify(data));
}
// combine flat json files
function transformJsonFileFlat(content, absolutePath) {
  'use strict';

  let data = JSON.parse(content.toString());
  let name = path.basename(absolutePath, 'json');
  let newData = {};
  newData[name] = data;

  return new Buffer(JSON.stringify(newData));
}

// combine two json files
function combineJsonFiles(source, destination) {
  'use strict';

  let sourceData = JSON.parse(source.toString());
  let destinationData = JSON.parse(destination.toString());

  let result = _.merge(sourceData, destinationData);

  return new Buffer(JSON.stringify(result));
}

exports.root = root;
exports.transformJsonFile = transformJsonFile;
exports.transformJsonFileFlat = transformJsonFileFlat;
exports.combineJsonFiles = combineJsonFiles;
