"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _underscore = require("underscore");

var _Route = _interopRequireDefault(require("./Route"));

var _Application = _interopRequireDefault(require("../Application"));

var Router =
/*#__PURE__*/
function () {
  /**@type {Route} current*/

  /**@type {Application} _app*/

  /**@type {Object.<string, Object.<string, any>>} _routes*/

  /**
   * @param {Application} app
   * @param {[Object.<string, any>]} routes
   * */
  function Router(app) {
    var _this = this;

    var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    (0, _defineProperty2["default"])(this, "_current", null);
    (0, _defineProperty2["default"])(this, "_app", null);
    (0, _defineProperty2["default"])(this, "_routes", {});
    this._app = app;
    (0, _underscore.each)(routes, function (route) {
      _this.addRoute(route);
    });
  }
  /**
   * @param {Object.<string, any>} route
   * */


  var _proto = Router.prototype;

  _proto.addRoute = function addRoute(route) {
    this._routes[route['name']] = route;
  };

  _proto.find = function find(name) {
    var route = this._routes[name];
    return route;
  };

  (0, _createClass2["default"])(Router, [{
    key: "currentRoute",
    get: function get() {
      return this._current;
    },
    set: function set(route) {
      this._current = route;
      return route;
    }
  }]);
  return Router;
}();

exports["default"] = Router;