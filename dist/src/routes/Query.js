"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _underscore = require("underscore");

var Query =
/*#__PURE__*/
function () {
  function Query() {
    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _defineProperty2["default"])(this, "_queryString", null);
    (0, _defineProperty2["default"])(this, "_params", {});

    if (query) {
      if ((0, _underscore.isString)(query)) {
        this._queryString = queryString;

        this._parse();
      } else {
        this._params = query;

        this._convertQueryStr();
      }
    }
  }

  var _proto = Query.prototype;

  _proto._parse = function _parse() {};

  _proto._convertQueryStr = function _convertQueryStr() {};

  (0, _createClass2["default"])(Query, [{
    key: "queryString",
    set: function set(str) {
      this._queryString = str;

      this._parse();

      return str;
    },
    get: function get() {
      return this._queryString;
    }
  }, {
    key: "params",
    set: function set(params) {
      this.params = params;

      this._convertQueryStr();

      return params;
    },
    get: function get() {
      return this._params;
    }
  }]);
  return Query;
}();

exports["default"] = Query;