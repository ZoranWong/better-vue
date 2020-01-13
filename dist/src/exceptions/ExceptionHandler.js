"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var ExceptionHandler =
/*#__PURE__*/
function () {
  function ExceptionHandler(app, exception) {
    (0, _defineProperty2.default)(this, "_app", null);
    (0, _defineProperty2.default)(this, "_exception", null);
    this._app = app;
    this._exception = exception;
  }

  var _proto = ExceptionHandler.prototype;

  _proto.handle = function handle(message, type) {
    message = typeof message !== 'undefined' ? message : this.message;
    type = typeof type !== 'undefined' ? type : this.type;

    this._exception({
      message: message,
      type: type
    });
  };

  return ExceptionHandler;
}();

exports.default = ExceptionHandler;