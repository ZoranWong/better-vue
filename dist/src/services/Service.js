"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Application = _interopRequireDefault(require("../Application"));

var Service =
/**@type {Application}*/

/**
* @param {Application} application
* */
function Service(application) {
  (0, _defineProperty2.default)(this, "_app", null);
  this._app = application;
};

exports.default = Service;