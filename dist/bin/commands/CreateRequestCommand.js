"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _NodeCommand = _interopRequireDefault(require("./NodeCommand"));

var CreateRequestCommand =
/*#__PURE__*/
function (_Command) {
  (0, _inheritsLoose2.default)(CreateRequestCommand, _Command);

  function CreateRequestCommand() {
    return _Command.apply(this, arguments) || this;
  }

  var _proto = CreateRequestCommand.prototype;

  _proto.template = function template(className, parent, method) {
    var importStr = parent ? "import * as Request from '".concat(parent, "'") : "import {FormRequest as Request} from 'better-vue";
    return "".concat(importStr, "\nexport default class ").concat(className, " extends Request {\n    constructor(){\n        super({}, ").concat(className, ".").concat(method, ");\n    }\n}\n        ");
  };

  return CreateRequestCommand;
}(_NodeCommand.default);

exports.default = CreateRequestCommand;