"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _NodeCommand = _interopRequireDefault(require("./NodeCommand"));

var CreateMiddlewareCommand =
/*#__PURE__*/
function (_Command) {
  (0, _inheritsLoose2["default"])(CreateMiddlewareCommand, _Command);

  function CreateMiddlewareCommand() {
    return _Command.apply(this, arguments) || this;
  }

  var _proto = CreateMiddlewareCommand.prototype;

  _proto.template = function template(className) {
    return "export default{\n}\n        ";
  };

  return CreateMiddlewareCommand;
}(_NodeCommand["default"]);

exports["default"] = CreateMiddlewareCommand;