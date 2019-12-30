import Application from '../Application';
export default class Service {
    /**@type {Application}*/
    _app = null;

    /**
    * @param {Application} application
    * */
    constructor (application) {
        this._app = application;
    }
}
