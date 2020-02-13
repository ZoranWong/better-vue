"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Application = _interopRequireDefault(require("../Application"));

var ServiceProvider =
/*#__PURE__*/
function () {
  /**@type {Application}*/

  /**
   * @param {Application}
   * */
  function ServiceProvider(application) {
    (0, _defineProperty2["default"])(this, "_app", null);
    this._app = application;
  }

  var _proto = ServiceProvider.prototype;

  _proto.register = function register() {};

  _proto.boot = function boot() {};

  (0, _createClass2["default"])(ServiceProvider, [{
    key: "app",
    get: function get() {
      return this._app;
    }
  }]);
  return ServiceProvider;
}();

exports["default"] = ServiceProvider;