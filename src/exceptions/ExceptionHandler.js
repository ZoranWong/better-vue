export default class ExceptionHandler {
    _app = null;
    _exception = null;
    constructor (app, exception) {
        this._app = app;
        this._exception = exception;
    }
    handle (message, type) {
        message = typeof message !== 'undefined' ? message : this.message;
        type = typeof type !== 'undefined' ? type : this.type;
        this._exception({
            message: message,
            type: type
        });
    }
}
