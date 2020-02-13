"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _ServiceProvider2 = _interopRequireDefault(require("./ServiceProvider"));

var _HttpService = _interopRequireDefault(require("../services/HttpService"));

var HttpServiceProvider =
/*#__PURE__*/
function (_ServiceProvider) {
  (0, _inheritsLoose2["default"])(HttpServiceProvider, _ServiceProvider);

  function HttpServiceProvider() {
    return _ServiceProvider.apply(this, arguments) || this;
  }

  var _proto = HttpServiceProvider.prototype;

  _proto.register = function register() {
    var _this = this;

    this._app.register('$httpClient', function () {
      return new _HttpService["default"](_this.app, _this.app.httpAdapterClass, _this.app.config('app.apiGateway'));
    });
  };

  _proto.boot = function boot() {
    this._app.$httpClient.setValidator(this._app.$validator);
  };

  return HttpServiceProvider;
}(_ServiceProvider2["default"]);

exports["default"] = HttpServiceProvider;