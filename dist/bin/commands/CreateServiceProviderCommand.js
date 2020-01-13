"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _NodeCommand = _interopRequireDefault(require("./NodeCommand"));

var CreateServiceProviderCommand =
/*#__PURE__*/
function (_Command) {
  (0, _inheritsLoose2.default)(CreateServiceProviderCommand, _Command);

  function CreateServiceProviderCommand() {
    return _Command.apply(this, arguments) || this;
  }

  var _proto = CreateServiceProviderCommand.prototype;

  _proto.template = function template(className, parent) {
    var importStr = parent ? "import * as ServiceProvider from '".concat(parent, "'") : "import {ServiceProvider} from 'better-vue";
    return "".concat(importStr, "\nexport default class ").concat(className, " extends ServiceProvider {\n}\n        ");
  };

  return CreateServiceProviderCommand;
}(_NodeCommand.default);

exports.default = CreateServiceProviderCommand;