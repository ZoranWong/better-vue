"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _ServiceProvider2 = _interopRequireDefault(require("./ServiceProvider"));

var _Validator = _interopRequireDefault(require("../validators/Validator"));

var ValidatorServiceProvider =
/*#__PURE__*/
function (_ServiceProvider) {
  (0, _inheritsLoose2.default)(ValidatorServiceProvider, _ServiceProvider);

  function ValidatorServiceProvider() {
    return _ServiceProvider.apply(this, arguments) || this;
  }

  var _proto = ValidatorServiceProvider.prototype;

  _proto.register = function register() {
    this._app.register('$validator', new _Validator.default(this._app));
  };

  return ValidatorServiceProvider;
}(_ServiceProvider2.default);

exports.default = ValidatorServiceProvider;