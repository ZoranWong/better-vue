#!/usr/bin/env babel-node
import Application from '../src/Application';
import app from '../configs/app';
import CreateServiceCommand from "./commands/CreateServiceCommand";
import CreateServiceProviderCommand from "./commands/CreateServiceProviderCommand";
import CreateModelCommand from "./commands/CreateModelCommand";
import param from 'commander';

let application = new Application();
application.registerConfig('app', app);
application.registerCommand('service:create', CreateServiceCommand);
application.registerCommand('provider:create', CreateServiceProviderCommand);
application.registerCommand('model:create', CreateModelCommand);
param.version('0.0.1').option('--dir <dir>');
param.command('<cmd> <className>')
    .description('')
    .action((cmd, className) => {
        param.parse(process.argv);
        let dir = param['dir'];
        application.command(cmd, dir, className).then((result) => {
            console.log(result);
        });
    });