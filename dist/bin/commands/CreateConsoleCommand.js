"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _NodeCommand = _interopRequireDefault(require("./NodeCommand"));

var CreateConsoleCommand =
/*#__PURE__*/
function (_Command) {
  (0, _inheritsLoose2["default"])(CreateConsoleCommand, _Command);

  function CreateConsoleCommand() {
    return _Command.apply(this, arguments) || this;
  }

  var _proto = CreateConsoleCommand.prototype;

  _proto.template = function template(className, parent) {
    var importStr = parent ? "import * as Middleware from '".concat(parent, "'") : "import {Middleware} from 'better-vue";
    return "".concat(importStr, "\nexport default class ").concat(className, " extends Middleware {\n    static commandName() {\n\t\treturn '';\n\t}\n\tasync handle(){\n\t}\n}\n        ");
  };

  return CreateConsoleCommand;
}(_NodeCommand["default"]);

exports["default"] = CreateConsoleCommand;