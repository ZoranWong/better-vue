"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _ServiceProvider2 = _interopRequireDefault(require("./ServiceProvider"));

var AppServiceProvider =
/*#__PURE__*/
function (_ServiceProvider) {
  (0, _inheritsLoose2["default"])(AppServiceProvider, _ServiceProvider);

  function AppServiceProvider() {
    return _ServiceProvider.apply(this, arguments) || this;
  }

  var _proto = AppServiceProvider.prototype;

  _proto.boot = function boot() {
    console.log('%c ============================================== \n' + ' ||                                          || \n' + ' ||          MP VUE APPLICATION RUN          || \n' + ' ||                                          || \n' + ' ============================================== ', 'background:#aaa;color:#bada55');
  };

  return AppServiceProvider;
}(_ServiceProvider2["default"]);

exports["default"] = AppServiceProvider;