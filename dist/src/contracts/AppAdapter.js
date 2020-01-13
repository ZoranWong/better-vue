"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _vue = _interopRequireWildcard(require("vue"));

var _Application = _interopRequireDefault(require("../Application"));

var _Router = _interopRequireDefault(require("../routes/Router"));

var AppAdapter =
/*#__PURE__*/
function () {
  /**@type {ComponentOptions}*/

  /**@type {Application}*/

  /**@type {Router}*/

  /**@type {Vue}*/
  function AppAdapter(component, application, route) {
    (0, _defineProperty2.default)(this, "_mountComponent", null);
    (0, _defineProperty2.default)(this, "_app", null);
    (0, _defineProperty2.default)(this, "_route", null);
    (0, _defineProperty2.default)(this, "_page", null);
    this._mountComponent = component;
    this._app = application;
    this._route = route;
  }

  var _proto = AppAdapter.prototype;

  _proto.isCurrentPage = function isCurrentPage(route) {
    return this._route.current['name'] === route;
  };

  _proto.$mount = function $mount() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    this._page.$mount(id);
  };

  return AppAdapter;
}();

exports.default = AppAdapter;