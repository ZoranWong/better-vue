"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Response =
/*#__PURE__*/
function () {
  function Response(status, headers, body) {
    (0, _defineProperty2["default"])(this, "_status", null);
    (0, _defineProperty2["default"])(this, "_body", null);
    (0, _defineProperty2["default"])(this, "_headers", null);
    this._body = body;
    this._status = status;
    this._headers = headers;
  }

  var _proto = Response.prototype;

  _proto._parse = function _parse() {
    console.log('_parse in super class ');
  };

  (0, _createClass2["default"])(Response, [{
    key: "status",
    get: function get() {
      return this._status;
    }
  }, {
    key: "body",
    get: function get() {
      return this._body;
    }
  }, {
    key: "headers",
    get: function get() {
      return this._headers;
    }
  }]);
  return Response;
}();

exports["default"] = Response;