"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _FormRequest = _interopRequireDefault(require("../requests/FormRequest"));

var _axios = require("axios");

var _flyio = require("flyio");

var _underscore = require("underscore");

var HttpAdapter =
/*#__PURE__*/
function () {
  /**@type {AxiosProxyConfig}*/

  /**@type {AxiosInstance|Fly}*/
  function HttpAdapter(config) {
    (0, _defineProperty2["default"])(this, "_config", {});
    (0, _defineProperty2["default"])(this, "_client", null);
    this._config = config;
  }

  var _proto = HttpAdapter.prototype;

  _proto.response = function response(responseClass, _response) {};

  _proto.headers = function headers(_headers) {
    var header = {};
    (0, _underscore.each)(_headers, function (value, key) {
      header[key] = (0, _underscore.isArray)(value) ? value[0] : value;
    });
    return header;
  }
  /**@type {FormRequest}*/
  ;

  _proto.send = function send(request, responseClass) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      if (_this._client) {
        /**@type {AxiosResponse} response*/
        _this.request(request).then(function (response) {
          console.log(response, '==============');

          var res = _this.response(responseClass, response);

          resolve(request.response(res));
        }, function (reason) {
          console.log('----------- reason ------', reason);
          reject(reason);
        });
      } else {
        reject(false);
      }
    });
  };

  _proto.request = function request(_request) {
    return {};
  };

  (0, _createClass2["default"])(HttpAdapter, [{
    key: "config",
    get: function get() {
      return this._config;
    }
  }]);
  return HttpAdapter;
}();

exports["default"] = HttpAdapter;