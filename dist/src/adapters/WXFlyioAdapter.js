"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _HttpAdapter2 = _interopRequireDefault(require("../contracts/HttpAdapter"));

var _wx = _interopRequireDefault(require("flyio/dist/npm/wx"));

var _flyio = require("flyio");

var WXFlyioAdapter =
/*#__PURE__*/
function (_HttpAdapter) {
  (0, _inheritsLoose2.default)(WXFlyioAdapter, _HttpAdapter);

  /**
  * @param {FlyRequestConfig} config
  * */
  function WXFlyioAdapter(config) {
    var _this;

    _this = _HttpAdapter.call(this, config) || this;
    _this._client = new _wx.default();
    return _this;
  }

  var _proto = WXFlyioAdapter.prototype;

  _proto.request = function request(_request) {
    /**@type {FlyRequestConfig} flyRequest*/
    var flyRequest = {};
    flyRequest.baseURL = this.config['host'];
    flyRequest.headers = _request.headers;
    flyRequest.method = _request.method;
    flyRequest.url = _request.uri;
    flyRequest.params = _request.query;
    flyRequest.body = _request.data;
    return flyRequest;
  };

  return WXFlyioAdapter;
}(_HttpAdapter2.default);

exports.default = WXFlyioAdapter;