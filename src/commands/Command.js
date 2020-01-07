import Application from '../Application';
export default class Command {
    /**@type {Application} _app*/
    _app = null;
    /**@type {Application} application*/
    constructor (application) {
        this._app = application;
    }

    handle (...params) {
    }

    static commandName () {
    }

    get app () {
        return this._app;
    }

    get $httpClient(){
        return this.app.$httpClient;
    }
}
