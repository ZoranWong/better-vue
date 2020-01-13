"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _underscore = require("underscore");

var _Response = _interopRequireDefault(require("../responses/Response"));

var HTTP_GET = 'GET';
var HTTP_POST = 'POST';
var HTTP_PUT = 'PUT';
var HTTP_DELETE = 'DELETE';
var HTTP_HEAD = 'HEADER';

var FormRequest =
/*#__PURE__*/
function () {
  /**@type {Function}*/
  function FormRequest(data) {
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : HTTP_GET;
    (0, _defineProperty2.default)(this, "_data", {});
    (0, _defineProperty2.default)(this, "_method", null);
    (0, _defineProperty2.default)(this, "_uri", null);
    (0, _defineProperty2.default)(this, "_headers", {});
    (0, _defineProperty2.default)(this, "_query", {});
    (0, _defineProperty2.default)(this, "_middlewares", []);
    (0, _defineProperty2.default)(this, "_response", null);
    this._method = method;

    if (this._method === HTTP_DELETE || this._method === HTTP_HEAD || this._method === HTTP_GET) {
      this._query = data;
    } else {
      this._data = data;
    }
  }

  var _proto = FormRequest.prototype;

  _proto.rules = function rules() {
    return {};
  };

  _proto.messages = function messages() {
    return {};
  };

  _proto.header = function header(key, value) {
    this._headers[key] = value;
    return this;
  }
  /**
   * @return {Object.<string, string>}
   * */
  ;

  _proto.headers = function headers() {
    var _headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (_headers) {
      this._headers = _headers;
    }

    return this._headers;
  }
  /**
   * @return {Object.<string, Object>}
   * */
  ;

  _proto.all = function all() {
    return (0, _underscore.extend)({}, this.data, this.query);
  }
  /**
   * @return {Object.<string, Object>}
   * */
  ;

  /**
   * @param  res
   * @return {Response}
   * */
  _proto.response = function response(res) {
    this._response = res;
    return res;
  };

  (0, _createClass2.default)(FormRequest, [{
    key: "query",
    get: function get() {
      return this._method === HTTP_DELETE || this._method === HTTP_HEAD || this._method === HTTP_GET ? this._query : {};
    }
    /**
     * @return {Object.<string, Object>}
     * */

  }, {
    key: "data",
    get: function get() {
      return this._method === HTTP_PUT || this._method === HTTP_POST ? this._data : {};
    }
    /**
     * @return {Object.<string, string>}
     * */

  }, {
    key: "headers",
    get: function get() {
      return this._headers;
    }
    /**
     * @return {string}
     * */

  }, {
    key: "uri",
    get: function get() {
      return this._uri;
    }
    /**
     * @return {string}
     * */

  }, {
    key: "method",
    get: function get() {
      return this._method;
    }
    /**
     * @return {Array}
     * */

  }, {
    key: "middlewares",
    get: function get() {
      return this._middlewares;
    },
    set: function set(middlewares) {
      this._middlewares = middlewares;
    }
  }]);
  return FormRequest;
}();

exports.default = FormRequest;
(0, _defineProperty2.default)(FormRequest, "GET", HTTP_GET);
(0, _defineProperty2.default)(FormRequest, "POST", HTTP_POST);
(0, _defineProperty2.default)(FormRequest, "PUT", HTTP_PUT);
(0, _defineProperty2.default)(FormRequest, "DELETE", HTTP_DELETE);
(0, _defineProperty2.default)(FormRequest, "HEAD", HTTP_HEAD);