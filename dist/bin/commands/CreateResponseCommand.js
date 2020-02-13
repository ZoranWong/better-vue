"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _NodeCommand = _interopRequireDefault(require("./NodeCommand"));

var CreateResponseCommand =
/*#__PURE__*/
function (_Command) {
  (0, _inheritsLoose2["default"])(CreateResponseCommand, _Command);

  function CreateResponseCommand() {
    return _Command.apply(this, arguments) || this;
  }

  var _proto = CreateResponseCommand.prototype;

  _proto.template = function template(className, parent) {
    var importStr = parent ? "import * as Response from '".concat(parent, "'") : "import {Response} from 'better-vue";
    return "".concat(importStr, "\nexport default class ").concat(className, " extends Response {\n    constructor(status, headers, body) {\n\t\tsuper(status, headers, body);\n\t\tthis._parse();\n\t}\n\t_parse() {\n\t}\n}\n        ");
  };

  return CreateResponseCommand;
}(_NodeCommand["default"]);

exports["default"] = CreateResponseCommand;