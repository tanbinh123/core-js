var getBuiltIn = require('../internals/get-built-in');
var anObject = require('../internals/an-object');
var tryToString = require('../internals/try-to-string');
var iterateSimple = require('../internals/iterate-simple');

var Map = getBuiltIn('Map');

var aMap = function (it) {
  anObject(it);
  if ('size' in it && 'has' in it && 'get' in it && 'set' in it && 'delete' in it && 'entries' in it) return it;
  throw TypeError(tryToString(it) + ' is not a map');
};

var set = function (map, key, value) {
  return map.set(key, value);
};

var get = function (map, key) {
  return map.get(key);
};

var has = function (map, key) {
  return map.has(key);
};

var remove = function (map, key) {
  return map['delete'](key);
};

var size = function (map) {
  return map.size;
};

var iterate = function (map, fn, interruptible) {
  return interruptible ? iterateSimple(map.entries(), function (entry) {
    return fn(entry[1], entry[0]);
  }) : map.forEach(fn);
};

module.exports = {
  Map: Map,
  aMap: aMap,
  set: set,
  get: get,
  has: has,
  remove: remove,
  size: size,
  iterate: iterate
};