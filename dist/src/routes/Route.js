"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Query = _interopRequireDefault(require("./Query"));

var Route =
/**@type {Query} */
function Route(name, path) {
  (0, _defineProperty2["default"])(this, "name", null);
  (0, _defineProperty2["default"])(this, "path", null);
  (0, _defineProperty2["default"])(this, "query", null);
  (0, _defineProperty2["default"])(this, "params", null);
  this.name = name;
  this.path = path;
};

exports["default"] = Route;