"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _ServiceProvider2 = _interopRequireDefault(require("./ServiceProvider"));

var _Router = _interopRequireDefault(require("../routes/Router"));

var RouterServiceProvider =
/*#__PURE__*/
function (_ServiceProvider) {
  (0, _inheritsLoose2.default)(RouterServiceProvider, _ServiceProvider);

  function RouterServiceProvider() {
    return _ServiceProvider.apply(this, arguments) || this;
  }

  var _proto = RouterServiceProvider.prototype;

  _proto.register = function register() {
    this.app.register('$$router', _Router.default);
  };

  return RouterServiceProvider;
}(_ServiceProvider2.default);

exports.default = RouterServiceProvider;