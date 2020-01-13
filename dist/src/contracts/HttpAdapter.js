"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _FormRequest = _interopRequireDefault(require("../requests/FormRequest"));

var _axios = require("axios");

var _flyio = require("flyio");

var HttpAdapter =
/*#__PURE__*/
function () {
  /**@type {AxiosProxyConfig}*/

  /**@type {AxiosInstance|Fly}*/
  function HttpAdapter(config) {
    (0, _defineProperty2.default)(this, "_config", {});
    (0, _defineProperty2.default)(this, "_client", null);
    this._config = config;
  }
  /**@type {FormRequest}*/


  var _proto = HttpAdapter.prototype;

  _proto.send = function send(request, responser) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      if (_this._client) {
        /**@type {AxiosRequestConfig|FlyRequestConfig}*/
        var requestConfig = _this.request(request);
        /**@type {AxiosResponse} response*/


        _this._client.request(requestConfig).then(function (response) {
          var res = new responser(response.status, response.headers, response.data);
          resolve(request.response(res));
        }, function (reason) {
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

  (0, _createClass2.default)(HttpAdapter, [{
    key: "config",
    get: function get() {
      return this._config;
    }
  }]);
  return HttpAdapter;
}();

exports.default = HttpAdapter;