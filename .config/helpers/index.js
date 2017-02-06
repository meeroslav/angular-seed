const path = require('path');
const ROOT = path.resolve(__dirname, '../../');
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
    if (path !== '.') {
      let newData = {};
      newData[path] = data;
      data = newData;
    }
  }

  return new Buffer(JSON.stringify(data));
}

// combine two json files
function combineJsonFiles(source, destination) {
  'use strict';

  let sourceData = JSON.parse(source.toString());
  let destinationData = JSON.parse(destination.toString());
  let result = _.merge(sourceData, destinationData);

  return new Buffer(JSON.stringify(result));
}

// combine flat json files
function transformJsonFileFlat(rules) {
  'use strict';

  function transformData(data, rules) {
    let result = {};
    for (let i = rules.length - 1; i >= 0; i--) {
      result = _.merge(result, data[rules[i]] || {});
    }
    return result;
  }

  return function(content, absolutePath) {
    let data = JSON.parse(content.toString());
    let name = path.basename(absolutePath, '.json');
    let newData = {};
    newData[name] = transformData(data, rules);

    return new Buffer(JSON.stringify(newData));
  }
}

function combineJsonConfigFiles(source, destination, absoluteFrom) {
  'use strict';
  let result;

  let sourceData = JSON.parse(source.toString());
  let destinationData = JSON.parse(destination.toString());
  let name = path.basename(absoluteFrom, '.json');
  let localIndex = name.indexOf('.local');
  let trimmedName = name.replace('.local', '');

  if (localIndex !== -1 && sourceData[trimmedName]) {
    let temp = {};
    temp[trimmedName] = destinationData[name];
    result = _.merge(sourceData, temp);
  } if (sourceData[name + '.local']) {
    let temp = {};
    temp[name] = sourceData[name + '.local'];
    delete sourceData[name + '.local'];
    result = _.merge(sourceData, destinationData);
    result = _.merge(result, temp);
  } else {
    result = _.merge(sourceData, destinationData);
  }

  return new Buffer(JSON.stringify(result));
}

function injectIntoHealth(config_hash) {
  'use strict';

   return function(content) {
     return new Buffer(content.toString().replace('#CONFIGHASH#', config_hash));
   };
}

function hashDate(prefix) {
  'use strict';

  let hash = require("crypto").createHash('md5');
  let inputDate = new Date();

  hash.update(new Buffer(inputDate.toISOString()));
  return prefix + hash.digest('hex').substr(0, 9999);
}

exports.root = root;
exports.transformJsonFile = transformJsonFile;
exports.transformJsonFileFlat = transformJsonFileFlat;
exports.combineJsonFiles = combineJsonFiles;
exports.combineJsonConfigFiles = combineJsonConfigFiles;
exports.hashDate = hashDate;
exports.injectIntoHealth = injectIntoHealth;
