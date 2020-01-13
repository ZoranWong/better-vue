"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _FormRequest = _interopRequireDefault(require("../requests/FormRequest"));

var _Application = _interopRequireDefault(require("../Application"));

var _vuex = _interopRequireDefault(require("vuex"));

var Model =
/*#__PURE__*/
function () {
  /**@type {Request}*/

  /**@type {Store}*/

  /**@type {Application}*/
  function Model(app) {
    (0, _defineProperty2.default)(this, "namespaced", true);
    (0, _defineProperty2.default)(this, "modelName", '');
    (0, _defineProperty2.default)(this, "state", {});
    (0, _defineProperty2.default)(this, "getters", {});
    (0, _defineProperty2.default)(this, "actions", {});
    (0, _defineProperty2.default)(this, "mutations", {});
    (0, _defineProperty2.default)(this, "_request", null);
    (0, _defineProperty2.default)(this, "_store", null);
    Model._app = app;
  }

  var _proto = Model.prototype;

  // 回调函数可以直接使用this指向注册model实例，回调函数接受两个参数一个payload结构体，一个model层的state
  // 对应vuex中的actions与mutations
  _proto.addEventListener = function addEventListener(type, callback) {
    var _this = this;

    this.actions[type] = function (_ref, payload) {
      var commit = _ref.commit;
      commit(type, payload);
    };

    this.mutations[type] = function (state, payload) {
      // 回调函数可以直接使用this指向注册model实例，回调函数接受两个参数一个payload结构体，一个model层的state
      callback.call(_this, payload, state);
    };
  };

  _proto.dispatch = function dispatch(key, value) {
    var payload = {};
    payload[key] = value;

    Model._app.$store.dispatch("".concat(this.modelName, "/").concat(key), payload);
  };

  _proto.isChildProperty = function isChildProperty(key) {
    if (key === 'state' || key === 'actions' || key === 'mutations' || key === 'getters' || key === 'dispatch' || key === 'isChildProperty' || key === 'getValue' || key === 'modelName' || key === 'namespaced' || key === '_request' || key === '_store') {
      return true;
    } else {
      return false;
    }
  };

  _proto.getValue = function getValue(key) {
    return Model._app.$store.getters["".concat(this.modelName, "/").concat(key)];
  };

  _proto.storeData = function storeData() {
    return {
      namespaced: this.namespaced,
      state: this.state,
      getters: this.getters,
      actions: this.actions,
      mutations: this.mutations
    };
  };

  _proto.properties = function properties() {
    var result = {};

    for (var key in this) {
      if (!this.isChildProperty(key)) {
        result[key] = this[key];
      }
    }

    return result;
  };

  (0, _createClass2.default)(Model, [{
    key: "app",
    get: function get() {
      return Model._app;
    }
  }]);
  return Model;
}();

exports.default = Model;
(0, _defineProperty2.default)(Model, "_app", null);