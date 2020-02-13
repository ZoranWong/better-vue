"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _HttpAdapter2 = _interopRequireDefault(require("../contracts/HttpAdapter"));

var _uniAppAxios = _interopRequireDefault(require("uni-app-axios"));

var _underscore = require("underscore");

var AxiosAdapter =
/*#__PURE__*/
function (_HttpAdapter) {
  (0, _inheritsLoose2["default"])(AxiosAdapter, _HttpAdapter);

  function AxiosAdapter(config) {
    var _this;

    _this = _HttpAdapter.call(this, config) || this;
    var axios = (0, _uniAppAxios["default"])();
    _this._config['url'] = _this._config['host'];
    _this._client = axios.create(_this._config);
    return _this;
  }

  var _proto = AxiosAdapter.prototype;

  _proto.request = function request(_request) {
    /**@type {AxiosRequestConfig}*/
    var axiosRequest = {}; // axiosRequest.baseURL = this.config['host'];

    axiosRequest.headers = _request.headers;
    axiosRequest.method = _request.method.toLowerCase();
    axiosRequest.url = _request.uri;
    axiosRequest.params = _request.query;
    axiosRequest.data = _request.data;
    return this._client(axiosRequest);
  };

  _proto.response = function response(responseClass, _response) {
    return new responseClass(_response.statusCode, this.headers(_response.header), _response.data);
  };

  return AxiosAdapter;
}(_HttpAdapter2["default"]);

exports["default"] = AxiosAdapter;