'use strict';
import BaseCommand from "../../src/commands/Command";
import Application from '../../src/Application';
import shell from 'shelljs';
import fs from 'fs';

export default class NodeCommand extends BaseCommand {
    _args = {};

    /**
     * @param {Application} application
     * */
    constructor(application) {
        super(application);
    }

    /**
     * @param {string} shellCommand
     * @param {} params
     * @return {boolean}
     * */
    _command(shellCommand, ...params) {
        if (typeof shell[shellCommand] === 'function') {
            return shell[shellCommand](...params);
        }
        return false;
    }

    mkdir(dir) {
        if (!fs.existsSync(dir)) {
            this._command('mkdir', dir);
        }
    }
}