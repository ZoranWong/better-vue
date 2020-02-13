"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Validator =
/*#__PURE__*/
function () {
  function Validator(app) {
    (0, _defineProperty2["default"])(this, "_app", null);
    (0, _defineProperty2["default"])(this, "_message", null);
    (0, _defineProperty2["default"])(this, "_validateMethods", {});
    this._app = app;
  }

  var _proto = Validator.prototype;

  _proto.validate = function validate(data, rules, messages) {
    for (var key in rules) {
      var length = rules[key].length;

      for (var i = 0; i < length; i++) {
        var _rules$key$i$split = rules[key][i].split(':'),
            _rules$key$i$split2 = (0, _slicedToArray2["default"])(_rules$key$i$split, 2),
            method = _rules$key$i$split2[0],
            param = _rules$key$i$split2[1];

        var params = param.split(',');

        if (typeof this._validateMethods[method] !== 'undefined' && !this._validateMethods[method].apply(this, params)) {
          this._message = messages[key][method];
          return false;
        }
      }
    }

    return true;
  };

  _proto.message = function message() {
    return this._message;
  };

  return Validator;
}();

exports["default"] = Validator;