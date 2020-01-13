"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _ServiceProvider2 = _interopRequireDefault(require("./ServiceProvider"));

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var ModelServiceProvider =
/*#__PURE__*/
function (_ServiceProvider) {
  (0, _inheritsLoose2.default)(ModelServiceProvider, _ServiceProvider);

  function ModelServiceProvider() {
    return _ServiceProvider.apply(this, arguments) || this;
  }

  var _proto = ModelServiceProvider.prototype;

  _proto.register = function register() {
    var model = {};
    var app = this._app;

    this._app.register('$model', new Proxy(model, {
      get: function get(target, p) {
        if (typeof target[p] === 'undefined') {
          app.registerModel(p, app._config['models'][p]);
        }

        return target[p];
      }
    }));

    var store = {
      modules: {}
    };

    this._app.register('$modules', store);
  };

  return ModelServiceProvider;
}(_ServiceProvider2.default);

exports.default = ModelServiceProvider;