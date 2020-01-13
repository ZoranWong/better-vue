"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _NodeCommand = _interopRequireDefault(require("./NodeCommand"));

var CreateServiceCommand =
/*#__PURE__*/
function (_Command) {
  (0, _inheritsLoose2.default)(CreateServiceCommand, _Command);

  function CreateServiceCommand(application) {
    return _Command.call(this, application) || this;
  }
  /**
   * @param {string} dir
   * @param {string} className
   * */


  var _proto = CreateServiceCommand.prototype;

  _proto.handle =
  /*#__PURE__*/
  function () {
    var _handle = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(dir, className) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.mkdir(dir);
              this.mkFile("".concat(dir, "/").concat(className, ".js"), this.template(className));
              return _context.abrupt("return", this._args);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function handle(_x, _x2) {
      return _handle.apply(this, arguments);
    }

    return handle;
  }();

  _proto.template = function template(className, parent) {
    var importStr = parent ? "import * as Service from '".concat(parent, "'") : "import {Service} from 'better-vue";
    return "".concat(importStr, "\nexport default class ").concat(className, " extends Service {\n}\n        ");
  };

  return CreateServiceCommand;
}(_NodeCommand.default);

exports.default = CreateServiceCommand;