'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Command = _interopRequireDefault(require("../../src/commands/Command"));

var _Application = _interopRequireDefault(require("../../src/Application"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _fs = _interopRequireDefault(require("fs"));

var NodeCommand =
/*#__PURE__*/
function (_BaseCommand) {
  (0, _inheritsLoose2.default)(NodeCommand, _BaseCommand);

  /**
   * @param {Application} application
   * */
  function NodeCommand(application) {
    var _this;

    _this = _BaseCommand.call(this, application) || this;
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_args", {});
    return _this;
  }
  /**
   * @param {string} shellCommand
   * @param {} params
   * @return {boolean}
   * */


  var _proto = NodeCommand.prototype;

  _proto._command = function _command(shellCommand) {
    if (typeof _shelljs.default[shellCommand] === 'function') {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      return _shelljs.default[shellCommand].apply(_shelljs.default, params);
    }

    return false;
  };

  _proto.mkdir = function mkdir(dir) {
    if (!_fs.default.existsSync(dir)) {
      this._command('mkdir', dir);
    }
  };

  _proto.mkFile = function mkFile(file, content) {
    if (!_fs.default.existsSync(file)) {
      _fs.default.appendFileSync(file, content, 'utf8');
    }
  }
  /**
   * @param {string} dir
   * @param {string} className
   * */
  ;

  _proto.handle =
  /*#__PURE__*/
  function () {
    var _handle = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(dir, className, parent) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.mkdir(dir);
              this.mkFile("".concat(dir, "/").concat(className, ".js"), this.template(className, parent));
              return _context.abrupt("return", this._args);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function handle(_x, _x2, _x3) {
      return _handle.apply(this, arguments);
    }

    return handle;
  }();

  _proto.template = function template(className, parent) {
    return "\n        ";
  };

  return NodeCommand;
}(_Command.default);

exports.default = NodeCommand;