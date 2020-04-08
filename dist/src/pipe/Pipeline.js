"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _underscore = _interopRequireDefault(require("underscore"));

var _helpers = require("../utils/helpers");

var Pipeline =
/*#__PURE__*/
function () {
  function Pipeline(container) {
    (0, _defineProperty2["default"])(this, "_container", null);
    (0, _defineProperty2["default"])(this, "_passable", null);
    (0, _defineProperty2["default"])(this, "_pipes", []);
    (0, _defineProperty2["default"])(this, "_method", 'handle');
    this._container = container;
  }

  var _proto = Pipeline.prototype;

  _proto.send = function send(passable) {
    this._passable = passable;
    return this;
  };

  _proto.through = function through() {
    for (var _len = arguments.length, pipes = new Array(_len), _key = 0; _key < _len; _key++) {
      pipes[_key] = arguments[_key];
    }

    this._pipes = _underscore["default"].isArray(pipes) ? pipes : Array.from(arguments);
    return this;
  };

  _proto.via = function via(method) {
    this._method = method;
    return this;
  };

  _proto.then =
  /*#__PURE__*/
  function () {
    var _then = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(destination) {
      var _this = this;

      var pipes, pipeline, result;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              pipes = this._pipes.reverse();
              pipeline = pipes.reduce(this._carry(), this._prepareDestination(destination));

              if (!_underscore["default"].isFunction(pipeline)) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return pipeline(this._passable);

            case 5:
              _context.t0 = _context.sent;
              _context.next = 11;
              break;

            case 8:
              _context.next = 10;
              return pipeline.then(function (f) {
                return f(_this._passable);
              });

            case 10:
              _context.t0 = _context.sent;

            case 11:
              result = _context.t0;
              return _context.abrupt("return", result);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function then(_x) {
      return _then.apply(this, arguments);
    }

    return then;
  }();

  _proto.thenReturn =
  /*#__PURE__*/
  function () {
    var _thenReturn = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.then(function (passable) {
                return passable;
              });

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function thenReturn() {
      return _thenReturn.apply(this, arguments);
    }

    return thenReturn;
  }();

  _proto._prepareDestination = function _prepareDestination(destination) {
    return (
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee3(passable) {
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return destination(passable);

                case 2:
                  return _context3.abrupt("return", _context3.sent);

                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x2) {
          return _ref.apply(this, arguments);
        };
      }()
    );
  };

  _proto._carry = function _carry() {
    var _this2 = this;

    return (
      /*#__PURE__*/
      function () {
        var _ref2 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee5(stack, pipe) {
          return _regenerator["default"].wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt("return",
                  /*#__PURE__*/
                  function () {
                    var _ref3 = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/
                    _regenerator["default"].mark(function _callee4(passable) {
                      var p, result;
                      return _regenerator["default"].wrap(function _callee4$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              if (!_underscore["default"].isFunction(pipe)) {
                                _context4.next = 16;
                                break;
                              }

                              if (_this2._canExcute(pipe)) {
                                _context4.next = 7;
                                break;
                              }

                              _context4.next = 4;
                              return pipe(passable, stack);

                            case 4:
                              return _context4.abrupt("return", _context4.sent);

                            case 7:
                              p = new pipe();

                              if (!(!_this2._canExcute(pipe) && _this2._canExcute(p))) {
                                _context4.next = 12;
                                break;
                              }

                              pipe = p;
                              _context4.next = 14;
                              break;

                            case 12:
                              if (_this2._canExcute(pipe)) {
                                _context4.next = 14;
                                break;
                              }

                              throw new TypeError('there has a pipe object in pipeline which is not right type! ');

                            case 14:
                              _context4.next = 21;
                              break;

                            case 16:
                              if (!_underscore["default"].isString(pipe)) {
                                _context4.next = 20;
                                break;
                              }

                              pipe = _this2._container[pipe];
                              _context4.next = 21;
                              break;

                            case 20:
                              throw new TypeError('there has a pipe object in pipeline which is not right type! ');

                            case 21:
                              if (!(typeof pipe[_this2._method] !== 'undefined')) {
                                _context4.next = 27;
                                break;
                              }

                              _context4.next = 24;
                              return pipe[_this2._method].apply(pipe, [passable, stack]);

                            case 24:
                              _context4.t0 = _context4.sent;
                              _context4.next = 28;
                              break;

                            case 27:
                              _context4.t0 = null;

                            case 28:
                              result = _context4.t0;
                              return _context4.abrupt("return", result);

                            case 30:
                            case "end":
                              return _context4.stop();
                          }
                        }
                      }, _callee4);
                    }));

                    return function (_x5) {
                      return _ref3.apply(this, arguments);
                    };
                  }());

                case 1:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }()
    );
  };

  _proto._canExcute = function _canExcute(pipe) {
    return this._method in pipe;
  };

  return Pipeline;
}();

exports["default"] = Pipeline;