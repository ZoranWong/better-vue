#!/usr/bin/env babel-node
import Application from '../src/Application';
import app from '../configs/app';
import CreateServiceCommand from "./commands/CreateServiceCommand";
import CreateServiceProviderCommand from "./commands/CreateServiceProviderCommand";
import CreateModelCommand from "./commands/CreateModelCommand";
import commander from 'commander';
import CreateMiddlewareCommand from "./commands/CreateMiddlewareCommand";

const program = new commander.Command();
let application = new Application();
application.registerConfig('app', app);
application.registerCommand('service:create', CreateServiceCommand);
application.registerCommand('provider:create', CreateServiceProviderCommand);
application.registerCommand('model:create', CreateModelCommand);
application.registerCommand('middleware:create', CreateMiddlewareCommand);
program.version('0.0.1');
program.usage('better <cmd> <className> [options]')
.arguments('<cmd> <className> [options]')
.option('--dir <dir>')
.description('create better-vue provider, service or model')
.action((cmd, className) => {
    let dir = program['dir'];
    application.command(cmd, dir, className).then((result) => {
        console.log("command exc", cmd, dir, className);
    });
});
program.parse(process.argv);
