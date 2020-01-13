#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _Application = _interopRequireDefault(require("../src/Application"));

var _app = _interopRequireDefault(require("../configs/app"));

var _CreateServiceCommand = _interopRequireDefault(require("./commands/CreateServiceCommand"));

var _CreateServiceProviderCommand = _interopRequireDefault(require("./commands/CreateServiceProviderCommand"));

var _CreateModelCommand = _interopRequireDefault(require("./commands/CreateModelCommand"));

var _commander = _interopRequireDefault(require("commander"));

var _CreateMiddlewareCommand = _interopRequireDefault(require("./commands/CreateMiddlewareCommand"));

var _CreateRequestCommand = _interopRequireDefault(require("./commands/CreateRequestCommand"));

var _CreateResponseCommand = _interopRequireDefault(require("./commands/CreateResponseCommand"));

var _CreateConsoleCommand = _interopRequireDefault(require("./commands/CreateConsoleCommand"));

var program = new _commander.default.Command();
var application = new _Application.default();
application.registerConfig(_app.default);
application.registerCommand('service:create', _CreateServiceCommand.default);
application.registerCommand('provider:create', _CreateServiceProviderCommand.default);
application.registerCommand('model:create', _CreateModelCommand.default);
application.registerCommand('middleware:create', _CreateMiddlewareCommand.default);
application.registerCommand('request:create', _CreateRequestCommand.default);
application.registerCommand('response:create', _CreateResponseCommand.default);
application.registerCommand('console:create', _CreateConsoleCommand.default);
program.version('0.0.1').option('--root <root>', 'set root path', 'src').option('--dir <dir>', 'set file dir', '').option('--superClass <super>', 'set parent class', '').option('--method <method>', 'set http method', 'GET');
program.usage('better <cmd> <className> [options]').description('create better-vue provider, service or model').arguments('<cmd> <className> [options]').action(function (cmd, className) {
  var dir = program['root'] + '/' + program['dir'];
  var parent = program['superClass'];
  var method = program['method'];
  application.command(cmd, dir, className, parent, method).then(function (result) {
    console.log("command exc", cmd, dir, className, parent, method);
  });
});
program.parse(process.argv);
