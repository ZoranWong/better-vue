import Application from '../Application';

export default class ServiceProvider {
    /**@type {Application}*/
    _app = null;

    /**
     * @param {Application}
     * */
    constructor (application) {
        this._app = application;
    }

    register () {
    }

    boot () {
    }

    get app () {
        return this._app;
    }
}
