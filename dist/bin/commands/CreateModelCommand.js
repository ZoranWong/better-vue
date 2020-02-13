"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _NodeCommand = _interopRequireDefault(require("./NodeCommand"));

var CreateModelCommand =
/*#__PURE__*/
function (_Command) {
  (0, _inheritsLoose2["default"])(CreateModelCommand, _Command);

  function CreateModelCommand() {
    return _Command.apply(this, arguments) || this;
  }

  var _proto = CreateModelCommand.prototype;

  _proto.template = function template(className, parent) {
    var importStr = parent !== 'Model' && parent !== 'Collection' ? "import * as Model from '".concat(parent, "'") : "import {".concat(parent, "} from 'better-vue");
    var pClass = parent !== 'Model' && parent !== 'Collection' ? 'Model' : parent;
    return "".concat(importStr, "\nexport default class ").concat(className, " extends ").concat(pClass, " {\n}\n        ");
  };

  return CreateModelCommand;
}(_NodeCommand["default"]);

exports["default"] = CreateModelCommand;