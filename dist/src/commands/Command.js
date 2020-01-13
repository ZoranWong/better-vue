"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Application = _interopRequireDefault(require("../Application"));

var Command =
/*#__PURE__*/
function () {
  /**@type {Application} _app*/

  /**@type {Application} application*/
  function Command(application) {
    (0, _defineProperty2.default)(this, "_app", null);
    this._app = application;
  }

  var _proto = Command.prototype;

  _proto.handle = function handle() {};

  Command.commandName = function commandName() {};

  (0, _createClass2.default)(Command, [{
    key: "app",
    get: function get() {
      return this._app;
    }
  }, {
    key: "$httpClient",
    get: function get() {
      return this.app.$httpClient;
    }
  }]);
  return Command;
}();

exports.default = Command;