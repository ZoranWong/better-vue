"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _AppAdapter2 = _interopRequireDefault(require("../contracts/AppAdapter"));

var _vue = _interopRequireWildcard(require("vue"));

var _vuex = _interopRequireWildcard(require("vuex"));

var _underscore = require("underscore");

var _Router = _interopRequireDefault(require("../routes/Router"));

var _Application = _interopRequireDefault(require("../Application"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

_vue["default"].use(_vuex["default"]);

var VueAppAdapter =
/*#__PURE__*/
function (_AppAdapter) {
  (0, _inheritsLoose2["default"])(VueAppAdapter, _AppAdapter);

  /**@type {Function}*/

  /**@type {Function}*/

  /**@type {Function}*/

  /**@type {Function}*/

  /**@type {Function}*/

  /**@type {Function}*/

  /**@type {Function}*/

  /**@type {Function}*/

  /**
   * @param {ComponentOptions} component
   * @param {Store} store
   * @param {Router} route
   * @param {function(component){}} vue
   * @param {Application} application
   * */
  function VueAppAdapter(component, store, route, vue, application) {
    var _this;

    _this = _AppAdapter.call(this, component, application, route) || this;
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_mounted", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_created", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_updated", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_destroyed", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_beforeCreate", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_beforeUpdate", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_beforeMount", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_beforeDestroy", null);

    _this.mixin(application._instances);

    _this.mixin(application._mixinMethods);

    _this._created = _this._mountComponent.created;
    _this._mounted = _this._mountComponent.mounted;
    _this._beforeMount = _this._mountComponent.beforeMount;
    _this._beforeCreate = _this._mountComponent.beforeCreate;
    _this._updated = _this._mountComponent.updated;
    _this._beforeUpdate = _this._mountComponent.beforeUpdate;
    _this._beforeDestroy = _this._mountComponent.beforeDestroy;
    _this._destroyed = _this._mountComponent.destroyed;
    _this._mountComponent = _this.rebuildComponent(store);
    store = new _vuex.Store(store);
    _vue["default"].prototype.$store = application.$store = store;
    _this._page = vue(_objectSpread({}, _this._mountComponent));
    _this._page['$adapter'] = (0, _assertThisInitialized2["default"])(_this);
    (0, _underscore.extend)(_this._page, application._instances);
    return _this;
  }

  var _proto = VueAppAdapter.prototype;

  _proto.rebuildComponent = function rebuildComponent(store) {
    var adapter = this;
    return (0, _underscore.extend)(_objectSpread({
      store: store
    }, this._mountComponent), {
      beforeCreate: function beforeCreate() {
        adapter.beforeCreate();
      },
      created: function created() {
        adapter.created(this);
      },
      beforeMount: function beforeMount() {
        adapter.beforeMount(this);
      },
      mounted: function mounted() {
        adapter.mounted(this);
      },
      beforeUpdate: function beforeUpdate() {
        adapter.beforeUpdate(this);
      },
      updated: function updated() {
        adapter.updated(this);
      },
      beforeDestroy: function beforeDestroy() {
        adapter.beforeDestroy(this);
      },
      destroyed: function destroyed() {
        adapter.destroyed(this);
      }
    });
  };

  _proto.beforeMount = function beforeMount(vue) {
    var _this2 = this;

    if (!(0, _underscore.isArray)(this._beforeMount)) {
      this._beforeMount = [this._beforeMount];
    }

    this._beforeMount.forEach(function (callback) {
      callback && callback.call(_this2._page);
    });
  };

  _proto.mounted = function mounted(vue) {
    var _this3 = this;

    if (!(0, _underscore.isArray)(this._mounted)) {
      this._mounted = [this._mounted];
    }

    this._mounted.forEach(function (callback) {
      callback && callback.call(_this3._page);
    });
  };

  _proto.beforeCreate = function beforeCreate() {
    var _this4 = this;

    if (!(0, _underscore.isArray)(this._beforeCreate)) {
      this._beforeCreate = [this._beforeCreate];
    }

    this._beforeCreate.forEach(function (callback) {
      callback && callback.call(_this4._page);
    });
  };

  _proto.created = function created(vue) {
    var _this5 = this;

    this._page = vue;

    if (!(0, _underscore.isArray)(this._created)) {
      this._created = [this._created];
    }

    this._created.forEach(function (callback) {
      callback && callback.call(_this5._page);
    });
  };

  _proto.beforeUpdate = function beforeUpdate(vue) {
    var _this6 = this;

    if (!(0, _underscore.isArray)(this._beforeUpdate)) {
      this._beforeUpdate = [this._beforeUpdate];
    }

    this._beforeUpdate.forEach(function (callback) {
      callback && callback.call(_this6._page);
    });
  };

  _proto.updated = function updated(vue) {
    var _this7 = this;

    if (!(0, _underscore.isArray)(this._updated)) {
      this._updated = [this._updated];
    }

    this._updated.forEach(function (callback) {
      callback && callback.call(_this7._page);
    });
  };

  _proto.beforeDestroy = function beforeDestroy(vue) {
    var _this8 = this;

    if (!(0, _underscore.isArray)(this._beforeDestroy)) {
      this._beforeDestroy = [this._beforeDestroy];
    }

    this._beforeDestroy.forEach(function (callback) {
      callback && callback.call(_this8._page);
    });
  };

  _proto.destroyed = function destroyed(vue) {
    var _this9 = this;

    if (!(0, _underscore.isArray)(this._destroyed)) {
      this._destroyed = [this._destroyed];
    }

    this._destroyed.forEach(function (callback) {
      callback && callback.call(_this9._page);
    });
  };

  _proto.mixin = function mixin(mixins) {
    (0, _underscore.extend)(_vue["default"].prototype, mixins);
  };

  return VueAppAdapter;
}(_AppAdapter2["default"]);

exports["default"] = VueAppAdapter;