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
    _this._client = axios;
    return _this;
  }

  var _proto = AxiosAdapter.prototype;

  _proto.request = function request(_request) {
    var axiosRequest = {}; // axiosRequest.baseURL = this.config['host'];

    axiosRequest.header = _request.headers;

    var method = _request.method.toLowerCase();

    axiosRequest.url = _request.uri;
    axiosRequest.params = _request.query;
    axiosRequest.data = _request.data;

    var api = this._client.create({
      url: this._config['host'],
      dataType: 'json',
      //默认的返回类型
      responseType: 'text',
      method: method,
      header: (0, _underscore.extend)(_request.headers, {
        'content-type': "application/json"
      })
    });

    console.log(api);
    return api(_request.uri, (0, _underscore.extend)(_request.query, _request.data));
  };

  _proto.response = function response(responseClass, _response) {
    return new responseClass(_response.statusCode, this.headers(_response.header), _response.data);
  };

  return AxiosAdapter;
}(_HttpAdapter2["default"]);

exports["default"] = AxiosAdapter;