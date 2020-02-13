"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Application", {
  enumerable: true,
  get: function get() {
    return _Application["default"];
  }
});
Object.defineProperty(exports, "ServiceProvider", {
  enumerable: true,
  get: function get() {
    return _ServiceProvider["default"];
  }
});
Object.defineProperty(exports, "Service", {
  enumerable: true,
  get: function get() {
    return _Service["default"];
  }
});
Object.defineProperty(exports, "Model", {
  enumerable: true,
  get: function get() {
    return _Model["default"];
  }
});
Object.defineProperty(exports, "Response", {
  enumerable: true,
  get: function get() {
    return _Response["default"];
  }
});
Object.defineProperty(exports, "FormRequest", {
  enumerable: true,
  get: function get() {
    return _FormRequest["default"];
  }
});
Object.defineProperty(exports, "Router", {
  enumerable: true,
  get: function get() {
    return _Router["default"];
  }
});
Object.defineProperty(exports, "Middleware", {
  enumerable: true,
  get: function get() {
    return _Middleware["default"];
  }
});
Object.defineProperty(exports, "ExceptionHandler", {
  enumerable: true,
  get: function get() {
    return _ExceptionHandler["default"];
  }
});
Object.defineProperty(exports, "Command", {
  enumerable: true,
  get: function get() {
    return _Command["default"];
  }
});
Object.defineProperty(exports, "Transformer", {
  enumerable: true,
  get: function get() {
    return _Transformer["default"];
  }
});
Object.defineProperty(exports, "WXFlyioAdapter", {
  enumerable: true,
  get: function get() {
    return _WXFlyioAdapter["default"];
  }
});
Object.defineProperty(exports, "AxiosAdapter", {
  enumerable: true,
  get: function get() {
    return _AxiosAdapter["default"];
  }
});
exports["default"] = exports.command = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Application = _interopRequireDefault(require("./Application"));

var _ModelServiceProvider = _interopRequireDefault(require("./providers/ModelServiceProvider"));

var _HttpServiceProvider = _interopRequireDefault(require("./providers/HttpServiceProvider"));

var _ServiceProvider = _interopRequireDefault(require("./providers/ServiceProvider"));

var _Service = _interopRequireDefault(require("./services/Service"));

var _Model = _interopRequireDefault(require("./models/Model"));

var _Response = _interopRequireDefault(require("./responses/Response"));

var _FormRequest = _interopRequireDefault(require("./requests/FormRequest"));

var _Router = _interopRequireDefault(require("./routes/Router"));

var _Middleware = _interopRequireDefault(require("./middlewares/Middleware"));

var _ExceptionHandler = _interopRequireDefault(require("./exceptions/ExceptionHandler"));

var _Command = _interopRequireDefault(require("./commands/Command"));

var _Transformer = _interopRequireDefault(require("./transformers/Transformer"));

var _VueAppAdapter = _interopRequireDefault(require("./adapters/VueAppAdapter"));

var _WXFlyioAdapter = _interopRequireDefault(require("./adapters/WXFlyioAdapter"));

var _AxiosAdapter = _interopRequireDefault(require("./adapters/AxiosAdapter"));

var _AppServiceProvider = _interopRequireDefault(require("./providers/AppServiceProvider"));

var _ValidatorServiceProvider = _interopRequireDefault(require("./providers/ValidatorServiceProvider"));

var _RouterServiceProvider = _interopRequireDefault(require("./providers/RouterServiceProvider"));

// better
var application = new _Application["default"]();
application.registerProvider(_ModelServiceProvider["default"]);
application.registerProvider(_HttpServiceProvider["default"]);
application.registerProvider(_AppServiceProvider["default"]);
application.registerProvider(_ValidatorServiceProvider["default"]);
application.registerProvider(_RouterServiceProvider["default"]);

var command =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(name) {
    var _len,
        params,
        _key,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            for (_len = _args.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              params[_key - 1] = _args[_key];
            }

            _context.next = 3;
            return application.command.apply(application, [name].concat(params));

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function command(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.command = command;
application.mixin('$command', command);
application.setAdapter(_VueAppAdapter["default"]);
var _default = application;
exports["default"] = _default;