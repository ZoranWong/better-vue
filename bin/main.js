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
program.version('0.0.1')
.option('--root <root>', 'set root path','src')
.option('--dir <dir>', 'set file dir','')
.option('--superClass <super>', 'set parent class','')
.option('--method <method>', 'set http method', 'GET');
program.usage('better <cmd> <className> [options]')
.description('create better-vue provider, service or model')
.arguments('<cmd> <className> [options]')
.action((cmd, className) => {
    let dir = program['root']+'/'+program['dir'];
    let parent = program['superClass'];
    let method = program['method'];
    application.command(cmd, dir, className, parent, method).then((result) => {
        console.log("command exc", cmd, dir, className, parent, method);
    });
});
program.parse(process.argv);
