"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _HttpAdapter2 = _interopRequireDefault(require("../contracts/HttpAdapter"));

var _axios = _interopRequireDefault(require("axios"));

var AxiosAdapter =
/*#__PURE__*/
function (_HttpAdapter) {
  (0, _inheritsLoose2.default)(AxiosAdapter, _HttpAdapter);

  function AxiosAdapter(config) {
    var _this;

    _this = _HttpAdapter.call(this, config) || this;
    _this._client = _axios.default.create(_this._config);
    return _this;
  }

  var _proto = AxiosAdapter.prototype;

  _proto.request = function request(_request) {
    /**@type {AxiosRequestConfig}*/
    var axiosRequest = {};
    axiosRequest.baseURL = this.config['host'];
    axiosRequest.headers = _request.headers;
    axiosRequest.method = _request.method.toLowerCase();
    axiosRequest.url = _request.uri;
    axiosRequest.params = _request.query;
    axiosRequest.data = _request.data;
    return axiosRequest;
  };

  return AxiosAdapter;
}(_HttpAdapter2.default);

exports.default = AxiosAdapter;