"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Model2 = _interopRequireDefault(require("./Model"));

var Collection =
/*#__PURE__*/
function (_Model) {
  (0, _inheritsLoose2.default)(Collection, _Model);

  /**@type {Model}*/

  /**@type {[[]]}*/

  /**@type {int}*/

  /**@type {int}*/
  function Collection(request) {
    var _this;

    var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
    _this = _Model.call(this, request) || this;
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_model", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_list", []);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_page", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_limit", 10);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_pageCount", 0);
    _this._limit = limit;
    _this._page = page;
    _this._model = model;
    return _this;
  }

  return Collection;
}(_Model2.default);

exports.default = Collection;