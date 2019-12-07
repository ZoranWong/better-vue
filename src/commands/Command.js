export default class Command {
    _application = null;

    constructor (application) {
        this._application = application;
    }
    handle (...params) {
    }
    static commandName () {
    }
}
