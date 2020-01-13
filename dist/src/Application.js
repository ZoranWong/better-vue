"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _underscore = require("underscore");

var _Model = _interopRequireDefault(require("./models/Model"));

var _Command = _interopRequireDefault(require("./commands/Command"));

var _ServiceProvider = _interopRequireDefault(require("./providers/ServiceProvider"));

var _vuex = require("vuex");

var _vue = _interopRequireWildcard(require("vue"));

var _Collection = _interopRequireDefault(require("./models/Collection"));

var _helpers = require("./utils/helpers");

var _AppAdapter = _interopRequireDefault(require("./contracts/AppAdapter"));

var _Router = _interopRequireDefault(require("./routes/Router"));

/**
 * 应用容器类型
 * */
var Application =
/*#__PURE__*/
function () {
  /**@type {Object.<string, Function>}*/

  /**@type {[ServiceProvider]}*/

  /**@type {Router}*/

  /**@type {Vue}*/

  /**@type {string}*/

  /**@type {Function}*/

  /**@type {Object.<string, Command>} _commandContainer*/

  /**@type {Object.<string, Model>} _modelContainer*/

  /**@type {Object.<string, boolean>} _globalProviderRegistered*/

  /**@type {[AppAdapter]}*/

  /**@type {Store}*/
  function Application() {
    (0, _defineProperty2.default)(this, "_instances", {});
    (0, _defineProperty2.default)(this, "_mixinMethods", {});
    (0, _defineProperty2.default)(this, "_serviceProviders", []);
    (0, _defineProperty2.default)(this, "_config", {});
    (0, _defineProperty2.default)(this, "_exceptionHandlers", {});
    (0, _defineProperty2.default)(this, "_template", {});
    (0, _defineProperty2.default)(this, "_route", null);
    (0, _defineProperty2.default)(this, "_multiplePage", false);
    (0, _defineProperty2.default)(this, "_registeredGlobal", true);
    (0, _defineProperty2.default)(this, "_current", null);
    (0, _defineProperty2.default)(this, "_currentRoute", null);
    (0, _defineProperty2.default)(this, "_adapterClass", null);
    (0, _defineProperty2.default)(this, "$store", null);
    (0, _defineProperty2.default)(this, "_apiGateway", null);
    (0, _defineProperty2.default)(this, "_httpAdapterClass", null);
    (0, _defineProperty2.default)(this, "_appRoot", '');
  }

  var _proto = Application.prototype;

  _proto.needMock = function needMock() {
    return this._config['app']['mock'];
  };

  _proto.setApiGateway = function setApiGateway(gateway) {
    this._apiGateway = gateway;
    return this;
  };

  _proto.setAppRoot = function setAppRoot(root) {
    this._appRoot = root;
  };

  /**
   * @param {string} key
   * @return {any}
   * */
  _proto.config = function config(key) {
    var keys = key.split('.');
    var data = this._config;

    try {
      (0, _underscore.each)(keys, function (k) {
        data = data[k];
      });
      return data;
    } catch (e) {
      return null;
    }
  };

  _proto.setHttpAdapter = function setHttpAdapter(httpAdapter) {
    this._httpAdapterClass = httpAdapter;
    return this;
  };

  /**
   * @param {string} name
   * @param {Command} command
   * @return {Command}
   * */
  _proto.registerCommand = function registerCommand(name, command) {
    return Application._commandContainer[name] = command;
  };

  _proto.setAdapter = function setAdapter(adapterClass) {
    this._adapterClass = adapterClass;
    return this;
  }
  /**
   *@param {Model} model
   *@param {string|any} key
   * @return
   * */
  ;

  _proto._reConstructModel = function _reConstructModel(model, key) {
    if (!(0, _underscore.isFunction)(model[key]) && !model.isChildProperty(key)) {
      model.state[key] = model[key];

      model.getters[key] = function (state) {
        return state[key];
      };

      model.addEventListener(key, function (payload, state) {
        state[key] = payload[key];
      });
      Object.defineProperty(model, key, {
        set: function set(value) {
          model.dispatch(key, value);
        },
        get: function get() {
          return model.getValue(key);
        }
      });
    }
  }
  /**
   * @param {string} name
   * @param {Model} model
   * @return {Application}
   * */
  ;

  _proto.registerModel = function registerModel(name, model) {
    var _this = this;

    var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '$model';
    var modelInstance = Application._modelContainer[name] = new model(this);
    modelInstance.modelName = name;

    if (modelInstance instanceof _Collection.default) {
      modelInstance = (0, _helpers.collectionProxy)(modelInstance);
      this.register("".concat(prefix, ".").concat(name), modelInstance);
    } else {
      this.register("".concat(prefix, ".").concat(name), modelInstance);
    }

    if (this.$store) {
      this.$store.registerModule(name, modelInstance.storeData());
    }

    this.$modules['modules'][name] = modelInstance.storeData();
    (0, _underscore.each)(modelInstance, function (property, key) {
      _this._reConstructModel(modelInstance, key);
    });
    return this;
  }
  /**
   *@param {string} commandName
   * @param {Array} params
   * @return {Object}
   * @throws
   * */
  ;

  _proto.command =
  /*#__PURE__*/
  function () {
    var _command = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(commandName) {
      var _command3,
          _command2,
          _len,
          params,
          _key,
          _args = arguments;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _command2 = Application._commandContainer[commandName];
              _command2 = new _command2(this);

              for (_len = _args.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                params[_key - 1] = _args[_key];
              }

              _context.next = 6;
              return (_command3 = _command2).handle.apply(_command3, params);

            case 6:
              return _context.abrupt("return", _context.sent);

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              return _context.abrupt("return", false);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 9]]);
    }));

    function command(_x) {
      return _command.apply(this, arguments);
    }

    return command;
  }() // 实例化注册对象

  /**
   * @param {Object|Function} instance
   * @return {Object}
   * */
  ;

  _proto._instanceRegister = function _instanceRegister(instance) {
    if ((0, _underscore.isFunction)(instance)) {
      instance = new instance(this);
    }

    return instance;
  }
  /**
   *@param {string|Array} paths
   * @return {Class|Array}
   * */
  ;

  _proto.loader = function loader() {
    var length = arguments.length;
    var classes = {};

    for (var i = 0; i < length; i++) {
      var result = require("".concat(i < 0 || arguments.length <= i ? undefined : arguments[i]));

      console.log(result);
      var cl = typeof result['default'] !== 'undefined' ? result['default'] : result;
      classes[cl.name] = cl;
    }

    return classes;
  } // 注册配置

  /**
   * @param {string} name
   * @param {Array|Object} config
   * @return {Application}
   * */
  ;

  _proto.registerConfig = function registerConfig(name) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '$config';

    if (((0, _underscore.isArray)(name) || (0, _underscore.isObject)(name)) && !config) {
      config = name;
      this.register(prefix, config);
      this._config = config;
    } else {
      this.register("".concat(prefix, ".").concat(name), config);
      this._config[name] = config;
    }

    return this;
  }
  /**
   * @param {ServiceProvider} provider
   * @return {Application}
   * */
  ;

  _proto.registerProvider = function registerProvider(provider) {
    this._serviceProviders.push(new provider(this));

    return this;
  } // 注册服务提供者
  ;

  _proto.registerServiceProviders = function registerServiceProviders() {
    var _this2 = this;

    (0, _underscore.each)(this._config['providers'], function (value, key) {
      if (Application._globalProviderRegistered[key]) {
        return;
      }

      var provider = value;

      _this2.registerProvider(provider);

      Application._globalProviderRegistered[key] = true;
    });

    this._serviceProviders.forEach(function (provider) {
      provider.register();
    });
  }
  /**
   * 系统启动（应用启动）
   * */
  ;

  _proto.boot = function boot() {
    (0, _underscore.each)(this._serviceProviders, function (serviceProvider) {
      serviceProvider.boot();
    });
  } //注册异常函数

  /**
   * @param {string} name
   * @param {} exception
   * @return
   * */
  ;

  _proto.registerException = function registerException(name, exception) {
    this._exceptionHandlers[name] = exception;
  } // application扩展

  /**
   * @param {Object} dist
   * @param {Object} src
   * @param {int} deep
   * */
  ;

  _proto.extend = function extend(dist, src, deep) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        var value = src[key];
        var end = !deep;

        if (end) {
          dist[key] = value;
          continue;
        } else if (!dist[key]) {
          dist[key] = [];
        }

        this.extend(dist[key], value, deep - 1);
      }
    }
  }
  /**
   * @param {string} name
   * @param {string|Object} service
   * @return {Object}
   * */
  ;

  _proto.register = function register(name) {
    var service = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var instance = null;

    if (!service && (0, _underscore.isFunction)(name)) {
      instance = this[name] = Application._instanceContainer[name] = this._instanceRegister(name);
    } else if (name && (0, _underscore.isFunction)(service)) {
      instance = this[name] = Application._instanceContainer[name] = this._instanceRegister(service);
    } else {
      instance = this[name] = Application._instanceContainer[name] = service;
    }

    var keys = name.split('.');
    var key = keys.length - 1;
    var tmp = [];
    tmp[keys[key]] = instance;

    while (key > 0) {
      key--;
      var tmp0 = [];
      tmp0[keys[key]] = tmp;
      tmp = tmp0;
    }

    if (this._registeredGlobal) {
      this.extend(Application._instanceContainer, tmp, keys.length - 1);
      (0, _underscore.extend)(this._instances, Application._instanceContainer);
    } else {
      this.extend(this._instances, tmp, keys.length - 1);
    }

    (0, _underscore.extend)(this, this._instances);
    return instance;
  }
  /**
   * @param {function} before
   * @param {function} after
   * */
  ;

  _proto.run = function run() {
    var _this3 = this;

    var before = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    this._instances = {};
    this.registerServiceProviders();
    this._registeredGlobal = false;
    if (this.config('models')) (0, _underscore.each)(this.config('models'), function (model, key) {
      _this3.registerModel(key, model);
    });
    if (this.config('commands')) (0, _underscore.each)(this.config('commands'), function (command) {
      _this3.registerCommand(command.commandName(), command);
    });
    before && before.call(this, this);
    this.boot();
    after && after.call(this, this);
  }
  /**
   * @param {VueConstructor|function} create
   * @param {string|null} id
   * */
  ;

  _proto.createPage = function createPage(mountComponent, create) {
    var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    /**@type {AppAdapter}*/
    var adapter = new this._adapterClass(mountComponent, this.$modules, this._route, create, this, id);

    Application._pageContainer.push(adapter);

    return adapter._page;
  };

  _proto.currentPage = function currentPage() {
    var _this4 = this;

    /**@type {AppAdapter} adapter*/
    return Application._pageContainer.some(function (adapter) {
      return adapter.isCurrentPage(_this4._currentRoute);
    });
  };

  _proto.mixins = function mixins(_mixins) {
    var _this5 = this;

    (0, _underscore.each)(_mixins, function (m, k) {
      _this5.mixin(k, m);
    });
    return this;
  }
  /**
   * @param {string} key
   * @param {Function} method
   * */
  ;

  _proto.mixin = function mixin(key, method) {
    this._mixinMethods[key] = method;
    this[key] = method;
  };

  (0, _createClass2.default)(Application, [{
    key: "apiGateWay",
    get: function get() {
      return this._apiGateway;
    }
  }, {
    key: "httpAdapterClass",
    get: function get() {
      return this._httpAdapterClass;
    }
  }, {
    key: "commands",
    get: function get() {
      return Application._commandContainer;
    }
  }, {
    key: "instances",
    get: function get() {
      return Application._instanceContainer;
    }
  }, {
    key: "pages",
    get: function get() {
      return Application._pageContainer;
    }
  }]);
  return Application;
}();

exports.default = Application;
(0, _defineProperty2.default)(Application, "_commandContainer", {});
(0, _defineProperty2.default)(Application, "_modelContainer", {});
(0, _defineProperty2.default)(Application, "_globalProviderRegistered", {});
(0, _defineProperty2.default)(Application, "_instanceContainer", {});
(0, _defineProperty2.default)(Application, "_pageContainer", []);