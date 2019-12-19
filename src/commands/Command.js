export default class Command {
    _app = null;

    constructor (application) {
        this._app = application;
    }
    handle (...params) {
    }
    static commandName () {
    }
}
