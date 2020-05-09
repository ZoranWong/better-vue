"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Service2 = _interopRequireDefault(require("./Service"));

var _Pipeline = _interopRequireDefault(require("../pipe/Pipeline"));

var _helpers = require("../utils/helpers");

var _Response = _interopRequireDefault(require("../responses/Response"));

var _HttpAdapter = _interopRequireDefault(require("../contracts/HttpAdapter"));

var HttpService =
/*#__PURE__*/
function (_Service) {
  (0, _inheritsLoose2["default"])(HttpService, _Service);

  /**@type {HttpAdapter} _httpAdapter*/

  /**@type {Pipeline} _middlewarePipeline*/

  /**@type {Function} _httpAdapter*/
  function HttpService(application, adapter) {
    var _this;

    var host = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    _this = _Service.call(this, application) || this;
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_httpClient", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_headers", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_host", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_withCredentials", false);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_middlewarePipeline", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_config", {
      xsrfCookieName: 'XSRF-TOKEN',
      // default
      xsrfHeaderName: 'X-XSRF-TOKEN' // 默认的

    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_httpAdapter", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_requestTransformers", []);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_responseTransformers", []);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_validator", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_exception", null);
    _this._httpAdapter = adapter;
    _this._host = host;
    _this._middlewarePipeline = new _Pipeline["default"](application);
    _this._config['host'] = host;
    _this._config['transformRequest'] = _this._requestTransformers;
    _this._config['transformResponse'] = _this._responseTransformers;
    _this._config['withCredentials'] = _this._withCredentials;
    return _this;
  }

  var _proto = HttpService.prototype;

  _proto.httpAdapter = function httpAdapter(adapter) {
    this._httpAdapter = adapter;
  };

  _proto.config = function config(_config) {
    this._config = _config;
  };

  _proto._middleware = function _middleware() {
    var _this$_middlewarePipe;

    (_this$_middlewarePipe = this._middlewarePipeline).through.apply(_this$_middlewarePipe, arguments);
  };

  _proto.headers = function headers(options) {
    this._headers = options;
  };

  _proto.header = function header(name, value) {
    this._headers[name] = value;
  };

  _proto.setValidator = function setValidator(validator) {
    this._validator = validator;
    return this;
  };

  _proto._validate = function _validate(request) {
    var rules = request.rules();
    var messages = request.messages();
    var data = request.all();

    var result = this._validator.validate(data, rules, messages);

    if (!result) {
      this._throw(this._validator.message());
    }

    return request;
  };

  _proto._throw = function _throw(message) {
    this._exception["throw"](message);
  };

  _proto.send =
  /*#__PURE__*/
  function () {
    var _send = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(request) {
      var _this2 = this;

      var responser,
          _args2 = arguments;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              responser = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : _Response["default"];

              this._middleware.apply(this, request._middlewares);

              if (!this._httpClient && this._httpAdapter) {
                console.log('--------------- 22222 -----------', (0, _helpers.isClass)(this._httpAdapter), this._httpAdapter);
                this._httpClient = new this._httpAdapter(this._config);
              }

              _context2.next = 5;
              return this._middlewarePipeline.send(function () {
                request = _this2._validate(request);
                return request;
              }()).then(
              /*#__PURE__*/
              function () {
                var _ref = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee(request) {
                  var result;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!_this2._httpClient) {
                            _context.next = 12;
                            break;
                          }

                          _context.prev = 1;
                          _context.next = 4;
                          return _this2._httpClient.send(request, responser);

                        case 4:
                          result = _context.sent;
                          return _context.abrupt("return", result);

                        case 8:
                          _context.prev = 8;
                          _context.t0 = _context["catch"](1);
                          console.log('==================', _context.t0);
                          return _context.abrupt("return", false);

                        case 12:
                          return _context.abrupt("return", null);

                        case 13:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[1, 8]]);
                }));

                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }());

            case 5:
              return _context2.abrupt("return", _context2.sent);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function send(_x) {
      return _send.apply(this, arguments);
    }

    return send;
  }();

  (0, _createClass2["default"])(HttpService, [{
    key: "host",
    set: function set(value) {
      this._host = value;
      this._config['host'] = value;
      return value;
    }
  }]);
  return HttpService;
}(_Service2["default"]);

exports["default"] = HttpService;