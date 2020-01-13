"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isClass = isClass;
exports.collectionProxy = collectionProxy;

var _underscore = require("underscore");

var _Collection = _interopRequireDefault(require("../models/Collection"));

var toString = Function.prototype.toString;

function fnBody(fn) {
  return toString.call(fn).replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '');
}

function isClass(fn) {
  if (typeof fn !== 'function') {
    return false;
  }

  if (/^class[\s{]/.test(toString.call(fn))) {
    return true;
  } // babel.js classCallCheck() & inlined


  var body = fnBody(fn);
  return /classCallCheck\(/.test(body) || /TypeError\("Cannot call a class as a function"\)/.test(body);
}
/**
 * @param {Collection} modelInstance
 * @return {Proxy|Collection}
 * */


function collectionProxy(modelInstance) {
  var properties = {
    'pageCount': '_pageCount',
    'page': '_page',
    'limit': '_limit'
  };
  return new Proxy(modelInstance, {
    get: function get(collection, p) {
      if (typeof p === 'number') {
        var start = collection._limit * p;
        var end = collection._limit * (p + 1) - 1;
        var list = collection.get('_list').slice(start, end);
        return new Proxy(list, {
          get: function get(target, p) {
            if (typeof p === 'number') {
              return target[p];
            }
          },
          set: function set(target, p, value) {
            target[start + p] = value;
            modelInstance.dispatch('_list', list);
          }
        });
      } else if ((0, _underscore.isString)(p)) {
        var property = properties[p];

        if (typeof property !== 'undefined') {
          return collection.get(property);
        }
      }
    },
    set: function set(collection, p, value) {
      if (typeof p === 'number') {
        var start = collection._limit * p;
        var list = collection._list;

        if ((0, _underscore.isArray)(value)) {
          (0, _underscore.each)(value, function (v, i) {
            list[start + i] = v;
          });
          modelInstance.dispatch('_list', list);
        }
      } else if ((0, _underscore.isString)(p)) {
        var property = properties[p];

        if (typeof property !== 'undefined') {
          modelInstance.dispatch(property, value);
        }
      }
    }
  });
}